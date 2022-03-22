import React from 'react'
import {makeStyles} from '@material-ui/styles'
import TopBar from './components/TopBar'

const useStyles = makeStyles(() => ({
    // root:{
    //     width:'100vw',
    //     height:'100vh',
    //     backgroundImage: `url(/2.jpg)`,
    //     backgroundPosition: 'center',
    //     backgroundSize:'cover',
    //     backgroundRepeat: 'no-repeat'
    //   },
}))

const Minimal = props =>{
    const {children} = props
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <TopBar />
            <main className={classes.content}>
                {children}
            </main>
        </div>
    )
}


export default Minimal