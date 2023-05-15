import React, { useEffect, useState } from "react";
import * as S from "../styles/Styles";
import Inputs from "../../mainComponents/inputs/Inputs";
import NormalButtons from "../../mainComponents/buttons/NormalButtons";
import Video from "../../mainComponents/video/Video";
import Audios from "../../mainComponents/audio/Audios";
import AudioPlayer from "../../mainComponents/audioComponents/AudioPlayer";
import SuccessfullAlert from "../../alert/SuccessfullAlert";
import BackButton from "../../mainComponents/buttons/BackButton";
import { ethers } from "ethers";
import { Usdc } from "../../Hook/jsonContents/FaucetUSDC.jsx";
import ErrorAlert from "../../alert/ErrorAlert";
// import BigNumber from 'big-number/big-number'
import BigNumber from "bignumber.js";

function FaucetTokenPage() {
  const [showSuccess, setShowSuccess] = useState("hidden");
  const [showError, setShowError] = useState("hidden");
  const tokenAddress = "0x6e06b599A2a2143F2476BA333c0A26322ddc0EfB";
  const tokenSymbol = "USDC";
  const MAINPRIVETKEY =
    "7de9cc7423ffe0cebe2545895f4d922a5d30c50dd040febed1927d31818f4fc2";
  const tokenDecimals = 6;
  const tokenImage =
    "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=025";
  const [providers, setProvider] = useState(null);
  const [signers, setSigner] = useState(null);
  const [addresses, setAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [eligible, setEligible] = useState(true);
  const [totalSupply, setTotalSupply] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(null);
  const [contracts, setContracts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const decimal = 1000000;
          const minimalWalletBalance = 500;
          const MainContractSigner = new ethers.Wallet(MAINPRIVETKEY, provider);
          const contract = new ethers.Contract(
            tokenAddress,
            Usdc,
            MainContractSigner
          );
          setProvider(provider);
          setSigner(signer);
          setAddress(address);
          setContracts(contract);
          const balance = await contract.balanceOf(address);
          // const mainBalance = ethers.parseUnits(balance.toString(), 6)
          let x = new BigNumber(balance);
          let value = x.dividedBy(decimal);

          const absoluteBalance = parseFloat(value);
          //  console.log(Number(value))
          setWalletBalance(absoluteBalance);
          const names = await contract.name();
          setTokenName(names);
          const availableBalances = await contract.balanceOf(
            "0x84b1d1f669BA9f479F23AD6D6562Eb89EDDb7741"
          );
          const total = await contract.totalSupply();
          const eligibility = absoluteBalance > minimalWalletBalance;
          setEligible(eligibility);

          setAvailableBalance(
            parseFloat(new BigNumber(availableBalances).dividedBy(decimal))
          );
          setTotalSupply(parseFloat(new BigNumber(total).dividedBy(decimal)));
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const showModal = () => {
    setShowSuccess("");
  };

  const showErrors = () => {
    setShowError("");
  };
  const enterBetPage = () => {
    window.history.back();
  };

  const addToken = async () => {
    try {
      await ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => console.log("correct"))
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log("Please connect to MetaMask.");
          } else {
            console.error(error);
          }
        });

      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendToken = async () => {
    try {
      const tx = await contracts.sendFaucetToken(addresses, "1000000000");
      const txSent = await tx.wait();
      if (txSent) {
        showModal();
      } else {
        console.log("not working");
        window.alert("Token Not Sent")
      }
    } catch (e) {
      console.log(e);
      showErrors();
    }
  };

  return (
    <S.FaucetContainer className="pt-5 w-full h-full flex-col flex justify-center ">
      <div className="w-full flex justify-center px-4 mb-4">
        <div className="w-full  lg:w-6/12  flex justify-center lg:justify-end items-center">
          <div className="w-11/12 lg:w-6/12 h-5 my-4 space-x-3  flex justify-between">
            <NormalButtons
              name="back to bet page"
              onClick={() => enterBetPage()}
            />
            <NormalButtons
              name="Add token to wallet"
              onClick={() => addToken()}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex  flex-col justify-center items-center  ">
        <div className="py-5 w-11/12 lg:w-5/12 min-h-11/12 border border-orange-400 border-dotted rounded-lg">
          <div className=" justify-center items-center flex text-md tracking-wide border-b mx-3 border-b-orange-400  font-bold py-6  lg:uppercase">
            Game Faucet
          </div>
          <div className="w-full">
            <div className="flex flex-row justify-around items-center mx-3  border-b border-b-orange-300 py-4">
              <div className="text-sm font-semibold">Token Name</div>
              <div className="flex flex-row items-center">
                <div className="font-bold text-sm">
                  {tokenName ? tokenName : "USDC"}
                </div>
                <div className="">
                  <Video styles="h-16 w-16 border-none" />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-around items-center mx-3  border-b border-b-orange-300 py-4">
              <div className="text-sm font-semibold">Users Token Balance</div>
              <div className="font-bold text-sm tracking-wide">
                {walletBalance != null ? walletBalance + " USDC" : "0 USDC"}
              </div>
            </div>
            <div className="flex flex-row justify-around items-center mx-3  border-b border-b-orange-300 py-4">
              <div className="text-sm font-semibold">
                Account Balance Eligibility Status
              </div>
              <div className="font-bold text-sm tracking-wide">
                {eligible ? (
                  <div className="text-sm font-bold text-red-400">
                    Not Eligible
                  </div>
                ) : (
                  <div className="text-sm font-bold text-green-400">
                    Eligible
                  </div>
                )}
              </div>
            </div>
            {eligible && (
              <div className="flex flex-row justify-around items-center mx-3  border-b border-b-orange-300 py-4">
                <div className="text-sm font-semibold">
                  wallet balance Eligibility Reasons
                </div>
                <div className="font-bold text-sm tracking-wide text-orange-400">
                  User Wallet still contains <br /> considerable amount of USDC
                </div>
              </div>
            )}
            <div className="flex flex-row justify-around items-center mx-3  border-b border-b-orange-300 py-4">
              <div className="text-sm font-semibold">Total Minted Token</div>
              <div className="font-bold text-sm tracking-wide">
                {totalSupply ? totalSupply + " USDC" : "not available"}
              </div>
            </div>
            <div className="flex flex-row justify-around items-center mx-3  border-b border-b-orange-300 py-4">
              <div className="text-sm font-semibold">
                Total Available Token{" "}
              </div>
              <div className="font-bold text-sm tracking-wide">
                {availableBalance ? availableBalance + " USDC" : ""}
              </div>
            </div>
            <div className="flex space-y-4 flex-col justify-around items-center mx-3  border-b border-b-orange-300 py-4">
              <div className="w-full">
                <Inputs
                  value={addresses ? addresses : ""}
                  label={"User Wallet"}
                  type={"text"}
                  readOnly={true}
                />
              </div>
              <div className="w-full">
                <Inputs
                  value={1000}
                  label={"USDC Transfer Amount"}
                  type={"text"}
                  readOnly={true}
                />
              </div>
              <div className="w-full h-10">
                <NormalButtons
                  name={"Transfer"}
                  onClick={() => sendToken()}
                  eligibles={eligible}
                />
              </div>
            </div>
            <div className="flex flex-row justify-around items-center mx-3  py-2">
              <div className="text-sm text-center font-semibold text-slate-500 lg:py-5">
                We only send 100 USDC to a wallet at a single time to ensure
                that the faucet gets to developers and not abused. 100 USDC is
                transferred to a user for every given 24hours. And developers
                can request for more tokens after the gray-listing time is over.
              </div>
            </div>
          </div>
        </div>
        {/* <AudioPlayer /> */}
        <SuccessfullAlert
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        />
        <ErrorAlert showError={showError} setShowError={setShowError} />
        {/* <Audios autoplay={true} /> */}
      </div>
    </S.FaucetContainer>
  );
}

export default FaucetTokenPage;
