
import React, { useState } from 'react'
import { Autocomplete, Box, Button, Drawer, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';

import { types } from '../store/types';
import { change_input_filters, filters_items } from '../utils/functions';


export default function Sales(){

    const {
        show_sales_screen,
        show_filter_sales,

    } = useSelector(state => state.app_reducer)

    const theme = useTheme()

    return (
        <Drawer
            open={show_sales_screen}
            sx={{
                width: show_sales_screen ? '80vw' : '4vw',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: show_sales_screen
                    ? theme.transitions.duration.leavingScreen
                    : theme.transitions.duration.enteringScreen,
                }),
                '& .MuiDrawer-paper': {
                    overflowX: 'hidden',
                    width: show_sales_screen ? '80vw' : '4vw',
                    boxShadow: theme.shadows[8],
                    transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: show_sales_screen
                        ? theme.transitions.duration.leavingScreen
                        : theme.transitions.duration.enteringScreen,
                    }),
                },
            }}
        >
            <Header/>

            <Box
                width='80%'
                bgcolor='#F8F9FE'
            >
                <HeaderFilter/>

                {show_filter_sales &&
                    <InputsFilter/>
                }

                {show_filter_sales ?
                    <TableFilters/>
                    :
                    <TableItems/>             
                }
            </Box>
        </Drawer>
    )
}


const Header = () => {

    const dispatch = useDispatch()

    const close_sales_screen = () => {
        dispatch({
            type: types.show_sales,
            payload: false
        })
    }

    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding='2%'
            borderBottom='1px solid rgba(0, 0, 0, 0.09)'
            sx={{
                backgroundColor: (theme) => theme.palette.primary.main
            }}
        >
            <Typography variant='h5' color='white'>
                Venta de Mostrador
            </Typography>

            <IconButton onClick={close_sales_screen}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M1.25363 0.000542617C1.00542 0.000607822 0.762857 0.0747167 0.556968 0.213395C0.351079 0.352073 0.191215 0.549019 0.0978126 0.779054C0.00441047 1.00909 -0.018285 1.26176 0.0326278 1.50476C0.0835406 1.74777 0.205748 1.97006 0.383627 2.14323L8.23562 9.99732L0.383627 17.8514C0.263877 17.9664 0.168271 18.1042 0.102409 18.2566C0.0365475 18.409 0.00175348 18.5731 6.45848e-05 18.7391C-0.00162432 18.9051 0.0298261 19.0699 0.0925739 19.2236C0.155322 19.3773 0.248106 19.517 0.365491 19.6344C0.482877 19.7518 0.622505 19.8446 0.776198 19.9074C0.929891 19.9702 1.09456 20.0016 1.26056 19.9999C1.42656 19.9982 1.59055 19.9634 1.74294 19.8976C1.89532 19.8317 2.03304 19.736 2.14801 19.6163L10 11.7622L17.852 19.6163C17.967 19.736 18.1047 19.8317 18.2571 19.8976C18.4094 19.9634 18.5734 19.9982 18.7394 19.9999C18.9054 20.0016 19.0701 19.9702 19.2238 19.9074C19.3775 19.8446 19.5171 19.7518 19.6345 19.6344C19.7519 19.517 19.8447 19.3773 19.9074 19.2236C19.9702 19.0699 20.0016 18.9051 19.9999 18.7391C19.9982 18.5731 19.9634 18.409 19.8976 18.2566C19.8317 18.1042 19.7361 17.9664 19.6164 17.8514L11.7644 9.99732L19.6164 2.14323C19.7967 1.96792 19.9198 1.74222 19.9697 1.4957C20.0195 1.24918 19.9938 0.993348 19.8958 0.761723C19.7978 0.530098 19.6321 0.33349 19.4205 0.197663C19.2089 0.0618367 18.9611 -0.00687139 18.7098 0.000542617C18.3856 0.0102041 18.078 0.145719 17.852 0.378377L10 8.23247L2.14801 0.378377C2.03173 0.258819 1.89268 0.163784 1.73906 0.0988887C1.58545 0.0339929 1.42039 0.00055234 1.25363 0.000542617Z" fill="black"/>
                </svg>
            </IconButton>
        </Stack>
    )
}


const HeaderFilter = () => {

    const dispatch = useDispatch()

    const {
        show_filter_sales,
        values_input_filter,
        all_items,
    
    } = useSelector(state => state.app_reducer)

    const filter_click = () => {
        dispatch({
            type: types.show_filter_sales,
        })
    }

    const click_search = () => {

        if(!values_input_filter.state){
            return
        }

        const items_results = filters_items(
            values_input_filter, 
            all_items
        )

        dispatch({
            type: types.set_filters_items,
            payload: items_results
        })
    }

    return (
        <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            padding='2%'
        >
            {show_filter_sales &&
                <>
                <Typography variant='body1' fontWeight={600}>
                    Filtros de Ubicación
                </Typography>

                <Button 
                    onClick={click_search}
                    variant='contained'
                    color='secondary'
                    sx={{
                        fontWeight: 600,
                        width: '20%',
                        '&:hover': {
                            color: 'white'
                        }
                    }}
                >
                    Buscar
                </Button>
                </>
            }

            <IconButton 
                sx={{marginLeft: show_filter_sales ? '' : 'auto'}}
                onClick={filter_click}
            >
                {show_filter_sales ?
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M0 0H25V25H0V0Z" fill="url(#pattern0)"/>
                        <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_3_53" transform="scale(0.0208333)"/>
                        </pattern>
                        <image id="image0_3_53" width="48" height="48" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAAB6klEQVRo3u2Zu0oDQRSGP++V2AoiWFr4AMFGsFEQFKLxEo2+gzb6Ftpoa5fGxlcQEXwBC0sTQQQbsUrWxGIzEPcy2d2cmYm4P2w3ZL4vM2fnTAJ58uTJM2hZBWpA2/JTA1YkBOoO4NXzkhZ22MQSuk4FdytQkZK4cgB/KbkKY8C9RfhHYEJSAGAWeLcA/wHMScOrLAOeQfhvhF6dupwZFDg1DQ8wBNwYgL/tfLaVTAJPgvDPwJQteJV54FMA/gtYsA2vsisgcOgKXuWiD/hz1/DgH3J3GeAfgHHX8CrTwGsK+DdgxjV0MItAIwF8E1hyDRuXkwQCxyYBJA6StoU5YvPnLzS5gMD8hRTjCyaYexWxDv4av10/SDBPCf+NVgVGXQsoeDWml8R2B16NF5XIIlAIACmJcsTYMuFLVZN0W09cAGCT8EHo8bvZ24kR3ZeC70dAJ3GE3/lGwSepF2sCAFsxEh7JtphzAYAi+r7KQ/BHr2BaAgI6CS28xKFQN/XN2Mo64WJLuwJRxWy8eLsTPGj6LeIG0YVtpIh1Eq2M8EWia8ID9mxK6OqjRFi4gb+dVKK2VhP/gDOWDfy/i+rAWsyYqFYiCN9LQqyVyJKoZk63NYISVWDEpUC3RNLiVBIDAd8t4fxCk+df5weMp0nrGiRWTQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wNC0yMVQxODo0NDoyNyswMDowMEhMe9YAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDQtMjFUMTg6NDQ6MjcrMDA6MDA5EcNqAAAAAElFTkSuQmCC"/>
                        </defs>
                    </svg>
                    :
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <rect width="25" height="25" fill="url(#pattern0)"/>
                        <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_3_579" transform="scale(0.0208333)"/>
                        </pattern>
                        <image id="image0_3_579" width="48" height="48" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAABOElEQVRo3u2ZMUoDQRRAn4KmElshCJYpcgIbwcaAoI0Em+QQ2ugtYpNcIk2uICGQC1hYJiuIkEZSRWMsNtOoa6L5838W/oNpd95j2J0ZFhzHcdadCjAEZspjCJxIBCQG8mEMFsltaiyhNTXsVqAmFdEykG9KrsIW0FWU7wMFyQCAfeBFQX4EHEjLB46B94jyU4Q+nb9xGzHgJrY8wAbQjiDfmT9bhR3gQVD+EdjVkg+UgFcB+TFQ1pYPXAoE1K3kA3cryDes5SHd5O7/Id8Dtq3lA3vA0x/kn4GitfRXDoHJEvJvwJG1bBbXSwRcSU4YY+OYac6Z+wuNB1jjAdZ4gDUeYI0H/MCio8TaBySaATE4Iz0yZ51Gc8EF2XeD3FDl+0p8WEutGpHL9+Oc9HdRApxayziO48jyCdyignIyOeGKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA0LTIyVDAyOjU4OjI5KzAwOjAwTVkMZwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wNC0yMlQwMjo1ODoyOSswMDowMDwEtNsAAAAASUVORK5CYII="/>
                        </defs>
                    </svg>
                }

            </IconButton>
        </Stack>
    )
}


const InputsFilter = () => {

    const dispatch = useDispatch()

    const {
        states, 
        citys, 
        towns, 
        zones
    
    } = useSelector(state => state.app_reducer)

    const [values_input, setValues_input] = useState({
        state: null,
        city: null,
        town: null,
        zone: null
    });

    const change_input = (key_name, value) => {
        
        const result = 
            change_input_filters(key_name, value, values_input)
        
        dispatch({
            type: types.change_values_input_filter,
            payload: result
        })

        setValues_input(result)
    }

    const Input = ({value, key_name, label, options, on_change}) => (
        <Autocomplete
            value={value} 
            isOptionEqualToValue={(option) => option[key_name] === value[key_name]}
            blurOnSelect
            fullWidth
            getOptionLabel={(option) => option[key_name]}
            options={options}
            onChange={(_event, newValue) => on_change(key_name, newValue)}
            renderInput={(params) => 
                <TextField {...params} label={label}/>
            }
        />
    )

    return (
        <Stack 
            direction='row'
            justifyContent='space-between'
            gap='2%'
            padding='2%'
        >
            <Input
                value={values_input.state}
                key_name='estado'
                label='Estado'
                options={states}
                on_change={change_input}
            />
            <Input
                value={values_input.city}
                key_name='ciudad'
                label='Ciudad'
                options={values_input.state ? 
                    citys.filter(item => item.estado === values_input.state.estado)
                    :
                    citys
                }
                on_change={change_input}
            />
            <Input
                value={values_input.town}
                key_name='municipio'
                label='Municipio'
                options={values_input.city ? 
                    towns.filter(item => item.ciudad === values_input.city.ciudad)
                    :
                    towns
                }
                on_change={change_input}
            />
            <Input
                value={values_input.zone}
                key_name='asentamiento'
                label='Asentamiento'
                options={values_input.town ? 
                    zones.filter(item => item.municipio === values_input.town.municipio)
                    :
                    zones
                }
                on_change={change_input}
            />
        </Stack>
    )
}


const TableItems = () => {

    const {all_items} = useSelector(state => state.app_reducer)

    const [page, setPage] = useState(0)

    const rowsPerPage = 5

    const change_page = (e, new_page) => {
        setPage(new_page)    
    }

    return (
        <>
        <TableContainer sx={{marginTop: '3%'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={{fontWeight: 900}}>
                            Estado
                        </TableCell>

                        <TableCell align='center' sx={{fontWeight: 900}}>
                            Ciudad
                        </TableCell>

                        <TableCell align='center' sx={{fontWeight: 900}}>
                            Municipio
                        </TableCell>

                        <TableCell align='center' sx={{fontWeight: 900}}>
                            Asentamiento
                        </TableCell>

                        <TableCell align='center' sx={{fontWeight: 900}}>
                            C.P
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {all_items
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(item => (
                            <TableRow>
                                <TableCell align='center'>
                                    {item.estado}
                                </TableCell>

                                <TableCell align='center'>
                                    {item.ciudad}
                                </TableCell>

                                <TableCell align='center'>
                                    {item.municipio}
                                </TableCell>

                                <TableCell align='center'>
                                    {item.asentamiento}
                                </TableCell>

                                <TableCell align='center'>
                                    {item.cp}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer> 

        <TablePagination 
            sx={{
               display: 'flex',
               justifyContent: 'flex-end'
            }}
            rowsPerPageOptions={[10]}
            count={all_items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={change_page}
        />
        </>
    )
}


const TableFilters = () => {
    
    const {items_filter} = useSelector(state => state.app_reducer)
    
    return (
        <Box margin='3% 2%'>
            {[...new Map(items_filter.map(item => [item.cp, item])).values()]
                .map(item => (
                    <Typography variant='body1' fontWeight={600} margin='1% 0'>
                        {`Codigo Postal : ${item.cp}`}
                    </Typography>
                ))
            }
        </Box>
    )
}