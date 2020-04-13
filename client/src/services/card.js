import axios from "axios";
import { getConfig } from "../utils/tokenHelper";
const baseUrl = "/api/cards";

const newCard = async (payload) => {
  const response = await axios.post(baseUrl, payload, getConfig());
  return response.data;
};

const updateCard = async (payload) => {
  const response = await axios.put(
    `${baseUrl}/${payload.cardId}`,
    payload,
    getConfig()
  );
  return response.data;
};

const deleteCard = async (payload) => {
  const response = await axios.delete(
    `${baseUrl}/${payload.cardId}`,
    getConfig()
  );
  return response.data;
};

export default { newCard, updateCard, deleteCard };
