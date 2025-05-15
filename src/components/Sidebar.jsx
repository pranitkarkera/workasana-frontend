import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="p-3 vh-100 d-flex flex-column align-items-center"
      style={{ width: "230px", backgroundColor: "#f3f0ff" }}
    >
      <h4 className="mb-4 text-primary">workasana</h4>
      <ul className="nav flex-column py-3">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-secondary">
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </Link>
        </li>
        <li className="nav-item mt-2">
          <Link to="/project" className="nav-link text-secondary">
            <i className="bi bi-kanban me-2"></i>Project
          </Link>
        </li>
        <li className="nav-item mt-2">
          <Link to="/team" className="nav-link text-secondary">
            <i className="bi bi-people me-2"></i>Team
          </Link>
        </li>
        <li className="nav-item mt-2">
          <Link to="/report" className="nav-link text-secondary">
            <i className="bi bi-graph-up me-2"></i>Reports
          </Link>
        </li>
        <li className="nav-item mt-2">
          <Link to="/settings" className="nav-link text-secondary">
            <i className="bi bi-gear me-2"></i>Setting
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
