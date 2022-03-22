import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import extras from '../../extras/styles'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import HashLoader from "react-spinners/HashLoader";
import { IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


const useStyle = makeStyles({
    main:{
        height: '100vh', /* Magic here */
        textAlign:'center'

    },
    root:{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    media:{
        height: 200
    },
    logo:{
        height: 200
    }
})
export default function Loading(props) {

    
    const classes = useStyle()
    const [loadingmsg, setLoadingMsg] = React.useState("Loading please wait..")
    const [connection, setNoConnection] = React.useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingMsg("")
            setNoConnection(true)
        }, 1000)
        return () => clearTimeout(timer)
    },[]
    )
    return (
    <div className={classes.main}>
            {connection == true && <React.Fragment>
            <Alert
                severity = "error"
            >No Connection.</Alert>
            
        </React.Fragment>}
        <div className={classes.root}>
            <IconButton edge="start"  color="red" aria-label="menu">
                <img className={classes.logo} src="/logo.png" alt="image" />   
                <HashLoader color={extras.primaryColor} />      
            </IconButton><br/>


        </div>
        <h1>{loadingmsg}</h1>  
    
    </div>

    )
}