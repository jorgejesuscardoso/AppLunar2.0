import axios from "axios";
//const URL = "http://localhost:3000/dev/users";
const URL = "https://gc92plspo3.execute-api.sa-east-1.amazonaws.com/dev/users";

export const verifyToken = async () => {
    try {
        const token = localStorage.getItem("token");

        const verifyToken = await axios.get(`${URL}/verifytoken`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return verifyToken;
    }
    catch (error) {
        console.error(error);
    }
}

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

export const RegisterApi = async (data: any) => {
    try {
        const response = await axios.post(`${URL}`, data);
        const dataResponse = response.data;
        return dataResponse;
    }
    catch (error) {
        console.error(error);
    }
}

export const GetUserApi = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${URL}/all`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const dataResponse = response.data;
        return dataResponse;
    }
    catch (error) {
        console.error(error);
    }
}

export const GetUserByIdApi = async (id: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${URL}/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const dataResponse = response.data;
        return dataResponse;
    }
    catch (error) {
        console.error(error);
    }
}