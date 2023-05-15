import React, { useState, useEffect } from "react";
import MainLayout from "./../layouts/MainLayout";
import Title from "../../modules/mainComponents/title/Title";
import * as S from "./styles/Styles";
import Inputs from "../../modules/mainComponents/inputs/Inputs";
import DateInpute from "../../modules/mainComponents/inputs/DateInpute";
import Input2Row from "../../modules/mainComponents/inputs/Input2Row";
import TextArea from "../../modules/mainComponents/inputs/TextArea";
import Buttons from "../../modules/mainComponents/buttons/Buttons";
import NormalButtons from "../../modules/mainComponents/buttons/NormalButtons";
import BackButton from "../../modules/mainComponents/buttons/BackButton";
import { convertToMilliseconds } from "../../modules/Hook/useHook";
import { GamingApp } from "../../modules/Hook/jsonContents/GamingApp";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

function Home() {
  const [title, setTitle] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [img, setImg] = useState();
  const [textArea, setTextArea] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());

  const GAMING_APP_CONTRACT_ADDRESS =
    "0xd7c0a8d20d87afa3c6Ba9eeA27628C2a90CCeC31";
  const RANDOM_IMAGE = "https://dog.ceo/api/breeds/image/random";
  const [contracts, setContracts] = useState(null);
  const [signers, setSigner] = useState();
  const [providers, setProviders] = useState();

  // const tx = await contract.transfer(...args); // 100ms
  // const rc = await tx.wait(); // 0ms, as tx is already confirmed
  // const event = rc.events.find(event => event.event === 'Transfer');
  // const [from, to, value] = event.args;
  // console.log(from, to, value);

  //   async function create() {
  //     ///Acquiring values
  //     postBody = document.getElementById("in-1-pbd").value;
  //     postSubcat = document.getElementById("in-2-sc").value;
  //     console.log(postBody + ", " + postSubcat);
  //     ///Connecting with Ethereum
  //     await requestAccount()
  //     if (typeof window.ethereum != 'undefined') {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(blokracyAddress, Blokracy.abi, signer)
  //       const transaction = await contract.createBallot(postSubcat, postBody)
  //       await transaction.wait()
  //     ///Building and presenting the ballot
  //     contract.on("Creation", (message, idnum ) => {
  //       console.log("Creation Event Data: ", message, idnum);
  //       buildBallot(Wallet.publicKey, idnum, postBody);
  //       });
  //     } else {
  //       window.alert("Non-Ethereum browser detected. You should consider installing MetaMask.")
  //     }
  //   }
  // async function create() {
  //     ///Acquiring values
  //     postBody = document.getElementById("in-1-pbd").value;
  //     postSubcat = document.getElementById("in-2-sc").value;
  //     console.log(postBody + ", " + postSubcat);
  //     ///Connecting with Ethereum
  //     await requestAccount()
  //     if (typeof window.ethereum != 'undefined') {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(blokracyAddress, Blokracy.abi, signer)
  //       const transaction = await contract.createBallot(postSubcat, postBody)
  //       await transaction.wait()
  //     ///Building and presenting the ballot
  //     contract.on("Creation", (message, idnum ) => {
  //       console.log("Creation Event Data: ", message, idnum);
  //       buildBallot(Wallet.publicKey, idnum, postBody);
  //       });
  //     } else {
  //       window.alert("Non-Ethereum browser detected. You should consider installing MetaMask.")
  //     }
  //   }

  const cn = React.useMemo(() => {
    (async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            GAMING_APP_CONTRACT_ADDRESS,
            GamingApp,
            signer
          );
          setContracts(contract);
          setSigner(signer);
          setProviders(provider);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const submit = async () => {
    try {
      const time = convertToMilliseconds(startDateTime);
      if (!time || !title || !min || !max || !minAmount || !img || !textArea)
        return;
      const imagess = await fetch(RANDOM_IMAGE);
      const images = await imagess.json();
      const collImage = await (images.message); 
      const tx = await contracts.createBet(
        title,
        time,
        min,
        max,
        minAmount,
        collImage,
        textArea
      );
      const generatedGameId = await tx.wait();
      if (generatedGameId) {
        window.alert("Game Created Successfully")
        console.log(generatedGameId, tx);
      }
    } catch (e) {
      window.alert("Game Creation Failed")
      console.log(e);
    }
  };

  return (
    <MainLayout>
      <S.BodyContainer>
        <div className="w-full lg:w-5/12 space-y-3">
          <Title game_title={"create game"} />
          <Inputs
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder={"Fire Ball"}
            label={"Create Game"}
          />
          <DateInpute
            setStartDateTime={setStartDateTime}
            startDateTime={startDateTime}
            label={"Game EndTime"}
          />
          <div className="flex flex-row space-x-3">
            <Inputs
              onChange={(e) => setMin(e.target.value)}
              value={min}
              label={"Min Bet Number"}
              type={"number"}
            />
            <Inputs
              onChange={(e) => setMax(e.target.value)}
              value={max}
              label={"Max Bet Number"}
              type={"number"}
            />
          </div>
          <Inputs
            onChange={(e) => setMinAmount(e.target.value)}
            value={minAmount}
            label={"Min Game Amount"}
            type={"number"}
          />
          <Inputs
            onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            name="img"
            label={"Choose Image"}
            type={"file"}
          />
          <TextArea
            onChange={(e) => setTextArea(e.target.value)}
            value={textArea}
            label={"Game Description"}
          />
          <NormalButtons onClick={submit} name={"Create Game"} />
        </div>
      </S.BodyContainer>

      <div className="w-full flex pt-20 justify-center items-center pl-4 lg:pl-0 ">
        <div className="relative w-full  lg:w-5/12 h-fit">
          <BackButton />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
