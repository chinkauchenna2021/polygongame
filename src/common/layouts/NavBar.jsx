import React , {useEffect, useState} from 'react'
import * as S from "./styles/NavBarStyles"
import Buttons from '../../modules/mainComponents/buttons/Buttons'
// import NormalButtons from '../../modules/mainComponents/buttons/NormalButtons'
import { useNavigate } from 'react-router-dom'
import Onboard  from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers';

function NavBar() {
const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/46e1afafede748388d8faf49b8948ae3'

  const injected = injectedModule({  displayUnavailable: true})

// const customTheme = {
//   '--w3o-background-color': '#000',
//   '--w3o-foreground-color': '#333',
//   '--w3o-text-color': '#fff',
//   '--w3o-border-color': '#ccc',
//   '--w3o-action-color': '#007bff',
//   '--w3o-border-radius': '5px',
// }
  const changeWallet = async () => {
       try {
  await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: "0x13881" }],
  });
} catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: "0x13881",
            chainName: 'Matic Mainnet',
            rpcUrls: ['https://matic-mainnet.chainstacklabs.com'] /* ... */,
          },
        ],
      });
    } catch (addError) {
      // handle "add" error
    }
  }
  // handle other "switch" errors
}


}


  const onboard = Onboard({
    wallets: [injected],
      theme: "dark",
      connect: {
         autoConnectLastWallet: true
       },
    chains: [
      // {
      //   id: '0x1',
      //   token: 'ETH',
      //   label: 'Ethereum Mainnet',
      //   rpcUrl: MAINNET_RPC_URL
      // },
      // {
      //   id: 11155111,
      //   token: 'ETH',
      //   label: 'Sepolia',
      //   rpcUrl: 'https://rpc.sepolia.org/'
      // },
      // {
      //   id: '0x38',
      //   token: 'BNB',
      //   label: 'Binance Smart Chain',
      //   rpcUrl: 'https://bsc-dataseed.binance.org/'
      // },
      {
        id: 80001,
        token: 'MATIC',
        label: 'Matic Mainnet',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
      }
      // {
      //   id: 10,
      //   token: 'OETH',
      //   label: 'Optimism',
      //   rpcUrl: 'https://mainnet.optimism.io'
      // },
      // {
      //   id: 42161,
      //   token: 'ARB-ETH',
      //   label: 'Arbitrum',
      //   rpcUrl: 'https://rpc.ankr.com/arbitrum'
      // },
      // {
      //   id: 84531,
      //   token: 'ETH',
      //   label: 'Base Goerli',
      //   rpcUrl: 'https://goerli.base.org'
      // }
    ],
    appMetadata: {
      name: 'Token Swap',
      icon: "https://media.istockphoto.com/id/1009095170/vector/heraldic-black-eagle-falcons-and-hawks-set-spread-wings-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=AAlM-UNmCf0Y1w0x1iV4us2p-nTThjihSzCsdpgjGNw=", // svg string icon
      logo: "g",
      description: 'Swap tokens for other tokens',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    }
    })

  
  async function connectWallet() {
    await changeWallet();
    const wallets = await onboard.connectWallet()
    const ethersProvider = new ethers.BrowserProvider(wallets[0].provider, 'any')
    console.log(await onboard.connectWallet())
    const signer = await ethersProvider.getSigner()
    console.log(wallets , signer.getAddress())

  }
  const navigate = useNavigate();
  
  const createBet = () => {
    navigate('/betPage');
  }
  

  
  // const connectWallet = async () => {

  //   if (window.ethereum) {
  //    const account = await window.ethereum.request({ method: "eth_requestAccounts" });
  //     // window.web3 = new ethers(window.ethereum);
  //     // const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     // const accounts = await provider.listAccounts();
  //     console.log(account[0])
  //   } else {
  //     console.log("No wallet");
  //   }
    
  // }  
      return (

      <S.NavBarContainer>
          <div className='px-1 w-full h-full flex flex-row justify-around items-center lg:w-6/12' >
              <div className='flex justify-start w-full text-sm lg:text-lg font-bold capitalize  tracking-widest '>WinnersSquare</div>
              <div className='flex justify-end items-center w-full space-x-2 lg:space-x-5'>  <div className='flex h-full items-center justify-center text-sm font-bold capitalize cursor-pointer' onClick={()=>createBet()} >create bet</div>  <Buttons name="connect wallet" onClick={()=>connectWallet()} /></div>
            </div>
      </S.NavBarContainer>


  )
}

export default NavBar