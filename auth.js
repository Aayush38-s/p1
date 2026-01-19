
const DEMO_USERS = [
  { name: "Admin User",   email: "admin@gmail.com",   password: "admin123",   role: "admin_p" },
  { name: "Tutor User",   email: "tutor@gmail.com",   password: "tutor123",   role: "tutor" },
  { name: "Student User", email: "student@gmail.com", password: "student123", role: "student" },
  { name: "Company User", email: "company@gmail.com", password: "company123", role: "company" }
];

const ROLE_ROUTES = {
  admin_p: "admin_p/dashboard.html",
  tutor:   "tutor/dashboard.html",
  student: "student/dashboard.html",
  company: "company/dashboard.html"
};

// Auto-redirect if already logged in
(function () {
  const user = JSON.parse(localStorage.getItem("demoUser") || "null");
  if (user && ROLE_ROUTES[user.role]) {
    window.location.href = ROLE_ROUTES[user.role];
  }
})();

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const pass  = document.getElementById("password").value.trim();
  const msg   = document.getElementById("formMessage");

  const found = DEMO_USERS.find(u =>
    u.email.toLowerCase() === email && u.password === pass
  );

  if (!found) {
    if (msg) msg.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("demoUser", JSON.stringify({
    name: found.name,
    email: found.email,
    role: found.role
  }));

  window.location.href = ROLE_ROUTES[found.role];
});

