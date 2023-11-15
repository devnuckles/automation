import { Button, Chip, Divider } from "@mui/material";
import FlatDetailsBreadcrumbs from "./flat-details-breadcrumb.component";

function FlatDetails() {
    return (
        <div className="flat-details-wrapper p-4">
            <div className="row">
                <FlatDetailsBreadcrumbs />
            </div>

            <div className="row">
                <div className="col-lg-6 flat-details-left-slider mt-4">
                    <div
                        id="carouselExampleIndicators"
                        className="carousel slide"
                    >
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                            ></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src="images/flat/flat-image1.png"
                                    className="d-block w-100"
                                    alt="flat-image1"
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="images/flat/flat-image1.png"
                                    className="d-block w-100"
                                    alt="flat-image1"
                                />
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="images/flat/flat-image1.png"
                                    className="d-block w-100"
                                    alt="flat-image1"
                                />
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-lg-6 flat-details-right-wrapper">
                    <div className="row">
                        <div className="col-lg-9">
                            <h2 className="flat-details-flat-heading">A1</h2>
                            <p className="flat-details-flat-price-heading m-0">
                                Price range
                            </p>
                            <p className="flat-details-flat-price">
                                ৳5,00,0000
                            </p>
                            <div className="flat-room-details mt-4">
                                <Chip
                                    label={
                                        <span>
                                            <img
                                                src="images/bedroom-icon.png"
                                                alt="icon"
                                                style={{ width: "20%" }}
                                                className="me-2"
                                            />
                                            4 Bedroom
                                        </span>
                                    }
                                    className="me-3"
                                />
                                <Chip
                                    label={
                                        <span>
                                            <img
                                                src="images/bathroom-icon.png"
                                                alt="icon"
                                                style={{ width: "15%" }}
                                                className="me-2"
                                            />
                                            2 Bathroom
                                        </span>
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 flat-details-edit-button">
                            <Button variant="contained">
                                Edit Flat Details
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 flat-details-property-feature mt-4">
                            <h2 className="flat-details-property-feature-heading">
                                Property Features
                            </h2>
                            <div className="row flat-details-property-feature-details">
                                <div className="col-lg-3">
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Terrace
                                    </p>
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Coffe pot
                                    </p>
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Towelwes
                                    </p>
                                </div>
                                <div className="col-lg-3">
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Swimming pool
                                    </p>
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Air conditioning
                                    </p>
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Internet
                                    </p>
                                </div>
                                <div className="col-lg-3">
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Radio
                                    </p>
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Balcony
                                    </p>
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Roof terrace
                                    </p>
                                </div>
                                <div className="col-lg-3">
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Grill
                                    </p>
                                    <p>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Computer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-5">
                <div className="col-lg-12 flat-details-bottom-description">
                    <h2 className="flat-details-bottom-description-heading">
                        Description
                    </h2>
                    <p className="flat-details-bottom-description-content my-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin velit augue, hendrerit et tempor ac, rutrum in
                        diam. Mauris semper augue nec gravida aliquam. Duis ut
                        arcu et ante tincidunt bibendum nec ut nisl. Ut
                        bibendum, justo sed vestibulum malesuada, sapien metus
                        pharetra nunc, nec vulputate ipsum tellus id erat.
                        Nullam augue metus, accumsan a justo eget, rutrum
                        accumsan orci. Mauris libero mi, laoreet a viverra
                        vitae, sagittis eget eros. Integer vel quam interdum,
                        condimentum orci eget, sodales sem.
                    </p>

                    <p className="my-3 flat-details-bottom-description-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin velit augue, hendrerit et tempor ac, rutrum in
                        diam. Mauris semper augue nec gravida aliquam. Duis ut
                        arcu et ante tincidunt bibendum nec ut nisl. Ut
                        bibendum, justo sed vestibulum malesuada, sapien metus
                        pharetra nunc, nec vulputate ipsum tellus id erat.
                        Nullam augue metus, accumsan a justo eget, rutrum
                        accumsan orci. Mauris libero mi, laoreet a viverra
                        vitae, sagittis eget eros. Integer vel quam interdum,
                        condimentum orci eget, sodales sem.
                    </p>

                    <a className="flat-details-bottom-description-button">
                        Read More
                    </a>
                </div>
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
                        <div className="row my-5">
                            <div className="col-lg-12 property-location-details">
                                <h2 className="flat-details-common-heading">
                                    Location Details
                                </h2>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <ul className="list-group">
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Address:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    123 West Road
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    State/Country:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    New York
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    City:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    Brooklyn
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-4">
                                        <ul className="list-group">
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    ZIP:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    12345
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Area:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    Brook Hill
                                                </span>
                                            </li>
                                            <li className="my-2">
                                                <span className="w-50 d-inline-block">
                                                    Country:
                                                </span>
                                                <span className="w-50 d-inline-block">
                                                    United State
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4"></div>
                                </div>
                            </div>
                            <div className="col-lg-12 property-location-details-map mt-5">
                                <iframe
                                    title="map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d767.6445425195227!2d90.41995000117606!3d23.76329993812939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c787f845703f%3A0x2086cbfd732bc909!2zTSBHIFRvd2VyIHwg4KaP4KauIOCmnOCmvyDgpp_gpr7gppPgp5_gpr7gprA!5e0!3m2!1sen!2sbd!4v1699950233752!5m2!1sen!2sbd"
                                    width="900"
                                    height="450"
                                    style={{ border: "0" }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                        <Divider />
                        <div className="row my-5">
                            <div className="col-lg-12 property-details">
                                <h2 className="flat-details-common-heading mb-4">
                                    Property Details
                                </h2>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <ul className="list-group">
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
                                        <ul className="list-group">
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
                        <Divider />
                        <div className="row my-5">
                            <div className="col-lg-12">
                                <h2 className="flat-details-common-heading mb-5">
                                    Floor Plans
                                </h2>
                                <img
                                    src="images/floor-plan-image.png"
                                    alt="Floor Plan"
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="row my-5">
                            <div className="col-lg-12 property-video">
                                <h2 className="flat-details-common-heading">
                                    Property Video
                                </h2>
                                <div className="property-video-tab"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    );
}

export default FlatDetails;
