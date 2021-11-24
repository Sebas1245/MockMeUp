import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../services/tokenUtilities";

const requestUrl = process.env.REACT_APP_BACKEND_URI + "/api/users/interviews";

const fetchInterviews = async () => {
  let token = getToken();
  console.log(token);
  try{
    let response = await axios.get(requestUrl,{
      headers: {
          Authorization: `Bearer: ${token}`
      }
    });
    return response.data;
  }catch(e){
    console.log("error",e);
  };
  return [];
};

export const useInterviews = () => {
  return useQuery(
    ["projects"],
    async () => {
      const interviews = await fetchInterviews();
      return interviews;
    },
    {
      initialData: [],
      // Keep data fresh.
      refetchInterval: 5000,
    }
  );
};