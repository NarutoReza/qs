import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!cookies.get('username')){
            navigate('/login')
        }
    })

    const [ search, setSearch ] = useState({
        field: "",
        value: "",
        username: cookies.get('username')
    })

    console.log(search)

    const updateData = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const [ data, setData ] = useState('')
 
    const searchValue = (demo) => {
        axios
            .post('http://localhost:8080/search', demo)
            .then(({ data }) => {
                setData(data)
            })
    }

    console.log(data)

    const [show, setShow] = useState('none');
    
    const submit = e => {
        e.preventDefault()
        searchValue(search)
        setShow('block')
    }

    const close = e => {
        e.preventDefault()
        setShow('none')
    }

    return(
        <>
            <div className="container">
                <div className="box">
                    <div className="col-sm-12">
                        <form onSubmit={submit}>
                            <div className='form-group d-flex justify-content-center'>
                                <select  name="field" className='form-control my-3' autoFocus required onChange={updateData} style={{width: '150px', "margin-right": "10px"}}>
                                    <option value="" selected disabled hidden>Select to search by</option>
                                    <option value="category">Category</option>
                                    <option value="sub_category">Sub-Category</option>
                                    <option value="title">Title</option>
                                    <option value="price">Price</option>
                                    <option value="tags">Tag</option>
                                </select>

                                <input type='text' className='form-control my-3' autoFocus required name='value' placeholder='Search...' onChange={updateData} />

                                <button className="btn btn-outline-info" style={{width: '100px', margin: "17px 10px 17px 10px"}}>Search</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-sm-12" style={{ display: `${show}` }}>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Title</td>
                                        <td>Price</td>
                                        <td>Category</td>
                                        <td>Sub-Category</td>
                                        <td>Tags</td>
                                        <td>Update</td>
                                        <td>Delete</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data && data.map((item) => {
                                        return(
                                            <tr key={item._id}>
                                                <td>{item.title}</td>
                                                <td>{item.price}</td>
                                                <td>{item.category}</td>
                                                <td>{item.sub_category}</td>
                                                <td>{item.tags.map((i) => {
                                                    return(
                                                        i + ', '
                                                    )
                                                })}</td>
                                                <td>
                                                    <button  className="btn btn-outline-info" onClick={() => window.location.href = `http://localhost:3000/edit/${item._id}`}>Edit</button>
                                                </td>
                                                <td>
                                                    <button  className="btn btn-outline-info" onClick={() => window.location.href = `http://localhost:3000/delete/${item._id}`}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className='form-group d-flex justify-content-center'>
                            <form onSubmit={close}>
                                <button className="btn btn-outline-info">❌</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home