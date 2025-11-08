import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import GameContext from '../context/GameContext'

function Menu() {
    const navigate=useNavigate()

    const {np,setNp}=useContext(GameContext)
  return (
    <div className='menu'>
      <select name="nop" id="nop" onChange={(e)=>{
        setNp(e.target.value)
        sessionStorage.setItem("np",e.target.value)
        }} value={np}>
        <option value="">Choose Number of Players</option>
        <option value="4">4 Players</option>
        <option value="5">5 Players</option>
        <option value="6">6 Players</option>
        <option value="7">7 Players</option>
        <option value="8">8 Players</option>
        <option value="9">9 Players</option>
        <option value="10">10 Players</option>
        <option value="11">11 Players</option>
        <option value="12">12 Players</option>
      </select>
      <button className='btn-next' onClick={()=>{
        if(np){
            navigate('/play-ground')
        }else{
            alert("Choose Player number")
        }
        }}>
        Play
      </button>
    </div>
  )
}

export default Menu
