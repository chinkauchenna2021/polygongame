import React from "react";
import { AlertContainer } from "./styles/Styles";
import NormalButtons from "../mainComponents/buttons/NormalButtons";
import Image from "../mainComponents/image/Image";

function ErrorAlert({ showError, setShowError }) {
  const closeModel = () => {
    setShowError("hidden");
  };
  return (
    <AlertContainer
      className={`top-0 ${showError} left-0 fixed w-full min-h-screen flex justify-center items-center `}
    >
      <div className="w-11/12 h-f lg:w-5/12 pt-12">
        <div className="bg-white w-full min-h-[200px]  relative rounded-lg ">
          <Image
            src="../../error.png"
            styles={"relative rounded-lg h-12 w-10 mx-auto "}
          />
          <div className="absolute top-0 left-0 flex justify-center w-full ">
            <div className="w-8/12 lg:w-5/12 flex flex-col">
              <div className="text-md capitalize text-center font-bold tracking-wide text-red-400 pt-12 pb-6 ">
                Wallet is grayListed. Wallet can only be allowed to get faucet
                after 24hrs{" "}
              </div>
              <div className="mb-4">
                <NormalButtons name="close" onClick={() => closeModel()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AlertContainer>
  );
}

export default ErrorAlert;
