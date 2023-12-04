import { Button, Chip } from "@mui/material";
import { ReadMoreLess } from "../../../core/lib/read-more-less.pkg";

const desc = `
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
`;
export default function FlatDetailsDescription() {
    return (
        <>
            <div className="row">
                <div className="col-lg-6 flat-details-left-slider mt-4">
                    <div
                        id="carouselExampleIndicators"
                        className="carousel slide"
                        interval="200"
                        wrap="true"
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
                    <ReadMoreLess
                        className="my-3 flat-details-bottom-description-content"
                        desc={desc}
                    />
                </div>
            </div>
        </>
    );
}
