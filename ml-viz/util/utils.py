import pandas as pd
import plotly.express as px

df = pd.read_csv('openml_sklearn_workflows.csv')
# df.groupby(['user_id', 'task_id']).size().sort_values(ascending=False)

ut_pair = df[(df['user_id'] == 287) & (df['task_id'] == 9) ]

def clean_model_names(row):
    model_comps = row.split(",")
    for j in range(len(model_comps)):
        model_comps[j] = model_comps[j].split(".")[len(model_comps[j].split(".")) - 1]
    row = ", ".join(model_comps)
    return row.replace("\'", "").replace("}", "").replace("{", "")
    
def clean_model_params(row):
    comps = row.split("(")
    filtered = []
    for i in comps:
        if "null" not in i and len(i) > 4 and "random_state" not in i:
            clean = i.replace("\'", "").replace(")", "").replace("}", "")
            comps_clean = clean.split(",")
            comps_clean_filtered = []
            for j in comps_clean:
                if not (len(j) == 0 or j == " "):
                    comps_clean_filtered.append(j)
            filtered.append(','.join(comps_clean_filtered))
    return '; '.join(filtered)
#             if 'n_'
#     print(filtered)
    
def expand_change_types(row):
    diction = {'S': 'Starting iteration',
'M': 'Model operator change',
'P': 'Preprocessing operator change',
'H': 'Model Hyperparameter change',
'R': 'Preprocessing hyperparameter change',
'C': 'Combination of model and preprocessing changes',
'N': 'No change'}
    
    return diction[row]
    
ut_pair.model = ut_pair.model.apply(clean_model_names)
ut_pair.change_type = ut_pair.change_type.apply(expand_change_types)
ut_pair.model_params = ut_pair.model_params.apply(clean_model_params)

ut_pair = ut_pair.drop_duplicates(subset=['model', 'change_type', 'model_params'])
# sunburst hierarchy list
fig = px.sunburst(ut_pair, path=['model', 'change_type', 'model_params'], color='dist_from_mean_auc', color_continuous_scale='RdBu')
fig.show()

# without change type:
# ut_pair = ut_pair.drop_duplicates(subset=['model', 'change_type', 'model_params'])
# # sunburst hierarchy list
# fig = px.sunburst(ut_pair, path=['model', 'model_params'], color='dist_from_mean_auc', color_continuous_scale='RdBu')
# fig.show()