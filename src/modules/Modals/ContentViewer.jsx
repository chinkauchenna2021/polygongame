import React, { useEffect, useMemo, useState } from "react";
import * as S from "./style/Styles";
import NormalButtons from "../mainComponents/buttons/NormalButtons";
import { BiCopyAlt, BiCaretDown, BiCaretUp } from "react-icons/bi";
import SuccessButton from "../mainComponents/buttons/SuccessButton";
import { getOnLocal, stripSpaces } from "../Hook/useHook";
import { ethers } from 'ethers'
import { Usdc } from "../Hook/jsonContents/FaucetUSDC";
import BigNumber from "bignumber.js";
import { addressShortener } from "../Hook/useHook";
import { useNavigate } from "react-router-dom";

function ContentViewer({ show, usersAddress }) {
  const navigate = useNavigate();
  const { shows, setShows } = show;
  const FAUCET_CONTRACT_ADDRESS = "0x6e06b599A2a2143F2476BA333c0A26322ddc0EfB";
  const PLATFORM_ADDRESS = "0x84b1d1f669BA9f479F23AD6D6562Eb89EDDb7741";
  const nameSaveData ="saveData" 
  const [toggle, setToggle] = useState(false);
  const [singleGameArray, setSingleGameArray] = useState();
  const [addresses, setAddresses] = useState();
  const [amount, setAmount] = useState();
  const expandable = () => {
    setToggle(!toggle);
  };

  const data = useMemo(() => {
    (async () => {
      
      if (window.ethereum) {
        const providers = new ethers.BrowserProvider(window.ethereum);
        const signer =  await providers.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(FAUCET_CONTRACT_ADDRESS, Usdc, signer);
        const balance = await contract.balanceOf(address);
         console.log(addressShortener(address))
        setAddresses(addressShortener(address))
        setAmount(Number(new BigNumber(balance).dividedBy(1000000)));
        }
    })()
},[addresses])




const localstorage = useMemo(() => {
  (async () => {
    if (shows == "") {
      const local = getOnLocal(nameSaveData);
      const singleValue = local.split(",")
      setSingleGameArray(singleValue);
      console.log(singleValue)
      }

  })()
},[shows])




console.log(shows)

  
  const enterGame = async () => {
       navigate(`/singlePage/${stripSpaces(singleGameArray[2])}/${singleGameArray[0]}`)
  }
  

  return (
    <S.ModalContainer
      className={`flex justify-center py-20  absolute w-full h-screen top-0 left-0  z-50 ${shows}  lg:hidden`}
    >
      <S.ModalBoard className=" p-3 w-11/12 h-fit rounded-lg bg-white border border-orange-300">
        <S.Header className="border-b border-slate-300">
          <div className="w-full py-2 ">
            <div className="w-fit h-fit">Users Status</div>
          </div>
        </S.Header>
        <S.Body>
          <div className="flex flex-col py-3">
            <div className="flex flex-row space-x-3 ">
              <div className="capitalize text-slate-400 text-sm font-semibold">
                Eligibility Status :
              </div>

              <div className="capitalize text-slate-080 text-sm font-semibold">
                {(amount> 500)? (<div className="text-red-500">Not Eligible</div>) : (<div className="text-green-500">Eligible</div>)} 
              </div>
            </div>
            <div className="justify-between w-full h-12 flex flex-row my-3 space-x-1">
              <div className="border border-orange-300  w-6/12 h-fit p-2 flex flex-row justify-between">
                <div className="text-sm  w-fit h-fit font-bold text-slate-500">
                  Balance
                </div>
                <div className=" font-bold tracking-wider text-sm">
                  {amount + " USDC"}
                </div>
              </div>
              <div className="border border-orange-300  w-6/12 h-fit p-2">
                <div className="text-xs w-full h-fit flex flex-row justify-between space-x-6">
                  <div className="flex justify-center items-center text-center w-fit h-fit font-bold tracking-wider text-sm text-slate-500">
                    {addresses}
                  </div>
                  <div className=" flex justify-center items-center ">
                    <BiCopyAlt size={15} color="gray" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full h-fit flex-col my-2">
              <div
                className={`border-orange-300 h-${
                  toggle ? 40 : 8
                }  border-2  border-dotted w-full overflow-hidden `}
              >
                <div className="w-full text-sm font-bold mx-2 space-y-2 text-slate-400 mb-2 capitalize flex items-center justify-between  border-b-2">
                  <div className="text-sm">game description</div>
                  <button
                    onClick={() => expandable()}
                    type="button"
                    className="text-lg px-4  outline-none flex justify-center items-center"
                  >
                    {toggle ? (
                      <BiCaretUp size={20} />
                    ) : (
                      <BiCaretDown size={20} />
                    )}
                  </button>
                </div>
                <div className={`${toggle ? `overflow-y-scroll` : ``} h-40`}>
                  <div className="h-fit w-fit text-left px-4 pb-20 text-gray-500 text-sm">
                   {(singleGameArray)?singleGameArray[12] :""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </S.Body>
        <S.Footer className="px-3">
          <div className="flex flex-row p-3 space-x-4 border-t border-slate-300">
            <NormalButtons name={"close"} onClick={() => setShows("hidden")} />
            <NormalButtons
              name={"Enter Bet"}
              onClick={() =>enterGame()}
            />
          </div>
        </S.Footer>
      </S.ModalBoard>
    </S.ModalContainer>
  );
}

export default ContentViewer;
