export default function TopNav() {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-3 dashboard-right-heading">
                <h2>Projects</h2>
            </div>
            <div className="col-lg-4 col-md-3 dashboard-right-search">
                <i class="bi bi-search"></i>
                <input
                    class="form-control"
                    list="datalistOptions"
                    id="exampleDataList"
                    placeholder="Search Project"
                />
            </div>
            <div className="col-lg-5 col-md-5 dashboard-right-tools">
                <div className="col-lg-3 col-md-3 tools-icon float-start">
                    <i class="bi bi-bell me-3"></i>
                    <i class="bi bi-gear "></i>
                </div>
                <div className="col-lg-9 col-md-9 dashboard-right-profile float-start ">
                    <div className="float-start">
                        <img src="images/profile.png" />
                    </div>
                    <div className="ms-3 float-start">
                        <h3>Asfak Mahmud</h3>
                        <p>asfakmahmudbd@gmaill.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
