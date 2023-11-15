import { ProgressBar } from "../../../core";

function ProjectCard({ project }) {
    return (
        <div class="col-lg-4 mt-5">
            <div class="card-body">
                <div class="row card-heading mb-4">
                    <div class="col-lg-10 card-heading-left">
                        <h6>Card Heading</h6>
                        <div class="card-status">
                            <span class="ms-3">Active</span>
                        </div>
                    </div>
                    <div class="col-lg-2 card-heading-right text-end">
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
                                <img src="images/profile-1.png" alt="" />
                                <img src="images/profile 2.png" alt="" />
                                <img src="images/profile 3.png" alt="" />
                                <img src="images/profile 4.png" alt="" />

                                <div class="add-member-button">
                                    <i class="bi bi-plus-circle"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <ProgressBar />
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
