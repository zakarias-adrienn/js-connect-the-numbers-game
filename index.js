import { delegate } from "./utils.js";

function handleClick(event){
  localStorage.setItem("difficulty", event.target.id);
}
const ul = document.querySelector("ul");
delegate(ul, "click", "a", handleClick);
