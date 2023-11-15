import TopNav from "./top-nav.component.js";
import LeftNav from "./left-nav.component.js";

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
