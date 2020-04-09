import axios from "axios";
import { getConfig } from "../utils/tokenHelper";
const baseUrl = "/api/lists";

const saveList = async (payload) => {
  const response = await axios.post(baseUrl, payload, getConfig());
  return response.data;
};

const updateList = async (payload) => {
  const response = await axios.put(
    `${baseUrl}/${payload.listId}`,
    payload,
    getConfig()
  );
  return response.data;
};

const deleteList = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default { saveList, updateList, deleteList };
