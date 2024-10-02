import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KanbanBoard.css";
import Card from "./card/Card";
import Navbar from "./navbar/Navbar";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status"); // Default grouping by status
  const [sortBy, setSortBy] = useState("priority"); // Default sorting by priority

  // Define the possible statuses
  const statusTypes = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

  // Mapping group names to image filenames
  const groupToImageMap = {
    "No Priority": "No-priority.svg",
    Low: "Img - Low Priority.svg",
    Medium: "Img - Medium Priority.svg",
    High: "Img - High Priority.svg",
    Urgent: "SVG - Urgent Priority colour.svg",
    Todo: "To-do.svg",
    "In progress": "in-progress.svg",
    Backlog: "Backlog.svg",
    Done: "Done.svg",
    Cancelled: "Cancelled.svg",
  };

  // Fallback image
  const defaultImage = "user.svg";

  useEffect(() => {
    // Fetch data from API
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        console.log("API Response:", response.data); // Log the data
        setTickets(response.data.tickets); // Extract the tickets
        setUsers(response.data.users); // Extract the users
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Load saved state from localStorage
    const savedGroupBy = localStorage.getItem("groupBy");
    const savedSortBy = localStorage.getItem("sortBy");
    if (savedGroupBy) setGroupBy(savedGroupBy);
    if (savedSortBy) setSortBy(savedSortBy);
  }, []);

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const groupTickets = () => {
    if (!Array.isArray(tickets)) {
      console.error("Tickets is not an array:", tickets); // Add logging if tickets is not an array
      return {};
    }

    // Define priority labels
    const priorityLabels = {
      0: "No Priority",
      1: "Low",
      2: "Medium",
      3: "High",
      4: "Urgent",
    };

    // Create a group object
    let groups = {};
    if (groupBy === "status") {
      statusTypes.forEach((status) => {
        groups[status] = []; // Initialize an empty array for each status
      });
    }

    // Group tickets based on user's selection (status, user, priority)
    return tickets.reduce((groups, ticket) => {
      let key;

      if (groupBy === "user") {
        key = getUserName(ticket.userId); // Group by user name
      } else if (groupBy === "priority") {
        key = priorityLabels[ticket.priority]; // Group by priority labels
      } else {
        key = ticket[groupBy] || "Unknown"; // Group by status or priority
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
      return groups;
    }, groups);
  };

  const groupedTickets = groupTickets();

  // Sort tickets within each group
  Object.keys(groupedTickets).forEach((group) => {
    groupedTickets[group].sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  });

  return (
    <div>
      <Navbar
        sortBy={sortBy}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        setSortBy={setSortBy}
      />

      {tickets.length === 0 ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="kanban-board">
          {Object.keys(groupedTickets).map((group) => (
            <div key={group} className="kanban-column">
              <div className="kanban-header">
                <div className="kanban-title">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/${
                      groupToImageMap[group] || defaultImage
                    }`}
                    alt={`${group} icon`}
                  />
                  <p className="kanban-column-title">{group}</p>
                  <p className="kanban-column-count">
                    {groupedTickets[group].length}
                  </p>
                </div>
                <div className="kanban-title">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/add.svg`}
                    alt="profile"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/3 dot menu.svg`}
                    alt="menu"
                  />
                </div>
              </div>
              {groupedTickets[group].length > 0 ? (
                groupedTickets[group].map((ticket) => (
                  <Card key={ticket.id} ticket={ticket} groupBy={groupBy} />
                ))
              ) : (
                <p></p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
