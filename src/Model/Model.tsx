"use client"
import React, { useState } from 'react'
import styles from "./Model.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { Ajax } from '@/services/ajax';

export const Modal = () => {
   const dispatch = useDispatch()

   const [data, setData] = useState(useSelector((state: any) => state?.appReducer?.student) || {})
   const fnChange = (eve: any) => {
      const { name, value } = eve.target
      setData({ ...data, [name]: value })
   }
   const fnUpdate = async () => {
      try {
         const id = data?._id
         delete data?._id
         const dataobj = {
            "data": data
         }
         dispatch({type:"LOADER",payload:true})
         const res = await Ajax.sendPutReq(`std/update-std?id=${id}`, dataobj)

         const { acknowledged, modifiedCount } = res?.data
         if (acknowledged && modifiedCount) {
            dispatch({ type: "MODEL", payload: { isShowModel: false, student: {} } })

            dispatch({ type: "GET_STUDENT" })
            alert("success")
         } else {
            dispatch({ type: "MODEL", payload: { isShowModel: false, student: {} } })

            alert("failed!")
         }
      } catch (ex: any) {
         console.error(ex)
         alert(ex.message)
      }finally{
         dispatch({type:"LOADER",payload:false})

      }

   }

   const fnClose = () => {
      dispatch({ type: "MODEL", payload: { isShowModel: false, student: {} } })
   }
   return (
      <div>
         <div className={styles.mask}></div>
         <div className={`px-3 py-3 ${styles.modalContent}`}>
            <h5 className="mb-5"></h5>
            <div className="text-end">
               <h1>Registration</h1>
               <p><b>Name:</b><input value={data?.name} name="name" type="text" onChange={fnChange} />
               </p>
               <p><b>Roll NO:</b><input value={data?.rno} name="rno" type="number" onChange={fnChange} />
               </p>
               <p><b>Location:</b><textarea value={data?.loc} name="loc" onChange={fnChange} />
               </p>

               <button className="btn btn-dark me-3" onClick={fnUpdate} >
                  Update
               </button>

               <button className="btn btn-dark" onClick={fnClose} >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
};