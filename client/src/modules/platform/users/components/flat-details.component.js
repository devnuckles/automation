import { Divider } from "@mui/material";
import FlatDetailsBreadcrumbs from "./flat-details-breadcrumb.component";
import FlatDetailsDescription from "./flat-details-description.component";
import FlatDetailsFlatLocation from "./flat-details-flat-location.component";
import FlatDetailsPropertyDetails from "./flat-details-property-details.component";
import FlatDetailsFloorPlan from "./flat-details-floor-plan.component";
import FlatDetailsPropertyVideo from "./flat-details-property-video.component";

function FlatDetails() {
    return (
        <div className="flat-details-wrapper p-4">
            <div className="row">
                <FlatDetailsBreadcrumbs />
            </div>

            <div className="row">
                <FlatDetailsDescription />
            </div>

            <div className="px-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-12 property-documents py-5">
                                <h2 className="flat-details-common-heading">
                                    Documents
                                </h2>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p>
                                            <i className="bi bi-file-earmark-arrow-down "></i>
                                            <span className="mx-3">
                                                propertydetails.pdf
                                            </span>
                                            <a>Download</a>
                                        </p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p>
                                            <i className="bi bi-file-earmark-arrow-down "></i>
                                            <span className="mx-3">
                                                propertydetails.pdf
                                            </span>
                                            <a>Download</a>
                                        </p>
                                    </div>
                                    <div className="col-lg-4"></div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                     
                        <div className="row">
                            <FlatDetailsFlatLocation />
                        </div>
                        <Divider />
                

                <div className="row">
                    <FlatDetailsPropertyDetails />
                </div>
                        <Divider />
                    

                    <div className="row">
                        <FlatDetailsFloorPlan />
                    </div>
                        <Divider />
                        <div className="row my-5">
                            <FlatDetailsPropertyVideo />
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    );
}

export default FlatDetails;
