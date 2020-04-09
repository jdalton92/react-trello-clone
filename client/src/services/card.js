import axios from "axios";
import { getConfig } from "../utils/tokenHelper";
const baseUrl = "/api/cards";

const updateCards = async (payload) => {
  const response = await axios.put(
    `${baseUrl}/${payload.listId}`,
    payload,
    getConfig()
  );
  return response.data;
};

export default { updateCards };
