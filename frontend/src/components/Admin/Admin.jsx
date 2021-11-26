/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/** @format */

import React, { useEffect, useState } from 'react';
import plus from '../../images/logos/plus.png';
import AddService from './AddService';
import './Admin.css';
import ManageOrder from './ManageOrder';

const AdminDashboard = () => {
    const [manageOrder, setManageOrder] = useState([]);
    const [show, setShow] = useState(false);

    const [toggleView, setToggleView] = useState({
        showAddService: false,
        manageOrder: true,
    });

    // Get All orders
    useEffect(() => {
        if (toggleView.manageOrder) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`)
                .then((res) => res.json())
                .then((data) => setManageOrder(data));
        }
    }, [toggleView.manageOrder]);

    // Delete a user Order
    const handleDeleteEvent = (id) => {
        console.log('delete clicked', id);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result, 'Task deleted');
                if (result) {
                    const newOrders = manageOrder.filter((task) => task._id !== id);
                    setManageOrder(newOrders);
                }
            });
        setShow(false);
    };

    // toggle add service
    const handleAddService = () => {
        setToggleView({
            ...toggleView,
            showAddService: true,
            manageOrder: false,
        });
    };

    // toggle  manageOrders
    const handleManageOrder = () => {
        setToggleView({
            ...toggleView,
            showAddService: false,
            manageOrder: true,
        });
    };

    const style = {
        primary: {
            color: '#3f90fc',
        },
        default: {
            color: '#000000',
        },
    };

    return (
        <div className="container-fluid">
            <div className="vn-admin-dashboard px-lg-5 px-0">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="admin-controls py-3 d-flex flex-lg-column">
                            <button
                                className="btn"
                                onClick={handleManageOrder}
                                style={toggleView.manageOrder ? style.primary : style.default}
                            >
                                <img src={plus} style={{ maxWidth: '17px' }} alt="" />
                                <span>Manage Orders</span>
                            </button>
                            <button
                                className="btn"
                                onClick={handleAddService}
                                style={toggleView.showAddService ? style.primary : style.default}
                            >
                                <img src={plus} style={{ maxWidth: '17px' }} alt="" />
                                <span>Add Service</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {toggleView.manageOrder && (
                            <ManageOrder
                                orders={manageOrder}
                                deleteHandler={handleDeleteEvent}
                                show={show}
                                setShow={setShow}
                            >
                                {' '}
                            </ManageOrder>
                        )}
                        {toggleView.showAddService && <AddService />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
