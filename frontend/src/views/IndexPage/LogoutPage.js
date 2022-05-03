import React, { Fragment, useContext,useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
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
//import axios_net from '../../extras/axios_net';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import {
  Redirect
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: DefaultStyle.primaryColor,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  lock: {
    color: DefaultStyle.primaryColor
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: DefaultStyle.primaryColor,
    "&:hover, &:focus": {
      background: DefaultStyle.hoverColor,
    },
    color: 'white'
  },
  alertLogout: {
    padding: 20
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function LogoutPage(props) {
  const {axios_net, setAccessToken, accessToken } = useContext(UserContext)
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [error_msg, seterr_msg] = React.useState("");
  const [logoutState, setLogoutState] = React.useState(0)
  const { register, handleSubmit, errors, getValues } = useForm()
  const cookies = new Cookies();

  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    onSubmit()
  },[])

  const onSubmit = async e => {
    cookies.remove('jwt',{ path: '/' });
    await axios_net.get("/auth/logout", e, { skipAuthRefresh: true, withCredentials: true })
      .then((resp) => {
        setAccessToken()
        setLogoutState(1)
        return (<Redirect to="/?loggedout"></Redirect>)
      })
      .catch((err) => {
        setLogoutState(2)
        return (<Redirect to="/dashboard?failedtologout"></Redirect>)

      })
  }
  if(logoutState == 1){
    return (<Redirect to="/?loggedout"></Redirect>)
  }else if(logoutState == 2){
    return (<Redirect to="/dashboard?failedtologout"></Redirect>)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmojiPeopleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logged out
        </Typography>
        <div className={classes.alertLogout}>
          <Alert >Please close this window. You have logged out successfully</Alert>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error_msg}
          </Alert>
        </Snackbar>
      </div>
      <Box mt={8}>
      </Box>

    </Container>
  )
}

