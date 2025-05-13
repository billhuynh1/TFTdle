import axios from "axios";
import { SessionModel } from "../type";

const fetchSession = async (): Promise<SessionModel> => {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
  try {
    const response = await axios.get(`${API_BASE_URL}/session/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

export default fetchSession;
