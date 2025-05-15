import React from "react";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const WeeklyTaskStats = () => {
  const { tasks } = useSelector((state) => state.tasks);

  const now = new Date();
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    return d.toISOString().split("T")[0]; // format YYYY-MM-DD
  }).reverse(); // last 7 days in order

  const completedLastWeek = {};
  const pendingDurations = {};
  const pendingStatusesCount = { "To Do": 0, "In Progress": 0 };

  // Initialize task names by day
  const taskNamesByDay = {};

  days.forEach((day) => {
    completedLastWeek[day] = 0;
    taskNamesByDay[day] = [];
  });

  tasks.forEach((task) => {
    const createdAt = new Date(task.createdAt);
    const status = task.status;

    // Completed task handling
    if (status === "Completed") {
      const completedDate = new Date(task.updatedAt).toISOString().split("T")[0];
      if (completedLastWeek[completedDate] !== undefined) {
        completedLastWeek[completedDate]++;
        taskNamesByDay[completedDate].push(task.name); // Add task name to the list
      }
    }

    // Pending task duration
    if (status !== "Completed") {
      const now = new Date();
      const diffDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
      pendingDurations[diffDays] = (pendingDurations[diffDays] || 0) + 1;
    }

    // Counting Pending Tasks by Status (TODO, In Progress)
    if (status === "To Do" || status === "In Progress") {
      if (pendingStatusesCount[status] !== undefined) {
        pendingStatusesCount[status]++;
      }
    }
  });
  console.log(pendingStatusesCount);

  const completedChartData = {
    labels: Object.keys(completedLastWeek),
    datasets: [
      {
        label: "Total Work Done Last Week",
        data: Object.values(completedLastWeek),
        backgroundColor: "#36A2EB", // Blue color for completed tasks
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  const pendingChartData = {
    labels: Object.keys(pendingDurations).map((d) => `${d} days`),
    datasets: [
      {
        label: "Pending Tasks by Days",
        data: Object.values(pendingDurations),
        backgroundColor: "#FF6384", // Red color for pending tasks
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(pendingStatusesCount),
    datasets: [
      {
        label: "Pending Tasks by Status",
        data: Object.values(pendingStatusesCount),
        backgroundColor: ["#FF6384", "#36A2EB"], // Red for TODO, Blue for In Progress
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const status = tooltipItem.label;
            const taskCount = tooltipItem.raw;
            return `${status}: ${taskCount} tasks`;
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const day = tooltipItem.label;
            const taskNames = taskNamesByDay[day] || [];
            return `${tooltipItem.raw} tasks: ${taskNames.join(", ")}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Tasks",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
    },
  };

  const totalCompletedLastWeek = Object.values(completedLastWeek).reduce((acc, count) => acc + count, 0);
  const totalPendingWork = Object.values(pendingDurations).reduce((acc, count) => acc + count, 0);

  return (
    <div style={{ padding: "2rem", marginTop: "36px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Tasks Completed in the Last 7 Days */}
        <div style={{ width: "48%", height: "400px" }}>
          <h2 style={{ textAlign: "center" }}>Total Work Done Last Week</h2>
          <Bar data={completedChartData} options={barOptions} />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <h3>Total Work Done: {totalCompletedLastWeek} tasks</h3>
          </div>
        </div>

        {/* Pending Tasks by Days */}
        <div style={{ width: "48%", height: "400px" }}>
          <h2 style={{ textAlign: "center" }}>Pending Tasks by Days</h2>
          <Bar data={pendingChartData} options={barOptions} />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <h3>Total Pending Work: {totalPendingWork} tasks</h3>
          </div>
        </div>
      </div>

      {/* Pending Tasks by Status */}
      {/* <div style={{ padding: "2rem", textAlign: "center", marginTop: "30px" }}>
        <h2>Pending Tasks by Status</h2>
        <Pie data={pieData} options={options} />
      </div> */}
    </div>
  );
};

export default WeeklyTaskStats;
