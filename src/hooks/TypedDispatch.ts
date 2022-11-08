import { AppDispatch } from "./../redux/store";
import { useDispatch } from "react-redux";

export const useTypedDispatch: () => AppDispatch = useDispatch;
