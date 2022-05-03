import React, { Fragment, useContext,useEffect,useState } from 'react';

// import UserStore from '../stores/UserStore'


import {UserContext} from '../contexts'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useLocation 
} from "react-router-dom";
import Loading from '../views/Loading/Loading'

const RPRoute = (props)=>{
  const {layout: Layout, component: Component, ...rest} = props
  const { accessToken, setAccessToken, isAuth } = useContext(UserContext)
  const [isAuthenticated, setAuthenticated] = useState()
  const location = useLocation()
  const [loading, SetLoading] = useState(true)


  useEffect(() => {
    
    const response = async() => {
      const isAuthenticatedVar = await isAuth();
      SetLoading(false)
      setAuthenticated(isAuthenticatedVar)
    } 
    response()
    
  })

  // console.log("XYZ" + isAuthenticated)
  // if(isAuthenticated == null){
  //   console.log("NULL")
  //   return null
  // }
  if(loading){
    return(
      <Loading></Loading>
    )
  }else{

  if(props.private && !isAuthenticated){
    return(
      <Redirect to={{pathname: '/',state: { from: location }}}></Redirect>
    )
  }
  else if(props.public && isAuthenticated){
    return(
      
      <Redirect to={{ pathname: location.state?.from?.pathname || "/dashboard" }}/>

      // <Redirect to={{ pathname: "/dashboard", state: {from: location}}}/>
    )
  }
  else{
    return (
      <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />

  )
  }
    
  }

}


export default RPRoute;