"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ajax } from '@/services/ajax'

const Pagination = ({ currPage, setCurrPage, totalPages }) => {
   const inputRef = React.useRef()
   const fnGo = () => {
      const pageNo = inputRef.current.value;
      if (pageNo < 1 || pageNo > totalPages) {
         alert("Invalid Entry");
         return;
      }
      setCurrPage(Number(pageNo))
   }
   const fnNext = () => {
      setCurrPage(currPage + 1)
   }

   const fnPrev = () => {
      setCurrPage(currPage - 1)
   }
   return <div>
      <span>Go To :<input ref={inputRef} type="number" /><button onClick={fnGo}>Go</button></span><button onClick={fnPrev} disabled={currPage == 1}>Prev</button>{currPage}<button onClick={fnNext} disabled={currPage == totalPages}>Next</button><span>Total Pages:{totalPages}</span>
   </div>
}
export const Users = () => {
   const dispatch = useDispatch()
   const students = useSelector((state) => state?.appReducer?.students)
   const [currentData, setCurrentData] = useState([])
   const perPage = 3;
   const [currPage, setCurrPage] = React.useState(1)
   React.useEffect(() => {
      const end = currPage * perPage;
      const start = end - perPage;
      setCurrentData(students.slice(start, end))
   }, [currPage, students])



   useEffect(() => {
      dispatch({ type: "GET_STUDENT" })
   }, [])

   const handleEdit = (row) => {
      dispatch({ type: "MODEL", payload: { isShowModel: true, student: row } })
   }

   const handleDelete = async (row) => {
      const bool = confirm("R U Sure..")
      try{
         if (bool) {
            dispatch({type:"LOADER",payload:true})
            const res = await Ajax.sendDeleteReq(`std/delete-std/${row?._id}`)
   
            const { acknowledged, deletedCount } = res?.data
            if (acknowledged && deletedCount) {
               dispatch({ type: "GET_STUDENT" })
               alert("success")
            } else {
               alert("failed!")
            }
         }
      }catch(ex){

      }finally{
         dispatch({type:"LOADER",payload:true})
      }
      
   }
   return (
      <div>

         <table border="2px" className="table table-bordered">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>ROLL NO</th>
                  <th>Location</th>
                  <th>Edit</th>
                  <th>Delete</th>
               </tr>
            </thead>
            <tbody>
               {
                  currentData.map((obj, ind) => {
                     const { _id, name, rno, loc } = obj
                     return <tr key={"tr_" + ind}>
                        <td>{_id}</td>
                        <td>{name}</td>
                        <td>{rno}</td>
                        <td>{loc}</td>
                        <td><button onClick={() => handleEdit(obj)}>edit</button></td>
                        <td><button onClick={() => handleDelete(obj)}>delete</button></td>
                     </tr>
                  })
               }
            </tbody>
         </table>
         <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={Math.ceil(students.length / perPage)} />

      </div>
   )
}


