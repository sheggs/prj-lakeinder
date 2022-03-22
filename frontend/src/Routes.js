import React, { useContext, useState, useEffect } from 'react';
import logo from './logo.svg';
import RPRoute from './components/RP-Route';
import {UserContext} from './contexts'

import {

  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import Minimal from './layout/Minimal';
import Maximum from './layout/Maximum';
import NoLayout from './layout/NoLayout';

import {LoginPage, LogoutPage} from './views/LoginPage';

import Dashboard from './views/Dashboard';

import RP404 from './views/RP404';

import Loading from './views/Loading'

export default () => {
    const { setAccessToken, accessToken, setSection, sideBar, setSideBar, sideBarBoolen, setSideBarBooolen } = useContext(UserContext)

    return(
        <Switch>
            <RPRoute component={LoginPage} exact path="/"  layout={Minimal} public/>
            <RPRoute component={LogoutPage} exact path="/logout"  layout={Minimal} public/>

            <RPRoute component={Dashboard} exact path="/dashboard" layout={Maximum} private />
            <RPRoute component={LogoutPage} path="/sign-out" exact layout={Maximum} public />

            <RPRoute component={Loading} path="/loading" exact layout={NoLayout} public />
            <RPRoute component={RP404} path="*" layout={NoLayout} />

            {/* <Redirect to="/not-found" /> */}
        </Switch>
    )
}