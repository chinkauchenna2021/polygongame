import React, { useState } from "react";
import * as S from "./style/Styles";
import NormalButtons from "../mainComponents/buttons/NormalButtons";
import { BiCopyAlt, BiCaretDown, BiCaretUp } from "react-icons/bi";
import SuccessButton from "../mainComponents/buttons/SuccessButton";

function ContentViewer({ show, usersAddress }) {
  const [toggle, setToggle] = useState(false);
  const expandable = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  const { shows, setShows } = show;

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
                Not Eligible
              </div>
            </div>
            <div className="justify-between w-full h-12 flex flex-row my-3 space-x-1">
              <div className="border border-orange-300  w-6/12 h-fit p-2 flex flex-row justify-between">
                <div className="text-sm  w-fit h-fit font-bold text-slate-500">
                  Balance
                </div>
                <div className=" font-bold tracking-wider text-sm">
                  {"1 USDC "}
                </div>
              </div>
              <div className="border border-orange-300  w-6/12 h-fit p-2">
                <div className="text-xs w-full h-fit flex flex-row justify-between space-x-6">
                  <div className="flex justify-center items-center text-center w-fit h-fit font-bold tracking-wider text-sm text-slate-500">
                    {usersAddress}
                  </div>
                  <div className=" flex justify-center items-center ">
                    <BiCopyAlt size={15} color="gray" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full h-fit flex-col">
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dicta suscipit vero debitis nostrum exercitationem iusto
                    autem quibusdam deleniti voluptatem, molestias, pariatur
                    dolores tempora cum doloremque omnis non nemo dolorem
                    incidunt! Illum, autem mollitia similique magnam sint,
                    cupiditate impedit veritatis facilis sapiente rerum
                    eligendi? Dignissimos sapiente officia ex voluptatum ipsam
                    maiores culpa nihil ut ducimus possimus corporis, quaerat
                    labore fugiat illo.
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full my-4 m-auto px-1">
              <SuccessButton name={"claim Reward"} />
            </div>
          </div>
        </S.Body>
        <S.Footer className="px-3">
          <div className="flex flex-row p-3 space-x-4 border-t border-slate-300">
            <NormalButtons name={"close"} onClick={() => setShows("hidden")} />
            <NormalButtons
              name={"create Bet"}
              onClick={() => {
                window.location.href = "/betPage";
              }}
            />
          </div>
        </S.Footer>
      </S.ModalBoard>
    </S.ModalContainer>
  );
}

export default ContentViewer;
