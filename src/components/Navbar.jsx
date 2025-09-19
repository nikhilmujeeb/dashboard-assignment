import React, { useState, useRef, useEffect } from "react";

export default function Navbar({ onAddWidget, onManageWidgets, onSearch, onToggleTheme, isDark }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Last 2 days");

  const settingsRef = useRef(null);
  const moreRef = useRef(null);
  const filterRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedFilter(option);
    setOpenFilter(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="breadcrumb">
          Home <span className="breadcrumb-sep">›</span>{" "}
          <span className="breadcrumb-active">Dashboard V2</span>
        </span>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          className="navbar-search"
          placeholder="Search widgets..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        <button className="btn primary" onClick={onAddWidget}>
          + Add Widget
        </button>
        <button className="btn secondary" onClick={onManageWidgets}>
          Manage Widgets
        </button>

        {/* ⚙️ Settings Dropdown */}
        <div className={`dropdown ${settingsOpen ? "open" : ""}`} ref={settingsRef}>
          <button className="icon-btn" onClick={() => setSettingsOpen(!settingsOpen)}>⚙️</button>
          {settingsOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Profile Settings</button>
              <button className="dropdown-item">Preferences</button>
              <button className="dropdown-item">System Settings</button>
            </div>
          )}
        </div>

        {/* ⋮ More Options Dropdown */}
        <div className={`dropdown ${moreOpen ? "open" : ""}`} ref={moreRef}>
          <button className="icon-btn" onClick={() => setMoreOpen(!moreOpen)}>⋮</button>
          {moreOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Download Report</button>
              <button className="dropdown-item">Share</button>
              <button className="dropdown-item">Export Data</button>
            </div>
          )}
        </div>

        {/* Time Filter Dropdown */}
        <div className={`time-filter-wrapper ${openFilter ? "open" : ""}`} ref={filterRef}>
          <button
            className="time-filter"
            onClick={() => setOpenFilter(!openFilter)}
          >
            {selectedFilter}
          </button>

          {openFilter && (
            <div className="time-filter-menu">
              <div className="time-filter-item" onClick={() => handleSelect("Last 2 days")}>
                Last 2 days
              </div>
              <div className="time-filter-item" onClick={() => handleSelect("Last 7 days")}>
                Last 7 days
              </div>
              <div className="time-filter-item" onClick={() => handleSelect("Last 30 days")}>
                Last 30 days
              </div>
            </div>
          )}
        </div>

        <button className="icon-btn" onClick={onToggleTheme}>
          {isDark ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
