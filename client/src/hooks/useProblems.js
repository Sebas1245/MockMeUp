import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../services/tokenUtilities";

const requestUrl = process.env.REACT_APP_BACKEND_URI + "/api/problems";

const fetchProblems = async () => {
  let token = getToken();
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

export const useProblems = () => {
  return useQuery(
    ["problems"],
    async () => {
      const problems = await fetchProblems();
      return problems;
    },
    {
      initialData: [],
      // Keep data fresh.
      refetchInterval: 5000,
    }
  );
};