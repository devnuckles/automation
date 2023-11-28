import { DynamicModal } from "../../../core";
import AddUser from "./add-user.component";
import Table from "../../../core/common/table/table.component";

export default function UserTable() {
    return (
        <>
            <div className="row py-4">
                <div className="col-lg-8">
                    <h6 className="user-management-heading-title">USER</h6>
                </div>
                <div className="col-lg-4">
                    <div className="user-management-heading-button-group text-end">
                        <DynamicModal
                            button={
                                <>
                                    <i className="bi bi-plus me-1"></i>
                                    Add
                                </>
                            }
                            modalElement={<AddUser />}
                        />
                        <a>
                            <i className="bi bi-download me-2"></i>
                            Download PDF Report
                        </a>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 ">
                    <div className="user-management-search my-3">
                        <div className="col-lg-12 col-md-10">
                            <div className="user-management-search-box">
                                <i className="bi bi-search me-1"></i>
                                <input
                                    className="form-control"
                                    list="datalistOptions"
                                    id="exampleDataList"
                                    placeholder="Search by username, name, Email"
                                />
                            </div>
                            <div className="user-management-search-filter">
                                <a>
                                    <i className="bi bi-funnel me-2"></i>
                                    Filter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-1"></div>
            </div>

            <Table tableFor="userList" />
        </>
    );
}
