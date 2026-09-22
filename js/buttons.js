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
function exp() {
  if (document.getElementById("textarea-doc").value === "") return;
  document.getElementById("menu").style.top = "-80px";
  document.getElementById("b-indicator").style.color = "transparent";
  document.getElementById("i-indicator").style.color = "transparent";
  document.getElementById("document").style.top = "0px";
  document.getElementById("textarea-doc").style.border = "none";
  document.getElementById("caret").style.background = "transparent";
  window.print();
  document.getElementById("menu").style.top = "0px";
  document.getElementById("b-indicator").style.color = "rgb(0, 0, 0)";
  document.getElementById("i-indicator").style.color = "rgb(0, 0, 0)";
  document.getElementById("document").style.top = "60px";
  document.getElementById("textarea-doc").style.border = "1px solid black";
  document.getElementById("caret").style.background = "rgba(0, 0, 0, 0.25)";
}
let b = false;
let bi = false;
function bold() {
  b = !b;
  bi = !bi;
  const textarea = document.getElementById("textarea-doc");
  const indicator = document.getElementById("b-indicator");
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = b
    ? textarea.value.slice(0, start + 1) + "" + textarea.value.slice(end + 1)
    : textarea.value.slice(0, start + 1) + "" + textarea.value.slice(end + 1);
  textarea.setSelectionRange(start + 1, start + 1);
  indicator.innerText = bi ? "Bold enabled" : "Bold disabled";
}
let it = false;
let ii = false;
function ital() {
  it = !it;
  ii = !ii;
  const textarea = document.getElementById("textarea-doc");
  const indicator = document.getElementById("i-indicator");
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = it
    ? textarea.value.slice(0, start + 1) + "" + textarea.value.slice(end + 1)
    : textarea.value.slice(0, start + 1) + "" + textarea.value.slice(end + 1);
  textarea.setSelectionRange(start + 1, start + 1);
  indicator.innerText = ii ? "Italics enabled" : "Italics disabled";
}
function changeFont() {
  const css = document.getElementById("css");
  const formatted = document.getElementById("formatted-doc");
  const input = document.getElementById("font");
  formatted.style.fontFamily = input.value;
  css.href = css.href.split("?")[0] + "?v=" + Date.now();
}
function changeFontSize() {
  const css = document.getElementById("css");
  const formatted = document.getElementById("formatted-doc");
  const caret = document.getElementById("caret-doc");
  const input = document.getElementById("font-size");
  formatted.style.fontSize = input.value;
  caret.style.fontSize = input.value;
  css.href = css.href.split("?")[0] + "?v=" + Date.now();
}
function save() {
  const regex = /[^A-Za-z0-9 _-]/;
  const username = localStorage.getItem("login");
  const name = document.getElementById("save-name").value;
  const doc = document.getElementById("textarea-doc").value;
  if (username === null) {
    document.getElementById("error").innerText =
      "Please log in to save your document!";
  } else if (name === "") {
    document.getElementById("error").innerText =
      "Please enter a document name!";
  } else if (name != name.trim()) {
    document.getElementById("error").innerText =
      "Your document name may not have trailing or leading spaces.";
  } else if (regex.test(name)) {
    document.getElementById("error").innerText =
      "Your document name may only contain letters, numbers, spaces, underscores, or hyphens.";
  } else if (name.length > 16) {
    document.getElementById("error").innerText =
      "Your document name may not exceed 16 characters.";
  } else {
    localStorage.setItem(username + name, doc);
    document.getElementById("error").innerText = "";
  }
}
function raw() {
  const value = document.getElementById("textarea-doc").value;
  const blob = new Blob([value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "document.txt";
  a.click();
  URL.revokeObjectURL(url);
}
const editor = () => (window.location.href = "editor.html");
