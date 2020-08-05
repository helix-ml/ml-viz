## Example Usage
import icicle_plot
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)

data = {
      'name': 'main',
      'color': 'magenta',
      'children': [{
        'name': 'a',
        'color': 'green',
        'size': 1
      },{
        'name': 'b',
        'color': 'red',
        'border': 'grey',
        'borderWidth': '1%',
        'children': [{
          'name': 'ba',
          'color': 0.8,
          'border': 'magenta',
          'size': 1
        }, {
          'name': 'bb',
          'color': 0.9,
          'border': 'magenta',
          'children': [{
            'name': 'bba',
            'color': 0.85,
            'border': 'magenta',
            'size': 1
          }, {
            'name': 'bbb',
            'color': 0.7,
            'border': 'magenta',
            'size': 1
          }]
        }]
      }]
    }

app.layout = html.Div([
    icicle_plot.Icicle(
        id='icicle',
        value='main/',
        label='my-label',
        high=0.9,
        low=0.7,
        data=data
    ),
    html.Div(id='output')
])


@app.callback(Output('output', 'children'), [Input('icicle', 'value')])
def display_output(value):
    print(value)
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
