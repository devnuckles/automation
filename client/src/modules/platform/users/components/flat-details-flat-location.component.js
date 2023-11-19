 export default function FlatDetailsFlatLocation(){
    return(
        <>
           <div className="row my-5">
                            <div className="col-lg-12 property-location-details">
                                <h2 className="flat-details-common-heading">
                                    Location Details
                                </h2>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <ul className="list-group list-unstyled">
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
                                        <ul className="list-group list-unstyled">
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
        </>
    );
 }
