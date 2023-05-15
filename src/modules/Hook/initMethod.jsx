import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

const injected = injectedModule()
const dappId = '937627e1-3507-44b8-af10-72728aa5f74b'
const INFURA_ID = '3ddf68a943674faebbcf5f5400f91769'
export const infuraRPC = `https://mainnet.infura.io/v3/${INFURA_ID}`

export const initWeb3Onboard = init({
  connect: {
    autoConnectAllPreviousWallet: true
  },
  wallets: [
    injected
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: infuraRPC
    },
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`
    },
    {
      id: '0x13881',
      token: 'MATIC',
      label: 'Polygon - Mumbai',
      rpcUrl: 'https://matic-mumbai.chainstacklabs.com	'
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: '0xfa',
      token: 'FTM',
      label: 'Fantom',
      rpcUrl: 'https://rpc.ftm.tools/'
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
  ],
  appMetadata: {
    name: 'Blocknative Web3-Onboard',
    icon: "blocknativeIcon",
    description: 'Demo app for Web3-Onboard',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ],
    agreement: {
      version: '1.0.0',
      termsUrl: 'https://www.blocknative.com/terms-conditions',
      privacyUrl: 'https://www.blocknative.com/privacy-policy'
    },
    gettingStartedGuide: 'https://blocknative.com',
    explore: 'https://blocknative.com'
  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: false
    }
  },
  // example customizing copy
  i18n: {
    es: {
      connect: {
        selectingWallet: {
          header: 'Carteras disponibles',
          sidebar: {
            heading: 'Comenzar',
            subheading: 'Conecta tu monedero',
            paragraph:
              'Conectar su billetera es como “iniciar sesión” en Web3. Seleccione su billetera de las opciones para comenzar.'
          }
        }
      },
      accountCenter: {
        connectAnotherWallet: 'Conectar otro monedero',
        disconnectAllWallets: 'Desconectar todos los monederos',
        currentNetwork: 'Red actual',
        appInfo: 'Información de la aplicación',
        learnMore: 'Aprende más',
        gettingStartedGuide: 'Guía de introducción',
        smartContracts: 'Contrato(s) inteligente',
        explore: 'Explorar',
        backToApp: 'Volver a dapp',
        poweredBy: 'Funciona con',
        addAccount: 'Añadir cuenta',
        setPrimaryAccount: 'Establecer cuenta principal',
        disconnectWallet: 'Desconectar Wallet'
      }
    }
  },
  apiKey: dappId,
  notify: {
    transactionHandler: transaction => {
      console.log({ transaction })
      if (transaction.eventCode === 'txPool') {
        return {
          // autoDismiss set to zero will persist the notification until the user excuses it
          autoDismiss: 0,
          // message: `Your transaction is pending, click <a href="https://goerli.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
          // or you could use onClick for when someone clicks on the notification itself
          onClick: () =>
            window.open(`https://goerli.etherscan.io/tx/${transaction.hash}`)
        }
      }
    }
  },
  theme: 'dark'
})
