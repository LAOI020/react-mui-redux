
import React, { useState } from 'react'
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { types } from '../store/types'


export default function SideBar(){

    const theme = useTheme()
  
    const navbarList = [
      {text: 'Ventas', icon: <svg width="2.5vh" height="2.5vh" viewBox="0 0 15 15" fill="none"><path d="M4.49833 12C3.67364 12 3.00638 12.675 3.00638 13.5C3.00638 14.325 3.67364 15 4.49833 15C5.32302 15 5.99777 14.325 5.99777 13.5C5.99777 12.675 5.32302 12 4.49833 12ZM0 0.749985C0 1.16248 0.337375 1.49998 0.749722 1.49998H1.49944L4.19844 7.19249L3.18632 9.02248C2.63902 10.0275 3.35875 11.25 4.49833 11.25H12.7453C13.1576 11.25 13.495 10.9125 13.495 10.5C13.495 10.0875 13.1576 9.74998 12.7453 9.74998H4.49833L5.32302 8.24998H10.9085C11.4707 8.24998 11.9656 7.94249 12.2205 7.47749L14.9045 2.60998C15.1819 2.11498 14.822 1.49998 14.2522 1.49998H3.15633L2.65401 0.427485C2.53406 0.164985 2.26416 -1.52588e-05 1.97927 -1.52588e-05H0.749722C0.337375 -1.52588e-05 0 0.337485 0 0.749985ZM11.9955 12C11.1709 12 10.5036 12.675 10.5036 13.5C10.5036 14.325 11.1709 15 11.9955 15C12.8202 15 13.495 14.325 13.495 13.5C13.495 12.675 12.8202 12 11.9955 12Z" fill="black"/></svg>},
    ]
    
    const [open, setOpen] = useState(false)
  
    return (
      <Drawer
        variant="permanent"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        open={open}
        sx={{
          width: open ? '15vw' : '4vw',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.leavingScreen
              : theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            justifyContent: 'space-between',
            overflowX: 'hidden',
            width: open ? '15vw' : '4vw',
            borderRight: '0px',
            borderRadius: '0px 16px 16px 0px',
            boxShadow: theme.shadows[8],
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            margin: '14px 14px',
            padding: '12px 0px',
          }}
        >
          <List dense={true}>
            {navbarList.map(item => (
              <ItemSideBar item={item}/>
            ))}
          </List>
        </Box>
      </Drawer>
    )
}


const ItemSideBar = ({item}) => {

  const dispatch = useDispatch()

  const click_item = () => {
    dispatch({
      type: types.show_sales,
      payload: true
    })
  }

  return (
      <ListItemButton
          onClick={click_item}
          sx={{
              margin: '6% 0',
              padding: '5%',
              borderRadius: '8px',
              '&:hover': {
                color: 'white',
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
          }}
          >
          <ListItemIcon sx={{minWidth: '30%'}}>
              {item.icon}
          </ListItemIcon>

          <ListItemText
              primary={item.text}
              primaryTypographyProps={{
              variant: 'body1',
              }}
              sx={{
                display: 'inline',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                minWidth: '12vw',
              }}
          />
      </ListItemButton>
    )
}