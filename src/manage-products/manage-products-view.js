import React, {useEffect, useState} from 'react';
import ManageProductAdd from "./manage-product-add";
import axios from "axios";
import Loader from "../components/loader";
import {toast} from "react-toastify";

function ManageProductsView(props) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [mode, setMode] = useState("create");

    const handleClose = () => {
        setShow(false)
        setSelectedData(null)
        setMode("create")
    };
    const handleCloseLoader = () => setLoading(false);
    const handleShowLoader = () => setLoading(true);
    const updateData = () => setUpdate(!update);
    const handleShow = () => setShow(true);

    useEffect(() => {

        setLoading(true)
        axios.get("http://localhost:5000/product")
            .then((res) => {
                const result = res.data.map(({__v,...rest}) => ({...rest}));
                setData(result)
            }).finally(()=>{
            setLoading(false)
        })
    }, [update])

    console.log(data)

    function onView (items){
        setSelectedData(items)
        setShow(true)
        setMode("view")
    }
    function onEdit (items){
        setSelectedData(items)
        setShow(true)
        setMode("edit")
    }
    function deleteData (id){
        setLoading(true)
        axios.delete("http://localhost:5000/product/del/"+id)
            .then((res) => {
                // setData(res.data)
                toast("Deleted Successfully!");
            }).finally(()=>{
            setLoading(false)
            updateData()
        })
    }

    return (
        <div>
            <Loader loading={loading}/>
            <h1>Manage Products</h1>
            <button type="button" className="btn btn-primary my-5" onClick={()=>setShow(true)}>Create Product</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item,index)=>(<tr key={index+1}>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.brand}</td>
                    <td>{item.description}</td>
                    <td>
                        <button className={"btn btn-primary mx-3"} onClick={()=>onView(item)}>View</button>
                        <button className={"btn btn-primary mx-3"} onClick={()=>onEdit(item)}>Edit</button>
                        <button className={"btn btn-primary mx-3"} onClick={()=>deleteData(item._id)}>Delete</button>
                    </td>
                </tr>))}
                </tbody>
            </table>
            <ManageProductAdd mode={mode} data={selectedData} handleShow={handleShow} handleClose={handleClose} show={show} loader={handleShowLoader} cancelLoader={handleCloseLoader} update={updateData}/>

        </div>
    );
}

export default ManageProductsView;