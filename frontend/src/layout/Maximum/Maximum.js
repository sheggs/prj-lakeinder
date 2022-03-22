import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles'
import { UserContext } from '../../contexts/UserContext'


import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

}));


const Maximum = props => {
    const { children } = props
    const classes = useStyles();
    const theme = useTheme();
    const { axios_net,section, setSection, accessToken, sideBar, setSideBar, sideBarBoolen, setSideBarBoolen, collasableSideBar, setCollapsableSidebar, selectedSideBar, setSelectedSideBar } = useContext(UserContext)


    return (
        <div className={classes.main} >
            <CssBaseline />
            <AppBar position="fixed" color="default" className={classes.topBar} >
                {/* <TopBar /> */}
            </AppBar>


            <main className={classes.content}>
                {/* <Toolbar /> */}
                {children}
            </main>

    

        </div>

    )
}


export default Maximum