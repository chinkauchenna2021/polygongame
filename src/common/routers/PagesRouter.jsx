import React from 'react'
import {BrowserRouter, Routes, Route,useLocation} from 'react-router-dom'
import Home from '../pages/Home'
import NotFoundPage from '../pages/NotFoundPage'
import BetOnGames from '../pages/BetOnGames'
import MainBetPage from '../pages/MainBetPage'
import GamePage from '../pages/GamePage'
import FaucetProvider from '../../modules/airdrop/provider/FaucetProvider'
import FaucetToken from '../pages/FaucetToken'

function PagesRouter() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<MainBetPage  />} />
              <Route path='/placebet/:gameId/:betNumber' element={<BetOnGames />} />
              <Route path="/betPage" element={<Home /> } />
              <Route path='/faucet' element={<FaucetToken />} />
              <Route path='/singlePage/:gameId/:id' element={<GamePage />} />
              <Route path='*' element={<NotFoundPage />} />
          </Routes>
      </BrowserRouter>
  )
}

export default PagesRouter