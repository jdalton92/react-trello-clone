import axios from "axios";
import { getConfig } from "../utils/tokenHelper";
const baseUrl = "/api/boards";

const getBoards = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const getBoard = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

const newBoard = async (payLoad) => {
  const response = await axios.post(baseUrl, payLoad, getConfig());
  return response.data;
};

const updateBoard = async (payLoad) => {
  const response = await axios.put(
    `${baseUrl}/${payLoad._id}`,
    payLoad,
    getConfig()
  );
  return response.data;
};

const deleteBoard = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

// eslint-disable-next-line
export default { getBoards, getBoard, newBoard, updateBoard, deleteBoard };
