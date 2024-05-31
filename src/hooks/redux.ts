import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/ReduxStore";

export const useAppDispatch = useDispatch<AppDispatch>;