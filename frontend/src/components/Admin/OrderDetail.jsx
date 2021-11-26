/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/** @format */

import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import trash from '../../images/logos/trash-2.png';
import Loader from '../../Spinner';

const OrderDetail = ({ order, deleteHandler, show, setShow }) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pending, setPending] = useState(order.status.toLowerCase() === 'pending');
    const [loading, setLoading] = useState(false);
    const statusHandler = (e) => {
        setLoading(true);
        setPending(!pending);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order/${order._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: e.target.value,
                id: order._id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    setLoading(false);
                }
            });
    };

    return (
        <>
            <tr style={{ fontWeight: '400' }}>
                <td>{order.product.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.location}</td>
                <td>
                    <button className="btn btn-danger" onClick={handleShow}>
                        <img src={trash} alt="delete" style={{ width: '21px' }} />
                    </button>
                </td>
                <td>
                    {loading ? (
                        <Loader />
                    ) : (
                        pending && (
                            <Form.Control
                                style={{ width: '137px', textAlign: 'center' }}
                                as="select"
                                className="text-danger"
                                onChange={statusHandler}
                            >
                                <option selected style={{ color: '#FF4545' }}>
                                    Pending
                                </option>
                                <option style={{ color: '#009444' }}>Complete</option>
                            </Form.Control>
                        )
                    )}
                    {!pending && (
                        <Form.Control
                            style={{ width: '137px', textAlign: 'center' }}
                            className="text-success"
                            as="select"
                            onChange={statusHandler}
                        >
                            <option style={{ color: '#FF4545' }}>Pending</option>
                            <option selected style={{ color: '#009444' }}>
                                Complete
                            </option>
                        </Form.Control>
                    )}
                </td>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Attention!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you want to delete this?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => deleteHandler(order._id)}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        </>
    );
};

export default OrderDetail;
