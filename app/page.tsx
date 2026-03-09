import InputField from "./components/ui/InputField/InputField";
import InputForm from "./components/ui/InputForm/InputForm";

export default function Home() {
  return (
    <InputForm>
      <InputField placeholder="Username"/>
      <InputField placeholder="Password"/>
    </InputForm>
  );
}
