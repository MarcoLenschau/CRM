"use client";

import Container from "./components/Container/Container";
import InputField from "./components/ui/InputField/InputField";
import InputForm from "./components/ui/InputForm/InputForm";

export default function Home() {
  return (
    <Container>
      <InputForm>
        <InputField placeholder="Username"/>
        <InputField placeholder="Password"/>
      </InputForm>
    </Container>
  );
}
