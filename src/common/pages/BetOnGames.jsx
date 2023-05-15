import React, { useState, useEffect } from "react";
import MainLayout from "./../layouts/MainLayout";
import Title from "../../modules/mainComponents/title/Title";
import Inputs from "../../modules/mainComponents/inputs/Inputs";
import NormalButtons from "../../modules/mainComponents/buttons/NormalButtons";
import { ethers } from "ethers";
import BackButton from "../../modules/mainComponents/buttons/BackButton";
import { useParams } from "react-router-dom";
import { getOnLocal } from "../../modules/Hook/useHook";
import { GamingApp } from "../../modules/Hook/jsonContents/GamingApp";
import BigNumber from "bignumber.js";
import { Usdc } from "../../modules/Hook/jsonContents/FaucetUSDC";

function BetOnGames() {
  const saveDataOnLocal = "saveData";
  const { gameId, betNumber } = useParams();
  const [amount, setAmount] = useState("");
  const FAUCET_CONTRACT_ADDRESS = "0x6e06b599A2a2143F2476BA333c0A26322ddc0EfB";
  const GAMING_APP_CONTRACT_ADDRESS ="0xd7c0a8d20d87afa3c6Ba9eeA27628C2a90CCeC31";
  const PLATFORM_ADDRESS = "0x84b1d1f669BA9f479F23AD6D6562Eb89EDDb7741";
  const [contracts, setContracts] = useState(null);
  const [signers, setSigner] = useState();
  const [providers, setProviders] = useState();
  const usdcDecimal = 1000000;
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [balance, setBalance] = useState();
  const [faucetContracts, setFaucetContracts] = useState();

  useEffect(() => {
    (async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          // faucet contract
          const faucetContract = new ethers.Contract(
            FAUCET_CONTRACT_ADDRESS,
            Usdc,
            signer
          );

          //  Gaming contract
          const contract = new ethers.Contract(
            GAMING_APP_CONTRACT_ADDRESS,
            GamingApp,
            signer
          );
          const userAddresses = await signer.getAddress();
          const usdcBalance = await faucetContract.balanceOf(userAddresses);
          const usersBalanceConversion = new BigNumber(usdcBalance).dividedBy(
            usdcDecimal
          );
          setFaucetContracts(faucetContract);
          setBalance(Number(usersBalanceConversion));
          setContracts(contract);
          setSigner(signer);
          setProviders(provider);
          const data = getOnLocal(saveDataOnLocal);
          const retriveData = data.split(",");
          const amountLimit = retriveData[6];
          const amountBN = new BigNumber(amountLimit).dividedBy(usdcDecimal);
          setConvertedAmount(Number(amountBN));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const submitBet = async () => {
    try {
      if (
        amount == "" ||
        !(Number(amount) >= convertedAmount) ||
        balance < convertedAmount
      )
      return;

      const approval = await faucetContracts.approve(
        GAMING_APP_CONTRACT_ADDRESS,
       Number(new BigNumber(amount).mul(usdcDecimal))
      );
      const approvalReturn = await approval.wait();
      if (approvalReturn) {
        const outcome = await contracts.userBetOnGame(
          gameId.toString(),
          betNumber.toString(),
          amount.toString()
        );
        const returnOutcome = await outcome.wait();
        if (returnOutcome) {
          window.alert("Bet Placed Successfully")
        }
      }
    } catch (e) {
      console.log(e);
       window.alert("Bet Failed")
    }
  };

  return (
    <MainLayout className="flex justify-center">
      <div>
        <Title game_title={"bet on game"} />
        <div className="flex w-full justify-center">
          <div className="w-full lg:w-5/12 space-y-3 flex flex-col justify-center ">
            <Inputs
              value={betNumber}
              readOnly={true}
              type={"number"}
              label={"Bet Number"}
            />
            <Inputs type={"hidden"} />
            <Inputs
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type={"number"}
              label={`Bet Amount (Amount must be >= ${convertedAmount} USDC)`}
            />
            <NormalButtons name={"bet on Game"} onClick={() => submitBet()} />
          </div>
        </div>
      </div>

      <div className="w-full flex pt-20 justify-center items-center pl-4 lg:pl-0 ">
        <div className="relative w-full  lg:w-5/12 h-fit">
          <BackButton />
        </div>
      </div>
    </MainLayout>
  );
}

export default BetOnGames;
