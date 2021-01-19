import axios, { AxiosResponse } from 'axios';
import config from '../config';

const { url } = config.services.group;

export default abstract class GroupService {
  static async getByID(groupID: string, requesterID: string): Promise<AxiosResponse> {
    return axios.get(`${url}${groupID}`,
      { headers: { [config.userHeader]: requesterID } });
  }
}
