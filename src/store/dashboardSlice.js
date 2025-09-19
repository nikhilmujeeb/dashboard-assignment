import { createSlice, nanoid } from "@reduxjs/toolkit";
export const widgetsCatalog = {
  cspm: [
    {
      id: "w1",
      name: "Cloud Accounts",
      type: "donut",
      data: [
        { name: "Connected", value: 2 },
        { name: "Not Connected", value: 2 }
      ]
    },
    {
      id: "w2",
      name: "Cloud Account Risk Assessment",
      type: "pie",
      data: [
        { name: "Failed", value: 1689 },
        { name: "Warning", value: 681 },
        { name: "Not available", value: 36 },
        { name: "Passed", value: 7253 }
      ]
    },
    {
      id: "w3",
      name: "Risk Donut",
      type: "pie",
      data: [
        { name: "Critical", value: 30 },
        { name: "High", value: 50 },
        { name: "Medium", value: 20 }
      ]
    }
  ],
  cwpp: [
    {
      id: "w4",
      name: "Workload Security",
      type: "text",
      text: "Random text for Workload Security"
    },
    {
      id: "w5",
      name: "Alerts Over Time",
      type: "line",
      data: [
        { name: "Day1", value: 10 },
        { name: "Day2", value: 20 },
        { name: "Day3", value: 15 }
      ]
    }
  ],
  registry: [
    {
      id: "w6",
      name: "Registry Scan Results",
      type: "bar",
      data: [
        { name: "Passed", value: 80 },
        { name: "Failed", value: 20 }
      ]
    },
    {
      id: "w7",
      name: "Image Vulnerabilities",
      type: "line",
      data: [
        { name: "Jan", value: 5 },
        { name: "Feb", value: 15 },
        { name: "Mar", value: 25 }
      ]
    }
  ]
};

const initialState = {
  categories: [
    {
      id: "cspm",
      title: "CSPM Executive Dashboard",
      widgets: [
        widgetsCatalog.cspm[0],
        widgetsCatalog.cspm[1] 
      ]
    },
    { id: "cwpp", title: "CWPP Dashboard", widgets: [] },
    { id: "registry", title: "Registry Scan", widgets: [] }
  ]
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: {
      reducer(state, action) {
        const { categoryId, widget } = action.payload;
        const cat = state.categories.find((c) => c.id === categoryId);
        if (cat && !cat.widgets.some((w) => w.id === widget.id)) {
          cat.widgets.push(widget);
        }
      },
      prepare(categoryId, name, text = "", type = "text", data = null, id = null) {
        return {
          payload: {
            categoryId,
            widget: { id: id || nanoid(), name, text, type, data }
          }
        };
      }
    },
    updateWidget(state, action) {
      const { categoryId, widgetId, updates } = action.payload;
      const cat = state.categories.find((c) => c.id === categoryId);
      if (cat) {
        const widget = cat.widgets.find((w) => w.id === widgetId);
        if (widget) Object.assign(widget, updates);
      }
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const cat = state.categories.find((c) => c.id === categoryId);
      if (cat) {
        cat.widgets = cat.widgets.filter((w) => w.id !== widgetId);
      }
    }
  }
});

export const { addWidget, updateWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
