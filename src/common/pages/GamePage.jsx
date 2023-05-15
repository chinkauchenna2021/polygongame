import React, { useEffect, useMemo, useState, memo, useCallback } from "react";
import MainLayout from "../layouts/mainLayout";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./styles/Styles";
import GameBtn from "../../modules/mainComponents/GameButton/GameBtn";
import { displayGameNumbers, getOnLocal } from "../../modules/Hook/useHook";
import BackButton from "../../modules/mainComponents/buttons/BackButton";
import TableHeader from "../../modules/mainComponents/table/tableHeader/TableHeader";
import TableBody from "../../modules/mainComponents/table/tableBody/TableBody";
import TableFooter from "../../modules/mainComponents/table/tableFooter/TableFooter";
import {
  convertToMilliseconds,
  startInterval,
  convertToDate,
} from "../../modules/Hook/useHook";
import Countdown from "react-countdown";
import { GamingApp } from "../../modules/Hook/jsonContents/GamingApp";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import CountDown from "count-down-react";
import WinnerAlert from "../../modules/alert/winnerAlert";
import { Usdc } from "../../modules/Hook/jsonContents/FaucetUSDC";

function GamePage() {
  const saveDataOnLocal = "saveData";
  const { gameId, id } = useParams();
  const navigate = useNavigate();
  const [singleCollection, setSingleCollection] = useState([]);
  const tokenAddress = "0x6e06b599A2a2143F2476BA333c0A26322ddc0EfB";
  const GAMING_APP_CONTRACT_ADDRESS =
    "0xE2e3AA965A1f98aB99bC7BB6dF5CacB9890529d3";
  const MAINPRIVETKEY =
    "7de9cc7423ffe0cebe2545895f4d922a5d30c50dd040febed1927d31818f4fc2";
  const PLATFORM_ADDRESS = "0x84b1d1f669BA9f479F23AD6D6562Eb89EDDb7741";
  const [contracts, setContracts] = useState(null);
  const [signers, setSigner] = useState();
  const [providers, setProviders] = useState();
  const [gameCreated, setGameCreated] = useState([]);
  const usdcDecimal = 1000000;
  const [filterdValues, setFilteredValues] = useState();
  const [getCurrentDate, setGetCurrentDate] = useState(0);
  const [getGameStatus, setGetGameStatus] = useState("Game Ended ");
  const SETINTERVAL_TIME = 100000;
  const [platformContract, setPlatformContract] = useState();
  const [usersAddress, setUsersAddress] = useState();
  const [addressStatus, setAddressStatus] = useState();
  const [winnings, setWinnings] = useState();
  const [contractForToken, setContractForToken] = useState();

  const cn = React.useMemo(() => {
    (async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const gameBank = [];
          const signer = await provider.getSigner();
          const userAddr = await signer.getAddress();
          const contract = new ethers.Contract(
            GAMING_APP_CONTRACT_ADDRESS,
            GamingApp,
            signer
          );
          const numberOfUsers = await contract.usersBettedNumber();
          for (let i = 0; i != Number(numberOfUsers); i++) {
            if (i < Number(numberOfUsers)) {
              const gamecreationBank = await contract.usersBetCollection(i);
              gameBank.push(gamecreationBank);
            }
          }
          setUsersAddress(userAddr);
          setContracts(contract);
          setSigner(signer);
          setProviders(provider);
          setGameCreated([...gameBank]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const filteredData = gameCreated.filter(
          (items, index) => Number(new BigNumber(items[0])) == Number(id)
        );
        setFilteredValues(filteredData);
        console.log(filteredData);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [gameCreated]);

  const selectButton = (index, items) => {
    navigate(`/placebet/${index}/${items}`);
  };

  useEffect(() => {
    const getFromLocal = getOnLocal(saveDataOnLocal);
    const coll = getFromLocal?.split(",");
    setSingleCollection(coll);
  }, [setSingleCollection]);

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const MainContractSigner = new ethers.Wallet(MAINPRIVETKEY, provider);
        const gamingAppPlatformContract = new ethers.Contract(
          GAMING_APP_CONTRACT_ADDRESS,
          GamingApp,
          MainContractSigner
        );

        const tokenWallet = new ethers.Wallet(MAINPRIVETKEY, provider);
        const tokenContract = new ethers.Contract(
          tokenAddress,
          Usdc,
          tokenWallet
        );

        setContractForToken(tokenContract);
        setPlatformContract(gamingAppPlatformContract);
      }
    })();
  }, []);

  const timeWatcher = useMemo(() => {
    (async () => {
      const dateTmeChecker = async () => {
        const gameTimeStamp = Number(singleCollection[3]);
        const currentTime = new Date().getTime();
        if (gameTimeStamp > currentTime) {
          let timeDifference = gameTimeStamp - currentTime;
          let timeInDays = Math.ceil(timeDifference / (24 * (60 * 60) * 1000));
          setGetGameStatus("Game is On , ");
          setGetCurrentDate(timeInDays);
        } else {
          if (gameTimeStamp + 300 < currentTime) {
            const gameOutput = await platformContract.generateOutcome(
              singleCollection[0]
            );
            console.log(gameOutput);
          }
          setGetGameStatus("Game Has Ended");
          setGetCurrentDate(0);
        }
      };
      setTimeout(dateTmeChecker, 100);
      startInterval(dateTmeChecker, SETINTERVAL_TIME);
    })();
  }, [singleCollection]);

  // checking if current user won the game
  useEffect(() => {
    (async () => {
      const usersBetting = filterdValues?.filter(
        (items, index) => items[2] == singleCollection[1]
      );
      if (usersBetting?.length > 0) {
        const won = filterdValues?.filter(
          (items, index) => items[3] == singleCollection[7]
        );

        if (won?.length > 0) {
          setWinnings(true);
        } else {
          setWinnings(false);
        }
        setAddressStatus(true);
      } else {
        setAddressStatus(false);
      }
    })();
  }, [filterdValues]);

  console.log(singleCollection);

  const claimWinnings = async () => {
    const approval = contractForToken?.approve(
      PLATFORM_ADDRESS,
      ethers.MaxUint256
    );
    const usersPlatformWon = await platformContract.paymentController(
      singleCollection[0]
    );
    const paymentMade = await usersPlatformWon.wait(8);
    if (paymentMade) {
      window.alert("payment sent successfully");
    }
  };

  return (
    <MainLayout>
      <S.BodyContainer className="container">
        <div className="w-full flex justify-center  lg:w-5/12 ">
          <div
            className="relative w-11/12 h-48 rounded-t-lg flex justify-center items-end"
            style={{
              backgroundImage: "url(../1624.jpg)",
              backgroundSize: "cover",
            }}
          >
            <div className="w-36 h-36 flex justify-center items-center rounded-full ring-white ring-4 ring-offset-4 ring-offset-transparent absolute top-30">
              <div className="w-36 h-36 rounded-full ">
                <img
                  className="rounded-full"
                  loading="lazy"
                  src={
                    singleCollection[9]
                      ? "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </S.BodyContainer>
      <div className=" w-full h-30  flex justify-center items-end">
        <div className="w-11/12 lg:w-5/12 h-fit">
          <div className="w-full  flex justify-center items-center  border-b  pb-10 pt-8">
            <div className="w-fit h-fit uppercase text-sm font-bold tracking-wider text-slate-700">
              {singleCollection[2]}
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full h-fit  flex justify-center items-end mt-2">
        <div className="w-11/12 lg:w-5/12 h-fit mt-2">
          <div className="text-lg my-4 border flex justify-center items-center border-dotted border-orange-400 w-full h-30">
            <div className="w-fit h-fit text-lg lg:text-2xl capitalize text-pink-700 tracking-wider font-bold px-2 py-10">
              {getGameStatus + " " + getCurrentDate + "days remaining"}
            </div>
          </div>

          <div className="border-dotted flex-col  border-2 rounded-lg border-orange-300  w-full flex justify-center items-center pb-4">
            <div className="w-full shadow-sm rounded capitalize flex justify-center tracking-wider h-10 items-center font-semibold">
              Play Game (choose number)
            </div>
            <S.ScrollDesign className="flex flex-wrap p-3  justify-center w-11/12 max-h-[170px] overflow-y-scroll border-dotted border-2  border-spacing-2 rounded">
              {!(getCurrentDate == 0) ? (
                displayGameNumbers(
                  Number(singleCollection[4]),
                  Number(singleCollection[5])
                ).map((items, id) => (
                  <GameBtn
                    key={items}
                    number={items}
                    onClick={() =>
                      selectButton(Number(singleCollection[0]), items)
                    }
                  />
                ))
              ) : (
                <div className="w-full text-center my-6 lg:my-0">
                  {" "}
                  Game has Ended
                </div>
              )}
            </S.ScrollDesign>
          </div>

          <div className="border-dotted flex-col  border-2 rounded-lg border-orange-300  w-full flex justify-center items-center pb-4 my-10">
            <div className="w-full shadow-sm rounded capitalize  flex justify-center tracking-wider h-10 items-center font-semibold">
              Game Statistics Table
            </div>
            <S.ScrollDesign className="flex flex-wrap  justify-center w-11/12 h-fit overflow-x-scroll lg:overflow-hidden border-dotted border-2   border-spacing-2 rounded">
              <S.TableContainer className="w-full px-24 my-5 lg:my-0">
                {!(filterdValues?.length == 0) ? (
                  <TableHeader
                    column1={"#"}
                    column2={"Address"}
                    column3={"Amount"}
                  />
                ) : (
                  ""
                )}
                {filterdValues?.length >= 1 ? (
                  filterdValues?.map((items, index) => {
                    return (
                      <TableBody
                        key={Math.random()}
                        column1={index + 1}
                        column2={items[2]}
                        column3={Number(
                          new BigNumber(items[4]).dividedBy(usdcDecimal)
                        )}
                      />
                    );
                  })
                ) : (
                  // <TableFooter  column1={"2"} column2={"total"} column3={"123 USDC"}/>
                  <div className="w-full text-center my-6 lg:my-0">
                    {" "}
                    No Betting Available
                  </div>
                )}
              </S.TableContainer>
            </S.ScrollDesign>
          </div>
        </div>
      </div>

      <div className="w-full flex pt-20 justify-center items-center pl-4 lg:pl-0 ">
        <div className="relative w-full  lg:w-5/12 h-fit mb-5">
          <BackButton />
        </div>
      </div>
      {getCurrentDate == 0 ? (
        <WinnerAlert
          winnings={winnings}
          addressStatus={addressStatus}
          onClick={() => claimWinnings()}
          outcome={singleCollection[7]}
        />
      ) : (
        ""
      )}
    </MainLayout>
  );
}

export default GamePage;
