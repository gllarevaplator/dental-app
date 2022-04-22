import axios from "axios";

const url = "http://78.47.195.163:5444/api";

export async function get(endpoint) {
  return await axios.get(url + endpoint);
}

export async function post(endpoint, createNew) {
  return await axios.post(url + endpoint, createNew);
}

export async function put(endpoint, update) {
  return await axios.put(url + endpoint, update);
}
