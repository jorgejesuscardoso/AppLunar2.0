import axios from "axios";

//const URL = "http://localhost:3000/dev/posts";
const URL = "https://gc92plspo3.execute-api.sa-east-1.amazonaws.com/dev/posts";

export const GetPostagens = async () => {
    try{
        const response = await axios.get(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}