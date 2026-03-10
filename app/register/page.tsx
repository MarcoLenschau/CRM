"use client";

import Button from "../components/ui/Button/Button";
import InputField from "../components/ui/InputField/InputField";
import InputForm from "../components/ui/InputForm/InputForm";

export default function Register() {
  return ( 
    <>
      <title>Register</title>
      <InputForm>
        <InputField id="email" placeholder="Email" type="email"/>
        <InputField id="name" placeholder="Name" type="text"/>
        <InputField id="password" placeholder="Password" type="password"/>
        <InputField id="password-repear" placeholder="Password repeat" type="password"/>
        <Button onClick={register} type="button" text="Register"/>
        <Button type="reset"/>
      </InputForm>
    </>
  );
}

const register = async(): Promise<void> => {
  const email = (document.getElementById("email") as HTMLInputElement)?.value;
  const name = (document.getElementById("name") as HTMLInputElement)?.value;
  const password = (document.getElementById("password") as HTMLInputElement)?.value;
  const passwordRepeat = (document.getElementById("password-repear") as HTMLInputElement);
  
  if (password !== passwordRepeat?.value) {
    passwordRepeat.setCustomValidity("Not the same input how in the password field");
    passwordRepeat.reportValidity();
    return;
  }
  const response = await fetchData(name, email, password);
  response.status === 200 ? console.log("User is created") : 
  response.status === 400 ? console.error("User is not created") : console.error("Error");
};

const fetchData = async(name: string, email: string, password: string) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      name: name,
      email: email,
      password: password
    })
  });
  return response;
}
