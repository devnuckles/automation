import { Link } from "react-router-dom";
import useLogout from "../../platform/users/hooks/useLogout";

export default function LeftNav() {
    const logout = useLogout();
    return (
        <div
            className="col-lg-2 col-md-2 p-0"
            style={{
                borderRight: "1px solid #f2f2f2",
            }}
        >
            <div
                className="dashboard-left"
                style={{
                    position: "fixed",
                }}
            >
                <div className="dashboard-left-header px-3 py-3">
                    <img
                        src="images/Logo.png"
                        className="me-5 img-fluid"
                        alt="Logo"
                    />
                    <img
                        src="images/Collapse.png"
                        alt="Collapse"
                        className="text-end"
                    />
                </div>
                <div className="dashboard-left-nav px-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <span className="icon">
                                <i className="bi bi-grid"></i>
                            </span>

                            <Link
                                className="nav-link active left-nav-link"
                                to="/projects" // Provide a valid URL
                            >
                                Projects
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span className="icon">
                                <i className="bi bi-person-fill"></i>
                            </span>
                            <Link
                                className="nav-link left-nav-link"
                                to="/user-management"
                            >
                                User Management
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span className="icon">
                                <i className="bi bi-house"></i>
                            </span>
                            <Link
                                className="nav-link left-nav-link"
                                to="/flat-management"
                            >
                                Flat Management
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span className="icon">
                                <i className="bi bi-house"></i>
                            </span>
                            <a className="nav-link left-nav-link" href="/dummy">
                                Recycle Bin
                            </a>
                        </li>
                        <li className="nav-item">
                            <span className="icon">
                                <i className="bi bi-house"></i>
                            </span>
                            <a className="nav-link left-nav-link" href="/dummy">
                                Recycle Bin
                            </a>
                        </li>
                    </ul>
                </div>
                <div
                    onClick={logout}
                    className="dashboard-left-logout text-center"
                >
                    <a>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
