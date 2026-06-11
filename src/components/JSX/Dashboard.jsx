import { useState, useEffect } from "react";
import "../CSS/Dashboard.css";
import { IoSearch } from "react-icons/io5";

function Dashboard({ onAddCity }) {
  const [inputValue, setInputValue] = useState("");

  function inputChange(evt) {
    setInputValue(evt.target.value);
  }
  function handleAdd() {
    onAddCity(inputValue);
    setInputValue("");
  }

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
          value={inputValue}
          onChange={inputChange}
          onKeyDown={(e)=>{
            if(e.key === 'Enter') handleAdd();
          }}
        />
        <div className="dashboard-container2-searchIcon">
          <IoSearch
            className="dashboard-container2-searchIcon-icon"
            onClick={handleAdd}
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
