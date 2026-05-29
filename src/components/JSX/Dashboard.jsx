import "../CSS/Dashboard.css";
import { IoSearch } from "react-icons/io5";

function Dashboard({onAddCity}) {

  return (
    <section className="dashboard">
      <h1 className="dashboard-name">Weather dashboard</h1>
      <div className="dashboard-container1">
        <p className="dashboard-container1-text">
          Create your personal list of favorite cities and always be aware of
          the weather.
        </p>
        <p className="dashboard-container1-text">
          October 2023 <br /> Friday, 13<sup>th</sup>
        </p>
      </div>
      <div className="dashboard-container2">
        <input
          type="text"
          className="dashboard-container2-search"
          placeholder="Search location..."
        />
        <div className="dashboard-container2-searchIcon">
          <IoSearch className="dashboard-container2-searchIcon-icon" onClick={onAddCity}/>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
