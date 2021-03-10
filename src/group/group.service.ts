import axios, { AxiosResponse } from 'axios';
import config from '../config';
import { addTraceparentToHeaders } from '../utils/apm';

const { url } = config.services.group;

export default abstract class GroupService {
  static async getByID(groupID: string, requesterID: string): Promise<AxiosResponse> {
    return axios.get(`${url}${groupID}`, {
      headers: addTraceparentToHeaders({
        [config.userHeader]: requesterID,
      }),
    });
  }
}
