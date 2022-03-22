import React from 'react'
import {makeStyles, useTheme} from '@material-ui/styles'
import { Grid } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    content:{
        // paddingLeft: 'calc(100% - 240px)',
        width: "100%",
    }
}));

const NoLayout = props =>{
    const {children} = props
    const classes = useStyles();
    const theme = useTheme();

    return(

                            <main className={classes.content}>
                                {children}
                            </main>

    )
}


export default NoLayout