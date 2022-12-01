import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all ads
export async function getAllPost() {
  return await api.get(host + "/data/offers?sortBy=_createdOn%20desc");
}

// get ad by id
export async function getPostById(id) {
  return await api.get(host + `/data/offers/` + id);
}

// create ad
export async function createPost(listing) {
  return await api.post(host + "/data/offers", listing);
}

// edit ad by id
export async function editPostById(id, listing) {
  return await api.put(host + `/data/offers/` + id, listing);
}

// delete ad by id
export async function deletePostById(id) {
  return await api.del(host + `/data/offers/` + id);
}

// get my ads
// export async function getMyPosts(userId) {
//     return await api.get(host + `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }
