const container = document.getElementById('container');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

// Chuyển form
signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// Đăng ký
document.querySelector(".sign-up form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!username || !email || !password) return alert("Please fill all fields.");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === username)) {
    alert("Username already exists.");
    return;
  }

  users.push({ username, email, password, role: "user" });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created successfully!");
  container.classList.remove('right-panel-active');
});

// Đăng nhập
document.querySelector(".sign-in form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (username === adminAccount.username && password === adminAccount.password) {
    localStorage.setItem("currentUser", JSON.stringify(adminAccount));
    alert("Admin login successful!");
    window.location.href = "admin.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find(u => u.username === username && u.password === password);

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    alert("Login successful!");
    window.location.href = "main.html";
  } else {
    alert("Invalid username or password.");
  }
});
// Thêm vào script.js
const textEl = document.getElementById("typing-text");
const text = "Hello, Friend!";
let idx = 0;

function typeText() {
  if (idx <= text.length) {
    textEl.innerText = text.slice(0, idx++);
    setTimeout(typeText, 100);
  }
}
typeText();
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const ripple = document.createElement("span");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
document.querySelector("#darkmode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


