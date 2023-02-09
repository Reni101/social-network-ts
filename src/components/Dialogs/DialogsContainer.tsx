import React from "react";
import { Dialogs } from "./Dialogs";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../Redux/Redux-store";
import { Navigate } from "react-router-dom";

export const DialogsContainer = () => {
  const isAuth = useSelector<AppRootStateType>((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <h2>In progress...</h2>
      <Dialogs />
    </>
  );
};
