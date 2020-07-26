# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DataConverter(Component):
    """A DataConverter component.


Keyword arguments:
- data (required)
- height (number; required)
- width (number; required)"""
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, height=Component.REQUIRED, width=Component.REQUIRED, onChange=Component.UNDEFINED, **kwargs):
        self._prop_names = ['data', 'height', 'width']
        self._type = 'DataConverter'
        self._namespace = 'icicle_plot'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['data', 'height', 'width']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['data', 'height', 'width']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(DataConverter, self).__init__(**args)
