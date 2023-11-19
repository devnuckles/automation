import ProjectDetailsOperatorCard from "./project-details-operator-card.component";

export default function ProjectDetails() {
    return (
        <div className="project-details-wrapper my-3">
            <div className="row">
                <div className="col-lg-12 ">
                    <h2 className="project-details-main-heading">
                        Projects Details
                    </h2>
                </div>
            </div>
            <div className="row ms-3">
                <div className="col-lg-12 my-4">
                    <h2 className="project-details-project-title m-0">
                        Real Estate Project 01
                    </h2>
                    <p className="project-details-project-location">
                        Mirpur • Dhaka, Bangladesh • 2 days ago
                    </p>
                    <h4 className=" project-details-common-heading mt-4">
                        Description
                    </h4>
                    <p className="project-details-common-paragraph">
                        Collaborate with product management and engineering to
                        define and implement innovative solutions for the
                        product direction, visuals and experience. Execute all
                        visual design stages from concept to final hand-off to
                        engineering. Conceptualize original ideas that bring
                        simplicity and user friendliness to complex design
                        roadblocks. Create wireframes, storyboards, user flows,
                        process flows and site maps to effectively communicate
                        interaction and design ideas. Present and defend designs
                        and key milestone deliverables to peers and executive
                        level stakeholders. Conduct user research and evaluate
                        user feedback.
                    </p>
                </div>
                <div className="col-lg-12">
                    <h4 className="project-details-common-heading">
                        Project Responsibilities
                    </h4>
                    <ul className="list-unstyled project-responsibilities">
                        <li className="project-details-common-paragraph mb-3">
                            Identify problems based on the product vision /
                            requirements and come up with delightful design
                            solutions & deliverables.
                        </li>
                        <li className="project-details-common-paragraph mb-3">
                            Conduct design process best practices across
                            projects such as gathering insights, validating
                            problems & solutions, delivering multiple fidelity
                            levels of design, and ensure the final design is
                            implemented properly on production.
                        </li>
                        <li className="project-details-common-paragraph mb-3">
                            Collaborate with Interaction Designers (Design
                            System team) to ensure the implementation of proper
                            design components and patterns and/or improving
                            existing design libraries.
                        </li>
                    </ul>
                </div>
            </div>

            <div className="row ms-3">
                <div className="col-lg-4">
                    <ProjectDetailsOperatorCard />
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    );
}
