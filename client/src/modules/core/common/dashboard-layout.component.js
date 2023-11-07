import React from "react";
import LeftNav from "../../platform/dashboard/components/left-navbar.component";
import TopNav from "../../platform/dashboard/components/top-nav.component";

const DashboardLayout = ({ children }) => {
    return (
        <div className="container-cs">
            <div className="row">
                <LeftNav />

                <div className="col-lg-10 col-md-10 p-0">
                    <div className="dashboard-right-header">
                        <TopNav />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
