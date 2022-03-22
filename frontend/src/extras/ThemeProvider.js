import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#86DC3D",
      },
      blueprimary:{
        main: "red",
      },
      test:{
        main:"black"
      },
      toggle: {
        thumbOnColor: 'yellow',
        trackOnColor: 'red'
      }
      // secondary: {
      //   main: "#FFFFF",
      // }
      
    }
    
  })


export default theme