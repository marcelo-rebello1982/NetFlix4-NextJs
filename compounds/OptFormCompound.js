import React from "react";
import OptFormWrapper from "../components/OptForm/OptFormWrapper";
import OptFormText from "../components/OptForm/OptFormText";
import OptFormEmail from "../components/OptForm/OptFormEmail";
import OptFormButton from "../components/OptForm/OptFormButton";

function OptFormCompound({ children }) {
  return (
    <>
      <OptFormText>
        OptFormCompound - "inserir texto" Enter your email to create new account , or login for membership.
      </OptFormText>
      <OptFormWrapper>
        <OptFormEmail></OptFormEmail>
        <OptFormButton>Get Started</OptFormButton>
      </OptFormWrapper>
      {children}
    </>
  );
}

export default OptFormCompound;
