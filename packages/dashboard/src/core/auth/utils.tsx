import { getItem, removeItem, setItem } from '../storage';

const AUTH = 'auth';

export type AuthType = {//to change
  createdAt: Date;
  userId: string;
  expire: Date;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
  ip: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
  current: true;
};

export const getAuth = () => getItem<any>(AUTH);
export const removeAuth = () => removeItem(AUTH);
export const setAuth = (value: any) => setItem<any>(AUTH, value);
