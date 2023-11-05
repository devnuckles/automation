export default function Dashboard() {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-3 p-0">
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

                    <div className="dashboard-left-nav px-3">
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
                                <span className="icon">
                                    <i class="bi bi-house"></i>
                                </span>
                                <a
                                    className="nav-link left-nav-link"
                                    href="/dummy"
                                >
                                    Flats Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <span className="icon">
                                    <i class="bi bi-house"></i>
                                </span>
                                <a
                                    className="nav-link left-nav-link"
                                    href="/dummy"
                                >
                                    Recycle Bin
                                </a>
                            </li>
                            <li className="nav-item">
                                <span className="icon">
                                    <i class="bi bi-house"></i>
                                </span>
                                <a
                                    className="nav-link left-nav-link"
                                    href="/dummy"
                                >
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

            <div className="col-lg-9 col-md-3 p-0">
                <div className="dashboard-right-header">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 dashboard-right-heading">
                            <h2>Projects</h2>
                        </div>
                        <div className="col-lg-3 col-md-3 dashboard-right-search me-5">
                            <i class="bi bi-search"></i>
                            <input
                                class="form-control"
                                list="datalistOptions"
                                id="exampleDataList"
                                placeholder="Search Project"
                            />
                        </div>
                        <div className="col-lg-5 col-md-5 dashboard-right-tools">
                            <div className="col-lg-3 col-md-3 tools-icon float-start">
                                <i class="bi bi-bell me-3"></i>
                                <i class="bi bi-gear "></i>
                            </div>
                            <div className="col-lg-9 col-md-9 dashboard-right-profile float-start ">
                                <div className="float-start">
                                    <img src="images/profile.png" />
                                </div>
                                <div className="ms-3 float-start">
                                    <h3>Asfak Mahmud</h3>
                                    <p>asfakmahmudbd@gmaill.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-1 new-project-button">
                            <a>
                                <i class="bi bi-plus"></i>
                                New
                            </a>
                        </div>
                        <div className="col-lg-10">
                            <div className="project-sorting-tab">
                                <div className="col-lg-10 float-start">
                                    <ul class="nav nav-tabs">
                                        <li class="nav-item">
                                            <a
                                                class="nav-link active"
                                                aria-current="page"
                                                href="#"
                                            >
                                                All
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">
                                                Inactive
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">
                                                Active
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">
                                                On hold
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">
                                                Completed
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-2 float-start project-sorting-button">
                                    <span>Default</span>
                                    <i class="bi bi-sort-down-alt ms-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-lg-4 mt-5">
                            <div class="card-body">
                                <div class="row card-heading mb-4">
                                    <div class="col-lg-10 card-heading-left">
                                        <h6>Card Heading</h6>
                                        <div class="card-status">
                                            <span class="ms-3">Active</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 card-heading-right">
                                        <div class="card-more-button">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="row card-date">
                                    <div class="col-lg-6">
                                        <p class="card-date-common card-date-heading m-0">
                                            Start Date
                                        </p>
                                        <p class=" card-date-common card-date-date mt-2">
                                            12 Sep 2021
                                        </p>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card-date-right">
                                            <div class="task float-start text-center">
                                                <p class="m-0">14</p>
                                                <p class="m-0">Tasks</p>
                                            </div>
                                            <div class="user float-start text-center">
                                                <p class="m-0">4</p>
                                                <p class="m-0">Users</p>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="card-member">
                                            <p class="m-0">Members</p>
                                            <div class="member-profiles">
                                                <img
                                                    src="images/profile-1.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="images/profile 2.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="images/profile 3.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="images/profile 4.png"
                                                    alt=""
                                                />

                                                <div class="add-member-button">
                                                    <i class="bi bi-plus-circle"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="card-progress">
                                        <div
                                            class="progress"
                                            role="progressbar"
                                            aria-label="Success example"
                                            aria-valuenow="67"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <div
                                                class="progress-bar bg-success"
                                                style={{ width: "67%" }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
