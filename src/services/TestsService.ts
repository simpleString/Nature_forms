import axios from 'axios';
import { BASE_URL } from '../configs';
import { IPost } from '../interfaces';

export class TestsService {
  public static async getTestsForPost(id: number) {
    const result = await axios.get(BASE_URL + `posts/${id}/tests`);
    if (result.status !== 200) throw 'Server error';
    return result.data.data;
  }

  public static async getTheories(): Promise<IPost[]> {
    const result = await axios.get(process.env.REACT_APP_BASE_URL + 'theories');
    if (result.status !== 200) throw 'Server error';
    return result.data;
  }
}
