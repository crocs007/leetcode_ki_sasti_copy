// Change these if your backend runs on a different port/host.
const AUTH_BASE = "http://localhost:3000/api/auth";
const PROBLEM_BASE = "http://localhost:3000/api/problem";

// ---------- Session helpers ----------
function saveSession(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

function isLoggedIn() {
  return !!getToken();
}

function isAdmin() {
  const user = getUser();
  return !!user && user.role === "admin";
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// ---------- Fetch wrapper ----------
// base: "auth" -> /api/auth, "problem" -> /api/problem
async function apiFetch(path, options = {}, base = "auth") {
  const headers = options.headers ? { ...options.headers } : {};
  headers["Content-Type"] = "application/json";

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const baseUrl = base === "problem" ? PROBLEM_BASE : AUTH_BASE;

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // no JSON body
  }

  if (!res.ok) {
    const message = (data && data.message) || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  return data;
}

// ---------- Navbar ----------
function renderNavbar(targetId = "navbar") {
  const el = document.getElementById(targetId);
  if (!el) return;

  const loggedIn = isLoggedIn();
  const user = getUser();
  const admin = isAdmin();

  el.innerHTML = `
    <div class="navbar-inner">
      <a href="${loggedIn ? "problems.html" : "index.html"}" class="brand">
        <span class="brand-mark" style="margin: 0px -6px 0px 0px;">&lt;</span>
        <span class="brand-mark" style="margin: 0px -6px 0px 0px;">/</span>
        <span class="brand-mark">&gt;</span> CodeArena
      </a>
      <div class="nav-links">
        ${loggedIn ? `<a href="problems.html">Problems</a>` : ""}
        ${admin ? `<a href="create-problem.html">New Problem</a>` : ""}
      </div>
      <div class="nav-user">
        ${
          loggedIn
            ? `
              <span>${user.FullName && user.FullName.firstName ? user.FullName.firstName : user.email}</span>
              <span class="role-badge">${user.role}</span>
              <button class="btn btn-ghost" id="logoutBtn" style="padding:6px 14px;font-size:0.82rem;">Log out</button>
            `
            : `
              <a href="login.html" class="btn btn-ghost" style="padding:8px 16px;">Log in</a>
              <a href="signup.html" class="btn btn-primary" style="padding:8px 16px;">Sign up</a>
            `
        }
      </div>
    </div>
  `;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
}

// ---------- Route guards ----------
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

function requireAdmin() {
  if (!isLoggedIn() || !isAdmin()) {
    window.location.href = "problems.html";
  }
}

function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = "problems.html";
  }
}