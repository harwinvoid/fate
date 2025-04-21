import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  NavLink,
} from "react-router-dom";
import "./App.css";
// import ElementMatrix from "./components/ElementMatrix";
import PetList from "./components/PetList";
import EventLog from "./components/EventLog";
import logo from "./assets/logo.png";


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
            </NavLink> */}
            <NavLink
              to="/fate/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              LINGS
            </NavLink>
            <NavLink
              to="/fate/battles"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              BATTLES
            </NavLink>
          </nav>
        </header>
        <main className="app-main">
          <div className="app-container">
            <Routes>
              {/* <Route
                path="/"
                element={
                  <div className="matrix-section">
                    <div className="section-header">
                      <h1>元素矩阵</h1>
                    </div>
                    <ElementMatrix />
                  </div>
                }
              /> */}
              <Route
                path="/fate"
                element={
                  <div className="pets-section">
                    <PetList />
                  </div>
                }
              />
              <Route
                path="/fate/battles"
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
