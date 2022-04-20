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
import Alert from '@mui/material/Alert';
import { UserContext } from '../../contexts/UserContext'
import { useForm } from 'react-hook-form'
import Container from '@material-ui/core/Container';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

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
  footer: {
    position: "fixed",
    width: "100vw",
    textAlign: "center",
    bottom: 0
  },
  signInButtonStyle: {
    height: "5vh",
    width: "20vw",
    color: 'white',
    borderRadius: 30,
    background: DefaultStyle.signInButton,
    "&:hover, &:focus": {
      background: DefaultStyle.signInButtonHover
    }

  },
  registerButton: {
    height: "5vh",
    color: 'white',
    width: "20vw",
    borderRadius: 30,
    background: DefaultStyle.registerButton,
    "&:hover, &:focus": {
      background: DefaultStyle.registerButtonHover
    }

  },
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   // backgroundColor: DefaultStyle.primaryColor,
  // },
  // form: {
  //   width: '100%', // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  // lock: {
  //   color: DefaultStyle.primaryColor
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  //   // background: DefaultStyle.primaryColor,
  //   // "&:hover, &:focus": {
  //   //   background: DefaultStyle.hoverColor,
  //   // },
  //   color: 'white'
  // },
}));



export default function LoginPage(props) {
  const { axios_net, setAccessToken, accessToken } = useContext(UserContext)
  const classes = useStyles()

  

  const [open, setOpen] = React.useState(false);
  const [error_msg, seterr_msg] = React.useState("");
  const [sev, setSev] = React.useState("error")
  const isLoggedOut = (props.location.search).includes("loggedout")
  const { register, handleSubmit, errors, getValues } = useForm()
  const handleClose = () => {
    setOpen(false)
  }

  // To be complete
  const onSubmit = async e => {
    // await axios_net.post("/auth/login",e,{skipAuthRefresh: true, withCredentials: true})
    // .then((resp)=> {
    //   const data = (resp.data)
    //   setAccessToken(data.token)
    // })
    // .catch((err) => {
    //   try{
    //     if(err.response == undefined){
    //       seterr_msg("Server is currently unavailable. Please contact support")
    //       setSev("error")
    //     }else{
    //       seterr_msg(err.response.data.message)
    //       setSev("error")
    //     }
    //   }catch(e){
    //     seterr_msg("Contact Support")
    //     setSev("error")
    //   }
    //   setOpen(true)
    // })
  }
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const loginOpen = () => {
    setShowLoginModal(true)
  }
  const registerOpen = () => {
    setShowRegisterModal(true)
  }
  const loginOnClose = () => {
    setShowLoginModal(false)
  }
  const registerOnClose = (reason) => {
    if (reason == "registered") {
      seterr_msg("Registered succesfully please login.")
      setSev("success")
      setOpen(true)
      setShowRegisterModal(false)
    }
    setShowRegisterModal(false)
  }
  //console.log(props.location.search)

  return (
    <div >
      <Grid
        className={classes.gridContainer}
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justify="center"
      // style={{ width: '100vw' }}
      >

        <Grid item xs={12}>
          <Typography variant="h6" className={classes.welcomemessage}>
            Welcome! How do you want to get started?
              </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth className={classes.signInButtonStyle} color="black" variant="contained" onClick={() => { loginOpen() }}>Login</Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth className={classes.registerButton} variant="contained" onClick={() => { registerOpen() }}>Register a new account</Button>
        </Grid>
      </Grid>
      <RegisterModal show={showRegisterModal} onClose={registerOnClose} />
      <LoginModal show={showLoginModal} onClose={loginOnClose} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={sev}>
          {error_msg}
        </Alert>
      </Snackbar>

      <footer className={classes.footer}>
        <p>{"Match with your Lake bae here <3"}</p>
      </footer>
    </div>
  )
}

