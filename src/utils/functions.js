// Si tienes una función que se repita mucho en el proyecto, mételas aqui.


export const filters_items = (values_input, all_items) => {
    console.log(all_items.filter(it => it.cp === 52740));
    let result 

    if(values_input.zone){
        console.log('zone');
        result = 
            all_items.filter(item => item.estado === values_input.zone.estado)
                .filter(item => item.ciudad === values_input.zone.ciudad)
                .filter(item => item.municipio === values_input.zone.municipio)
                .filter(item => item.asentamiento === values_input.zone.asentamiento)

    } else if(values_input.town){
        console.log('town');

        result = 
            all_items.filter(item => item.estado === values_input.town.estado)
                .filter(item => item.ciudad === values_input.town.ciudad)
                .filter(item => item.municipio === values_input.town.municipio)

    } else if(values_input.city){
        console.log('city');
        result = 
            all_items.filter(item => item.estado === values_input.city.estado)
                .filter(item => item.ciudad === values_input.city.ciudad)

    } else if(values_input.state){
        console.log('state');
        result = 
            all_items.filter(item => item.estado === values_input.state.estado)
    }

    return result
}

export const change_input_filters = (key_name, value, input_values) => {
    
    let result

    switch (key_name) {
        case 'estado':
            result = {
                state: value,
                city: null,
                town: null,
                zone: null
            }        
            break;

        case 'ciudad':
            result = {
                state: value ?? input_values.state,
                city: value,
                town: null,
                zone: null
            }        
            break;

        case 'municipio':
            result = {
                state: value ?? input_values.state,
                city: value ?? input_values.city,
                town: value,
                zone: null
            }        
            break;

        case 'asentamiento':
            result = {
                state: value ?? input_values.state,
                city: value ?? input_values.city,
                town: value ?? input_values.town,
                zone: value
            }        
            break;
    
        default:
            break;
    }

    return result
}