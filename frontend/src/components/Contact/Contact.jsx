/* eslint-disable react/button-has-type */
import React from 'react';
import './Contact.css';

const Contact = () => (
    <div className="contact">
        <div className="container">
            <div className="title ">
                <h1>Contact us form</h1>
            </div>
            <div className="contact-form">
                <div className="input-fields">
                    <input type="text" className="input" placeholder="Name" />
                    <input type="text" className="input" placeholder="Email Address" />
                    <input type="text" className="input" placeholder="Phone" />
                    <input type="text" className="input" placeholder="Subject" />
                </div>
                <div className="msg">
                    <textarea placeholder="Message" />
                    <button className="btn btn-primary">send</button>
                </div>
            </div>
        </div>
    </div>
);

export default Contact;
