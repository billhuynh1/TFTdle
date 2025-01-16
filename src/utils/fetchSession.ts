import axios from "axios";
import { SessionModel } from "../type.ts";

const fetchSession = async (): Promise<SessionModel> => {
  try {
    const response = await axios.get(`http://18.223.238.67:8080/session/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

export default fetchSession;
