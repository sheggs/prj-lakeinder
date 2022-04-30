import React, { useContext, useState, useEffect } from 'react';
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
import Loading from '../Loading';
import { AppBar, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Divider, ThemeProvider, Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import io from 'socket.io-client';

import { Launcher } from 'react-chat-window';
import { FILE_SERVER_URL,CHAT_SERVER } from '../../config/config'
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";

//import axios_net from '../../extras/axios_net'

const useStyles = makeStyles((theme) => ({
  paperMain: {
    height: "100vh",
    width: "100vw"
    // marginLeft: 240,
    // marginTop: 24,
    // maxWidth: 'calc(100% - 240px)'
    // maxWidth: 'calc(100% - 240px)'
  },
  intCard: {
    paddingTop: 30,
    paddingBottom: 30
  },
  profileHeader: {
    padding: 30,
    backgroundColor: "#bd4f6c",
    backgroundImage: "linear-gradient(326deg, #bd4f6c 0%, #d7816a 74%)"

  },
  logo: {
    width: '7rem'
  },
  dmButton: {
    padding: 10,
  },
  dmContainer: {
    height: "100vh",
    backgroundColor: "grey"
  },
  swipeContainer: {
    height: "100vh",
  },
  swipButtonSuperLike: {
    padding: "2vw",
    color: "#62b4f9",
    backgroundColor: "white",
    boxShadow: "0px 10px 53px 0px rgba(0,0,0,0.3)",
  },
  swipButtonLike: {
    padding: "2vw",
    color: "#76e2b3",
    backgroundColor: "white",
    boxShadow: "0px 10px 53px 0px rgba(0,0,0,0.3)",
  },
  swipButtonCancel: {
    padding: "2vw",
    color: "#ec5e6f",
    backgroundColor: "white",
    boxShadow: "0px 10px 53px 0px rgba(0,0,0,0.3)",
  },
  swipButtonGoBack: {
    padding: "2vw",
    color: "#f5b748",
    backgroundColor: "white",
    boxShadow: "0px 10px 53px 0px rgba(0,0,0,0.3)",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles()
  const { lakeinder_core_axios, axios_net, setAccessToken, accessToken, setSection } = useContext(UserContext)
  const [frontPageURIs, setFrontPageURIs] = useState([{}]);
  const [loading, setLoading] = useState(0);
  const [myData, setMyData] = useState()
  const [showMessageBox, setShowMessageBox] = useState(false)


  const [open, setOpen] = React.useState(false);
  const [error_msg, seterr_msg] = React.useState("");
  const [sev, setSev] = React.useState("error")
  const snackBar = (msg, sev) => {
    seterr_msg(msg)
    setSev(sev)
    setOpen(true)
  }

  const launcherClick = (e) => {
    setShowMessageBox(false)
    setMessageBoxUserID(null)
    snackBar("Closed message box :)", "success")
  }
  const calcAge = (e) => {
    let date = new Date(e)
    let nowDate = new Date()
    let age = nowDate.getFullYear() - date.getFullYear()
    let m = nowDate.getMonth() - date.getMonth()
    if (m < 0 || (m === 0 && nowDate.getDate() < date.getDate())) {
      age = age - 1
    }

    return age
  }

  const [swipeData, setSwipeData] = useState(
    {
      id: 8,
      first_name: "Priti",
      last_name: "Patel",
      dateofbirth: new Date("10/07/2000"),
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Boris_Johnson_official_portrait_%28cropped%29.jpg/220px-Boris_Johnson_official_portrait_%28cropped%29.jpg",

    }
  )
  /** *
    SOCKET
  **/


  const [socket, setSocket] = useState(null)
  useEffect(() => {
    const newSocket = io(CHAT_SERVER, {
      query: {token: accessToken},
      withCredentials: true,
    });
    console.log(CHAT_SERVER)
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket])

  useEffect(() => {
    // const messageListener = (message) => {
    //   setMessages((prevMessages) => {
    //     const newMessages = {...prevMessages};
    //     newMessages[message.id] = message;
    //     return newMessages;
    //   });
    // };
  
    // const deleteMessageListener = (messageID) => {
    //   setMessages((prevMessages) => {
    //     const newMessages = {...prevMessages};
    //     delete newMessages[messageID];
    //     return newMessages;
    //   });
    // };
    if(socket != undefined){
      socket.on('global_message_update', async (message) => { /** Recieved a message */ console.log("?global_message_update?"); await getMessages()});
      socket.on('auth_message_failed', async (message) => { /** Recieved a message */ snackBar("Socket.io Auth Failed", "error")});

      // socket.on('deleteMessage', deleteMessageListener);
      socket.emit('getMessages');
    }


    return () => {
      if(socket != undefined){
        socket.off('message');
        socket.off('deleteMessage');
      }

    };
  }, [socket]);
  const [messageRoom, setMessageRoom] = useState()
  const getMessages = () => {
    lakeinder_core_axios.get("profile/matches", { headers: { Authorization: accessToken } }).then((resp) => {
      console.log("updated message room")
      setMessageRoom(resp.data)
      
      // setMessageUpdateID
      if (resp.length == 0) {
        setMessageRoom(undefined)
      }
    })
  }
  const [messageBoxUserID, setMessageBoxUserID] = useState(null)
  const [messageUpdateID, setMessageUpdateID] = useState(0)
  const [messageBoxData, setMessageBoxUser] = useState(undefined)
  useEffect(() => {
    if(messageRoom != undefined){
      setMessageBoxUser(messageRoom.find(ele => ele.id == messageBoxUserID))
    }
  },[messageBoxUserID])
  const [messageHistory, setMessageHistory] = useState([])
  useEffect(() => {
    if(messageBoxUserID != undefined && messageRoom != undefined){
      console.log("message update???")
      setMessageHistory(messageRoom.find(ele => ele.id == messageBoxUserID).messageHistory)

    }
  },[messageRoom])
  const show_message_box_for = (id) => {
    setMessageBoxUserID(id)
    if(messageRoom!= undefined){
      setMessageHistory(messageRoom.find(ele => ele.id == id).messageHistory)
    }
    setShowMessageBox(true)
  }
  const getNextProfile = () => {
    setMatchProfile("loading")
    lakeinder_core_axios.get("profile/", { headers: { Authorization: accessToken } }).then((resp) => {
      setMatchProfile(resp.data)
      if (Object.keys(resp.data).length == 0) {
        setMatchProfile(undefined)
      }
    })
  }

  const [matchProfile, setMatchProfile] = useState({})
  const matchService = (profile, match) => {
    if (profile == undefined) {
      return
    }
    let id = profile.id
    lakeinder_core_axios.post("profile/match", { id: id, match: match }, { headers: { Authorization: accessToken } }).then((resp) => {
      if (match == false) {
        snackBar("</3", "error")
      } else {
        snackBar("<3", "success")
      }
      getNextProfile()
    }).catch((e) => {
      snackBar("Cannot match. System error", "error")
    })

  }
  const onSendMessage = (e) => {
    let data = e.data.text
    console.log(socket)
    if(socket == undefined){
      snackBar("Lakeinder-Notify is down. Contact support", "error")
      return
    }
    if(socket.connected == false){
      snackBar("Lakeinder-Notify is down. Contact support", "error")
      return     
    }
    let chat_room_id=messageRoom.find(ele => ele.id == messageBoxUserID).chat_room_id
    socket.emit("sendMessage", {"chat_room_id":chat_room_id,"message": data, "token": accessToken})
  }
  // Load country data
  useEffect(async () => {
    let isSubscribed = true
    console.log("HEY")

    axios_net.get("profile/me", { headers: { Authorization: accessToken } }).then(async (r) => {
      console.log("HaERE?")
      if (isSubscribed) {
        await getMessages();
        lakeinder_core_axios.get("profile/", { headers: { Authorization: accessToken } }).then((resp) => {
          setMatchProfile(resp.data)
          console.log(Object.keys(resp.data))
          if (Object.keys(resp.data).length == 0) {
            setMatchProfile(undefined)
          }
        })
        setMyData(r.data)
      }

    }).catch((e) => {
      if (isSubscribed) {
        setMatchProfile(null)
        setMyData(null)
      }
    })
  }, [])
  return (
    <React.Fragment>
      {myData == undefined && <Alert severity="warning">Loading your data...</Alert>}
      <Paper className={classes.paperMain} elevation={0}>

        <Grid
          // style={{height: "100vh"}}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={0}
        >
          <Grid className={classes.dmContainer} item xs={3}>
            <Paper className={classes.dmWrapperPaper}>

              <div className={classes.profileHeader}>
                <Grid
                  container
                  direction="rows"
                  spacing={1}
                  // justify="space-around"
                  alignItems="center">
                  <Grid item>
                    <Avatar src={myData != undefined && FILE_SERVER_URL + "/" + myData.image1} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h6" style={{ "color": "white" }} >{myData == undefined ? "? Dms" : myData.first_name + " DMs"}</Typography>
                  </Grid>
                </Grid>
              </div>
              <Grid
                container
                direction="column"
                // alignItems="center"
                spacing={0}>
                {messageRoom == undefined && <React.Fragment><Alert severity="info">You are lonely :(</Alert></React.Fragment>}
                {messageRoom != undefined && <React.Fragment>
                  {messageRoom.map((v) => (
                    <Grid item xs={12}>
                      <Card >
                        <CardActionArea className={classes.dmButton} onClick={() => { show_message_box_for(v.id) }} >
                          <Grid container direction="rows" spacing={1}>
                            <Grid item>
                              <Avatar src={FILE_SERVER_URL + "/" + v.image1}></Avatar>
                            </Grid>
                            <Grid item>
                              <Typography variant="h6" component="h6">{v.first_name + " " + v.last_name}</Typography>
                            </Grid>
                            <Grid item>
                              {v.messageHistory.length == 0 && <p style={{ textAlign: "center" }}>Start this Conversation</p>}
                              {v.messageHistory.length != 0 && <p style={{ textAlign: "center" }}>{v.messageHistory.at(-1).author == "me" ? "You: " : v.first_name + ": "}{v.messageHistory.at(-1).data.text}</p>}
                            </Grid>
                          </Grid>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}

                </React.Fragment>}

              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.swipeContainer} item xs={9}>
            <Grid
              container
              direction="column"
              spacing={0}
              alignItems="center">
              <Grid item xs={12}>
                <IconButton size="small" edge="start" color="red" aria-label="menu">
                  <img className={classes.logo} src="/logo.png" alt="image" />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                {matchProfile == "loading" && <React.Fragment>
                  <Card sx={{}}>

                    <CardContent>
                      <Alert severity="info">Grabbing a new profile</Alert>
                    </CardContent>
                  </Card>

                </React.Fragment>}
                {matchProfile != undefined && matchProfile != "loading" && <React.Fragment>
                  <Card sx={{}}>
                    <CardMedia
                      component="img"
                      // height="200"
                      image={FILE_SERVER_URL + "/" + matchProfile.image1}
                      alt="green iguana"
                    ></CardMedia>
                    <CardContent>
                      <Typography variant="h6" component="h6" >{matchProfile.first_name + " " + matchProfile.last_name}</Typography>
                      <Typography>{"Distance: " + matchProfile.distance}</Typography>
                      <Typography>{"Age: " + calcAge(new Date(matchProfile.date_of_birth))}</Typography>
                      <Typography>{matchProfile.city + ", " + matchProfile.country}</Typography>
                    </CardContent>
                  </Card>

                </React.Fragment>}
                {matchProfile == undefined && <React.Fragment>
                  <Card sx={{}}>
                    {/* <CardMedia
                      component="img"
                      // height="200"
                      image={FILE_SERVER_URL+"/"+matchProfile.image1}
                      alt="green iguana"
                    ></CardMedia> */}
                    <CardContent>
                      <Alert severity="info">You have run out of matches</Alert>
                    </CardContent>
                  </Card>

                </React.Fragment>}
                <Grid
                  container
                  style={{ padding: 10 }}
                  spacing={5}
                  direction="row"
                  justify="center">
                  <Grid item>
                    <IconButton disabled className={classes.swipButtonGoBack}>
                      <ReplayIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.swipButtonCancel} onClick={() => { matchService(matchProfile, false) }}>
                      <CloseIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton disabled className={classes.swipButtonSuperLike}>
                      <StarRateIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.swipButtonLike} onClick={() => { matchService(matchProfile, true) }}>
                      <FavoriteIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                  {/* <Grid item>
                    <IconButton disabled className={classes.swipButtonLike}>
                      <FlashOnIcon fontSize="large" />
                    </IconButton>
                  </Grid> */}

                </Grid>

              </Grid>
            </Grid>
            {/* <Typography>Swipe</Typography> */}
          </Grid>
        </Grid>
      </Paper >
      {messageBoxData != undefined && messageHistory != undefined && <React.Fragment>
        {messageBoxData != undefined &&
          <Launcher
            agentProfile={{
              teamName: messageBoxData.first_name + " " + messageBoxData.last_name,
              imageUrl: FILE_SERVER_URL + "/" + messageBoxData.image1 + "?height=80&width=80"
            }}
            handleClick={launcherClick}
            onMessageWasSent={onSendMessage}
            showEmoji={false}
            messageList={messageHistory}
            isOpen={messageBoxUserID == undefined ? false : showMessageBox}
          ></Launcher>
        }

      </React.Fragment>}

      <Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }}>
        <Alert onClose={() => { setOpen(false) }} severity={sev}>
          {error_msg}
        </Alert>
      </Snackbar>
    </React.Fragment >
  )
}

