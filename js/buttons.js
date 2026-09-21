const register = (a) =>
  a
    ? (document.getElementById("registration").style.zIndex = 2)
    : (document.getElementById("registration").style.zIndex = 0);
function createAccount() {
  const regex = /[^A-Za-z0-9 _-]/;
  const username = document.getElementById("username-register").value;
  const password = document.getElementById("password-register").value;
  if (username === "") {
    document.getElementById("error").innerText = "Please enter a username!";
  } else if (password != password.trim()) {
    document.getElementById("error").innerText =
      "Your username may not have trailing or leading spaces.";
  } else if (regex.test(username)) {
    document.getElementById("error").innerText =
      "Your username may only contain letters, numbers, spaces, underscores, or hyphens.";
  } else if (username.length > 16) {
    document.getElementById("error").innerText =
      "Your username may not exceed 16 characters.";
  } else if (localStorage.getItem("user" + username) != null) {
    document.getElementById("error").innerText = "This account already exists.";
  } else if (password === "") {
    document.getElementById("error").innerText = "Please enter a password!";
  } else if (password != password.trim()) {
    document.getElementById("error").innerText =
      "Your password may not have trailing or leading spaces.";
  } else if (regex.test(password)) {
    document.getElementById("error").innerText =
      "Your password may only contain letters, numbers, spaces, underscores, or hyphens.";
  } else if (password.length > 16) {
    document.getElementById("error").innerText =
      "Your password may not exceed 16 characters.";
  } else {
    localStorage.setItem("user" + username, password);
    localStorage.setItem("success", "You've successfully created an account.");
    window.location.href = "success.html";
  }
}
const home = () => (window.location.href = "index.html");
function login() {
  const username = document.getElementById("username-login").value;
  const password = document.getElementById("password-login").value;
  if (localStorage.getItem("user" + username) === null) {
    document.getElementById("error-login").innerText = "User does not exist.";
  } else if (password != localStorage.getItem("user" + username)) {
    document.getElementById("error-login").innerText =
      "You typed the incorrect password.";
  } else {
    localStorage.setItem("login", username);
    localStorage.setItem("success", "You've successfully logged in.");
    window.location.href = "success.html";
  }
}
function logout() {
  localStorage.removeItem("login");
  localStorage.setItem("success", "You've successfully logged out.");
  window.location.href = "success.html";
}
const learn = (a) =>
  a
    ? (document.getElementById("vim-motions").style.zIndex = 2)
    : (document.getElementById("vim-motions").style.zIndex = 0);
