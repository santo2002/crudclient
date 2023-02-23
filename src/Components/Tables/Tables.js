import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { NavLink } from 'react-router-dom';
import "./table.css";
import { BASE_URL } from '../../Services/helper';
import { statusChangeFunction } from '../../Services/Apis';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Paginations from '../Pagination/Paginations';


const Tables = ({ userdata, deleteUser, userget, handlePrevious, handleNext, page, pageCount, setPage }) => {

    const handleChange = async (id, status) => {
        const res = await statusChangeFunction(id, status)
        if (res.status === 200) {
            userget();
            toast.success("Status updated")
        } else {
            toast.error("Error !")
        }
    }

    return (
        <>
            <div className="container">
                <Row>
                    <div className="col mt-0">
                        <Card className='shadow'>
                            <Table className='align-items-center' responsive="sm">
                                <thead className='thead-dark'>
                                    <tr className='table-dark'>
                                        <th>NO</th>
                                        <th>FullName</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>&nbsp;&nbsp;&nbsp;Status</th>
                                        <th>Profile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <>
                                        {
                                            userdata.length > 0 ? userdata.map((element, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1 + (page - 1) * 4}</td>
                                                        <td>{`${element.fname} ${element.lname}`}</td>
                                                        <td>{element.email}</td>
                                                        <td>{element.gender == "Male" ? 'M' : 'F'}</td>
                                                        <td className='d-flex align-items-center'>
                                                            <Dropdown className='text-center'>
                                                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                                                    <Badge bg={element.status === "Active" ? "success" : 'danger'}>
                                                                        {element.status}  <i class="fa-solid fa-angle-down"></i>
                                                                    </Badge>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                        <td className='img_parent'>
                                                            <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                                                        </td>
                                                        <td>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item >
                                                                        <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                                                            <i class="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                                                        </NavLink>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item >
                                                                        <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                                                            <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                                                        </NavLink>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item >
                                                                        <div onClick={() => deleteUser(element._id)}>
                                                                            <i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <div className='no_data text-center'>NO Data Found</div>
                                        }

                                    </>
                                </tbody>
                            </Table>
                            <Paginations
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                page={page}
                                pageCount={pageCount}
                                setPage={setPage}
                            />
                        </Card>
                    </div>
                </Row>
                <ToastContainer />
            </div>
        </>
    )
}

export default Tables;
