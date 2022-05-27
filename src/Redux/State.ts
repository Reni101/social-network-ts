import {v1} from "uuid";





let rerenderEntireTree = (a:RootStateType) => {

}





export type PostsType = {
    id: string
    message: string
    likeCount: number
};
export type messages = {
    id: number
    message: string
};
export type dialogs = {
    id: number
    name: string
};
export type ProfilePageType = {
    postsData: Array<PostsType>
    newPostText: string
}
export type DialogsPageType = {
    messagesData: Array<messages>
    dialogsData: Array<dialogs>
}
export type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}


let state: RootStateType = {
    profilePage: {
        postsData: [

            {id: v1(), message: "My first post", likeCount: 0},
        ],
        newPostText: "Privet Chubaka",

    },
    dialogsPage: {
        messagesData: [
            {id: 1, message: "Hi"},
            {id: 2, message: "How are you?"},
            {id: 3, message: "Privet"},
            {id: 4, message: "Bye"},
            {id: 5, message: "You"},],
        dialogsData: [
            {id: 1, name: "Maxim"},
            {id: 2, name: "Evgeny"},
            {id: 3, name: "Andrey"},
            {id: 4, name: "Sasha"},
            {id: 5, name: "Denis"},],
    },
    sidebar: {}

}

export const addPost = () => {
    let newPost: PostsType = {
        id: v1(),
        message: state.profilePage.newPostText,
        likeCount: 0,

    };
    state.profilePage.postsData.push(newPost);
    state.profilePage.newPostText = "";
    rerenderEntireTree(state);
}
export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state);
}
export const subscribe= (observer:(state:RootStateType)=>void)=>{
    rerenderEntireTree = observer
}

export default state

//{id: v1(), message: "Hello", likeCount: 5},
//{id: v1(), message: "How are you?", likeCount: 12},
//{id: v1(), message: "My second post", likeCount: 5},