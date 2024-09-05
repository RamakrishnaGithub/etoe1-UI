import React, { useState } from 'react';
import { Ajax } from '@/services/ajax';
import { useDispatch } from 'react-redux';

export const Login = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const handleChange = (eve: any) => {
    const { id, value } = eve.target
    setData({
      ...data,
      [id]: value
    })
  }
  const handleClick = async () => {
    try {
      dispatch({ type: "LOADER", payload: true })
      const res = await Ajax.sendPostReq("std/login", data)

      if (res?.data?.length > 0) {
        if (typeof window !== "undefined") {
          sessionStorage.uid = res?.data?.[0]?.uid
          sessionStorage.token = res?.data?.[0]?.token
        }

        dispatch({ type: "LOGIN", payload: { isLoggedIn: true, uid: res?.data?.[0]?.uid } })
      } else {
        alert("Check ur userid and password")
      }
    } catch (ex) {

    }finally{
      dispatch({type:"LOADER",payload:false})
    }

  }
  return (
    <div>
      <h3>Login</h3>
      <p>
        <b>User Id:</b><input type="text" id="uid" onChange={handleChange} />
      </p>
      <p>
        <b>Password:</b><input type="password" id="pwd" onChange={handleChange} />
      </p>
      <p>
        <button onClick={handleClick}>Login</button>
      </p>
    </div>
  )
}

