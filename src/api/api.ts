import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "fab19197-098e-4362-876a-0c0797e21ac6"
    }
});

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },


}

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    },

}

export const profileAPI = {
    getProfile(userid: string) {
        return instance.get(`profile/` + userid)
    },
    getStatus(userid: string){
    return instance.get(`profile/status/${userid}`)
    },
    updateStatus(status:string){
        return instance.put (`profile/status`,{status},)
    },

}



