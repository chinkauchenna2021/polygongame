import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GameList from '../pages/GameList'
import NotFoundPage from '../../../common/pages/NotFoundPage'

function ListRouter() {
  return (
      <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="*" element={ <NotFoundPage /> } />
    </Routes>
  )
}

export default ListRouter