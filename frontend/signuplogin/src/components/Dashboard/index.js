import "./index.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="dashboard-container">
        <nav className="navbar">
          <h1>Dashboard</h1>
          <div>
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </nav>
        <img
          src="https://res.cloudinary.com/viplav2411/image/upload/v1725163629/Screenshot_67_lyxhka.png"
          alt="dasboard"
        />
      </div>
    </>
  );
};

export default Dashboard;
