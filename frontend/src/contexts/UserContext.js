import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"


export const UserContext = createContext()

export default function UserContextProvider(props) {
  let history = useHistory()
  const baseURL = "http://" + process.env.REACT_APP_BACKEND_NAME
  const axios_net = axios.create({
    baseURL: baseURL,
    timeout: 2000,
  })
  axios_net.interceptors.response.use((response) => response, async (error) => {
    if (error.response) {
      if (error.response.status == 401 ) {
        setAccessToken(null)
        let r = await axios.post(baseURL+"/auth/refresh-token",{},{withCredentials:true})
        if(r.data.accessToken == ""){
          // Session has expired
          history.push("/?sessionexpired")
        }else{
          setAccessToken(r.data.accessToken)
          error.response.config.headers['Authorization'] = "Bearer " + r.data.accessToken
          return axios_net(error.response.config)
        }

      }
      return Promise.reject(error)
    }

  })

  const [accessToken, setAccessToken] = useState()
  const [goBack, setBack] = useState()
  const [section, setSection] = useState()
  const [drawerHidden, setDrawerHidden] = useState(false)
  const [me, setMe] = useState(null)
  const [sideBar, setSideBar] = useState("")
  const [sideBarBoolen, setSideBarBoolen] = useState(true)


  const [collasableSideBar, setCollapsableSidebar] = useState("")
  const [selectedSideBar, setSelectedSideBar] = useState("")


  let authenticated = false

  // const refresh = failedRequest => axios_net.post(`${process.env.REACT_APP_HOST_NAME}/api/auth/refresh-token`, {rememberMe: localStorage.getItem("rememberMe")}, { withCredentials: true }).then(response => {
  //     //console.log('Requesting refresh token')
  //     setAccessToken(response.data.token)
  //     failedRequest.response.config.headers['Authorization'] = 'Bearer ' + response.data.token
  //     return Promise.resolve();
  // }).catch(err => {
  //     setAccessToken(null)
  //     return Promise.reject()
  // })


  const isAuth = async () => {
    //console.log("Token: " +accessToken)

    if ((accessToken && jwt_decode(accessToken).exp > Date.now() / 1000)) {
      //console.log(2)
      return true;
    }
    try {
      //err checking!
      const r = await axios.post("http://" + process.env.REACT_APP_BACKEND_NAME + "/auth/refresh-token", {}, { skipAuthRefresh: true, withCredentials: true })
      //console.log(r)
      // if (r.data.error) {
      //   setAccessToken(null)
      //   return false
      // }
      //console.log(r.data)
      setAccessToken(r.data.accessToken)
      //console.log("SET" + r.data.token)
      return true
    } catch (e) {
      //console.log("ERROR " + e)
      setAccessToken(null)
      return false;
    }
    if (accessToken == null) {
      //console.log(1)
      return false
    }
  }
  const getMe = async () => {
    // try{
    //   await axios_net.get("")
    // }
  }

  return (
    <UserContext.Provider value={{ axios_net, accessToken, setAccessToken, isAuth, me, setMe, section, setSection, drawerHidden, setDrawerHidden, sideBar, setSideBar, sideBarBoolen, setSideBarBoolen, collasableSideBar, setCollapsableSidebar, selectedSideBar, setSelectedSideBar }}>
      {props.children}
    </UserContext.Provider>
  )

}
