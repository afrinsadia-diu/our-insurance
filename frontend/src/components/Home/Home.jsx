/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/** @format */

import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useHistory } from 'react-router-dom';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Card from './Card';
import './Home.css';

const useStyles = makeStyles({
    root: {
        width: 1000,
    },
});

const Home = () => {
    const classes = useStyles();
    const [services, setServices] = useState([]);
    // const [filter, setFilter] = useState('');

    // Get All Services
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/services`)
            .then((res) => res.json())
            // eslint-disable-next-line no-shadow
            .then((data) => {
                console.log(data.length);
                setServices(data);
            });
    }, []);

    const history = useHistory();
    const images = [
        {
            img: 'slider/slider1.jpg',
            text: 'One-shop-stop for Insurance',
            heading: 'First insurance platform',
        },
        {
            img: 'slider/slider2.jpg',
            text: 'Technical and Legal Expertise',
            heading: '20+ Insurance Companies',
        },
        {
            img: 'slider/slider2.jpg',
            text: 'Transparency and Clarity',
            heading: 'Widest Range of options',
        },
    ];
    return (
        <div className="home">
            <div>
                <Carousel showThumbs={false} showStatus={false}>
                    {images.map((image) => (
                        <div className="silder-rapper">
                            <img src={image.img} className="silder-image" />
                            <div className="slider-content">
                                <h2>{image.heading}</h2>
                                <p>{image.text}</p>
                                <button
                                    onClick={() => history.push('/login')}
                                    className="slider-button btn btn-primary"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="">
                <About />
            </div>
            <main className="vn-home pt-5 mt-2">
                <div className="container text-center">
                    <div className="vn-works-search">
                        <h2 className="display-5 mb-4">Our Services</h2>
                    </div>
                    <div className="vn-works py-5 mt-2">
                        {services.length ? (
                            <div className="row">
                                {services.map((service) => (
                                    <Card service={service} key={Math.random()} />
                                ))}
                            </div>
                        ) : (
                            <div className={classes.root}>
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 ">
                                        <Skeleton variant="rect" height={250} animation="wave" />
                                        <Skeleton variant="text" height={30} animation="wave" />
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <Skeleton variant="rect" height={250} animation="wave" />
                                        <Skeleton variant="text" height={30} animation="wave" />
                                    </div>
                                    <div className="col-lg-3 col-sm-6 ">
                                        <Skeleton variant="rect" height={250} animation="wave" />
                                        <Skeleton variant="text" height={30} animation="wave" />
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <Skeleton variant="rect" height={250} animation="wave" />
                                        <Skeleton variant="text" height={30} animation="wave" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <div className="">
                <Contact />
            </div>
        </div>
    );
};

export default Home;
