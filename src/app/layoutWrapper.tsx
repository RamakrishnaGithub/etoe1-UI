"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Login } from "@/Login";
import { appStore } from "../redux/appStore";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Modal } from "../Model";
import { Loader } from "@/Loader";
const inter = Inter({ subsets: ["latin"] });



export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage?.uid) {
      dispatch({ type: "LOGIN", payload: { isLoggedIn: true, uid: sessionStorage?.uid } })

    }
  }, [])

  const isLoggedIn = useSelector((state: any) => {
    return state?.appReducer?.isLoggedIn

  })
  const uid = useSelector((state: any) => {
    return state?.appReducer?.uid

  })
  const isShowModel = useSelector((state: any) => {
    return state?.appReducer?.isShowModel

  })

  const isShowLoader = useSelector((state: any) => {
    return state?.appReducer?.isShowLoader

  })
  const handleLogout = () => {
    const bool = confirm("r u sure..")
    if (bool) {
      sessionStorage.clear()
      dispatch({ type: "LOGIN", payload: { isLoggedIn: false, uid: "" } })
    }

  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
          {isLoggedIn ? <div>
            <h3>{uid} </h3>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>{children}</div> : <Login />}
           {isShowModel && <Modal/>}
          {isShowLoader && <Loader/>}
        </Provider>
      </body>
    </html>
  );
}
