/* eslint-disable no-underscore-dangle */
/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ service }) => (
    <div className="col-lg-4 col-sm-6">
        <Link to={`/order/${service._id}`}>
            <div className="vn-works-card">
                <img style={{ maxWidth: '100%' }} src={service.img} alt="task" />
                <h4>{service.name}</h4>
                <div className="task-p">
                    <p>{service.description}</p>
                    <p>${service.price}</p>
                </div>
            </div>
        </Link>
    </div>
);

export default Card;
