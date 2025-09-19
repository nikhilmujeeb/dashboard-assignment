import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddWidgetModal from "./components/AddWidgetModal";
import ManageWidgetsModal from "./components/ManageWidgetsModal";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [editWidgetData, setEditWidgetData] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="app">
      <Navbar
        onAddWidget={() => setShowModal(true)}
        onManageWidgets={() => setShowManage(true)}
        onSearch={setSearchQuery}
        onToggleTheme={() => setIsDark(!isDark)}
        isDark={isDark}
      />

      <Dashboard
        searchQuery={searchQuery}
        onEditWidget={(widget, categoryId) => {
          setEditWidgetData(widget);
          setEditCategoryId(categoryId);
          setShowModal(true);
        }}
      />

      {showModal && (
        <AddWidgetModal
          onClose={() => {
            setShowModal(false);
            setEditWidgetData(null);
            setEditCategoryId(null);
          }}
          initialWidget={editWidgetData}
          categoryId={editCategoryId}
        />
      )}

      {showManage && (
        <ManageWidgetsModal onClose={() => setShowManage(false)} />
      )}
    </div>
  );
}
