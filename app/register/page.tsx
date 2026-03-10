"use client";

import Button from "../components/ui/Button/Button";
import InputField from "../components/ui/InputField/InputField";
import InputForm from "../components/ui/InputForm/InputForm";

export default function Register() {
  return ( 
    <>
      <title>Register</title>
      <InputForm onSubmit={() => register()}>
        <InputField placeholder="Email" type="email"/>
        <InputField placeholder="Name" type="text"/>
        <InputField placeholder="Password" type="password"/>
        <InputField placeholder="Password repeat" type="password"/>
        <Button text="Register" type="submit"/>
        <Button type="reset"/>
      </InputForm>
    </>
  );
}

const register = (): void => {};
