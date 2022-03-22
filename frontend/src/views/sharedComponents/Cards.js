import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'


const useStyle = makeStyles({
    root:{ 
        width: 400,
        // '&:hover': {
        //     backgroundColor: "#333"
        // }
    },
    media:{
       // display: "flex",
        //justifyContent: "center",
        //alignContent: "center",
        width: 400,
        height: 200,
        //backgroundColor: "red" 
    },
    title: {
        fontFamily: "Poppins",
        textAlign: "left",
        color: "white"
    },
    itemsToCentre:{
        position: "absolute",
        padding: 10,
        bottom: 0,
        left: 0
    }
})
export default function Cards(props) {
    const classes = useStyle()
    return (

        <Card className={classes.root}>
                <CardActionArea className={classes.media} > 
                <Link underline='none' onClick = {props.onClick} component={RouterLink} to={props.path}>
                    <CardMedia style={{backgroundPosition: "center"}}
                        className={classes.media}
                        // style={{backgroundColor: "red"}}
                        title = "AS"
                        image={props.image}
                    >
                    <div className={classes.itemsToCentre}>
                        <Typography variant="h4" className={classes.title}>
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p"  className={classes.title}>
                            {props.desc}
                        </Typography>
                    </div>
                    </CardMedia>
                    </Link>

                </CardActionArea>
        </Card>

    )
}