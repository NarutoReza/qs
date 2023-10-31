import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import './tags.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Edit = () => {
    const navigate = useNavigate()
    
    if(!cookies.get('username')){
        navigate('/')
    }
    else{
        console.log("ok cookie")
    }

    const { id } = useParams()
    console.log(id)

    const [ data, setData ] = useState({
        title: "",
        category: "",
        sub_category: "",
        price: "",
        tags: [''],
        username: cookies.get('username')
    })

    console.log(data)

    const [ tags, setTags ] = useState([])

    console.log(tags)

    useEffect(() => {
        axios
            .get(`http://localhost:8080/view/${id}`)
            .then(({data}) => {
                setTags(data[0].tags)
            })
    },[])
    
    useEffect(() => {
        axios
            .get(`http://localhost:8080/view/${id}`)
            .then(({data}) => {
                setData(data[0])
            })
    },[])

    const handleKeyDown = e => {
        if(e.key !== 'Enter') return

        const value = e.target.value
        if(!value.trim()) return

        setTags([...tags, value])
        e.target.value = ''
    }

    const handleChange = e => {
        setData({
            ...data, tags: tags
        })
    }

    const removeTag = index => {
        setTags(tags.filter((el, i) => i !== index))
    }

    const updateData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const emp = (demo) => {
        axios
            .patch(`http://localhost:8080/update/${id}`, demo)
            .then(res => console.log('Ok'))
            .catch(err => console.log(err))
    }

    const submit = e => {
        e.preventDefault();
        if (isNaN(data.price)) {
            //if input is not a number then here
            alert('Price is not a Number');
        }
        else{
            //if input is number then here
            emp(data)
            alert("Data Added Successfully")
            window.location.href='http://localhost:3000/'
        }
        
        
    }

    console.log(data)
    return(
        <>
            <div className="container">
                <div className="box">
                    <div className="col-sm-6">
                        <form onSubmit={submit} onKeyPress={e => {
                                if (e.key === 'Enter') e.preventDefault();
                            }}>

                            <div className='form-group'>
                                <label for='title'>Title</label>

                                <input type='text' className='form-control my-3' autoFocus required name='title' placeholder='Enter your product title' onChange={updateData} defaultValue={data.title} />
                            </div>
                            
                            <div className='form-group'>
                                <label for='category'>Category</label>

                                <input type='text' className='form-control my-3' autoFocus required name='category' placeholder='Enter your product category' onChange={updateData} defaultValue={data.category} />
                            </div>

                            <div className='form-group'>
                                <label for='sub_category'>Sub-Category</label>

                                <input type='text' className='form-control my-3' autoFocus required name='sub_category' placeholder='Enter your product sub-category' onChange={updateData} defaultValue={data.sub_category} />
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

                                    <input onKeyDown={handleKeyDown} onKeyPress={handleChange} autoFocus type="text" placeholder="Enter your product tags" className="tags-input form-control my-3" />
                                </div>
                            </div>

                            <div className='form-group'>
                                <label for='price'>Price</label>

                                <input type='text' className='form-control my-3' autoFocus required name='price' placeholder='Enter your product price' onChange={updateData} defaultValue={data.price} />
                            </div>

                            <div className='buttons'>
                                <button className='btn btn-outline-info'>Edit Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit