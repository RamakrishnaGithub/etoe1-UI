"use client"
import { Ajax } from '@/services/ajax'
import React, { useState } from 'react'
import { useDispatch, UseDispatch } from 'react-redux'

const Register = () => {
    const dispatch=useDispatch()
    const [data, setData] = useState({})
    const fnChange = (eve: any) => {
        const { name, value } = eve.target
        setData({ ...data, [name]: value })
    }
    const fnSubmit = async () => {
        try {
            const dataobj = {
                "data": data
            }
            dispatch({type:"LOADER",payload:true})

           const res=await Ajax.sendPostReq("std/register",dataobj)           
            const { acknowledged, insertedId } = res?.data
         if(acknowledged && insertedId ){
            dispatch({type:"GET_STUDENT"})
            alert("success")
         }else{
            alert("failed!")
         }
        } catch (ex:any) {
            console.error(ex)
            alert(ex.message)
        }finally{
            dispatch({type:"LOADER",payload:false})
        }

    }
    return (
        <div>
            <h1>Registration</h1>
            <p><b>Name:</b><input name="name" type="text" onChange={fnChange} />
            </p>
            <p><b>Roll NO:</b><input name="rno" type="number" onChange={fnChange} />
            </p>
            <p><b>Location:</b><textarea name="loc" onChange={fnChange} />
            </p>
            <p><button onClick={fnSubmit}>Submit</button>
            </p>
        </div>
    )
}

export default Register
