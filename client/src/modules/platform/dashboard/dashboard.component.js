import { useState } from "react";
import LeftNav from "./left-navbar.component";
import ProjectCard from "./project-card.component";
import ProjectStatusBar from "./project-status-bar.component";
import TopNav from "./top-nav.component";

export default function Dashboard() {
    const [projects, setProject] = useState([1, 2, 3, 4, 5, 6, 7]);
    return (
        <div className="container-cs">
            <div className="row">
                <LeftNav />

                <div className="col-lg-10 col-md-10 p-0">
                    <div className="dashboard-right-header">
                        <TopNav />
                        <ProjectStatusBar />
                        <div className="row">
                            {projects.map((project, index) => {
                                return (
                                    <ProjectCard
                                        project={project}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
