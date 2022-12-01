import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPost } from "../api/data.js";

const dashboardTamplate = (offers) => html`
  <section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
    ${offers.length === 0
      ? html`<h2>No offers yet.</h2>`
      : offers.map(offerCard)}
    <!-- Display an h2 if there are no posts -->
  </section>
`;

const offerCard = (offer) => html`
  <div class="offer">
    <img src="${offer.imageUrl}" alt="example1" />
    <p><strong>Title: </strong><span class="title">${offer.title}</span></p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/details/${offer._id}">Details</a>
  </div>
`;

export async function dashboard(ctx) {
  const offers = await getAllPost();
  ctx.render(dashboardTamplate(offers));
}
