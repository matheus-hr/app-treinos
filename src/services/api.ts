import axios from "axios";

const AUTH_TOKEN = "Colocar o token aqui";

export const api = axios.create({
    baseURL: "https://api.notion.com/v1",
    headers: {
        "Authorization": `Bearer ${ AUTH_TOKEN }`,
        "Notion-Version": `2022-06-28`
    }
});