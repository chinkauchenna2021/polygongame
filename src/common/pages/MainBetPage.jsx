import React from "react";
import MainLayout from "../layouts/mainLayout";
import Title from "../../modules/mainComponents/title/Title";
import ListProvider from "../../modules/gameList/provider/ListProvider";
import BackButton from "../../modules/mainComponents/buttons/BackButton";
import Buttons from "../../modules/mainComponents/buttons/Buttons";
import NormalButtons from "../../modules/mainComponents/buttons/NormalButtons";
import { useNavigate } from "react-router-dom";
function MainBetPage() {
  const navigate = useNavigate();
  const enterFaucet = () => {
    navigate("/faucet");
  };
  return (
    <MainLayout>
      <div>
        <div className="w-full flex justify-center px-4 ">
          <div className="w-full  lg:w-6/12  flex justify-center lg:justify-end items-center">
            <div className="w-8/12 lg:w-3/12 h-5 my-2 ">
              <NormalButtons
                name="get token to play"
                onClick={() => enterFaucet()}
              />
            </div>
          </div>
        </div>
        <Title game_title={"Available games"} />
        <div className="flex w-full justify-center">
          <div className="w-full lg:w-5/12 space-y-3 flex flex-col justify-center ">
            <ListProvider />
          </div>
        </div>
      </div>

      <div className="w-full flex pt-20 justify-center items-center pl-4 lg:pl-0 ">
        <div className="relative w-full flex justify-between items-center  lg:w-5/12 h-fit">
          <BackButton />
        </div>
      </div>
    </MainLayout>
  );
}

export default MainBetPage;
