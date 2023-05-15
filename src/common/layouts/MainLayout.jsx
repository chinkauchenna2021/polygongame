import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'


function MainLayout({ children }) {
  

const INFURA_KEY = '46e1afafede748388d8faf49b8948ae3'
const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/46e1afafede748388d8faf49b8948ae3'

const ethereumRopsten = {
  id: '0x3',
  token: 'rETH',
  label: 'Ethereum Ropsten',
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`
}
const chains =  [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: MAINNET_RPC_URL
      },
      {
        id: 11155111,
        token: 'ETH',
        label: 'Sepolia',
        rpcUrl: 'https://rpc.sepolia.org/'
      },
      {
        id: '0x38',
        token: 'BNB',
        label: 'Binance Smart Chain',
        rpcUrl: 'https://bsc-dataseed.binance.org/'
      },
      {
        id: '0x89',
        token: 'MATIC',
        label: 'Matic Mainnet',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
      },
      {
        id: 10,
        token: 'OETH',
        label: 'Optimism',
        rpcUrl: 'https://mainnet.optimism.io'
      },
      {
        id: 42161,
        token: 'ARB-ETH',
        label: 'Arbitrum',
        rpcUrl: 'https://rpc.ankr.com/arbitrum'
      },
      {
        id: 84531,
        token: 'ETH',
        label: 'Base Goerli',
        rpcUrl: 'https://goerli.base.org'
      }
]
const injected = injectedModule()
const wallets = [injected]
const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: 'r',
    description: "A demo of Web3-Onboard."
  }
})








  return (
    <div className='container'>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
          <NavBar />
          {children}
        <Footer />
        </Web3OnboardProvider>
    </div>
  )
}

export default MainLayout