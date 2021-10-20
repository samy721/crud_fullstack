import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Filter } from "../components/filtercomp";
import { Paginate } from "../components/pagination";
import { Sort } from "../components/sortcomp";
import { Context } from "../contextapi/context";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { UserForm } from "../components/form";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const AllUsers = () => {

    const { filter, sort } = useContext(Context)

    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(1);
    const [pageno, setPageno] = useState(1);
    const [listloading, setListloading] = useState(true)
    const [deleting, setDeleting] = useState(false)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePageno = (e) => {
        setPageno(e)
    }

    const handleDelete = async (id, i) => {
        setDeleting(i)
        await axios.delete(`http://localhost:1221/users/${id}`)
            .then(({ data }) => {

                setDeleting(false)
                getUsers()
            })
            .catch((err) => console.log(err))
    }

    const getUsers = () => {

        const query = {
            name: filter.name,
            age: filter.age,
            gender: filter.gender,
            city: filter.city,
            sort: sort.sortby,
            order: sort.order
        }

        axios.get(`http://localhost:1221/users?name=${query.name}&page=${pageno}&age=${query.age}&gender=${query.gender}&city=${query.city}&sort=${query.sort}&order=${query.order}`)
            .then(({ data }) => {

                setItems(data.users)
                setpageCount(data.totalPages)
                setListloading(false)
            })
            .catch((err) => console.log(err))

    }

    useEffect(() => {
        setListloading(true)
        getUsers()
    }, [filter, sort, pageno])

    return (
        <div className="d-flex flex-row">
            <div className="container">
                <div style={{ paddingTop: "20px", paddingBottom: "20px" }} className="d-flex justify-content-between">
                    <h2>Users</h2>
                    <button type="button" onClick={handleOpen} className="btn btn-primary">Create User</button>
                </div>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                             <UserForm/>
                        </Box>
                    </Modal>
                </div>
                <Paginate totalPages={pageCount} handlePageChange={handlePageno} />
                <div style={{ transition: "ease 3sec all" }} className="d-flex justify-content-center row ">
                    {listloading ? <div style={{ height: listloading ? "300px" : "auto", alignItems: "center" }} className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : items.map((item, i) => {
                        return (
                            <div key={item.id} style={{ transition: "ease 3sec all" }} className="col-sm-6 col-md-4 v my-2">
                                <div className="card shadow-sm w-100">
                                    <div className="card-body">
                                        <h6 className="card-title text-center h4">{((pageno - 1) * 10 + i + 1)}</h6>
                                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }} className="gap-3 d-flex flex-wrap justify-content-center">
                                            <h6 className="card-subtitle mb-2 ">
                                                {item.name}
                                            </h6>
                                            <h6 className="card-subtitle mb-2 ">
                                                {item.gender}
                                            </h6>
                                            <h6 className="card-subtitle mb-2 ">
                                                {item.age}
                                            </h6>
                                            <h6 className="card-subtitle mb-2 ">
                                                {item.city}
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <NavLink className="btn btn-link" to={`/updateUser/${item._id}`}>
                                                Edit
                                            </NavLink>
                                            {deleting === i ?
                                                <div className="spinner-border text-danger" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                : <button onClick={() => { handleDelete(item._id, i) }} className="btn btn-danger">
                                                    Delete
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex-d col">
                <Filter />
                <Sort />
            </div>

        </div>
    )
}