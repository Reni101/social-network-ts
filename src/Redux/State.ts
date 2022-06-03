import {v1} from "uuid";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";


export type StoreType = {
    _state: RootStateType

    getState: () => RootStateType
    _callSubscriber: (a: RootStateType) => void
    /* _addPost: () => void
     _updateNewPostText: (newText: string) => void*/
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionsTypes) => void
}
export type ActionsTypes = AddPostActionType | UppdateNewPostTextPostActionType
type AddPostActionType = {
    type: "ADD-POST"
    //newPostText?: string
}
type UppdateNewPostTextPostActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}

export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [

                {id: v1(), message: "My first post", likeCount: 0},
            ],
            newPostText: "Введите текст",

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
    _callSubscriber(a: RootStateType) {
    },
    getState() {
        return this._state
    },
    subscribe(observer: (state: RootStateType) => void) {
        this._callSubscriber = observer
    },
    /* _addPost() {
         let newPost: PostsType = {
             id: v1(),
             message: this._state.profilePage.newPostText,
             likeCount: 0,

         };
         this._state.profilePage.postsData.push(newPost);
         this._state.profilePage.newPostText = "";
         this._callSubscriber(this._state);
     },
     _updateNewPostText(newText: string) {
         this._state.profilePage.newPostText = newText
         this._callSubscriber(this._state);
     },*/
    dispatch(action) {
        if (action.type === "ADD-POST") {
            let newPost: PostsType = {
                id: v1(),
                message: this._state.profilePage.newPostText,
                likeCount: 0,

            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    },


}

export const addPostActionCreator = ():AddPostActionType => ({type: ADD_POST})

export const UppdateNewPostActionCreator = (text: string):UppdateNewPostTextPostActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
 })


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