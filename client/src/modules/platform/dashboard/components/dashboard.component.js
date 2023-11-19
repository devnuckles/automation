import { useState } from "react";
import ProjectCard from "./project-card.component";
import ProjectCardTabs from "./project-card-tabs.component";

export default function Dashboard() {
    const [projects, setProject] = useState([1, 2, 3, 4, 5, 6, 7]);
    return (
      <>
        <ProjectCardTabs />
        <div className="row px-3">
            {projects.map((project, index) => {
                return <ProjectCard project={project} key={index} />;
            })}
        </div>
      </>
    );
}
