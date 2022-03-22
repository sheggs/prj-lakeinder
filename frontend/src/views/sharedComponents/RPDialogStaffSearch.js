import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Dialog, DialogActions, DialogContent, Snackbar, DialogContentText, Button, DialogTitle, AppBar, FormControl, IconButton, Input, InputLabel, MenuItem, ButtonGroup, InputAdornment, Paper, Select, Divider, ThemeProvider, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MuiPhoneInput from 'material-ui-phone-number'
import { u_significant_figures } from '../../extras/utils'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UserContext } from '../../contexts/UserContext'
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form'



const useStyles = makeStyles((theme) => ({
    main: {
        // marginLeft: 240,
        // marginTop: 24,
        // maxWidth: 'calc(100% - 240px)'
        // maxWidth: 'calc(100% - 240px)'
    },
    root: {
        //width: 600,
    },
    intCard: {
        paddingTop: 50,
        paddingBottom: 50
    },
    containGridSearch: {
        width: "60%"
    },
    searchContainer: {
        width: "100%",
        height: 70,
        borderRadius: "25px",
    },
    searchData: {
        width: "100%",
        height: "100%",
        padding: 10,
        background: "#e8e8e8",
        color: "black",
        borderRadius: "25px",
    },
    searchData2: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        margin: 10,
        borderRadius: "25px",
    },
    submitButton: {
        marginTop: 15

    },
    PaperContainer: {
        margin: 15,
        borderRadius: "25px",
        padding: 40,
    },
    PaperContainerResult: {
        marginTop: 10,
        borderRadius: "25px",
        padding: 40,
        width: "70vw"
    },
    options: {
        padding: 20
    }, group: {
        padding: 10
    }

}));

export default function RPDialogStaffSearch(props) {
    const classes = useStyles()
    const { axios_net, setAccessToken, accessToken, setSection } = useContext(UserContext)
    const { register, handleSubmit, errors, getValues } = useForm()
    const [localStaffList, setLocalStaffList] = useState(props.staffList)
    /**
     * Snackbar
     */
    useEffect(() => {
        //console.log("Staff List update")
        setLocalStaffList(props.staffList)
    }, [props.staffList])
    const [mainSnackbarMsg, setMainSnackbarMsg] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState("error")
    const [snackbar, setSnackbar] = useState(false)
    const handleSnackBar = () => {
        setSnackbar(!snackbar)
    }
    const enableSnackbar = (msg, severity) => {
        setMainSnackbarMsg(msg)
        setSnackbarSeverity(severity)
        setSnackbar(true)
    }


    /** GOOGLE */

    const [googlePlacesList, setGooglePlacesList] = React.useState([{ address: "asd" }])
    const handleGoogleAddressPersonalDetails = async (event) => {
        if (event == null || event == undefined) {
            return;
        }
        let data = { search: event.target.value }
        await axios_net.post("/utility/places", data, { headers: { Authorization: accessToken }, skipAuthRefresh: true, withCredentials: true }).then((r) => {
            setGooglePlacesList(r.data)
            //console.log(r.data)
            //console.log("HERE")
        }).catch((r) => {
            try {
                enableSnackbar("[" + r.response.data.code + "] " + r.response.data.message, "error")
                setGooglePlacesList([{ "address": "" }])
            } catch (e) {
                setGooglePlacesList([{ "address": "" }])
                enableSnackbar("Contact Support", "error")
            }
        })




    }

    /** REST DATA */
    const [data, setData] = useState([])
    const [kw, setkw] = useState("")
    const searchInfo = [
        {
            name: "Name",
            datatype: "name",
        },
        {
            name: "Phone Number",
            datatype: "phonenumber",
        },
        {
            name: "Address",
            datatype: "address",
        },
        {
            name: "Date of Birth",
            datatype: "dateofbirth"

        }
    ]
    const [advSearch, setAdvSearch] = useState("name")
    const isSelected = (x) => {
        if (advSearch == x) {
            return true;
        }

        return false;
    }
    const selectData = (x) => {
        setAdvSearch(x)
        return
    }

    const minAddClient = (e) => {
        setLocalStaffList([e])
        props.handleStaffList([e])
        props.handleClose()
    }
    /** addClient */
    const addClient = (e) => {
        let found = false;
        for (let i in localStaffList) {
            if (localStaffList[i]._id == e._id) {
                found = true
            }
        }
        if (!found) {
            setLocalStaffList([...localStaffList, e])
        } else {
            enableSnackbar("This staff has already been selected", "info")
        }

    }

    const removeClient = (e) => {
        let cp = []
        //console.log("BEF OUTCOME")
        //console.log(localStaffList)
        for (let x in localStaffList) {
            if (localStaffList[x]._id != e) {
                cp.push(localStaffList[x])
            }
        }

        setLocalStaffList(cp)

    }
    const pushUpdates = () => {
        props.handleStaffList(localStaffList)
        props.handleClose()
    }

    /** DATA SUBMIT */
    const submitSearch = async (e) => {
        e.preventDefault()
        let keyword;

        try {
            keyword = e.target.keyword.value
            setkw(keyword)
        } catch (e) {
            enableSnackbar("Input Data into text field", "info")
            return
        }
        if (keyword == undefined || keyword == null || keyword.length < 1) {
            enableSnackbar("Input Data into text field", "info")
            return
        }
        if (advSearch.length < 1) {
            enableSnackbar("Select an option from Advanced Search", "info")
            return
        }
        await axios_net.get("/serviceworker/search-advanced?data=" + advSearch + "&keyword=" + keyword, { headers: { Authorization: accessToken }, skipAuthRefresh: true, withCredentials: true }).then((r) => {
            //console.log("___")
            //console.log(r)
            //console.log(r.data)
            setData(r.data)
        }).catch((e) => {
            try {
                enableSnackbar("[" + e.response.data.code + "] " + e.response.data.message, "error")

            } catch (e) {
                enableSnackbar("Contact Support", "error")

            }
        })
    }
    return (
        <Dialog key={props.staffList} fullWidth maxWidth={'false'} open={props.enable} className={classes.root} onClose={props.handleClose}>
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Staff Selector Tool
            </DialogTitle>
            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                className={classes.ContainerPush}
            >

                <div key={props.staffList} className={classes.containGridSearch}>
                    <form onSubmit={submitSearch}>

                        <Grid
                            container
                            direction="row"
                            // justify="space-between"
                            // alignItems="center"
                            //className={classes.ContainerPush}
                            spacing={2}

                        >
                            <Grid item xs={8}>
                                <FormControl className={classes.searchContainer}>
                                    {advSearch == "dateofbirth" &&
                                        <Input className={classes.searchData}
                                            disableUnderline
                                            variant="filled"
                                            name="keyword"
                                            type="date"
                                            placeholder="Enter Name"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="large" />
                                                </InputAdornment>
                                            }
                                        />
                                    }
                                    {advSearch == "name" &&
                                        <Input className={classes.searchData}
                                            disableUnderline
                                            variant="filled"
                                            name="keyword"
                                            type="text"
                                            placeholder="Enter Name"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="large" />
                                                </InputAdornment>
                                            }
                                        />
                                    }

                                    {advSearch == "phonenumber" &&
                                        <div className={classes.searchData}>
                                            <MuiPhoneInput
                                                className={classes.searchData2}
                                                defaultCountry='gb'
                                                // inputRef={register({ required: true })}
                                                // error={errors.primaryPhoneNumber ? true : false}
                                                // helperText={
                                                //   (errors.primaryPhoneNumber && errors.primaryPhoneNumber.type === "required" && "This field is required")
                                                // }
                                                label=""
                                                name="keyword"
                                                disableUnderline
                                                variant="filled"

                                                InputProps={{
                                                    disableUnderline: true
                                                }}
                                                regions={'europe'}
                                            />
                                        </div>

                                    }
                                    {advSearch == "address" &&
                                        <Autocomplete
                                            className={classes.searchData}
                                            disableClearable
                                            autoHighlight
                                            options={googlePlacesList}
                                            getOptionLabel={(option) => (option ? option.address : "")}
                                            onInputChange={handleGoogleAddressPersonalDetails}
                                            renderInput={(params) => <TextField {...params} className={classes.searchData}
                                                name="keyword"
                                                placeholder="Enter Address"
                                                InputProps={{
                                                    ...params.InputProps, disableUnderline: true, startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon fontSize="large" />
                                                        </InputAdornment>
                                                    )
                                                }}

                                                error={errors.address ? true : false}
                                                helperText={
                                                    (errors.address && errors.address.type === "required" && "This field is required")
                                                }
                                            />}
                                        />
                                    }
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <Button color={"secondary"}
                                    className={classes.submitButton} style={{ width: 200 }} type="submit" color="default" variant="contained">Submit</Button>
                            </Grid>

                        </Grid>
                    </form>

                </div>
                <Grid item>
                    <Paper className={classes.PaperContainer}>
                        <Typography>Select one of the following options</Typography>
                        <div className={classes.options}>
                            <Grid
                                container
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                                className={classes.ContainerPush}
                            >
                                {searchInfo.map((v, k) =>
                                    (
                                        <Grid item >
                                            <ButtonGroup className={classes.group}>
                                                <Button color={"primary"} style={{ width: 200 }} onClick={() => { selectData(v.datatype) }} variant={isSelected(v.datatype) ? "contained" : "outlined"}>{v.name}</Button>
                                            </ButtonGroup>
                                        </Grid>
                                    )

                                )}
                            </Grid>
                        </div>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="center"
                            className={classes.ContainerPush}
                        >

                        </Grid>
                    </Paper>
                </Grid>
                {props.type != "min" &&
                    <Grid item>
                        <Paper className={classes.PaperContainerResult}>
                            <Typography>Selected Staff</Typography>
                            <div className={classes.options}>
                                <Grid>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>First Name</TableCell>
                                                    <TableCell align="left">Last Name</TableCell>
                                                    <TableCell align="left">Username</TableCell>
                                                    <TableCell align="left">Remove</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {localStaffList.map((v, k) => (
                                                    <TableRow key={k}>
                                                        <TableCell align="left">{v.firstName}</TableCell>
                                                        <TableCell align="left">{v.lastName}</TableCell>
                                                        <TableCell align="left">{v.username}</TableCell>
                                                        <TableCell align="left"><Button variant="contained" color="secondary" onClick={() => { removeClient(v._id) }}>Remove</Button></TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                }
                {data.length > 0 &&
                    <Grid item>
                        <Paper className={classes.PaperContainerResult}>
                            <Typography>Results</Typography>
                            <div className={classes.options}>
                                <Grid>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>First Name</TableCell>
                                                    <TableCell align="left">Last Name</TableCell>
                                                    <TableCell align="left">Username</TableCell>
                                                    <TableCell align="left">Phone Number</TableCell>
                                                    {advSearch == "address" && <TableCell align="left">Distance(km)</TableCell>}
                                                    <TableCell align="left">Target</TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.map((v, k) => (
                                                    <TableRow key={k}>
                                                        <TableCell align="left">{v.firstName}</TableCell>
                                                        <TableCell align="left">{v.lastName}</TableCell>
                                                        <TableCell align="left">{v.username}</TableCell>

                                                        <TableCell align="left">{v.phoneNumber} </TableCell>
                                                        {advSearch == "address" && <TableCell align="left">{u_significant_figures(v.distance)}</TableCell>}
                                                    <TableCell align="left">{props.type == "min" ? <Button variant="contained" color="primary" onClick={() => { minAddClient(v) }}>Select</Button> : <Button variant="contained" color="primary" onClick={() => { addClient(v) }}>Select</Button>}</TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>

                }
            </Grid>
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleSnackBar}>
                <Alert onClose={handleSnackBar} severity={snackbarSeverity}>
                    {mainSnackbarMsg}
                </Alert>
            </Snackbar>
            <DialogActions>
                {props.type != "min" &&
                    <React.Fragment>
                        <Button autoFocus onClick={pushUpdates} color="primary">
                            Update Staff List
                        </Button>

                        <Button type="submit" color="primary" color="primary">
                            Close without saving
                        </Button>
                    </React.Fragment>
                }
                {props.type == "min" &&
                    <Button onClick={() => {        props.handleClose()
                    }} color="primary">
                        Close
                    </Button>
                }
            </DialogActions>

        </Dialog >

    )
}

RPDialogStaffSearch.propTypes = {
    value: PropTypes.string,
}