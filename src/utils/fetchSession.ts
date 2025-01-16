import axios from "axios";
import { SessionModel } from "../type.ts";

const fetchSession = async (): Promise<SessionModel> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/session/get`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

export default fetchSession;
