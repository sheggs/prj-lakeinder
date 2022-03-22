import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    main: {
        paddingRight: 20,
        marginTop: 10,
    },
    VerticalBar: {
        width: 5,
        height: 40
    },
    VerticalBarContainer:{
        padding: 10,
    },
    Content:{
        // paddingRight: 10,
        // paddingLeft: 10
    }
    
}));


export default function RPServiceWorkerIndex(props) {
    /**
     * 0 = Loading
     * 1 = Nothing
     * 2 = Data
     */
    const classes = useStyles()
    const color = props.color


    return (
        <Paper className={classes.main}>
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={4}
                >  
                    <Grid className={classes.VerticalBarContainer} item>
                        <div className={classes.VerticalBar} style={{ backgroundColor: props.color }}></div>
                    </Grid>

                    <Grid item>
                        <WarningIcon  style={{ color: props.color }} />
                    </Grid>
                    <Grid item className = {classes.Content}>
                        {props.message}
                    </Grid>
                </Grid>
                
                
        </Paper>
    )
}

