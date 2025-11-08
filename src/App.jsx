import React, { useState } from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Menu from './pages/Menu'
import PlayGound from './pages/PlayGound'
import {keywords} from '../constants/keywords'
import GameContext from './context/GameContext'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
function App() {

    gsap.registerPlugin(ScrollTrigger,SplitText)

  const [round,setRound]=useState(sessionStorage.getItem('game-round') || 1)
  const [keyword,setKeyWord]=useState("")
  const [reveal,setReveal]=useState(false)
  const [np,setNp]=useState(sessionStorage.getItem("np") || 0)
  return (
    <GameContext.Provider value={{np,setNp,round,setRound,keyword,setKeyWord,reveal,setReveal,keywords}}>
      <div className='app'>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/play-ground' element={<PlayGound/>}/>
      </Routes>
    </div>
    </GameContext.Provider>
    
  )
}

export default App
