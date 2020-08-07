import os
import ast
import json
import copy
import warnings
import traceback
import shutil

import pandas as pd
import numpy as np

import icicle_plot
import plotly.express as px
import plotly.graph_objects as go
from jupyter_dash import JupyterDash
import dash
import dash_core_components as dcc
import dash_bootstrap_components as dbc
import dash_html_components as html
from dash.exceptions import PreventUpdate
from dash.dependencies import Input, Output, ALL, MATCH, State
from IPython.display import display, HTML

import sklearn
from sklearn.metrics import accuracy_score, log_loss
import xgboost as xgb
import mlflow
import mlflow.xgboost
import mlflow.sklearn

# libraries
from sklearn.neural_network import MLPClassifier

class DaVinciCode():

    app = 0
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
    pc = 0
    id_updater = 0
    recommendations = []

    X_test = 0
    X_train = 0
    y_test = 0
    y_train = 0

    def grab_autologs(self):

        dirs = os.listdir(self.logs_path + "mlruns/0")
        dictionary = []
        for i in dirs:
            row = {}
            if "meta" in i or "DS_Store" in i:
                continue
            
            if not os.path.isfile(self.logs_path + 'mlruns/0/' + i + '/metrics/accuracy'):
                continue
            accuracy = float(open(self.logs_path + 'mlruns/0/' + i + '/metrics/accuracy').read().split(" ")[1])
            row['accuracy'] = accuracy
            params_files = os.listdir(self.logs_path + 'mlruns/0/' + i + '/params')
            model_params = {}
            model_name = 0
            for j in params_files:
                if 'model_name' in j:
                    model_name = open(self.logs_path + 'mlruns/0/' + i + '/params/' + j).read()
                    continue
                # if 'kernel' in j:
                #     continue
                model_params[j] = open(self.logs_path + 'mlruns/0/' + i + '/params/' + j).read()

            highlighted_file = open(self.logs_path + 'mlruns/0/' + i + '/tags/highlighted').read()
            if "True" in highlighted_file:
                row['highlighted'] = True
            elif "False" in highlighted_file:
                row['highlighted'] = False
            
            row['model_params'] = model_params
            row['model'] = model_name
            dictionary.append(row)
            
        self.ut_pair = pd.DataFrame(dictionary)
        self.ut_pair.to_csv('ut_pair.csv')
        self.ut_pair = pd.read_csv('ut_pair.csv')
        self.ut_pair.model_params = self.ut_pair.model_params.apply(ast.literal_eval)
        self.ut_pair = self.ut_pair.rename(columns={'Unnamed: 0': 'rid'})

    def create_hierarchy(self):

        hyperparams_df = 0

        def sorting_criteria(s):
            return len(hyperparams_df[s].unique())

        # key is model, value is hyperparameters
        hp_key = {}
        
        for model_iter in self.ut_pair.model.unique():
            # get relevant recommendations to determine uniqueness of hyperparameter values
            relevant_recs = ['/'.join(rec[0] + [rec[1]]) for rec in self.recommendations if model_iter in rec[0]]
            hyperparams_df = pd.DataFrame(self.ut_pair[self.ut_pair.model == model_iter].model_params.to_list())
            hp_candidates = sorted(list(self.ut_pair[self.ut_pair.model == model_iter].model_params.to_list()[0].keys()), key=sorting_criteria)

            # filter out hyperparameters that have only 1 unique value across all experiments (for this model), and don't have any recommendations with
            # the same hyperparameters either
            hp_candidates = [i for i in hp_candidates if len(hyperparams_df[i].unique()) > 1 or any(i in rec for rec in relevant_recs)]
            hp_key[model_iter] = hp_candidates
            if len(hp_candidates) > self.max_len_candidates:
                self.max_len_candidates = len(hp_candidates)
                
        hyperparams_df = pd.DataFrame(self.ut_pair.model_params.to_list())
        hyperparams_df['rid'] = self.ut_pair['rid'].values

        current_index = 0
        def hp_viz_creator(row):
            # if this model has a hyperparameter for this order/level in the hierarchy
            if current_index < len(hp_key[row.model]):
                hp_value = str(hyperparams_df[hyperparams_df.rid == row.rid][hp_key[row.model][current_index]].tolist()[0])
                # if this is the leaf node and is highlighted, tag it
                if current_index == len(hp_key[row.model]) - 1 and row['highlighted'] == True:
                    return hp_key[row.model][current_index] + "=" + hp_value + " highlighted"
                return hp_key[row.model][current_index] + "=" + hp_value
            return None

        for i in range(self.max_len_candidates):
            current_index = i
            self.ut_pair[str(i) + "_order_hyp"] = self.ut_pair[['model', 'rid', 'highlighted']].apply(hp_viz_creator,axis=1)


    def format_icicle_data(self):
        self.hierarchy_path = ['model'] + [str(i) + '_order_hyp' for i in range(self.max_len_candidates)]
        self.ut_p = self.ut_pair[self.hierarchy_path + ['accuracy']]
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
        self.ut_p = recur_dictify(self.ut_p)

        # now remove the highlighted tags from the pandas dataframe (so it doesn't mess up the parallel coordinates plot)
        self.ut_pair = self.ut_pair.replace(" highlighted", "", regex=True)
        # print(self.ut_pair)
        self.low_color = 2.0
        self.high_color = -1.0
        def recur_hierarch(frame):
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
                    if color < self.low_color:
                        self.low_color = color
                    if color > self.high_color:
                        self.high_color = color
                    child = {'name': key.replace(" highlighted", ""), 'color': color, 'size': 1}
                    if " highlighted" in key:
                        child['border'] = "grey"
                        child['borderWidth'] = "0.35%"
                    children.append(child)
            return children, max(colors)

        children_ut_p, color = recur_hierarch(self.ut_p)
        self.ut_p = {'name': 'main', 'color': color, 'children': children_ut_p}

    def attach_subtree(self, path, current):
        if path == []:
            return 0
        searcher = path.pop()
        subtree = {'name': searcher, 'color': 'grey'}
        recurs = self.attach_subtree(path, subtree)
        if recurs == 0:
            subtree['size'] = 1
        else:
            subtree['children'] = [recurs]
        
        if 'children' not in current:
            current['children'] = []
        current['children'].append(subtree)
        # print(subtree)
        return subtree
        

    ## Tree Functions
    def grab_node(self, path, dictionary):
        if path == ['main']:
            return dictionary
        current = dictionary
        stack = copy.deepcopy(path)
        stack.reverse()
        stack.pop()
        while(len(stack) > 0):
            searcher = stack.pop()
            found = False
            if 'children' in current:
                for i in current['children']:
                    if i['name'] == searcher:
                        current = i
                        found = True
                        break
            if not found:
                # print(stack + [searcher])
                # print(current)
                # print()
                self.attach_subtree(stack + [searcher], current)
                return self.grab_node(path, dictionary)
        return current

    def count_leaves(dictionary):
        if 'children' not in dictionary:
            return 1
        counter = 0
        for i in range(len(dictionary['children'])):
            counter += count_leaves(dictionary['children'][i])
        return counter

    def remove_nodes_out_of_range(self, low_r, high_r, dictionary):
        if 'children' not in dictionary:
            if isinstance(dictionary['color'], str):
                return False
            if float(dictionary['color']) < low_r or float(dictionary['color']) > high_r:
                return True
            return False
        
        to_delete = []
        for i in range(len(dictionary['children'])):
            if self.remove_nodes_out_of_range(low_r, high_r, dictionary['children'][i]):
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

    def is_number(s):
        try:
            complex(s) # for int, long, float and complex
        except ValueError:
            return False

        return True

    def add_rec(self, path, value, dictionary):
        node = {'name': value, 'color': 'grey', 'size': 2}
        if path == ['main']:
            dictionary['children'].append(node)
            return
        current = self.grab_node(path, dictionary)
        current.pop('size', None)
        if 'children' not in current:
            current['children'] = []
        current['children'].append(node)

    def highlight_rec(self, row):
        node = grab_node()
        return row

    def highlight_executed_recs(self, dictionary):
        ut_pair[ut_pair['highlighted'] == True].apply(lambda row: self.grab_node(dictionary), axis=1)

    def execute_code(self, n_clicks, code):
        exec(code.replace("app.", "self."))

    def init_app(self):

        app = JupyterDash(__name__)
        # app = dash.Dash()
        app.css.config.serve_locally = True
        app.scripts.config.serve_locally = True

        # self.add_rec(['main', 'MLPClassifier'], 'alpha=0.1', self.ut_p)
        # self.add_rec(['main', 'MLPClassifier'], 'alpha=0.01', self.ut_p)

        def df_to_dict(ut):
            data = {}
            for col_name in self.hierarchy_path:
                for i, g in ut.groupby(col_name):
                    data_key = g[col_name].iloc[0]
                    data[data_key] = {}

        data = copy.deepcopy(self.ut_p)

        icicle_plot_fig = icicle_plot.Icicle(
            id='icicle_plot_fig',
            value='main/',
            label='my-label',
            low=self.low_color,
            high=self.high_color,
            data=data
        )

        def make_ints(row):
            for col in self.hierarchy_path:
                if row[col] != None:
                    try:
                        row[col] = float(row[col].split("=")[1])
                    except:
                        row[col]
            return row

        ut_pair_numeric = self.ut_pair.apply(make_ints, axis=1)

        pc = go.Figure(data=[go.Scatter(x=[], y=[])])
        pc_o = pc

        marks = {}
        for i in range(0, 100, 5):
            marks[i/100] = str(i/100)

        button_style = {
            "background-color": "#008CBA", 
            "border": "none", 
            "color": "white", 
            "padding": "15px 32px", 
            "text-align": "center", 
            "display": "inline-block", 
            "font-size": 16, 
            "margin": "4px 2px", 
            "cursor": "pointer",
            "width": "18%"
            }

        app.layout = html.Div([
            html.Div([
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
            ], style={'width': '78%', 'height': '500px', 'float':'left'}),
            html.Div([
                    html.H3('Sand Box', id='sandboxtext'),
                    dcc.Textarea(
                        id='sandbox',
                        value='',
                        style={'height': 400}
                    ),
                    dcc.Loading(
                        id="loading",
                        children=html.Div([
                            html.Button('Execute', id='execute-button', style=button_style),
                            html.Div(id='output')
                        ]),
                        type="cube",
                        fullscreen=True
                    )
                ], style={'margin-left': '5%'})
        ])

        @app.callback(
            Output('icicle-wrap', 'children'),
            [Input('metric-slider', 'value'),
            Input('interval-component', 'n_intervals')])
        def update_icicle(rangeData, n):
            trigger_context = dash.callback_context.triggered[0]['prop_id']
            if len(dash.callback_context.triggered) <= 1 and self.update_available == False and (trigger_context == 'interval-component.n_intervals' or trigger_context == '.'):
                raise PreventUpdate
            
            # revert to original state
            data = copy.deepcopy(self.ut_p)
            # print(data)
            if not self.ut_pair.empty:
                # delete entries
                self.remove_nodes_out_of_range(rangeData[0], rangeData[1], data)
                filtered_accs = self.ut_pair.query("accuracy >= " + str(rangeData[0]) + " and accuracy <= " + str(rangeData[1]))['accuracy']
                self.low_color = filtered_accs.min()
                self.high_color = filtered_accs.max()
                if rangeData != self.rangeDataOld:
                    self.id_updater+=1
                    self.rangeDataOld = rangeData

            if self.update_available:
                # print("update vailable")
                self.id_updater+=1
                self.update_available = False

            # id is dictionary for Dash pattern matching callbacks
            return icicle_plot.Icicle(
                id={'role': 'icicle_plot_fig', 'index': self.id_updater},
                value='main/',
                label='my-label',
                low=self.low_color,
                high=self.high_color,
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
            if self.ut_pair.empty:
                return go.Figure(data=[go.Scatter(x=[], y=[])])
            trigger_context = dash.callback_context.triggered[0]['prop_id']
            if len(dash.callback_context.triggered) <= 1 and self.update_available == False and (trigger_context == 'interval-component2.n_intervals'):
                raise PreventUpdate
            
            ut_pair_copy = self.ut_pair

            if len(clickData) == 0:
                if self.update_available:
                    pc = px.parallel_coordinates(ut_pair_copy.apply(make_ints, axis=1), color="accuracy", dimensions=self.hierarchy_path,
                                    color_continuous_scale='RdBu', height=350)
                    return pc
                raise PreventUpdate
                # return self.pc
                # revert to original state
            # delete entries
            ut_pair_copy = ut_pair_copy.query("accuracy >= " + str(rangeData[0]) + " and accuracy <= " + str(rangeData[1]))
                
            if isinstance(clickData, list):
                clickData = clickData[0]

            if 'recommendationval' in clickData:
                raise PreventUpdate

            if clickData.split("/")[:-2] == []:
                pc = px.parallel_coordinates(ut_pair_copy.apply(make_ints, axis=1), color="accuracy", dimensions=self.hierarchy_path,
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
                for i in self.hierarchy_path[subset_counter:]:
                    if sample_vals[i]:
                        labels_pc[i] = sample_vals[i].split("=")[0]
                
                selected_df = selected_df.apply(make_ints, axis=1)
                self.pc = px.parallel_coordinates(selected_df, color="accuracy", dimensions=self.hierarchy_path[subset_counter:],
                                        labels=labels_pc, color_continuous_scale='RdBu', height=350)
                # print(ut_pair_copy.apply(make_ints, axis=1))
                return self.pc
            self.pc = px.parallel_coordinates(ut_pair_copy.apply(make_ints, axis=1), color="accuracy", dimensions=self.hierarchy_path,
                                    color_continuous_scale='RdBu', height=350)
            return self.pc
        
        @app.callback(
            Output('sandbox', 'value'),
            [Input({'role': 'icicle_plot_fig', 'index': ALL}, 'value')])
        def update_sandbox(clickData):
            if len(clickData) == 0:
                raise PreventUpdate

            if isinstance(clickData, list):
                clickData = clickData[0]
            if 'recommendationval' in clickData:
                # update the sand box
                clickData = clickData.replace(" recommendationval", "")
                model_name = ""
                params_rec = {}
                for i in clickData.split("/"):
                    if 'main' in i or not i or not i.strip():
                        continue

                    # model name
                    if '=' not in i:
                        model_name = i
                        continue
                    
                    try:
                        params_rec[i.split("=")[0]] = float(i.split("=")[1]) # for int, long, float and complex
                    except ValueError:
                        params_rec[i.split("=")[0]] = i.split("=")[1]

                    if params_rec[i.split("=")[0]].is_integer():
                        params_rec[i.split("=")[0]] = int(params_rec[i.split("=")[0]])
                code = "app.experiment(library = 'sklearn', model = " + model_name + ", params = " + str(params_rec) + ", highlighted = True)"
                return code
            else:
                raise PreventUpdate

        # execute button handler
        app.callback(Output('output', 'value'),
            [Input('execute-button', 'n_clicks')],
            [State('sandbox', 'value')])(self.execute_code)

        self.app = app

    def update(self):
        self.grab_autologs()
        self.create_hierarchy()
        self.format_icicle_data()

        ## Remove Executed Recommendations
        hyperparameters = self.ut_pair.drop(['rid', 'accuracy', 'model_params', 'highlighted'], axis=1).values.tolist()
        for rec in self.recommendations:
            recommendation_path = (rec[0] + [rec[1]])[1:] # remove the 'main' element at the beginning of the list
            ## inefficient
            if any(all(item in recommendation_path for item in ut_list if item is not None) for ut_list in hyperparameters):
                continue
            rec[2] = self.ut_p
            self.add_rec(*tuple(rec))
        self.update_available = True
        if self.display == False:
            self.init_app()
            self.display = True
            self.app.run_server(mode='inline', port=self.port, width=1000)
        # print("updated")

    def run_experiment(self, library, Model, params, highlighted=False):
        model_name = ""
        if Model:
            model_name = Model.__name__
        else:
            model_name = library
        
        with mlflow.start_run():
            mlflow.set_tag("highlighted", highlighted)
            if library == 'sklearn':
                    model = Model(**params).fit(self.X_train, self.y_train)
                    params['model_name'] = model_name
                    mlflow.log_params(params)
                    mlflow.log_metric('accuracy', model.score(self.X_test, self.y_test))
            elif library == 'xgboost':
                    dtrain = xgb.DMatrix(self.X_train, label=self.y_train)
                    dtest = xgb.DMatrix(self.X_test, label=self.y_test)
                    model = xgb.train(params, dtrain, evals=[(dtrain, 'train')])
                    y_proba = model.predict(dtest)
                    y_pred = y_proba.argmax(axis=1)
                    loss = log_loss(self.y_test, y_proba)
                    acc = accuracy_score(self.y_test, y_pred)
                    mlflow.log_metrics({'log_loss': loss, 'accuracy': acc})
                    mlflow.log_param('model_name', model_name)
                    # return acc

    def normalize_row_keys(params, goal):
        for i in goal.keys():
            if i not in params.keys():
                params[i] = None
        return params

    def normalize_hyp_keys(params):
        self.ut_pair.model_params = self.ut_pair.apply(lambda row: self.normalize_row_keys(row.model_params, params), axis=1)

    # def add_experiment(model, params, metric):
    #     global current_port
    #     global ut_pair
    #     # experiment = {'rid': ut_pair.rid.max() + 1, 'model': model, 'model_params': params, 'accuracy': metric}
    #     # ut_pair = ut_pair.append(experiment,ignore_index=True)
    #     # normalize_hyp_keys(params)
    #     update()

    def experiment(self, library, model, params, highlighted=False):
        self.run_experiment(library, model, params, highlighted)
        self.update()

    def reset(self):
        if os.path.isdir(self.logs_path + "mlruns"):
            shutil.rmtree(self.logs_path + "mlruns")
        # self.recommendations = []
        self.ut_pair = pd.DataFrame()
        self.ut_p = {"name": "main", "color": "grey", "children": []}
        for rec in self.recommendations:
            rec[2] = self.ut_p
            self.add_rec(*tuple(rec))
        self.update_available = True
        if self.display == False:
            self.init_app()
            self.display = True
            self.app.run_server(mode='inline', port=self.port, width=1000)

    def __init__(self, port, X_test=None, X_train=None, y_train=None, y_test=None):

        self.port = port

        warnings.filterwarnings("ignore")

        path = traceback.extract_stack()[-2][0]
        self.logs_path = '/'.join(traceback.extract_stack()[-2][0].split("/")[:len(path.split('/'))-1])

        mlflow.xgboost.autolog()

        self.X_train = X_train
        self.X_test = X_test
        self.y_train = y_train
        self.y_test = y_test

        self.recommendations.append([['main', 'MLPClassifier', 'max_iter=300'], 'alpha=0.1', self.ut_p])
        self.recommendations.append([['main', 'MLPClassifier', 'max_iter=400'], 'alpha=0.01', self.ut_p])

        if not os.path.isdir(self.logs_path + "mlruns"):
            if self.recommendations:
                self.reset()
            return

        if len(os.listdir(self.logs_path + "mlruns/0")) == 2 and 'meta.yaml' in os.listdir(self.logs_path + "mlruns/0"):
            if self.recommendations:
                self.reset()
            # empty autologs dir
            return
        # if ut_pair[0].count() > 0:
        self.update()
# grab_autologs('/Users/dhruvm/Documents/GitHub/ml-viz/ml-viz/')
# create_hierarchy()
# format_icicle_data()