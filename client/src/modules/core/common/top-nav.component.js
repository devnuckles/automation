import React, { useState, useEffect } from "react";
import { ProfileDropdown } from "../../platform/users";

export default function TopNav() {
    const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
        useState(false);
    const [isTopNavFixed, setIsTopNavFixed] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownVisible(!isProfileDropdownVisible);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 60;
            setIsTopNavFixed(scrollPosition > threshold);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`row dashboard-right-top-nav${
                isTopNavFixed ? " fixed-top" : ""
            }`}
        >
            <div className="col-lg-8 col-md-8 dashboard-right-heading">
                <h2 className="m-0">Projects</h2>
            </div>

            <div className="col-lg-4 col-md-4 dashboard-right-tools">
                <div className="col-lg-3 col-md-3 tools-icon float-start">
                    <i className="bi bi-bell me-3"></i>
                    <i className="bi bi-gear "></i>
                </div>
                <div
                    className="col-lg-9 col-md-9 dashboard-right-profile float-start position-relative"
                    onClick={toggleProfileDropdown}
                >
                    <div className="float-start">
                        <img src="images/Profile.png" alt="User Profile" />
                    </div>
                    <div className="ms-3 top-nav-profile-section float-start">
                        <h3>Asfak Mahmud</h3>
                        <p className="m-0">asfakmahmudbd@gmaill.com</p>
                        {isProfileDropdownVisible && <ProfileDropdown />}
                    </div>
                </div>
            </div>
        </div>
    );
}
