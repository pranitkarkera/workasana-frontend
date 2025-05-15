import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { logout } from "../slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfull!");
    navigate("/");
  };

  // If user is not logged in
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-center">
        <div>
          <h2>You are not logged in</h2>
          <p>Please <Link to="/">log in</Link> to view your settings.</p>
        </div>
      </div>
    );
  }

  // If user is logged in
  return (
    <div className="container-fluid">
    {/* Sidebar */}
    <div className="row">
      <div
        className="offcanvas offcanvas-start overflow-auto"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
        style={{ width: "250px" }}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar />
        </div>
      </div>

      <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Sidebar />
        </div>

      {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-4">
        <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            ☰ Menu
          </button>
        <h1>My Profile</h1>
        <div className="py-3">
          <span>DETAILS</span>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserSettings;
