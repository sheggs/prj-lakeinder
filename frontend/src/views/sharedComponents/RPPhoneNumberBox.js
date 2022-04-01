import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { AppBar, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Divider, ThemeProvider, TextField } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';
const useStyle = makeStyles({
    root: {
        width: "80vw",
        ///,
        // '&:hover': {
        //     backgroundColor: "#333"
        // }
    },
    media: {
        // display: "flex",
        //justifyContent: "center",
        //alignContent: "center",
        width: "100%",
        height: 200,
        //backgroundColor: "red" 
    },
    title: {
        fontFamily: "Poppins",
        textAlign: "left",
        color: "white"
    },
    itemsToCentre: {
        position: "absolute",
        padding: 10,
        bottom: 0,
        left: 0
    }
})
export default function RPGoogleAutoComplete(props) {
    const classes = useStyle()
    const data = [
        {
            "code": "US",
            "emoji": "🇺🇸",
            "unicode": "U+1F1FA U+1F1F8",
            "name": "United States",
            "title": "flag for United States",
            "dialCode": "+1"
        },
        {
            "code": "GB",
            "emoji": "🇬🇧",
            "unicode": "U+1F1EC U+1F1E7",
            "name": "United Kingdom",
            "title": "flag for United Kingdom",
            "dialCode": "+44"
        }, {
            "code": "IE",
            "emoji": "🇮🇪",
            "unicode": "U+1F1EE U+1F1EA",
            "name": "Ireland",
            "title": "flag for Ireland",
            "dialCode": "+353"
        }, {
            "code": "DE",
            "emoji": "🇩🇪",
            "unicode": "U+1F1E9 U+1F1EA",
            "name": "Germany",
            "title": "flag for Germany",
            "dialCode": "+49"
        },
    ]
    const bob = [{ dialCode: "a" }]
    const [value, setValue] = useState(  {
        "code": "GB",
        "emoji": "🇬🇧",
        "unicode": "U+1F1EC U+1F1E7",
        "name": "United Kingdom",
        "title": "flag for United Kingdom",
        "dialCode": "+44"
    });
    const [textFieldValue, setTextFieldValue] = useState("");
    const handleTextChange = (event) => {
        //console.log(value)
        setTextFieldValue(event.target.value)
        try{
            this.props.setMobilePhoneNumber("("+ value.dialcode + ")" + " " + textFieldValue)
        }catch(e){
            //Empty
        }
    }

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>

                <Autocomplete
                    required
                    id="combo-box-demo"
                    value={value}u
                    onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      disableClearable
                    options={data}
                    getOptionLabel={(option) => option.emoji + " (" + option.dialCode + ")"}
                    style={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Phone Code" variant="outlined" />}
                />
            </FormControl>

            <FormControl className={classes.formControl}>
                <TextField
                    required
                    onChange={handleTextChange}
                    label="Primary Phone Number"
                    type="text"
                    variant="outlined"
                    name="asdasd"
                    value={textFieldValue}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                //defaultValue={firstStep ? firstStepData["primaryphonenumber"] : ""}

                />

            </FormControl>
        </React.Fragment>


    )
}

RPGoogleAutoComplete.propTypes = {
    value: PropTypes.string,
}