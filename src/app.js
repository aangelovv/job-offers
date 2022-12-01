import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { logout as apiLogout } from "./api/api.js";
import { getUserData } from "./utility.js";
import { loginPage, registerPage } from "./views/auth.js";

import { createPage } from "./views/create.js";
import { dashboard } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

import { homePage } from "./views/homePage.js";

export const main = document.querySelector("main");

setUserNav();

document.getElementById("btnForLogOut").addEventListener("click", onLogout);

page("/", decorateContext, homePage);
page("/register", decorateContext, registerPage);
page("/homePage", decorateContext, homePage);
page("/dashboard", decorateContext, dashboard);
page("/login", decorateContext, loginPage);
page("/create", decorateContext, createPage);
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();

  next();
}

function setUserNav() {
  const user = getUserData();
  if (user) {
    document.querySelector(".user").style.display = "inline";
    document.querySelector(".guest").style.display = "none";
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "inline";
  }
}

async function onLogout() {
  await apiLogout();
  setUserNav();
  page.redirect("/");
}
