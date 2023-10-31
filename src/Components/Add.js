import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './tags.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Add = () => {
    const navigate = useNavigate()
    
    if(!cookies.get('username')){
        navigate('/')
    }
    else{
        console.log("ok cookie")
    }

    const [ tags, setTags ] = useState([])

    //console.log(tags)

    const handleKeyDown = e => {
        if(e.key !== 'Enter') return

        const value = e.target.value
        if(!value.trim()) return

        setTags([...tags, value])
        e.target.value = ''
    }

    const [ data, setData ] = useState({
        title: "",
        categoty: "",
        sub_category: "",
        price: "",
        tags: [''],
        username: cookies.get('username')
    })

    useEffect(() => {
        setData({
            ...data,
            tags: tags
        })
    })

    const removeTag = index => {
        setTags(tags.filter((el, i) => i !== index))
    }

    console.log(data)
    console.log(data.tags)

    const updateData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const emp = (demo) => {
        axios
            .post('http://localhost:8080/add', demo)
            .then(res => console.log('Ok'))
            .catch(err => console.log(err))
    }

    const submit = e => {
        e.preventDefault()
        
            emp(data)
            alert("Data added successfully")
            window.location.href='http://localhost:3000/'
    }
    return(
        <>
            <div className="container">
                <div className="box">
                    <div className="col-sm-6">
                        <form onSubmit={submit}>
                            <div className='form-group'>
                                <label for='title'>Title</label>

                                <input type='text' className='form-control my-3' autoFocus required name='title' placeholder='Enter your product title' onChange={updateData} />
                            </div>
                            
                            <div className='form-group'>
                                <label for='category'>Category</label>

                                <input type='text' className='form-control my-3' autoFocus required name='category' placeholder='Enter your product category' onChange={updateData} />
                            </div>

                            <div className='form-group'>
                                <label for='sub_category'>Sub-Category</label>

                                <input type='text' className='form-control my-3' autoFocus required name='sub_category' placeholder='Enter your product sub-category' onChange={updateData} />
                            </div>

                            <div className='form-group'>
                                <label for='tags'>Tags</label>

                                <div className="tags-input-container">
                                    { tags && tags.map((tag, index) => {
                                        return(
                                            <div className="tag-item" key={index}>
                                                <a className="text">{tag}</a>
                                                <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                            </div>
                                        )
                                    })}

                                    <input onKeyDown={handleKeyDown} autoFocus type="text" placeholder="Enter your product tags" className="tags-input form-control my-3" />
                                </div>
                            </div>

                            <div className='form-group'>
                                <label for='price'>Price</label>

                                <input type='number' className='form-control my-3' autoFocus required name='price' placeholder='Enter your product price' onChange={updateData} />
                            </div>

                            <div className='buttons'>
                                <button className='btn btn-outline-info'>Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add