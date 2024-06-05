import _ from 'lodash';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useGetFirebaseToken} from './appNotification';
import {useAppSelector} from '../hookHelper';
import { useRemoteConfig } from '../remoteConfig';

export const useAppInIt = () => {
  const {remoteDone, remoteFetch} = useRemoteConfig();
  const [isDone, setIsDone] = useState(false);
  const {getToken} = useGetFirebaseToken();
 
  const accessToken = useAppSelector(
    state => state.AuthenticationReducer.accessToken,
  );
  const appConfig = useAppSelector(state => state.AppReducer.appConfig);
  const dispatch = useDispatch();
  const deviceId = useAppSelector(state => state.AppReducer.deviceId);

  const initData = async () => {
   
  };
  useEffect(() => {
    if (remoteDone) {
      setIsDone(true);
    }
  }, []);
  return {isDone, initData, remoteFetch};
};
