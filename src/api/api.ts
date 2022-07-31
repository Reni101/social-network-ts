import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "fab19197-098e-4362-876a-0c0797e21ac6"
    }

});

const baseURL = 'https://social-network.samuraijs.com/api/1.0/'

export const getUsers = (currentPage: number = 1, pageSize: number = 10) => {
    return instance.get(baseURL + `users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
}

export const followUser = (userId: number) => {
    return instance.post(baseURL + `follow/${userId}`)
        .then(response => response.data)
}




