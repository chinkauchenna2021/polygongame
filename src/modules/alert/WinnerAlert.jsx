import React from "react";
import * as S from "./styles/Styles";
import Image from "../mainComponents/image/Image";

function WinnerAlert({
  onClick = null,
  outcome = null,
  addressStatus = false,
  winnings = null,
}) {
  return (
    <S.AlertContainer className=" fixed w-full h-full top-0 left-0 flex justify-center items-center">
      <div className="w-11/12 lg:w-4/12 flex-col h-40 bg-white rounded-xl relative justify-center items-center ">
        {/* <Image src="../../celebration.gif"  styles={"relative rounded-lg"} /> */}
        <div className="w-full text-center text-lg font-bold h-fit py-4">
          {outcome == 0
            ? "Outcome is currently processed"
            : `winning Outcome is ${outcome}`}
        </div>
        {addressStatus && winnings ? (
          <>
            <div className="w-full h-f capitalize text-center text-xl  py-5 font-bold lg:px-24">
              {" "}
              click the to check your game status{" "}
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={onClick}
                className="capitalize text-bold text-white bg-orange-400 ring-1 ring-orange-400 ring-offset-2  h-10  w-10/12 lg:w-6/12 font-semibold tracking-wider text-lg "
              >
                {" "}
                check winnings
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-f capitalize text-center text-xl  py-5 font-bold lg:px-24">
            you lost the game. Winning Outcome is  { " "+outcome}
          </div>
        )}
      </div>
    </S.AlertContainer>
  );
}

export default WinnerAlert;
