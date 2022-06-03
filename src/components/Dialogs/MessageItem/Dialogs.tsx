import React from 'react';
import styleDi from '.././Dialogs.module.css'

type MessagePropsType = {
    message: string
    id: string
}


const Message = (props: MessagePropsType) => {

    /*const newMessageElement = React.createRef<HTMLTextAreaElement>()
    const sendMessagehandler =()=>{
        let message = newMessageElement.current?.value
        alert(message)
    }
*/
    return (<>
            <div className={styleDi.message}>{props.message}

            </div>
            {/*   <textarea ref={newMessageElement}>  </textarea>
             <button onClick={sendMessagehandler}>send message</button>*/}
        </>

    )
}

export default Message;