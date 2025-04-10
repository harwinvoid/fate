import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  NavLink,
} from "react-router-dom";
import "./App.css";
import ElementMatrix from "./components/ElementMatrix";
import PetList from "./components/PetList";
import EventLog from "./components/EventLog";
import logo from "./assets/logo.png";
import mockPets from "./data/pets";
import { Pet } from "./types/pets";

// 示例数据，实际应该从API获取

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <img src={logo} alt="Fate" className="logo" />
          <nav className="nav-menu">
            {/* <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              元素矩阵
            </NavLink>
            <NavLink
              to="/pets"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              宠物图鉴
            </NavLink> */}
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              战绩查询
            </NavLink>
          </nav>
        </header>
        <main className="app-main">
          <div className="app-container">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="matrix-section">
                    <div className="section-header">
                      <h1>元素矩阵</h1>
                    </div>
                    <ElementMatrix />
                  </div>
                }
              />
              <Route
                path="/pets"
                element={
                  <div className="pets-section">
                    <PetList pets={mockPets as Pet[]} />
                  </div>
                }
              />
              <Route
                path="/events"
                element={
                  <div className="events-section">
                    <div className="section-header">
                      <h1>战绩查询</h1>
                    </div>
                    <EventLog />
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
