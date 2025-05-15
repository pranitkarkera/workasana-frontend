import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      toast.success("Sign Up Successful.");
      navigate("/");
    } catch (err) {
      toast.error(err); 
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg border-0 p-4 rounded-4"
        style={{ width: "400px", backgroundColor: "#ffffff" }}
      >
        <h2 className="text-center mb-3 fw-bold" style={{ color: "#198754" }}>
          Create Account
        </h2>
        <p className="text-center text-muted mb-4">
          Join us by creating your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button
              className="btn btn-success btn-lg rounded-3 shadow-sm"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-muted">Already a user? </span>
            <Link
              to="/"
              className="text-decoration-none fw-semibold"
              style={{ color: "#198754" }}
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
