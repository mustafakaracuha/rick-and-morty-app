import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

const api = axios.create({
    baseURL: BASE_URL,
});

export const fetchData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("GET isteği sırasında bir hata oluştu:", error.message);
        throw error;
    }
};
