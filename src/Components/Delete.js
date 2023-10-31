import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Delete = () => {
    const navigate = useNavigate()
    
    if(!cookies.get('username')){
        navigate('/')
    }
    else{
        console.log("ok cookie")
    }

    const { id } = useParams()
    console.log(id)
    
    useEffect(() => {
        axios
            .delete(`http://localhost:8080/delete/${id}`)
            .then(() => {
                alert("Data Deleted Successfully")
                window.location.href='http://localhost:3000/'
            })
    })

    return(
        <></>
    )
}

export default Delete