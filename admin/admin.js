// Simple hardcoded login
const USERNAME = "admin";
const PASSWORD = "edible123";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username === USERNAME && password === PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("error").innerText = "Invalid credentials!";
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("adminLoggedIn");
      window.location.href = "index.html";
    });
  }

  // If on dashboard, check login
  if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
      window.location.href = "index.html";
    } else {
      loadOrders();
      loadMessages();
    }
  }
});

// Fetch Orders
function loadOrders() {
  fetch("https://your-backend-url/orders") // Replace with your backend endpoint
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#ordersTable tbody");
      tbody.innerHTML = "";
      data.forEach(order => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${order.name}</td>
          <td>${order.email}</td>
          <td>${order.quantity}</td>
          <td>${new Date(order.date).toLocaleString()}</td>
          <td>${order.status || "Pending"}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}

// Fetch Messages
function loadMessages() {
  fetch("https://your-backend-url/messages") // Replace with your backend endpoint
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#messagesTable tbody");
      tbody.innerHTML = "";
      data.forEach(msg => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.message}</td>
          <td>${new Date(msg.date).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}
