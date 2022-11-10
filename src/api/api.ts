import axios from "axios";
import {UserType} from "../Redux/users-reducer";
import {PhotosType, ProfileType} from "../Redux/profile-reducer";

type getUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: null | string
}
export type ResponceType<T = {}> = {
    data: T;
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
}

export type AuthResType = {
    id: number;
    login: string;
    email: string;
}
export type LoginType = {
    userId: number;
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "fab19197-098e-4362-876a-0c0797e21ac6"
    }
});


export const usersAPI = {

    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUser(userId: number) {
        return instance.post<ResponceType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponceType>(`follow/${userId}`)
            .then(response => response.data)
    },


}

export const authAPI = {
    getAuthMe() {
        return instance.get<ResponceType<AuthResType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha?:string) {
        return instance.post<ResponceType<LoginType>>(`auth/login`, {email, password, rememberMe,captcha})
    },
    logout() {
        return instance.delete<ResponceType>(`auth/login`,)
    },

}

export const profileAPI = {
    getProfile(userid: string) {
        return instance.get<ProfileType>(`profile/` + userid)
    },
    getStatus(userid: string) {
        return instance.get<string>(`profile/status/${userid}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponceType>(`profile/status`, {status},)
    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<ResponceType<{photos:PhotosType}>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}

export const securityAPI = {
    getCaptcha(){
        return instance.get<{url:string}>('security/get-captcha-url')
    }
}

