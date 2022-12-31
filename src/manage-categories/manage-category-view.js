import React, {useEffect, useState} from 'react';
import ManageCategoryAdd from "./manage-category-add";
import Loader from "../components/loader";
import axios from "axios";
import {toast} from "react-toastify";

function ManageCategoryView(props) {
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
        axios.get("http://localhost:5000/info")
            .then((res) => {
                const result = res.data.map(({__v,...rest}) => ({...rest}));
                setData(result)
            }).finally(()=>{
                setLoading(false)
        })
    }, [update])



    function deleteData(id) {
        setLoading(true)
        axios.delete("http://localhost:5000/info/del/"+id)
            .then((res) => {
                // setData(res.data)
                toast("Deleted Successfully!");
            }).finally(()=>{
            setLoading(false)
            updateData()
        })
    }
    function onEdit(data) {
        setSelectedData(data)
        setShow(true)
        setMode("edit")

    }
    function onView(data) {
        setSelectedData(data)
        setShow(true)
        setMode("view")
    }
    return (
        <div>
            <Loader loading={loading}/>
            <h1>Manage Categories</h1>
            <button type="button" className="btn btn-primary my-5" onClick={() => setShow(true)}>Create Category
            </button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col" className={"w-25"}>#</th>
                    <th scope="col" className={"w-25"}>Category</th>
                    <th scope="col" className={"w-25"}>Sub Category</th>
                    <th scope="col" className={"w-25"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.length> 0 && data.map((item,index)=>(<tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{item.category}</td>
                    <td>{item.subCategory}</td>
                    <td>
                        <button className={"btn btn-primary mx-3"} onClick={()=>onView(item)}>View</button>
                        <button className={"btn btn-primary mx-3"} onClick={()=>onEdit(item)}>Edit</button>
                        <button className={"btn btn-primary mx-3"} onClick={()=>deleteData(item._id)}>Delete</button>
                    </td>
                </tr>))}

                </tbody>
            </table>
            <ManageCategoryAdd mode={mode} data={selectedData} handleShow={handleShow} handleClose={handleClose} show={show} loader={handleShowLoader} cancelLoader={handleCloseLoader} update={updateData}/>
        </div>
    );
}

export default ManageCategoryView;