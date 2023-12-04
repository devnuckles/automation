import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const LoginSlider = () => {
    return (
        <Carousel
            autoPlay={true}
            emulateTouch={true}
            infiniteLoop={true}
            showIndicators={false}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            dynamicHeight={true}
        >
            <div>
                <img
                    src="../images/login/project-manager.png"
                    alt="Slide 1"
                    className="login-slider-image img-fluid"
                />
            </div>
            <div>
                <img
                    src="../images/login/time-tracking.png"
                    alt="Slide 2"
                    className="login-slider-image img-fluid"
                />
            </div>
            <div>
                <img
                    src="../images/login/materials-management.png"
                    alt="Slide 3"
                    className="login-slider-image img-fluid"
                />
            </div>
            <div>
                <img
                    src="../images/login/document-management.png"
                    alt="Slide 3"
                    className="login-slider-image img-fluid"
                />
            </div>
            <div>
                <img
                    src="../images/login/accounts-management.png"
                    alt="Slide 3"
                    className="login-slider-image img-fluid"
                />
            </div>
        </Carousel>
    );
};

export default LoginSlider;
