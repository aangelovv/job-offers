import { html } from "../../node_modules/lit-html/lit-html.js";
import { deletePostById, getPostById } from "../api/data.js";
import { getUserData } from "../utility.js";

const detailsTemplate = (
  offer,
  isOwner,
  onDelete,
  forbtns,
  notOwner,
  forApply
) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${offer.imageUrl}" />
      <p id="details-title">${offer.title}</p>
      <p id="details-category">
        Category: <span id="categories">${offer.category}</span>
      </p>
      <p id="details-salary">
        Salary: <span id="salary-number">${offer.salary}</span>
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span>${offer.description}</span>
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span>${offer.requirements}</span>
        </div>
      </div>
      <p>Applications: <strong id="applications">1</strong></p>

      <!--Edit and Delete are only for creator-->

      <div id="action-buttons">
        ${forbtns(isOwner, onDelete, offer)} ${forApply(notOwner)}
      </div>
    </div>
  </section>
`;

const forbtns = (isOwner, onDelete, offer) => html`
  ${isOwner
    ? html` <a class="edit-btn" href="/edit/${offer._id}">Edit</a>
        <a class="delete-btn" href="javascript:void(0)" @click=${onDelete}
          >Delete</a
        >`
    : null}
`;

const forApply = (notOwner) => html`
  ${notOwner ? html`<a href="" id="apply-btn">Apply</a>` : null}
`;

export async function detailsPage(ctx) {
  const offer = await getPostById(ctx.params.id);

  const userData = getUserData();
  const isOwner = userData && offer._ownerId === userData._id;
  const notOwner = userData && offer._ownerId !== userData._id;

  ctx.render(
    detailsTemplate(offer, isOwner, onDelete, forbtns, notOwner, forApply)
  );

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deletePostById(ctx.params.id);
      ctx.page.redirect("/dashboard");
    }
  }
}
