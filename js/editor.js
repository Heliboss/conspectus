const textarea = document.getElementById("textarea-doc");
const formatted = document.getElementById("formatted-doc");
const caret = document.getElementById("caret-doc");
let mode = "normal";
let o = false;
textarea.addEventListener("input", () => {
  renderText();
  renderCaret();
});
textarea.addEventListener("select", renderCaret);
textarea.addEventListener("keyup", renderCaret);
function renderText() {
  formatted.innerHTML = escapeHTML(textarea.value).replace(/\n/g, "<br>");
}
function renderCaret() {
  const value = textarea.value;
  const p = textarea.selectionStart;
  const before = value.slice(0, p);
  const current = value[p];
  const after = value.slice(p);
  caret.innerHTML =
    `<span class="invis">${escapeHTML(before).replace(/\n/g, "<br>")}</span>` +
    (mode === "normal"
      ? `<span class="caret">${current === " " ? "l" : current === "\n" ? "l" : escapeHTML(current)}</span>`
      : mode === "insert"
        ? "|"
        : "_") +
    `<span class="invis">${escapeHTML(after).replace(/\n/g, "<br>")}</span>`;
}
function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// vim motions
textarea.addEventListener("keydown", (e) => {
  if (mode === "insert") {
    if (e.key === "Escape") {
      e.preventDefault();
      mode = "normal";
      moveLeft();
    } else if (o) {
      moveLeft();
      o = false;
    }
    return;
  }
  e.preventDefault();
  if (mode === "d") {
    if (e.key === "Escape") {
      mode = "normal";
      moveLeft();
      moveRight();
    } else if (e.key === "d") {
      mode = "normal";
      deleteLine();
      moveLeft();
      moveRight();
      renderText();
    }
    return;
  }
  switch (e.key) {
    case "a":
      mode = "insert";
      moveRight();
      break;
    case "i":
      mode = "insert";
      break;
    case "h":
      moveLeft();
      break;
    case "l":
      moveRight();
      break;
    case "j":
      moveVertical(1);
      break;
    case "k":
      moveVertical(-1);
      break;
    case "^":
      moveLineStart();
      break;
    case "$":
      moveLineEnd();
      break;
    case "b":
      moveWordBackward();
      break;
    case "w":
      moveWordForward();
      break;
    case "e":
      moveWordForwardEnd();
      break;
    case "o":
      moveLineEnd();
      mode = "insert";
      moveRight();
      enter();
      if (textarea.value[textarea.selectionStart] === "\n") {
        moveRight();
        if (textarea.value[textarea.selectionStart + 1] != undefined) o = true;
      }
      break;
    case "O":
      if (textarea.value[textarea.selectionStart] != "\n") moveLineStart();
      else moveLineStart(2);
      mode = "insert";
      enter();
      moveLeft();
      break;
    case "d":
      mode = "d";
      break;
    case "u":
      document.execCommand("undo");
      break;
    case "r":
      if (e.ctrlKey) document.execCommand("redo");
      break;
  }
});
function enter() {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value =
    textarea.value.slice(0, start) + "\n" + textarea.value.slice(end);
  textarea.setSelectionRange(start + 1, start + 1);
}
function moveLeft() {
  const p = textarea.selectionStart;
  const left = Math.max(0, p - 1);
  const pos =
    textarea.value[left] === "\n"
      ? textarea.value[left - 1] != "\n"
        ? left - 1 < 0
          ? 0
          : left - 1
        : left
      : left;
  textarea.setSelectionRange(pos, pos);
}
function moveRight() {
  const p = textarea.selectionStart;
  const length =
    mode === "normal" ? textarea.value.length - 1 : textarea.value.length;
  const right = Math.min(length, p + 1);
  const pos =
    textarea.value[right] === "\n"
      ? textarea.value[p] === "\n"
        ? right
        : right + 1
      : right;
  textarea.setSelectionRange(pos, pos);
}
function moveLineStart(n = 1) {
  const p = textarea.selectionStart;
  const start = textarea.value.lastIndexOf("\n", p - 1) + n;
  textarea.setSelectionRange(start, start);
}
function moveLineEnd() {
  const p = textarea.selectionStart;
  const end = textarea.value.indexOf("\n", p);
  const pos =
    textarea.value[p] === "\n"
      ? p
      : end === -1
        ? textarea.value.length - 1
        : end - 1;
  textarea.setSelectionRange(pos, pos);
}
function moveVertical(direction) {
  const p = textarea.selectionStart;
  const before = textarea.value.slice(0, p);
  const column = p - (before.lastIndexOf("\n") + 1);
  let target;
  if (direction < 0) {
    const previousEnd = before.lastIndexOf("\n");
    if (previousEnd < 0) return;
    const previousStart = textarea.value.lastIndexOf("\n", previousEnd - 1) + 1;
    target = Math.min(previousStart + column, previousEnd);
  } else {
    const currentEnd = textarea.value.indexOf("\n", p);
    if (currentEnd < 0) return;
    const nextStart = currentEnd + 1;
    const nextEnd = textarea.value.indexOf("\n", nextStart);
    target = Math.min(
      nextStart + column,
      nextEnd === -1 ? textarea.value.length : nextEnd,
    );
  }
  target =
    textarea.value[target] === "\n"
      ? textarea.value[target - 1] != "\n"
        ? target - 1 < 0
          ? 0
          : target - 1
        : target
      : target;
  textarea.setSelectionRange(target, target);
}
function moveWordBackward() {
  const p = textarea.selectionStart;
  const nl = textarea.value.lastIndexOf("\n", p - 2);
  const sp = textarea.value.lastIndexOf(" ", p - 2);
  const backward = Math.max(fb(nl), fb(sp));
  const pos = backward === 0 ? 0 : backward + 1;
  textarea.setSelectionRange(pos, pos);
}
function moveWordForward() {
  const p = textarea.selectionStart;
  const nl = textarea.value.indexOf("\n", p);
  const sp = textarea.value.indexOf(" ", p);
  const forward = Math.min(fw(nl), fw(sp));
  const pos =
    forward === Infinity
      ? textarea.value.length - 1
      : forward + 1 > textarea.value.length - 1
        ? forward
        : forward + 1;
  textarea.setSelectionRange(pos, pos);
}
function moveWordForwardEnd() {
  const p = textarea.selectionStart;
  const nl = textarea.value.indexOf("\n", p + 2);
  const sp = textarea.value.indexOf(" ", p + 2);
  const forward = Math.min(fw(nl), fw(sp));
  const pos =
    forward === Infinity
      ? textarea.value.length - 1
      : forward - 1 > textarea.value.length - 1
        ? forward
        : forward - 1;
  textarea.setSelectionRange(pos, pos);
}
const fb = (a) => (a === -1 ? 0 : a);
const fw = (a) => (a === -1 ? Infinity : a);
function deleteLine() {
  moveLineStart();
  const start = textarea.selectionStart;
  moveLineEnd();
  const end = textarea.selectionStart;
  const n = textarea.value[start] === "\n" ? 1 : 2;
  textarea.value =
    textarea.value.slice(0, start) + textarea.value.slice(end + n);
  if (textarea.value[textarea.selectionStart] === undefined) moveLeft();
}
