import React from "react";

const ProfileDropdown = () => {
    return (
        <div className="profile-dropdown-modal">
            <ul className="list-unstyled profile-info mb-3">
                <li><h2>John E. Grainger</h2></li>
                <li>
                    <a>View my profile </a>
                </li>
            </ul>

            <ul className="list-unstyled profile-edit">
                <li>
                  
                    <a> <i className="bi bi-person-fill me-2"></i> Edit Profile </a>
                </li>
                <li>
                    <a> <i className="bi bi-gear me-2"></i>Change Password </a>
                </li>
            </ul>

            <ul className="list-unstyled profile-sign-out ">
                <li>
                    <a> <i className="bi bi-box-arrow-right me-2"></i>Sign out </a>
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropdown;
