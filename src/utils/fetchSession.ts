import axios from "axios";
import { SessionModel } from "../type.ts";

const fetchSession = async (): Promise<SessionModel> => {
  try {
    const response = await axios.get(
      "https://0g62r8n5nl.execute-api.us-east-2.amazonaws.com/prod/session/get",
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
