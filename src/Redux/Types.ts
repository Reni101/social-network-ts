
export type PostsType = {
    id: string
    message: string
    likeCount: number
};
export type messages = {
    id: string
    message: string
};
export type dialogs = {
    id: string
    name: string
};

export type DialogsPageType = {
    messagesData: Array<messages>
    dialogsData: Array<dialogs>
    newMessagesBody: string
}
export type PostsDataType = {
    id: string
    message: string
    likeCount: number
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe?: null | string

}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null | undefined
    large: string | null | undefined

}

export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: null | string
    photos: PhotosType,
    followed: boolean,
    status: string,
}
export type FilterType = {
    term: string | null,
    friend: null | boolean
}


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


