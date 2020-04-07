import axios from "axios";
import { getConfig } from "../utils/tokenHelper";
const baseUrl = "/api/lists";

const saveList = async (payLoad) => {
  const response = await axios.post(baseUrl, payLoad, getConfig());
  return response.data;
};

const updateList = async (payLoad) => {
  const response = await axios.put(
    `${baseUrl}/${payLoad._id}`,
    payLoad,
    getConfig()
  );
  return response.data;
};

const updateList = async (payLoad) => {
  const response = await axios.put(
    `${baseUrl}/${payLoad._id}`,
    payLoad,
    getConfig()
  );
  return response.data;
};

const deleteList = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default { saveList, updateList, deleteList };
