export default function ProjectStatusBar() {
    return (
        <div className="row">
            <div className="col-lg-1 new-project-button">
                <a>
                    <i class="bi bi-plus"></i>
                    New
                </a>
            </div>
            <div className="col-lg-11">
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
    );
}
