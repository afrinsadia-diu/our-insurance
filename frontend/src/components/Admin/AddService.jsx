/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/** @format */
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddService = () => {
    const [status, setStatus] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/service`, data).then((res) => {
            if (res.data.insertedId) {
                setStatus(!status);
                reset();
            }
        });
    };

    return (
        <div className="admin-add-event">
            <h5 className="display-5 py-md-4 py-0">Add Service</h5>
            {status && (
                <div className="alert alert-success text-center" role="alert">
                    New Service added successfully
                </div>
            )}
            <div className="admin-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="Name">Name</label>
                    <br />
                    <input {...register('name')} placeholder="Name" className="form-control mt-2" />
                    <label htmlFor="Description">Description</label>
                    <br />
                    <input
                        {...register('description')}
                        placeholder="Description"
                        className="form-control mt-2"
                    />
                    <label htmlFor="Prcie">Price</label>
                    <br />
                    <input
                        type="number"
                        {...register('price')}
                        placeholder="price"
                        className="form-control mt-2"
                    />
                    <label htmlFor="img">Image URL</label>
                    <br />
                    <input
                        {...register('img')}
                        placeholder="image url"
                        className="form-control mt-2"
                    />
                    <input type="submit" className="btn btn-primary mt-4" />
                </form>
            </div>
        </div>
    );
};

export default AddService;
