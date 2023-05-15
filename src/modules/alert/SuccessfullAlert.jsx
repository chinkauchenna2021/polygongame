import React from "react";
import * as S from "./styles/Styles";
import Image from "../mainComponents/image/Image";
import AudioPlayer from "../mainComponents/audioComponents/AudioPlayer";
import NormalButtons from "../mainComponents/buttons/NormalButtons";

function SuccessfullAlert({ showSuccess, setShowSuccess }) {
  const closeModel = () => {
    setShowSuccess("hidden");
  };
  return (
    <S.AlertContainer
      className={`top-0 ${showSuccess} left-0 fixed w-full min-h-screen flex justify-center items-center `}
    >
      <div className="w-11/12 h-fit lg:w-5/12 pt-10">
        <div className="bg-white w-full min-h-[350px] relative rounded-lg ">
          <Image src="../../celebration.gif" styles={"relative rounded-lg"} />
          <div className="absolute top-0 left-0 flex justify-center w-full ">
            <div className="w-8/12 lg:w-5/12 flex flex-col">
              <div className="text-2xl capitalize text-center font-bold tracking-wide text-orange-400 pt-20 ">
                Successful transferred 100 USDC to your wallet
              </div>
              <div className="my-6">
                <NormalButtons name="close" onClick={() => closeModel()} />
              </div>
            </div>
          </div>
        </div>
        {showSuccess == "" ? <AudioPlayer /> : ""}
      </div>
    </S.AlertContainer>
  );
}

export default SuccessfullAlert;
