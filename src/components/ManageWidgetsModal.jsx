import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, removeWidget } from "../store/dashboardSlice";
import { widgetsCatalog } from "../store/dashboardSlice";

export default function ManageWidgetsModal({ onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.dashboard.categories);

  const handleToggle = (categoryId, widget, isChecked) => {
    if (isChecked) {
      dispatch(
        addWidget(categoryId, widget.name, widget.text || "", widget.type, widget.data, widget.id)
      );
    } else {
      dispatch(removeWidget({ categoryId, widgetId: widget.id }));
    }
  };

  const handleSelectAll = (categoryId, selectAll) => {
    const widgets = widgetsCatalog[categoryId];
    widgets.forEach((widget) => {
      if (selectAll) {
        dispatch(
          addWidget(categoryId, widget.name, widget.text || "", widget.type, widget.data, widget.id)
        );
      } else {
        dispatch(removeWidget({ categoryId, widgetId: widget.id }));
      }
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal manage-modal">
        <h3>Manage Widgets</h3>

        {categories.map((cat) => {
          const allWidgets = widgetsCatalog[cat.id];
          const activeWidgetIds = cat.widgets.map((w) => w.id);
          const allSelected = allWidgets.every((w) => activeWidgetIds.includes(w.id));

          return (
            <div key={cat.id} className="manage-category">
              <div className="manage-category-header">
                <h4>{cat.title}</h4>
                <button
                  className="btn small"
                  onClick={() => handleSelectAll(cat.id, !allSelected)}
                >
                  {allSelected ? "Deselect All" : "Select All"}
                </button>
              </div>

              <div className="manage-widget-list">
                {allWidgets.map((widget) => {
                  const isChecked = activeWidgetIds.includes(widget.id);
                  return (
                    <label key={widget.id} className="checkbox-row">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleToggle(cat.id, widget, e.target.checked)}
                      />
                      {widget.name}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
