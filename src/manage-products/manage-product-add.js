import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {FileUploader} from "react-drag-drop-files";
import axios from "axios";
import {toast} from "react-toastify";

function ManageProductAdd({show,handleClose,handleShow,data,loader,cancelLoader,update,mode}) {

    const [file, setFile] = useState(null);
    const fileTypes = ["JPG", "PNG", "GIF"];

    const [values, setValues] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChangeInput = (event) => {
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    }

    useEffect(()=>{
        if(!data){
            setValues({})
            return
        }
        console.log(data)
        setValues(data)
    },[data])



    useEffect(()=>{
        if(!isSubmit){
            return
        }
        console.log(isSubmit)
        loader()
        if(values._id){
            if(file){
                const data = new FormData()
                data.append("file",file)
                data.append("upload_preset","xzut8iv8")
                data.append("cloud_name","dyzqfle8h")
                axios.put("https://api.cloudinary.com/v1_1/dyzqfle8h/image/upload",data)
                    .then((res)=>{
                        console.log(res.data.url)
                        values.img = res.data.url
                        axios.put("http://localhost:5000/product/update",values)
                            .then((res) => {
                            }).finally(()=>{
                            update()
                            cancelLoader()
                            setIsSubmit(false)
                            toast("Updated Successfully!");
                            setFile(null)
                        })
                    })
            }else {
                axios.put("http://localhost:5000/product/update", values)
                    .then((res) => {
                    }).finally(() => {
                    update()
                    cancelLoader()
                    setIsSubmit(false)
                    toast("Updated Successfully!");
                    setFile(null)
                })
            }
        }else {
            const data = new FormData()
            data.append("file",file)
            data.append("upload_preset","xzut8iv8")
            data.append("cloud_name","dyzqfle8h")
            axios.post("https://api.cloudinary.com/v1_1/dyzqfle8h/image/upload",data)
                .then((res)=>{
                    console.log(res.data.url)
                    values.img = res.data.url
                    axios.post("http://localhost:5000/product",values)
                        .then((res) => {
                        }).finally(()=>{
                        update()
                        cancelLoader()
                        setIsSubmit(false)
                        toast("Created Successfully!");
                    })
                })

        }

    },[isSubmit])
    const handleChange = (file) => {
        setFile(file);
    };

    console.log(file)
    return (
        <>
            <Modal show={show} onHide={handleClose}  centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{mode === "edit"? "Edit":mode === "view"? "View": "Add"} Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <div className="mb-3">
                                <input type="email" disabled={mode === "view"} className="form-control"value={values.name} name={"name"}  onChange={handleChangeInput} id="exampleFormControlInput1"
                                       placeholder="Enter product name" required={true}/>
                            </div>
                        </div>
                        <div className={"col-md-6"}>
                            <div className="mb-3">
                                <input type="email" disabled={mode === "view"} className="form-control"value={values.price} name={"price"}  onChange={handleChangeInput} id="exampleFormControlInput1"
                                       placeholder="Enter price"/>
                            </div>
                        </div>
                        <div className={"col-md-6"}>
                            <div className="mb-3">
                                <input type="email" disabled={mode === "view"} className="form-control" value={values.quantity} name={"quantity"} onChange={handleChangeInput} id="exampleFormControlInput1"
                                       placeholder="Enter available quantity"/>
                            </div>
                        </div>
                        <div className={"col-md-6"}>
                            <div className="mb-3">
                                <input type="email" disabled={mode === "view"} className="form-control" value={values.brand} name={"brand"}  onChange={handleChangeInput} id="exampleFormControlInput1"
                                       placeholder="Enter Brand"/>
                            </div>
                        </div>
                        <div className={"col-md-12"}>
                            <div className="form-floating mb-3">
                                <textarea className="form-control" placeholder="Enter Description" value={values.description} name={"description"} onChange={handleChangeInput}
                                          id="floatingTextarea" disabled={mode === "view"}></textarea>
                                <label htmlFor="floatingTextarea">Description</label>
                            </div>
                        </div>
                        {mode !== "view" &&<div className={"col-md-12"}>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} fileOrFiles={null}
                                          multiple={false}/>
                        </div>}
                        {
                            mode === "view" && <img src={values.img}/>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=> {
                        handleClose()
                        setIsSubmit(true)
                    }}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ManageProductAdd;
