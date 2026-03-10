"use client";

import { useState } from "react";
import Button from "./components/ui/Button/Button";
import InputField from "./components/ui/InputField/InputField";
import InputForm from "./components/ui/InputForm/InputForm";
import ErrorDialog from "./components/ui/dialogs/ErrorDialog/ErrorDialog";
import InputContainer from "./components/ui/InputContainer/InputContainer";

export default function Home() {
  const [errorDialogMessage, setErrorDialog] = useState(""); 
  return (
    <>
      {errorDialogMessage !== "" && <ErrorDialog text={errorDialogMessage} setErrorDialog={setErrorDialog}/>}
      <InputForm onSubmit={() => login()}>
        <InputContainer>
          <InputField placeholder="Username" type="text"/>
          <InputField placeholder="Password" type="password"/>        
        </InputContainer>
        <InputContainer>
          <Button text="Login" type="submit"/>
          <Button type="reset"/>        
        </InputContainer>
      </InputForm>     
    </>
  );
}

const login = ():void => {};
