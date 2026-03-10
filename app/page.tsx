"use client";

import Button from "./components/ui/Button/Button";
import InputField from "./components/ui/InputField/InputField";
import InputForm from "./components/ui/InputForm/InputForm";

export default function Home() {
  return (
    <InputForm onSubmit={() => login()}>
      <InputField placeholder="Username" type="text"/>
      <InputField placeholder="Password" type="password"/>
      <Button text="Login" type="submit"/>
      <Button type="reset"/>
    </InputForm>
  );
}

const login = ():void => {};
