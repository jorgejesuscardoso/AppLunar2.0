import axios from "axios";

const URL = "https://gc92plspo3.execute-api.sa-east-1.amazonaws.com/dev/users";
//const URL = "http://localhost:3000/dev/users";

export const LoginApi = async (user: string, password: string) => {
    try {
        const response = await axios.post(`${URL}/login`, { user, password});
        const dataResponse = response.data;
        return dataResponse;
    }
    catch (error) {
        console.error(error);
    }
}