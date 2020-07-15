# AUTO GENERATED FILE - DO NOT EDIT

icicle <- function(id=NULL, label=NULL, value=NULL, data=NULL) {
    
    props <- list(id=id, label=label, value=value, data=data)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Icicle',
        namespace = 'icicle_plot',
        propNames = c('id', 'label', 'value', 'data'),
        package = 'iciclePlot'
        )

    structure(component, class = c('dash_component', 'list'))
}
