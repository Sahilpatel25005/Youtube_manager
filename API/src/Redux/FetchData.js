import { setUsers } from "./dataSlice";
import apiCall from "../components/Apicall";
// import { useDispatch } from "react-redux";



export const fetchUsers = () => async (dispatch) => {
      const res = await apiCall("/listdata");
      dispatch(setUsers(res));;