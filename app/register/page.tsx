import InputField from "../components/ui/InputField/InputField";
import InputForm from "../components/ui/InputForm/InputForm";

export default function Register() {
  return ( 
    <>
      <title>Register</title>
      <InputForm>
        <InputField placeholder="Email"/>
        <InputField placeholder="Name"/>
        <InputField placeholder="Password"/>
        <InputField placeholder="Password repeat"/>
      </InputForm>
    </>
  );
}
