import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";

function ManageCategoryAdd({show,handleClose,update,loader,cancelLoader,data,mode}) {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (event) => {
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    }

    useEffect(()=>{
        if(!data){
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
            axios.put("http://localhost:5000/info/update",values)
                .then((res) => {
                }).finally(()=>{
                setLoading(false)
                update()
                cancelLoader()
                setIsSubmit(false)
                toast("Updated Successfully!");
            })
        }else {
            axios.post("http://localhost:5000/info",values)
                .then((res) => {
                }).finally(()=>{
                setLoading(false)
                update()
                cancelLoader()
                setIsSubmit(false)
                toast("Created Successfully!");
            })
        }

    },[isSubmit])



    return (
        <>
            <Modal show={show} onHide={handleClose}  centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{mode === "view"? "View" :mode === "edit"?"Edit":"Add"} Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <div className="mb-3">
                                <input type="email" disabled={mode === "view"} value={values.category} className="form-control" id="exampleFormControlInput1"
                                       placeholder="Enter main category" onChange={handleChange} name={"category"}/>
                            </div>
                        </div>
                        <div className={"col-md-6"}>
                            <div className="mb-3">
                                <input type="email" disabled={mode === "view"} value={values.subCategory} className="form-control" id="exampleFormControlInput1"
                                       placeholder="Enter sub category" onChange={handleChange} name={"subCategory"}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {mode !== "view" &&<Button variant="primary" onClick={() => {
                        handleClose()
                        setIsSubmit(true)
                    }}>
                        {mode === "edit"? "Update" : "Create"}
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ManageCategoryAdd;