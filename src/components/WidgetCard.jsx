import React from "react";
import { useDispatch } from "react-redux";
import { removeWidget } from "../store/dashboardSlice";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function WidgetCard({ widget, categoryId, onEdit }) {
  const dispatch = useDispatch();
  const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F", "#AA336A"];

  const renderChart = () => {
if (widget.type === "donut") {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={widget.data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {widget.data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(val, name) => [`${val}`, name]} />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
}

if (widget.type === "pie") {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={widget.data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          labelLine={false}   // 🚫 no outside labels
        >
          {widget.data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(val, name) => [`${val}`, name]} />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
}

    if (widget.type === "bar") {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={widget.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (widget.type === "line") {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={widget.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (widget.type === "empty") {
      return <div className="widget-placeholder">No Graph data available!</div>;
    }

    return <div className="widget-text">{widget.text}</div>;
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h4>{widget.name}</h4>
        <div className="widget-actions">
          <button onClick={() => onEdit(widget, categoryId)}>✎</button>
          <button
            onClick={() =>
              dispatch(removeWidget({ categoryId, widgetId: widget.id }))
            }
          >
            ✕
          </button>
        </div>
      </div>
      {renderChart()}
    </div>
  );
}
