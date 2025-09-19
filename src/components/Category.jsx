import React from "react";
import WidgetCard from "./WidgetCard";

export default function Category({ category, widgets, onEditWidget }) {
  return (
    <div className="category">
      <h2>{category.title}</h2>
      <div className="widget-grid">
        {widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onEdit={onEditWidget}
          />
        ))}
      </div>
    </div>
  );
}
