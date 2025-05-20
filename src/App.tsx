import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import GameResultPage from './pages/GameResultPage'
import WinnersPage from './pages/WinnersPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game-result" element={<GameResultPage />} />
        <Route path="/winners" element={<WinnersPage />} />
      </Routes>
    </Router>
  )
}

export default App
