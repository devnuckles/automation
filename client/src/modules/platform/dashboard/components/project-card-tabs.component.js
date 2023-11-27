import { Button } from "@mui/material";
import { DynamicModal } from "../../../core";
import { CreateNewProject } from "../../users";

export default function ProjectCardTabs() {
    return (
        <div className="row my-5">
            <div className="col-lg-1">
                <DynamicModal
                    button={
                        <>
                            <i className="bi bi-plus me-1"></i>
                            New
                        </>
                    }
                    modalElement={<CreateNewProject />}
                />
                {/* <button type="button" className="btn project-new-button">
                    <i className="bi bi-plus-lg me-2"></i>
                    New
                </button> */}
            </div>

            <div className="col-lg-11 flat-management-header">
                <div className="row ">
                    <div className="col-lg-10 flat-management-tab">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="home-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#home-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="home-tab-pane"
                                    aria-selected="true"
                                >
                                    All
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="profile-tab-pane"
                                    aria-selected="false"
                                >
                                    Inactive
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="contact-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#contact-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="contact-tab-pane"
                                    aria-selected="false"
                                >
                                    Active
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="contact-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#contact-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="contact-tab-pane"
                                    aria-selected="false"
                                >
                                    On hold
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="contact-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#contact-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="contact-tab-pane"
                                    aria-selected="false"
                                >
                                    Completed
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 text-end">
                        <div className="flat-management-header-button">
                            <Button
                                variant="outlined"
                                endIcon={
                                    <i className="bi bi-sort-down-alt"></i>
                                }
                            >
                                Default
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
