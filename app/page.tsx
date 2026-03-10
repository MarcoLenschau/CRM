import Button from "./components/ui/Button/Button";
import InputField from "./components/ui/InputField/InputField";
import InputForm from "./components/ui/InputForm/InputForm";

export default function Home() {
  return (
    <InputForm>
      <InputField placeholder="Username" type="text"/>
      <InputField placeholder="Password" type="password"/>
      <Button type="submit" onClick={() => login()}/>
    </InputForm>
  );
}

const login = ():void => {};
