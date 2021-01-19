import axios, { AxiosResponse } from 'axios';
import config from '../config';

const { url } = config.services.user;

export default class UserService {
  static async getByID(userID: string): Promise<AxiosResponse> {
    return axios.get(`${url}${userID}`);
  }
}
