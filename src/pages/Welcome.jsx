import React from 'react'
import poster from '../assets/images/FIPoster3.png'
import { useNavigate } from 'react-router-dom'
function Welcome() {
    const navigate=useNavigate()
  return (
    <div className='welcome'>
        <div className="blur">
            <img src={poster} alt=""/>
        </div>
        <img src={poster} alt="" className='poster'/>
        <button className='btn-start' onClick={()=>navigate('/menu')}>
            Start
        </button>
    </div>
  )
}

export default Welcome
