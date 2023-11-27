import React, { useState } from "react";
import { ProfileDropdown } from "../../platform/users";

export default function TopNav() {
    const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
        useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownVisible(!isProfileDropdownVisible);
    };

    return (
        <div className="row dashboard-right-top-nav">
            <div className="col-lg-8 col-md-8 dashboard-right-heading">
                <h2>Projects</h2>
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
                        <img src="images/profile.png" alt="User Profile" />
                    </div>
                    <div className="ms-3 top-nav-profile-section float-start">
                        <h3>Asfak Mahmud</h3>
                        <p>asfakmahmudbd@gmaill.com</p>
                        {isProfileDropdownVisible && <ProfileDropdown />}
                    </div>
                </div>
            </div>
        </div>
    );
}
