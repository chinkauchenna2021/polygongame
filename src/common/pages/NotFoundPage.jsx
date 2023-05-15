import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NormalButtons from "../../modules/mainComponents/buttons/NormalButtons";

function NotFoundPage() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const changePageBet = () => {
    navigate("/betPage");
  };
  const changePageHome = () => {
    navigate("/");
  };

  return (
    <div className="container w-full flex justify-center">
      <div className="w-full lg:w-7/12 h-full mx-10 py-28">
        <div className=" w-full h-full flex justify-center text-4xl font-bold items-center">
          <div className="w-4/12 h-fit flex-col hidden lg:flex ">
            <div className="w-full my-14 h-full flex justify-center ">
              <div className="text-4xl text-pink-700 font-bold w-fit h-fit text-center">
                YOU ARE LOST IN THE UNIVERSE
              </div>
            </div>
            <div className="flex flex-row space-x-6">
              <NormalButtons name="home" onClick={() => changePageHome()} />
              <NormalButtons name="bet page" onClick={() => changePageBet()} />
            </div>
          </div>
          <div className="w-full lg:w-8/12">
            <img
              src={"../../404image.gif"}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className=" w-full lg:w-4/12 h-fit flex-col flex lg:hidden  ">
          <div className="w-full my-14 h-full flex justify-center ">
            <div className="text-4xl text-pink-700 font-bold w-fit h-fit text-center">
              YOU ARE LOST IN THE UNIVERSE
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <NormalButtons name="home" onClick={() => changePageHome()} />
            <NormalButtons name="bet page" onClick={() => changePageBet()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
