const UserTableFilter = () => {
    return (
        <div className="user-filter-wrapper">
            <h2 className="user-filter-title">Filters</h2>
            <div
                className="accordion  common-filter-accordion"
                id="accordionExample"
            >
                <div className="accordion-item text-left">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Role
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body ">
                            <div className="form-check text-left">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    className="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Super Admin
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleAdmin"
                                />
                                <label
                                    className="form-check-label"
                                    for="roleAdmin"
                                >
                                    Admin
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="roleOperator"
                                />
                                <label
                                    className="form-check-label"
                                    for="roleOperator"
                                >
                                    Operator
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTableFilter;
