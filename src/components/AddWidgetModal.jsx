import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, updateWidget } from "../store/dashboardSlice";

export default function AddWidgetModal({ onClose, initialWidget, categoryId: editCatId }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.dashboard.categories);

  const [categoryId, setCategoryId] = useState(editCatId || categories[0]?.id);
  const [name, setName] = useState(initialWidget?.name || "");
  const [text, setText] = useState(initialWidget?.text || "");
  const [type, setType] = useState(initialWidget?.type || "text");
  const [dataRows, setDataRows] = useState(
    initialWidget?.data || [{ name: "", value: "" }]
  );

  useEffect(() => {
    if (initialWidget?.data) {
      setDataRows(initialWidget.data);
    }
  }, [initialWidget]);

  const addRow = () => setDataRows([...dataRows, { name: "", value: "" }]);
  const updateRow = (i, field, value) => {
    const newRows = [...dataRows];
    newRows[i][field] = value;
    setDataRows(newRows);
  };
  const removeRow = (i) => {
    const newRows = [...dataRows];
    newRows.splice(i, 1);
    setDataRows(newRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    let data = null;
    if (["donut", "pie", "bar", "line"].includes(type)) {
      data = dataRows
        .filter((r) => r.name && r.value)
        .map((r) => ({ name: r.name, value: parseInt(r.value, 10) || 0 }));
    }

    if (initialWidget) {
      dispatch(
        updateWidget({
          categoryId,
          widgetId: initialWidget.id,
          updates: { name, text, type, data }
        })
      );
    } else {
      dispatch(addWidget(categoryId, name, text, type, data));
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h3>{initialWidget ? "Edit Widget" : "Add Widget"}</h3>

        <label>Category</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        <label>Widget Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Widget Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="text">Text</option>
          <option value="donut">Donut Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="empty">Empty</option>
        </select>

        {type === "text" && (
          <>
            <label>Widget Text</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </>
        )}

        {["donut", "pie", "bar", "line"].includes(type) && (
          <>
            <label>Chart Data</label>
            {dataRows.map((row, i) => (
              <div key={i} className="data-row">
                <input
                  type="text"
                  placeholder="Label"
                  value={row.name}
                  onChange={(e) => updateRow(i, "name", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Value"
                  value={row.value}
                  onChange={(e) => updateRow(i, "value", e.target.value)}
                />
                <button type="button" onClick={() => removeRow(i)}>
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={addRow}>
              + Add Row
            </button>
          </>
        )}

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">{initialWidget ? "Update" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}
