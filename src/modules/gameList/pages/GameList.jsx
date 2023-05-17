import React , {useMemo , useState , useEffect, memo} from 'react'
import ListLayout from '../layout/ListLayout'
import Image from '../listComponents/Image'
import Title from '../listComponents/Title'
import GameTime from '../listComponents/GameTime'
import GameAmount from '../listComponents/GameAmount'
import UsersEligibility from '../listComponents/UsersEligibility'
import ClaimReward from '../listComponents/ClaimReward'
import ThreeDots from '../../mediaComponents/icons/ThreeDots'
import ContentViewer from '../../Modals/ContentViewer'
import { addressShortener } from '../../Hook/useHook'
import GameTitle from '../listComponents/GameTitle'
import BackButton from '../../mainComponents/buttons/BackButton'
import { useNavigate } from 'react-router-dom'
import { setOnLocal, convertToDate , stripSpaces , clearLocal } from '../../Hook/useHook';
import { GamingApp } from '../../Hook/jsonContents/GamingApp';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js'

const ListLength = [1, 2, 3, 4, 5, 6, 7];

function GameList() {
  const [gameCreated, setGameCreated] = useState([]);
  const GAMING_APP_CONTRACT_ADDRESS = "0x7074358aB65f75A9a31C1C475c33f8F68d0Cb165";
  const [contracts, setContracts] = useState(null);
  const [signers, setSigner] = useState();
  const [providers, setProviders] = useState();
  const [shows, setShows] = useState("hidden")
  const saveDataOnLocal = "saveData";

  useEffect(() => {

    (async () => {
      try {
        
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const gameBank = [];
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(GAMING_APP_CONTRACT_ADDRESS,GamingApp, signer);
          const numberOfCreatedGames = await contract.creatorsNumber();
          for (let i = 0; i != Number(numberOfCreatedGames); i++){
            if (i < (Number(numberOfCreatedGames))) {
              const gamecreationBank = await contract.gameOpeningCollection(i);
                gameBank.push(gamecreationBank)
            }   
          } 

          setGameCreated(gameBank);
          setContracts(contract);
          setSigner(signer);
          setProviders(provider);


        }
      } catch (e) {
        console.log(e)
      } 
      
    })()
  },[setGameCreated])   



  const navigate = useNavigate();
    const showModal = () => {      
      setShows("")  
    }
  
  const enterSinglePage = (items, id) => {
    const singleGame = gameCreated.filter((data) => Number(data[0] == Number(id)));
     clearLocal(saveDataOnLocal);
     setOnLocal(saveDataOnLocal,singleGame);
    navigate(`/singlePage/${items}/${id}`)
  }
    const addressReducer = useMemo(() => {
      return  (addressShortener("123455747347477447"));
    },
        [addressShortener]
    );
   
    const showContent = {
        shows,
        setShows
  }
  
  const enterModal = async (items , id) => {
    const singleGame = gameCreated.filter((data) => Number(data[0] == Number(id)));
    clearLocal(saveDataOnLocal);
    setOnLocal(saveDataOnLocal,singleGame);
    showModal();
  }
  
  const enterGameSection = (items, id) => {
       navigate(`/singlePage/${items}/${id}`)
  }


    return (
        <div>
        <ContentViewer show={showContent} usersAddress = {addressReducer} />
        <GameTitle />
        
        {
          (gameCreated).map((data, index) => {
            return (
              <ListLayout key={Math.random()}  borderProperties={"border border-orange-400"}>
          <div className='flex  cursor-pointer flex-row w-5/12 lg:w-5/12 space-x-6 h-full items-center' onClick={()=>enterSinglePage(stripSpaces(data[2]),Number(data[0]))}>
            <Image Img={data[9]} />
            <Title title={data[2]} />
          </div>
          <div className='flex flex-row w-7/12 lg:w-7/12 justify-between items-center h-full'>
            <GameAmount amount={ data[6]} />
            <UsersEligibility />
            <GameTime gameTime={convertToDate(Number(data[3] ) * 1000)} />
            <ClaimReward onClicked={()=>enterGameSection(stripSpaces(data[2]),Number(data[0]))} />
            <ThreeDots onClick={()=>enterModal(stripSpaces(data[2]),Number(data[0]))} />

          </div>
        </ListLayout>


             )
          })

        }

        </div>
    );
}

export default GameList