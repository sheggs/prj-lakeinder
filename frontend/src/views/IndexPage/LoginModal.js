import React, { Fragment, useContext, useEffect, useState } from 'react';
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
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core/'
//import axios_net from '../../extras/axios_net'
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingTop: "10vh",
    width: '100vw',
    textAlign: 'center'
    // backgroundImage: `url(/date-lake-background.jpg)`,
    // backgroundPosition: 'center',
    // backgroundSize:'cover',
    // backgroundRepeat: 'no-repeat'
  },
  welcomemessage: {
    fontFamily: "Poppins",
    fontSize: '1.8rem',
    fontWeight: 1000
  },
  footer:{
    position:"fixed",
    width: "100vw",
    textAlign:"center",
    bottom:0
  },
  signInButtonStyle:{
    height:"5vh",
    width: "20vw",
    color: 'white',
    borderRadius: 30,
    background: DefaultStyle.signInButton,
    "&:hover, &:focus": {
      background: DefaultStyle.signInButtonHover
    }

  },
  registerButton:{
    height:"5vh",
    color: 'white',
    width: "20vw",
    borderRadius: 30,
    background: DefaultStyle.registerButton,
    "&:hover, &:focus": {
      background: DefaultStyle.registerButtonHover
    }

  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginModal(props) {
  const { axios_net, setAccessToken, accessToken } = useContext(UserContext)
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [error_msg, seterr_msg] = React.useState("");
  const [sev, setSev] = React.useState("error")
  const { register, handleSubmit, errors, getValues } = useForm()
  const handleClose = () => {
    setOpen(false)
  }

  // To be complete
  const onSubmit = async e => {
    await axios_net.post("/auth/login",e,{skipAuthRefresh: true, withCredentials: true})
    .then((resp)=> {
      const data = (resp.data)
      setAccessToken(data.token)
    })
    .catch((err) => {
      try{
          console.log(err.response)
        if(err.response == undefined){
          seterr_msg("Server is currently unavailable. Please contact support")
          setSev("error")
        }else{
          seterr_msg(err.response.data.message)
          setSev("error")
        }
      }catch(e){
        seterr_msg("Contact Support")
        setSev("error")
      }
      setOpen(true)
    })
  }

  useEffect(() => {
    console.log("prop change")
    console.log(props.show)
  }, [props])
  return (
    <div >
       <Dialog
       fullWidth
       className={classes.dialog}
       open={props.show}
       onClose={() => props.onClose() }
       >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Login
        </DialogTitle>
        <DialogContent>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Emails"
                defaultValue={""}
                label="Email"
                name="email"
                autoFocus
                />
                <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
               
                <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                // color=""
                className={classes.submit}
                >
                Sign In
                </Button>
    
            </form>
        </DialogContent>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={sev}>
          {error_msg}
        </Alert>
      </Snackbar>
       </Dialog>

    </div>
  )
}

