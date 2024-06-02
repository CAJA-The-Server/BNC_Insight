import {} from "../components/account/app.js";
import {} from "../components/account/input.js";
import {} from "../components/account/slide.js";
import {} from "../components/header.js";
import { throttle } from "./event/throttle.js";

const app = document.querySelector("#app");
const slides = app.querySelectorAll(".slide");

const authTokenSlide = app.querySelector("#auth-token-slide");
const idSlide = app.querySelector("#id-slide");
const passwordSlide = app.querySelector("#password-slide");
const passwordConfirmSlide = app.querySelector("#password-confirm-slide");
const nameSlide = app.querySelector("#name-slide");

let authToken;
let id;
let password;
let name;

const throttle2 = (callback) => {
  let timer = null;
  const interrupt = (unit, times, callback, ...args) => {
    let time = 0;
    const setUnitTimeout = () => {
      time += 1;
      if (time > times) {
        timer = null;
        return;
      }
      return setTimeout(() => {
        if (callback) callback(time, times - time, ...args);
        setUnitTimeout();
      }, unit);
    };
    callback(0, times);
    timer = setUnitTimeout();
  };
  return (...args) => {
    if (timer) return;
    callback(interrupt, ...args);
  };
};

authTokenSlide.addEventListener("submit", async () => {
  const value = authTokenSlide.value;

  if (!value) {
    authTokenSlide.setAttribute("error", "invalid token");
    return;
  }

  const res = await fetch(
    "/api/signup/auth/token?" + new URLSearchParams({ value })
  );
  const json = await res.json();

  if (!res.ok || !json.valid) {
    authTokenSlide.setAttribute("error", json.error || "invalid token");
    return;
  }

  authToken = value;
  app.nextSlide();
});

idSlide.addEventListener("submit", async (event) => {
  const value = idSlide.value;

  if (!value) {
    idSlide.setAttribute("error", "invalid id");
    return;
  }

  const res = await fetch(
    "/api/signup/auth/id?" + new URLSearchParams({ value })
  );
  const json = await res.json();

  if (!res.ok || !json.valid) {
    idSlide.setAttribute("error", json.error || "invalid id");
    return;
  }

  id = value;
  app.nextSlide();
});
