import {v1} from "uuid";


export type StoreType = {
    _state: RootStateType
    updateNewPostText: (newText: string) => void
    getState: () => RootStateType
    _callSubscriber: (a: RootStateType) => void
    addPost: () => void
    subscribe: (observer: (state: RootStateType) => void) => void
}

export let store: StoreType = {
    _state: {
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

    },
    getState() {
        return this._state
    },
    _callSubscriber(a: RootStateType) {
    },
    addPost() {
        debugger;
        let newPost: PostsType = {
            id: v1(),
            message: this._state.profilePage.newPostText,
            likeCount: 0,

        };
        this._state.profilePage.postsData.push(newPost);
        this._state.profilePage.newPostText = "";
        this._callSubscriber(this._state);
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber(this._state);
    },
    subscribe(observer: (state: RootStateType) => void) {
        this._callSubscriber = observer
    },


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



//window.store = store;