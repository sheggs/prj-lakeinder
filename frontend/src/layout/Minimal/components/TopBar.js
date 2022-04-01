import React from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import extras from '../../../extras/styles'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Poppins",
    fontSize: '1.8rem'
  },
  subTitle: {
    flexGrow: 1,
    fontFamily: "Poppins",
    fontSize: '1rem'
  },
  logo: {
    width: '9rem'
  },
  button_group: {
    paddingRight: 30
  }

}));


export default function TopBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment >
      <div className={classes.root}>
        <Toolbar sx={{ justifyContent: "space-between" }}>


          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          // style={{ minHeight: '100vh' }}
          >

            <Grid item xs={3}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                <IconButton edge="start" color="red" aria-label="menu">
                  <img className={classes.logo} src="/logo.png" alt="image" />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Lakeinder
            </Typography>
              </div>
              
            </Grid>

          </Grid>

          {/* <div className={classes.logocontainer}>

          </div> */}
          {/* <div className={classes.button_group}>
              <Button variant="outlined" color="primary" component={Link} to="/">Login</Button>
            </div>
            <div className={classes.button_group}>
              <Button variant="outlined" color="primary" component={Link} to="/sign-up">Sign Up</Button>
            </div> */}

        </Toolbar>
      </div>

    </React.Fragment>
  )
}
