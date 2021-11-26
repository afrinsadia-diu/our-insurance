/* eslint-disable react/button-has-type */
import React from 'react';
import './About.css';

const About = () => (
    <div className="about-part">
        <h1 className="head-color text-center pb-5">About Us</h1>
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <div className="">
                        <img
                            className="img-fluid"
                            src="https://motors.stylemixthemes.com/wp-content/uploads/2021/03/01-20-825x483.jpg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="">
                        <h3 className="about-p ">Our Insurance - United States </h3>
                        <p className="about-d">
                            We take clarity and simplicity very seriously, reason for which we
                            ensure straight forward terminology free form unnecessary complexity.
                            and Acquiring Insurance proves to be a lengthy complicated process.
                            Tameeni musters Offers from Insurance Companies relieving you from the
                            burden of seeking Insurance companies yourself for convenient offers.
                            and Customer engagement is what we stand for! The technical and legal
                            expertise we are keen to employ for your inquiries is at your disposal
                            when needed. Policy pricing is guaranteed to match that of the Insurance
                            Company itself if not less. It is how we roll. Customer engagement is
                            what we stand for! The technical and legal expertise we are keen to
                            employ for your inquiries is at your disposal when needed.
                        </p>
                        <button className="btn btn-primary">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default About;
