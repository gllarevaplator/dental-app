import axios from "axios";

const url = "http://78.47.195.163:5444/api";

// GET METHOD
export const get = async (endpoint) => await axios.get(url + endpoint);

// POST METHOD
export const post = async (endpoint, createNew) =>
  await axios.post(url + endpoint, createNew);

// PUT METHOD
export const put = async (endpoint, id) => await axios.put(url + endpoint, id);

// DELETE METHOD
export const remove = async (endpoint, id) =>
  await axios.delete(url + endpoint, id);
