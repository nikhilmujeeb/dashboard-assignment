import React from "react";
import { useSelector } from "react-redux";
import Category from "./Category";

export default function Dashboard({ searchQuery, onEditWidget }) {
  const categories = useSelector((state) => state.dashboard.categories);

  return (
    <div className="dashboard">
      {categories.map((cat) => {
        const filteredWidgets = cat.widgets.filter((w) =>
          w.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (
          <Category
            key={cat.id}
            category={cat}
            widgets={filteredWidgets}
            onEditWidget={onEditWidget}
          />
        );
      })}
    </div>
  );
}
