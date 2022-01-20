import axios from "axios";
import { ITheoryData } from "../interfaces";

export class TestsService {
    public static async getTests() {
        const result = await axios.get(
            process.env.REACT_APP_BASE_URL + "tests"
        );
    }

    public async getTheories(): Promise<ITheoryData[]> {
        const result = await axios.get(
            process.env.REACT_APP_BASE_URL + "theories"
        );
        if (result.status !== 200) throw "Server error";
        return result.data;
    }
}
