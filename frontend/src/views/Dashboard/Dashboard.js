import React, { useContext, useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import DefaultStyle from '../../extras/styles'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { UserContext } from '../../contexts/UserContext'
import { useForm } from 'react-hook-form'
import Container from '@material-ui/core/Container';
import Cards from '../sharedComponents/Cards';
import Loading from '../Loading';
import { AppBar, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Divider, ThemeProvider } from '@material-ui/core';
//import axios_net from '../../extras/axios_net'

const useStyles = makeStyles((theme) => ({
  main:{
    // marginLeft: 240,
    // marginTop: 24,
    // maxWidth: 'calc(100% - 240px)'
    // maxWidth: 'calc(100% - 240px)'
  },
  intCard: {
    paddingTop: 30,
    paddingBottom: 30 
  }
}));

export default function Dashboard(props) {
  const classes = useStyles()
  const {axios_net, setAccessToken, accessToken, setSection } = useContext(UserContext)
  const [frontPageURIs, setFrontPageURIs] = useState([{}]);
  const [loading, setLoading] = useState(0);
  setSection("Dashboard")
  return (
    <React.Fragment>
      <Paper className={classes.paperMain} elevation={0}>  
      <h1>Dashboard..</h1>
      {/* <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing = {10}
      >
        {frontPageURIs.map((v,k) => (
          <Grid item>
            <Cards
              title = {v.name}
              image = {v.image}
              desc = {v.desc}
              path = {v.path}
              textColour = {v.colour}
            />
        </Grid>

        )
          
        )}

      </Grid> */}
    </Paper>
    </React.Fragment>
  )
}

