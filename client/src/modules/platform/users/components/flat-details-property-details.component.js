import { Divider } from "@mui/material";

export default function FlatDetailsPropertyDetails(){
    return(
        <>
                <div className="row my-5">
                        <div className="col-lg-12 property-details">
                                <h2 className="flat-details-common-heading mb-4">
                                    Property Details
                                </h2>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <ul className="list-group list-unstyled">
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Property ID:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    RH09876
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Price:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    $985,000
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Property Size:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    1567 sqft
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Year Built:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    1989
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Bedrooms:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    3
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-4">
                                        <ul className="list-group list-unstyled">
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Bathrooms:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    2
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Garage:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    1
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Garage Size:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    285 sqft
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Property Size:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    House
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Property Status:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    For Sale
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4"></div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className="row my-5">
                            <div className="col-lg-12 property-features-wrapper">
                                <h2 className="flat-details-common-heading">
                                    Property Features
                                </h2>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="property-features mt-4">
                                            <p>
                                                <img
                                                    src="images/air-condition-icon.png"
                                                    alt="air-condition-icon"
                                                    className="me-2"
                                                />
                                                <span> Air Conditioning</span>
                                            </p>

                                            <p>
                                                <img
                                                    src="images/heater-icon.png"
                                                    alt="air-condition-icon"
                                                    className="me-2"
                                                />
                                                <span> Heater</span>
                                            </p>
                                            <p>
                                                <img
                                                    src="images/lawn-icon.png"
                                                    alt="air-condition-icon"
                                                    className="me-2"
                                                />
                                                <span> Lawn</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="property-features mt-4">
                                            <p>
                                                <img
                                                    src="images/laundry-icon.png"
                                                    alt="air-condition-icon"
                                                    className="me-2"
                                                />
                                                <span> Laundry Room</span>
                                            </p>

                                            <p>
                                                <img
                                                    src="images/swimming-pool-icon.png"
                                                    alt="air-condition-icon"
                                                    className="me-2"
                                                />
                                                <span> Swimming Pool</span>
                                            </p>
                                            <p>
                                                <img
                                                    src="images/dining-room-icon.png"
                                                    alt="air-condition-icon"
                                                    className="me-2"
                                                />
                                                <span> Dining Room</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    );
}
