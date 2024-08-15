"use client"
import React, { useState } from 'react'

const Register = () => {
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
            const res = await fetch("https://etoe1-server.vercel.app/std/register", {
                method: "post",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(dataobj)
            })
            const result = await res.json()
            const { acknowledged, insertedId } = result
         if(acknowledged && insertedId ){
            alert("success")
         }else{
            alert("failed!")
         }
        } catch (ex:any) {
            console.error(ex)
            alert(ex.message)
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
