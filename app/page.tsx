"use client";

import { useState } from "react";
import Button from "./components/ui/Button/Button";
import InputField from "./components/ui/InputField/InputField";
import InputForm from "./components/ui/InputForm/InputForm";
import ErrorDialog from "./components/ui/dialogs/ErrorDialog/ErrorDialog";

export default function Home() {
  const [errorDialogMessage, setErrorDialog] = useState(""); 
  return (
    <>
      {errorDialogMessage !== "" && <ErrorDialog text={errorDialogMessage} setErrorDialog={setErrorDialog}/>}
      <InputForm onSubmit={() => login()}>
        <InputField placeholder="Username" type="text"/>
        <InputField placeholder="Password" type="password"/>
        <Button text="Login" type="submit"/>
        <Button type="reset"/>
      </InputForm>     
    </>
  );
}

const login = ():void => {};
