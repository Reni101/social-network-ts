import React from "react";
import styleDi from ".././Dialogs.module.css";

type MessagePropsType = {
  message: string;
  id: string;
};

const Message = (props: MessagePropsType) => {
  return (
    <>
      <div className={styleDi.message}>{props.message}</div>
    </>
  );
};

export default Message;
