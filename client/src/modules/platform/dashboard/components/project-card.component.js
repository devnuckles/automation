import { ProgressBar } from "../../../core";

function ProjectCard({ project }) {
    return (
        <div class="col-lg-4 mt-4">
            <div class="card-body">
                <div class="row card-heading mb-4">
                    <div class="col-lg-10 card-heading-left">
                        <h6>Card Heading</h6>
                        <div className="card-status">
                            <span className="ms-3">Active</span>
                        </div>
                    </div>
                    <div className="col-lg-2 card-heading-right text-end">
                        <div className="card-more-button">
                            <i className="bi bi-three-dots-vertical"></i>
                        </div>
                    </div>
                </div>
                <div className="row card-date">
                    <div className="col-lg-6">
                        <p className="card-date-common card-date-heading m-0">
                            Start Date
                        </p>
                        <p className=" card-date-common card-date-date mt-2">
                            12 Sep 2021
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <div className="card-date-right">
                            <div className="task float-start text-center">
                                <p className="m-0">14</p>
                                <p className="m-0">Tasks</p>
                            </div>
                            <div className="user float-start text-center">
                                <p className="m-0">4</p>
                                <p className="m-0">Users</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-member">
                            <p className="m-0">Members</p>
                            <div className="member-profiles">
                                <img src="images/profile-1.png" alt="" />
                                <img src="images/profile 2.png" alt="" />
                                <img src="images/profile 3.png" alt="" />
                                <img src="images/profile 4.png" alt="" />

                                <div className="add-member-button">
                                    <i className="bi bi-plus-circle"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ProgressBar />
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
