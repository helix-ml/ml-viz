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
        'color': 'yellow',
        'size': 1
      },{
        'name': 'b',
        'color': 'red',
        'children': [{
          'name': 'ba',
          'color': 'orange',
          'size': 1
        }, {
          'name': 'bb',
          'color': 'blue',
          'children': [{
            'name': 'bba',
            'color': 'green',
            'size': 1
          }, {
            'name': 'bbb',
            'color': 'pink',
            'size': 1
          }]
        }]
      }]
    }

app.layout = html.Div([
    icicle_plot.Icicle(
        id='icicle',
        value='my-value',
        label='my-label',
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
