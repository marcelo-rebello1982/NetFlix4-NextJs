import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../context/FirbaseContext";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import Navbar from "../components/Header/Navbar";
import Logo from "../components/Header/Logo";
import FooterCompound from "../compounds/FooterCompound";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormBase from "../components/SignForm/SignFormBase";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormInput from "../components/SignForm/SignFormInput";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormLink from "../components/SignForm/SignFormLink";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import SignFormError from "../components/SignForm/SignFormError";
import Warning from "../components/Feature/Warning";

function SignupPage() {
  const history = useRouter();
  const firebase = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const IsInvalid = password === "" || emailAddress === "" || firstName === "";

  function handleSubmit(event) {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) =>
        result.user
          .updateProfile({
            displayName: firstName,
          })
          .then(() => {
            setFirstName("");
            setEmailAddress("");
            setPassword("");
            history.push("/browse");
          })
      )
      .catch((error) => setError(error.message));
  }

  return (
    <>
      <HeaderWrapper>
        <Navbar>
          <Logo />
        </Navbar>
        <SignFormWrapper>
          <SignFormBase onSubmit={handleSubmit} method="POST">
            <Warning>SingUP - acertar msg</Warning>
            <SignFormTitle>Sign Up</SignFormTitle>
            {error ? <SignFormError>{error}</SignFormError> : null}
            <SignFormInput
              type="text"
              placeholder="nome .. first name ? "
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <SignFormInput
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <SignFormInput
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <SignFormButton disabled={IsInvalid}>Sign Up</SignFormButton>
            <SignFormText>
              J?? ?? um usu??rio?
              <SignFormLink href="/signin">Entre agora.</SignFormLink>
            </SignFormText>
            <SignFormCaptcha>
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </SignFormCaptcha>
          </SignFormBase>
        </SignFormWrapper>
      </HeaderWrapper>
      <FooterCompound />
    </>
  );
}

export default SignupPage;
