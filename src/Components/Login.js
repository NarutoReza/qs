import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Login = () => {
    const navigate = useNavigate()
    
    if(cookies.get('username')){
        navigate('/')
    }
    else{
        console.log("no cookie")
    }

    const [ user, setUser ] = useState({
        username: "",
        password: ""
    })

    const updateData = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    console.log(user)

    const [ data, setData ] = useState("")

    const emp = (demo) => {
        axios
            .post("http://localhost:8080/login", demo)
            .then(({ data }) => {
                setData("OK")
            })
            .catch(err => console.log(err))
    }

    useEffect( () => {
        emp(user)
    })

    console.log(data)

    const submit = e => {
        e.preventDefault()
        if(data == "OK"){
            setData("")
            cookies.set('username', user.username, { path: '/' })
            cookies.set('password', user.password, { path: '/' })
            window.location.href='http://localhost:3000/'
        }
        else{
            console.log("Not ok")
            setData("")
            alert("Please enter correct email and password")
            emp(user)
        }
    }

    return(
        <>
            <div className='container' >
                <div className='box'>
                    <div className='col-sm-6 '>
                        <form onSubmit={submit}>
                            <div className='form-group'>
                                <label for='username'>Username</label>

                                <input type='text' className='form-control my-3' autoFocus required name='username' placeholder='Enter your username' onChange={updateData} />
                            </div>

                            
                            <div className='form-group'>
                                <label for='password'>Password</label>

                                <input type='password' className='form-control my-3' autoFocus required name='password' placeholder='Enter your password' onChange={updateData} />
                            </div>

                            <div className='buttons'>
                                <button className='btn btn-outline-info'>Log In</button>
                            </div>
                        </form>

                        <div className='extra' style={{display: "flex"}}>
                            <p style={{color: "blue"}}>Do Not Have an Account?</p>
                            &nbsp; &nbsp;
                            <a style={{color: "blue"}} onClick={() => {navigate('/signup')}}>Sing Up!</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login