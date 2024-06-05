import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./hookHelper";
import { AppActions } from "../stores/actions";

export const useRemoteConfig = () => {
  const [remoteDone, setRemoteDone] = useState(false);
  const app = useAppSelector((state) => state.AppReducer.appConfig);
  const dispatch = useDispatch();

  const fetchOnly = async () => {};

  const remoteFetch = async () => {
    setRemoteDone(false);
    fetchOnly();
    setRemoteDone(true);
  };

  return { remoteDone, remoteFetch, fetchOnly };
};
