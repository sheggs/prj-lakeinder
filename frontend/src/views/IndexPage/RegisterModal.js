import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ButtonGroup, ButtonBase, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Avatar from '@material-ui/core/Avatar';
import DefaultStyle from '../../extras/styles'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Alert from '@mui/material/Alert';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { UserContext } from '../../contexts/UserContext'
import { useForm } from 'react-hook-form'
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { OutdoorGrill, SportsSoccer, SportsEsports, MusicNote, Gavel, Theaters, EmojiSymbols, PhotoCamera } from '@material-ui/icons';
const steps = [
    {
        name: 'User Information',
        icon: <AccountCircleIcon />,
    },
    {
        name: 'Upload Images',
        icon: <AccountCircleIcon />
    },
    {
        name: 'Lakeinder Extras',
        icon: <AccountCircleIcon />
    },
];
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
    fieldContainer: {
        padding: 30,
    },
    fab: {
        margin: 10,
        width: "30%",
        float: "right",
    },
    border: {
        margin: "auto",
        border: "0.15rem solid #2A8BFF",
        borderRadius: "20px",
        padding: "2%",
        width: "19rem",
        textAlign: "center",
        marginBottom: 20,
    },
    padFields: {
        paddingTop: 10
    }

}));


export default function RegisterModal(props) {
    const { axios_net, setAccessToken, accessToken } = useContext(UserContext)
    const [countryList, setCountryList] = useState(undefined)
    const [world_list, set_world_list] = useState({})
    const [cityList, setCityList] = useState([])
    // Load country data
    useEffect( () => {
        let isSubscribed = true
        axios_net.get("statics/world_cities").then((r) => {
            if(isSubscribed){
                setCountryList(Object.keys(r.data).sort())
                set_world_list(r.data)
            }
         
        }).catch((e)=> {
            if(isSubscribed){
                setCountryList(null)
            }
        })
        return () => {
            isSubscribed = false
        }
    }, [])
  
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [error_msg, seterr_msg] = React.useState("");
    const [sev, setSev] = React.useState("error")
    const [password, setPassword] = React.useState("")
    const { register, handleSubmit, errors, getValues } = useForm()
    const [data, setData] = useState({})


    const [files, setFiles] = useState([]);
    const [imageSrc, setImageSrc] = useState(undefined);

    const [country, setCountry] = useState(undefined)
    const [city, setCity] = useState(undefined)

    const handleClose = () => {
        setOpen(false)
    }
    //Stepper changer
    const [step, setStep] = useState(0)
    const uploadImage = (f) => {
        setFiles(f);
    };
    const onImageDelete = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };
    const handleImageSee = (imageSource) => {
        setImageSrc(imageSource);
    };
    // Validation
    const isUnderAge = (e) => {
        let date = new Date(e)
        let nowDate = new Date()
        let age = nowDate.getFullYear() - date.getFullYear()
        let m = nowDate.getMonth() - date.getMonth()

        if (m < 0 || (m === 0 && nowDate.getDate() < date.getDate())) {
            age = age - 1
        }

        if (age >= 18) {
            return true
        }
        return false
    }
    const isPasswordSame = (e) => {
        let confirm = e
        if (confirm == password) {
            return true
        }
        return false
    }

   



    // Registration Controller
    const registerSubmitPhase1 = (event) => {
        if (country == undefined) {
            seterr_msg("Country cannot be empty")
            setSev("error")
            setOpen(true)
            return
        }
        if (city == undefined) {
            seterr_msg("City cannot be empty")
            setSev("error")
            setOpen(true)
            return
        }
        let d = data
        d.first_name = event.first_name
        d.last_name = event.last_name
        d.email = event.email
        d.dateofbirth = event.dateofbirth
        d.password = password
        setData(d)
        setStep(1)

    }

    const registerSubmitPhaseImage = (e) => {
        let d = data
        d.image1 = e.image1
        d.image2 = e.image2
        d.image3 = e.image3
        setData(d)
        setStep(2)

    }
    const onCountrySelectChange = (e) => {
        setCountry(e.target.value)
        let d = world_list[e.target.value]
        let c = []
        for(let i in d){
            c.push(d[i].City)
        }
        setCityList(c.sort())

        
    }
    const onCitySelectChange = (e) => {
        setCity(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onClose = (event, reason) => {
        if (reason && reason == "backdropClick")
            return;
        props.onClose()
    }

    const [tags, setTags] = React.useState([])
    const isSelected = (e, data) => {
        for (let i in data) {
            if (data[i] == e) {
                return true
            }
        }
        return false
    }
    const handleChipClick = (e) => {
        if (!isSelected(e, tags)) {
            console.log("addingggd")
            setTags([...tags, e])
            return
        }
        console.log("Nah hrere")
        let cpy = []
        for (let i in tags) {
            if (!(tags[i] == e)) {
                cpy.push(tags[i])
            }
        }
        setTags(cpy)
    }
    const finalSubmit = (e) => {
        let cpy = data
        cpy.tags = tags
        cpy.country = country
        cpy.city = city


        axios_net.post("auth/register", cpy, { skipAuthRefresh: true, withCredentials: true }).then((r) => {
            props.onClose("registered")
        }).catch((e) => {
            if(e.response.status){
                if(Object.keys(e.response.data).includes("email")){
                    seterr_msg(e.response.data.email)
                    setSev("error")
                    setOpen(true)
                    return
                }
                if(Object.keys(e.response.data).includes("message")){
                    seterr_msg(e.response.data.message)
                    setSev("error")
                    setOpen(true)
                    return
                }
                seterr_msg(e.response.data.message)
                setSev("error")
                setOpen(true)
                return
            }
            seterr_msg("Unknown error")
            setSev("error")
            setOpen(true)
            return
        })

        return
    }

    // const countryList = [{ country: "UK" }]
    // const cityList = {
    //     "UK": ["Sheffield", "London"]
    // }
    const listOfChips = [{
        name: "Football",
        icon: <SportsSoccer />,
        color: "primary"
    },
    {
        name: "Traveling",
        icon: <SportsSoccer />,
        color: "primary"
    }, {
        name: "Theater",
        icon: <Theaters />,
        color: "primary"
    }, {
        name: "Dancing",
        icon: <EmojiSymbols />,
        color: "primary"
    }, {
        name: "Politics",
        icon: <Gavel />,
        color: "primary"
    },
    {
        name: "Photography",
        icon: <PhotoCamera />,
        color: "primary"
    }, {
        name: "Cooking",
        icon: <OutdoorGrill />,
        color: "primary"
    }, {
        name: "Music",
        icon: <MusicNote />,
        color: "primary"
    }, {
        name: "Video Games",
        icon: <SportsEsports />,
        color: "primary"
    },


    ]
    useEffect(() => {
        console.log("update?")
        console.log(tags)
    }, [tags])
    return (
        <div >
            <Dialog
                fullWidth
                className={classes.dialog}
                open={props.show}
                onClose={onClose}

            >
                <div stlye={{ width: "100%", float: "right" }}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">

                    <Box sx={{ width: '100%' }}>
                        <p className={classes.border}>Register for Lakeinder</p>
                        <Stepper activeStep={step} alternativeLabel>
                            {steps.map((v, k) => (
                                <Step key={k}>
                                    <StepLabel>{v.name}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </DialogTitle>
                {/* User information section :)*/}
                {step == 0 && <React.Fragment>
                    {countryList == undefined && <Alert severity="warning">Attempting to contact the server...</Alert>}
                    {countryList == false && <Alert severity="error">Error</Alert>}

                    {countryList != undefined && <React.Fragment>
                        <form onSubmit={handleSubmit(registerSubmitPhase1)}>
                            <div class={classes.fieldContainer}>
                                <TextField
                                    inputRef={register({ required: true })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="Emails"
                                    defaultValue={data.email == undefined ? "" : data.email}
                                    label="Email"
                                    name="email"
                                    autoFocus
                                    error={errors.email ? true : false}
                                    helperText={
                                        (errors.email && errors.email.type === "required" && "This field is required")
                                        //||
                                        // (errors.dateofbirth && errors.dateofbirth.type === "validate" && "The date cannot be in the future.")
                                    }
                                />
                                <TextField
                                    inputRef={register({ required: true })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="first_name"
                                    defaultValue={data.first_name == undefined ? "" : data.first_name}
                                    label="First Name"
                                    name="first_name"
                                    autoFocus
                                    error={errors.first_name ? true : false}
                                    helperText={
                                        (errors.first_name && errors.first_name.type === "required" && "This field is required")

                                    }
                                />
                                <TextField
                                    inputRef={register({ required: true })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="last_name"
                                    defaultValue={data.last_name == undefined ? "" : data.last_name}
                                    label="Last Name"
                                    name="last_name"
                                    autoFocus
                                    error={errors.last_name ? true : false}
                                    helperText={
                                        (errors.last_name && errors.last_name.type === "required" && "This field is required")
                                        //||
                                        // (errors.dateofbirth && errors.dateofbirth.type === "validate" && "The date cannot be in the future.")
                                    }
                                />
                                <TextField
                                    inputRef={register({ required: true, validate: isUnderAge })}
                                    name="dateofbirth"
                                    label="Date Of Birth"
                                    variant="outlined"
                                    fullWidth
                                    style={{ marginTop: 13 }}
                                    defaultValue={data.dateofbirth == undefined ? "" : data.dateofbirth}

                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    error={errors.dateofbirth ? true : false}
                                    helperText={
                                        (errors.dateofbirth && errors.dateofbirth.type === "required" && "This field is required")
                                        ||
                                        (errors.dateofbirth && errors.dateofbirth.type === "validate" && "You cannot register under the age of 18.")
                                    }
                                />
                                <TextField
                                    inputRef={register({ required: true, validate: isPasswordSame })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    defaultValue={data.password == undefined ? "" : data.password}
                                    type="password"
                                    defaultValue={""}
                                    label="Password"
                                    name="password"
                                    onChange={onChangePassword}
                                    autoFocus
                                    error={errors.password ? true : false}
                                    helperText={
                                        (errors.password && errors.password.type === "required" && "This field is required") ||
                                        (errors.password && errors.password.type === "validate" && "Passwords do not match")
                                    }
                                />
                                {/* <div className={classes.padFields}> */}
                                <TextField
                                    inputRef={register({ required: true, validate: isPasswordSame })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="confrimpassword"
                                    defaultValue={data.password == undefined ? "" : data.password}
                                    label="Confrim Password"
                                    name="confrimpassword"
                                    type="password"

                                    autoFocus
                                    error={errors.confrimpassword ? true : false}
                                    helperText={
                                        (errors.confrimpassword && errors.confrimpassword.type === "required" && "This field is required") ||
                                        (errors.confrimpassword && errors.confrimpassword.type === "validate" && "Passwords do not match")
                                    }
                                />
                                {/* </div> */}
                                <FormControl className={classes.padFields} name="country" fullWidth >
                                    <InputLabel htmlFor="country">
                                        Select a Country
                            </InputLabel>
                                    <Select
                                        id="country"
                                        fullWidth
                                        inputRef={register({ required: true, validate: isPasswordSame })}
                                        onChange={onCountrySelectChange}
                                        name="country"
                                        defaultValue={country == undefined ? "" : country}
                                        variant="outlined"
                                        error={errors.country ? true : false}
                                    >
                                        {countryList.map((v) => (
                                            <MenuItem key={v} value={v}>
                                                {v}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {country == undefined && <div className={classes.padFields}><Alert severity="warning">Select a country, then you can select your city</Alert></div>}
                                {country != undefined && <React.Fragment>
                                    <FormControl className={classes.padFields} name="city" fullWidth >
                                        <InputLabel htmlFor="city">
                                            Select a City
                                    </InputLabel>
                                        <Select
                                            id="city"
                                            fullWidth
                                            inputRef={register({ required: true, validate: isPasswordSame })}
                                            onChange={onCitySelectChange}
                                            name="city"
                                            defaultValue={city == undefined ? "" : city}

                                            variant="outlined"
                                            error={errors.city ? true : false}
                                        >

                                            {cityList.map((v) => (
                                                <MenuItem key={v} value={v}>
                                                    {v}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>




                                </React.Fragment>}
                            </div>
                            <Fab className={classes.fab} variant="extended" type="submit" color="primary" aria-label="add">
                                <ArrowForwardIosIcon />
                        NEXT
                    </Fab>
                        </form>
                    </React.Fragment>}
                </React.Fragment>}

                {/** Image upload */}
                {step == 1 &&
                    < React.Fragment >
                        <div class={classes.fieldContainer}>
                            <form onSubmit={handleSubmit(registerSubmitPhaseImage)}>
                                <p>Upload Image 1</p>
                                <input ref={register}
                                    name="image1"
                                    required
                                    accept="image/png, image/jpeg"
                                    id="contained-button-file"
                                    type="file" />
                                <p>Upload Image 2</p>

                                <input ref={register}
                                    label="image2"
                                    name="image2"
                                    required
                                    accept="image/png, image/jpeg"
                                    id="contained-button-file"
                                    type="file" />
                                <p>Upload Image 3</p>

                                <input ref={register}
                                    label="image3"
                                    required
                                    name="image3"
                                    accept="image/png, image/jpeg"
                                    id="contained-button-file"
                                    type="file" />
                                <Fab className={classes.fab} variant="extended" type="submit" color="primary" aria-label="add">
                                    <ArrowForwardIosIcon />
                                    NEXT
                                </Fab>
                                <Fab className={classes.fab} variant="extended" onClick={() => { setStep(0) }} color="primary" aria-label="add">
                                    <ArrowBackIosIcon />
                                    BACK
                                </Fab>

                            </form>
                        </div>
                    </React.Fragment>}

                {step == 2 && <React.Fragment>
                    <div class={classes.fieldContainer}>

                    <Grid
                            container
                            direction="row"
                            spacing={3}
                            className={classes.ContainerPush}
                        >
                        {listOfChips.map((v, k) => (
                            // <Button color={"primary"} variant={isSelected(v.name, tags) ? "contained" : "outlined"} onClick={() => { handleChipClick(v.name) }} >{v.name}</Button>
                            <Grid item xs={3}><Chip avatar={v.icon} label={v.name} color={isSelected(v.name, tags)  == false ? "secondary" : "primary"} onClick={() => { handleChipClick(v.name) }} /></Grid>
                        ))}
                        </Grid>

                        <Grid
                            container
                            direction="columns"
                            justify="center"
                            spacing={3}
                            className={classes.ContainerPush}
                        >
                            Selected {tags.length} tags
                        </Grid>  
                        <Fab className={classes.fab} variant="extended" type="submit" color="primary" aria-label="add" onClick={finalSubmit} >
                                    <ArrowForwardIosIcon />
                                    NEXT
                                </Fab>
                                <Fab className={classes.fab} variant="extended" onClick={() => { setStep(1) }} color="primary" aria-label="add">
                                    <ArrowBackIosIcon />
                                    BACK
                                </Fab>
                    </div>
                </React.Fragment>}



                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={sev}>
                        {error_msg}
                    </Alert>
                </Snackbar>
            </Dialog>

        </div >
    )
}

