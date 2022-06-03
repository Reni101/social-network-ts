import {v1} from "uuid";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const UPDATE_NEW_MESSAGES_BODY = "UPDATE-NEW-MESSAGES-BODY";
const SEND_MESSAGES = "SEND-MESSAGES";


export type StoreType = {
    _state: RootStateType

    getState: () => RootStateType
    _callSubscriber: (a: RootStateType) => void
    /* _addPost: () => void
     _updateNewPostText: (newText: string) => void*/
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionsTypes) => void
}
export type ActionsTypes =
    AddPostActionType
    | SendMessageActionType
    | UppdateNewPostTextPostActionType
    | UppdateNewMessageBodyActionType

type AddPostActionType = {
    type: "ADD-POST"
    //newPostText?: string
}
type UppdateNewPostTextPostActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}
type SendMessageActionType = {
    type: "SEND-MESSAGES"
}
type UppdateNewMessageBodyActionType = {
    type: "UPDATE-NEW-MESSAGES-BODY";
    body: string
}

export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [

                {id: v1(), message: "My first post", likeCount: 0},
            ],
            newPostText: "",

        },
        dialogsPage: {
            messagesData: [
                {id: v1(), message: "Hi"},
                {id: v1(), message: "How are you?"},
                {id: v1(), message: "Privet"},
                {id: v1(), message: "Bye"},
                {id: v1(), message: "You are great"},],
            dialogsData: [
                {id: v1(), name: "Maxim"},
                {id: v1(), name: "Evgeny"},
                {id: v1(), name: "Andrey"},
                {id: v1(), name: "Sasha"},
                {id: v1(), name: "Denis"},],
            newMessagesBody: " ",
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
        if (action.type === ADD_POST) {
            let newPost: PostsType = {
                id: v1(),
                message: this._state.profilePage.newPostText,
                likeCount: 0,

            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGES_BODY) {
            this._state.dialogsPage.newMessagesBody = action.body;
            this._callSubscriber(this._state);
        } else if (action.type === SEND_MESSAGES) {
            let body: string = this._state.dialogsPage.newMessagesBody;
            this._state.dialogsPage.messagesData.push({id: v1(), message: body})
            this._state.dialogsPage.newMessagesBody = "";
            this._callSubscriber(this._state);

        }

    },


}


export const addPostCreator = (): AddPostActionType => ({type: ADD_POST})
export const UppdateNewPostCreator = (text: string): UppdateNewPostTextPostActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})

export const sendMessageCreator = (): SendMessageActionType => ({type: SEND_MESSAGES})
export const UppdateNewMessageBodyCreator = (body: string): UppdateNewMessageBodyActionType => ({
    type: UPDATE_NEW_MESSAGES_BODY,
    body: body,
})


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
export type ProfilePageType = {
    postsData: Array<PostsType>
    newPostText: string
}
export type DialogsPageType = {
    messagesData: Array<messages>
    dialogsData: Array<dialogs>
    newMessagesBody: string
}
export type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}


//window.store = store;