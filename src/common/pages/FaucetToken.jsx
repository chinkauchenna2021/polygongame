import React from "react";
import FaucetProvider from "../../modules/airdrop/provider/FaucetProvider";
import MainLayout from "./../layouts/MainLayout";

function FaucetToken() {
  return (
    <MainLayout>
      <FaucetProvider />
    </MainLayout>
  );
}

export default FaucetToken;
