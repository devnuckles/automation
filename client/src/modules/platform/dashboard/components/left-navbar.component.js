import { Link } from "react-router-dom";

export default function LeftNav() {
    return (
        <div className="col-lg-2 col-md-2 p-0">
            <div
                className="dashboard-left"
                style={{
                    position: "fixed",
                    borderRight: "1px solid #f2f2f2",
                }}
            >
                <div className="dashboard-left-header px-3 py-3">
                    <img
                        src="images/Logo.png"
                        className="me-5 img-fluid"
                        alt="Logo"
                    />
                    <img src="images/Collapse.png" alt="Collapse" />
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
                                <i class="bi bi-house"></i>
                            </span>
                            <a className="nav-link left-nav-link" href="/dummy">
                                Flats Management
                            </a>
                        </li>
                        <li className="nav-item">
                            <span className="icon">
                                <i class="bi bi-house"></i>
                            </span>
                            <a className="nav-link left-nav-link" href="/dummy">
                                Recycle Bin
                            </a>
                        </li>
                        <li className="nav-item">
                            <span className="icon">
                                <i class="bi bi-house"></i>
                            </span>
                            <a className="nav-link left-nav-link" href="/dummy">
                                Recycle Bin
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="dashboard-left-logout text-center">
                    <a>
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
