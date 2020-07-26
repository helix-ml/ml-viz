import os
import ast
import json
import copy
import warnings

import pandas as pd
import numpy as np

import icicle_plot
import plotly.express as px
import plotly.graph_objects as go
from jupyter_dash import JupyterDash
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.exceptions import PreventUpdate
from dash.dependencies import Input, Output, ALL, MATCH
from IPython.display import display, HTML

import sklearn
from sklearn.metrics import accuracy_score, log_loss
import xgboost as xgb
import mlflow
import mlflow.xgboost
import mlflow.sklearn

ut_pair = 0
ut_p = 0
low_color = 2
high_color = -1
max_len_candidates = 0
hierarchy_path = 0
rangeDataOld = []
clickDataOld = []
logs_path = 0
update_available = False
display = False
port = 0

def grab_autologs():
    global ut_pair
    global logs_path

    dirs = os.listdir(logs_path + "mlruns/0")
    dictionary = []
    for i in dirs:
        row = {}
        if "meta" in i or "DS_Store" in i:
            continue
        
        if not os.path.isfile(logs_path + 'mlruns/0/' + i + '/metrics/accuracy'):
            continue
        accuracy = float(open(logs_path + 'mlruns/0/' + i + '/metrics/accuracy').read().split(" ")[1])
        row['accuracy'] = accuracy
        params_files = os.listdir(logs_path + 'mlruns/0/' + i + '/params')
        model_params = {}
        model_name = 0
        for j in params_files:
            if 'model_name' in j:
                model_name = open(logs_path + 'mlruns/0/' + i + '/params/' + j).read()
                continue
            if 'kernel' in j:
                continue
            model_params[j] = open(logs_path + 'mlruns/0/' + i + '/params/' + j).read()
        
        row['model_params'] = model_params
        row['model'] = model_name
        dictionary.append(row)
        
    ut_pair = pd.DataFrame(dictionary)
    ut_pair.to_csv('ut_pair.csv')
    ut_pair = pd.read_csv('ut_pair.csv')
    ut_pair.model_params = ut_pair.model_params.apply(ast.literal_eval)
    ut_pair = ut_pair.rename(columns={'Unnamed: 0': 'rid'})

def create_hierarchy():
    global max_len_candidates
    global ut_pair

    hyperparams_df = 0

    def sorting_criteria(s):
        return len(hyperparams_df[s].unique())

    hp_key = {}
    
    for model_iter in ut_pair.model.unique():
        hyperparams_df = pd.DataFrame(ut_pair[ut_pair.model == model_iter].model_params.to_list())
        hp_candidates = sorted(list(ut_pair[ut_pair.model == model_iter].model_params.to_list()[0].keys()), key=sorting_criteria)
        hp_candidates = [i for i in hp_candidates if len(hyperparams_df[i].unique()) > 1]
        hp_key[model_iter] = hp_candidates
        if len(hp_candidates) > max_len_candidates:
            max_len_candidates = len(hp_candidates)
            
    hyperparams_df = pd.DataFrame(ut_pair.model_params.to_list())
    hyperparams_df['rid'] = ut_pair['rid'].values

    current_index = 0
    def hp_viz_creator(row):
        if current_index < len(hp_key[row.model]):
            hp_value = str(hyperparams_df[hyperparams_df.rid == row.rid][hp_key[row.model][current_index]].tolist()[0])
            return hp_key[row.model][current_index] + "=" + hp_value
        return None


    for i in range(max_len_candidates):
        current_index = i
        ut_pair[str(i) + "_order_hyp"] = ut_pair[['model', 'rid']].apply(hp_viz_creator,axis=1)

def format_icicle_data():
    global ut_p
    global low_color
    global high_color
    global hierarchy_path

    hierarchy_path = ['model'] + [str(i) + '_order_hyp' for i in range(max_len_candidates)]
    ut_p = ut_pair[hierarchy_path + ['accuracy']]
    def recur_dictify(frame):
        if len(frame.columns) == 1:
            if frame.values.size == 1: return frame.values[0][0]
            return frame.values.squeeze()
        
        # for rows that contain None values (have fewer hyperparameters than others)
        if frame[frame.columns[0]].iloc[0] == None:
            return frame.values[0][len(frame.values[0])-1]
        grouped = frame.groupby(frame.columns[0])
        d = {k: recur_dictify(g.iloc[:,1:]) for k,g in grouped}
        return d
    ut_p = recur_dictify(ut_p)
    low_color = 2.0
    high_color = -1.0
    def recur_hierarch(frame):
        global low_color
        global high_color
        if isinstance(frame, np.float64) or isinstance(frame, float) or isinstance(frame, np.ndarray):
            return frame, frame
        children = []
        colors = []
        for key in frame.keys():
            children_c, color = recur_hierarch(frame[key])
            if isinstance(color, np.ndarray):
                color = color[0]
            colors.append(color)
            
            if children_c != [] and not isinstance(children_c, float) and not isinstance(children_c[0], np.float64):
                # node
                children.append({'name': key, 'color': color, 'children': children_c})
            else:
                # leaf
                if color < low_color:
                    low_color = color
                if color > high_color:
                    high_color = color
                children.append({'name': key, 'color': color, 'size': 1})
        return children, max(colors)

    children_ut_p, color = recur_hierarch(ut_p)
    ut_p = {'name': 'main', 'color': color, 'children': children_ut_p}

## Tree Functions
# ok this one isn't recursion but the others are
def grab_node(path, dictionary):
    if path == ['main']:
        return dictionary
    current = dictionary
    stack = path
    stack.reverse()
    stack.pop()
    while(len(stack) > 0):
        searcher = stack.pop()
        for i in current['children']:
            if i['name'] == searcher:
                current = i
                break
    return current

def count_leaves(dictionary):
    if 'children' not in dictionary:
        return 1
    counter = 0
    for i in range(len(dictionary['children'])):
        counter += count_leaves(dictionary['children'][i])
    return counter

def remove_nodes_out_of_range(low_r, high_r, dictionary):
    if 'children' not in dictionary:
        if isinstance(dictionary['color'], str):
            return False
        if float(dictionary['color']) < low_r or float(dictionary['color']) > high_r:
            return True
        return False
    
    to_delete = []
    for i in range(len(dictionary['children'])):
        if remove_nodes_out_of_range(low_r, high_r, dictionary['children'][i]):
            to_delete.append(i)
            
    # loop backwards to delete multiple indices
    for index in sorted(to_delete, reverse=True):
        del dictionary['children'][index]
    
    # delete this guy if all his children are gone
    if len(dictionary['children']) == 0:
        return True
    
    # update color
    children_colors = [child['color'] for child in dictionary['children'] if not isinstance(child['color'], str)]
    if len(children_colors) > 0:
        dictionary['color'] = max(children_colors)
    else:
        # recommendation color
        dictionary['color'] = dictionary['children'][0]['color']
    return False

def add_rec(path, value, dictionary):
    node = {'name': value, 'color': 'grey', 'size': len(value) + 2}
    if path == ['main']:
        dictionary['children'].append(node)
        return
    current = grab_node(path, dictionary)
    current['children'].append(node)

def init_app():
    global ut_pair
    global ut_p
    global low_color
    global high_color
    global hierarchy_path
    global pc
    global id_updater
    global rangeDataOld
    global update_available

    app = JupyterDash(__name__)
    # app = dash.Dash()
    app.css.config.serve_locally = True
    app.scripts.config.serve_locally = True

    def df_to_dict(ut):
        data = {}
        for col_name in hierarchy_path:
            for i, g in ut.groupby(col_name):
                data_key = g[col_name].iloc[0]
                data[data_key] = {}

    data = copy.deepcopy(ut_p)

    icicle_plot_fig = icicle_plot.Icicle(
        id='icicle_plot_fig',
        value='main/',
        label='my-label',
        low=low_color,
        high=high_color,
        data=data
    )

    def make_ints(row):
        for col in hierarchy_path:
            if row[col] != None:
                try:
                    row[col] = float(row[col].split("=")[1])
                except:
                    row[col]
        return row

    ut_pair_numeric = ut_pair.apply(make_ints, axis=1)

    pc = px.parallel_coordinates(ut_pair_numeric, color="accuracy", dimensions=hierarchy_path,
                                color_continuous_scale='RdBu', height=350)
    pc_o = pc

    marks = {}
    for i in range(0, 100, 5):
        marks[i/100] = str(i/100)

    app.layout = html.Div([
        dcc.RangeSlider(
            id='metric-slider',
            min=0,
            max=1,
            step=0.05,
            value=[0, 1],
            marks=marks
        ),
        html.Div(
            icicle_plot_fig,
            id='icicle-wrap'
        ),
        dcc.Graph(
            id='pc',
            figure=pc
        ),
        html.Div(id='output'),
        dcc.Interval(
            id='interval-component',
            interval=1*1000, # in milliseconds
            n_intervals=0
        ),
        dcc.Interval(
            id='interval-component2',
            interval=1*1000, # in milliseconds
            n_intervals=0
        )
    ])

    # ensures that icicle plot reloads when data updated
    id_updater = 0

    @app.callback(
        Output('icicle-wrap', 'children'),
        [Input('metric-slider', 'value'),
         Input('interval-component', 'n_intervals')])
    def update_icicle(rangeData, n):
        # global vars will break app in production!! switch to shared states at some point
        global id_updater
        global rangeDataOld
        global update_available

        trigger_context = dash.callback_context.triggered[0]['prop_id']
        if len(dash.callback_context.triggered) <= 1 and update_available == False and (trigger_context == 'interval-component.n_intervals' or trigger_context == '.'):
            raise PreventUpdate
        
        # revert to original state
        data = copy.deepcopy(ut_p)
        
        # delete entries
        remove_nodes_out_of_range(rangeData[0], rangeData[1], data)
        filtered_accs = ut_pair.query("accuracy >= " + str(rangeData[0]) + " and accuracy <= " + str(rangeData[1]))['accuracy']
        low_color = filtered_accs.min()
        high_color = filtered_accs.max()
        if rangeData != rangeDataOld:
            id_updater+=1
            rangeDataOld = rangeData
        if update_available:
            # print("update vailable")
            id_updater+=1
            update_available = False
        # id is dictionary for Dash pattern matching callbacks
        return icicle_plot.Icicle(
            id={'role': 'icicle_plot_fig', 'index': id_updater},
            value='main/',
            label='my-label',
            low=low_color,
            high=high_color,
            data=data
        )

    @app.callback(
        Output('pc', 'figure'),
        [
            Input({'role': 'icicle_plot_fig', 'index': ALL}, 'value'),
            Input('metric-slider', 'value'),
            Input('interval-component2', 'n_intervals')
        ])
    def update_pc(clickData, rangeData, n):
        global pc
        global clickDataOld
        global rangeDataOld
        global update_available

        trigger_context = dash.callback_context.triggered[0]['prop_id']
        if len(dash.callback_context.triggered) <= 1 and update_available == False and (trigger_context == 'interval-component2.n_intervals'):
            raise PreventUpdate
        
        # no update available, don't refresh
        # if not update_available:
        #     raise Exception("300")
        if len(clickData) == 0:
            return pc
            # revert to original state
        ut_pair_copy = ut_pair
        # delete entries
        ut_pair_copy = ut_pair_copy.query("accuracy >= " + str(rangeData[0]) + " and accuracy <= " + str(rangeData[1]))
            
        if isinstance(clickData, list):
            clickData = clickData[0]
        if clickData.split("/")[:-2] == []:
            pc = px.parallel_coordinates(ut_pair_copy.apply(make_ints, axis=1), color="accuracy", dimensions=hierarchy_path,
                                color_continuous_scale='RdBu', height=350)
            return pc
        if clickData:
            click_path = clickData.split("/")[:-1][1:]
            subset_counter = len(click_path)
            if click_path == []:
                return pc_o
            
            selected_df = ut_pair_copy
            j = -1
            for i in click_path:
                j+=1
                if "=" in i:
                    comps_name = i.split("=")
                    hyp_name = comps_name[0]
                    hyp_val = comps_name[1]
                    selected_df = selected_df[selected_df.apply(lambda x: x['model_params'][hyp_name] == hyp_val if hyp_name in x['model_params'] else False, axis=1)]
                else:
                    selected_df = selected_df[selected_df['model'] == i]
            sample_vals = selected_df.iloc[0]
            labels_pc = {}
            for i in hierarchy_path[subset_counter:]:
                if sample_vals[i]:
                    labels_pc[i] = sample_vals[i].split("=")[0]
            
            selected_df = selected_df.apply(make_ints, axis=1)
            pc = px.parallel_coordinates(selected_df, color="accuracy", dimensions=hierarchy_path[subset_counter:],
                                    labels=labels_pc, color_continuous_scale='RdBu', height=350)
            
            return pc
        pc = px.parallel_coordinates(ut_pair_copy.apply(make_ints, axis=1), color="accuracy", dimensions=hierarchy_path,
                                color_continuous_scale='RdBu', height=350)
        return pc

    return app

def update():
    global logs_path
    global update_available
    global display
    global port
    
    grab_autologs()
    create_hierarchy()
    format_icicle_data()
    update_available = True
    if display == False:
        app = init_app()
        display = True
        app.run_server(mode='inline', port=port)
    # print("updated")

def run_experiment(library, Model, model_name, params, X_train, X_test, y_train, y_test):
    if library == 'sklearn':
        with mlflow.start_run():
            model = Model(**params).fit(X_train, y_train)
            params['model_name'] = model_name
            mlflow.log_params(params)
            mlflow.log_metric('accuracy', model.score(X_test, y_test))
    elif library == 'xgboost':
        with mlflow.start_run():
            dtrain = xgb.DMatrix(X_train, label=y_train)
            dtest = xgb.DMatrix(X_test, label=y_test)
            model = xgb.train(params, dtrain, evals=[(dtrain, 'train')])
            y_proba = model.predict(dtest)
            y_pred = y_proba.argmax(axis=1)
            loss = log_loss(y_test, y_proba)
            acc = accuracy_score(y_test, y_pred)
            mlflow.log_metrics({'log_loss': loss, 'accuracy': acc})
            mlflow.log_param('model_name', model_name)
            # return acc

def normalize_row_keys(params, goal):
    for i in goal.keys():
        if i not in params.keys():
            params[i] = None
    return params

def normalize_hyp_keys(params):
    global ut_pair
    ut_pair.model_params = ut_pair.apply(lambda row: normalize_row_keys(row.model_params, params), axis=1)

# def add_experiment(model, params, metric):
#     global current_port
#     global ut_pair
#     # experiment = {'rid': ut_pair.rid.max() + 1, 'model': model, 'model_params': params, 'accuracy': metric}
#     # ut_pair = ut_pair.append(experiment,ignore_index=True)
#     # normalize_hyp_keys(params)
#     update()

def experiment(library, Model, params, X_train, X_test, y_train, y_test):
    global current_port
    global ut_pair
    model_name = ""
    if Model:
        model_name = Model.__name__
    else:
        model_name = library
    run_experiment(library, Model, model_name, params, X_train, X_test, y_train, y_test)
    update()
    
def viz(logs_p, port_in):
    global current_port
    global logs_path
    global display
    global port

    port = port_in

    warnings.filterwarnings("ignore")

    logs_path = logs_p
    mlflow.xgboost.autolog()
    if len(os.listdir(logs_path + "mlruns/0")) == 2 and 'meta.yaml' in os.listdir(logs_path + "mlruns/0") and '.DS_Store' in os.listdir(logs_path + "mlruns/0"):
        # empty autologs dir
        return
    # if ut_pair[0].count() > 0:
    update()
    app = init_app()
    display = True
    app.run_server(mode='inline', port=port)

# grab_autologs('/Users/dhruvm/Documents/GitHub/ml-viz/ml-viz/')
# create_hierarchy()
# format_icicle_data()