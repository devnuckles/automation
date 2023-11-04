export default function Dashboard() {
    return (
        <div className="row">
            <div className="col-lg-2">
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
                            className="me-5"
                            alt="Logo"
                        />
                        <img src="images/Collapse.png" alt="Collapse" />
                    </div>

                    <div className="dashboard-left-nav">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span className="icon">
                                    <i className="bi bi-grid"></i>
                                </span>

                                <a
                                    className="nav-link active left-nav-link"
                                    href="/dummy" // Provide a valid URL
                                >
                                    Projects
                                </a>
                            </li>
                            <li className="nav-item">
                                <span className="icon">
                                    <i className="bi bi-person-fill"></i>
                                </span>
                                <a
                                    className="nav-link left-nav-link"
                                    href="/dummy"
                                >
                                    User Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dummy">
                                    Flats Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dummy">
                                    Recycle Bin
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dummy">
                                    Recycle Bin
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-10"></div>
        </div>
    );
}
