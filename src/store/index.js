//En este archivo necesito la configuración de redux, meterás los reducers, los combinas y exportas la store

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { data_base } from '../api'
import { types } from './types'


const initial_state = {
    all_items: data_base,
    items_filter: [],
    states: [...new Map(data_base.map(item => [item.estado, item])).values()],
    citys: [...new Map(data_base.map(item => [item.ciudad, item])).values()],
    towns: [...new Map(data_base.map(item => [item.municipio, item])).values()],
    zones: [...new Map(data_base.map(item => [item.asentamiento, item])).values()],
    values_input_filter: {},
    show_sales_screen: false,
    show_filter_sales: false
}

const app_reducer = (state = initial_state, action) => {
    switch (action.type) {
        
        case types.show_sales: {
            return {
                ...state,
                show_sales_screen: action.payload
            }
        }

        case types.show_filter_sales: {
            return {
                ...state,
                show_filter_sales: !state.show_filter_sales
            }
        }

        case types.change_values_input_filter: {
            return {
                ...state,
                values_input_filter: action.payload
            }
        }

        case types.set_filters_items: {
            return {
                ...state,
                items_filter: action.payload
            }
        }

        default:
            return state
    }
}



const reducer = combineReducers({
    app_reducer
})

export const store = configureStore({
    reducer: reducer
})