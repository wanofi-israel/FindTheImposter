import React, { useContext, useEffect, useState } from 'react'
import GameContext from '../context/GameContext'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import cardBack from '../assets/images/cardBackcustom.png'
function PlayGound() {
    const {np,round,setRound,reveal,setReveal,keywords,setKeyWord,keyword}=useContext(GameContext)
    let timer=5
    const now = new Date();
    const [timerState,setTimerState]=useState(timer)
    const [revealCount,setRevealCount]=useState(0)
    const [imposter,setImposter]=useState(false)
    const [rI,setRI]=useState(false)
    const [loading,setLoading]=useState(false)
    const [keyWordHistory,setKeyWordHistory]=useState(sessionStorage.getItem('keywordHistory')&&JSON.parse(sessionStorage.getItem('keywordHistory'))||[])
    let [isImposter,setIsImposter]=useState(null)
    const toggleReveal=()=>{

        setRevealCount(prev=>prev+1)
        
         setRI(false)
        if(revealCount<np || revealCount ===0 && np===0){
           
            if(revealCount+1===isImposter){
              setRI(true)
              setImposter(true)
            }
            setReveal(prev=>!prev)
            let ti=setInterval(()=>{
                
                if(timer>0){
                    timer--
                    setTimerState(timer)
                }else{
                    
                    return clearInterval(ti)
                }
            },1000)

            let to=setTimeout(()=>{
                setReveal(false)
                timer=5
                setTimerState(timer)
            },6000)
        if(reveal){
            clearInterval(ti)
            return
        }}
    }

    const getKeyWord=()=>{
      setLoading(true)
      let keywordIndex=Math.floor(Math.random()*keywords.length)
      let historyArray=keyWordHistory

      let isPresent=keyWordHistory.some(el=>el===keywordIndex)

      if(isPresent){
        getKeyWord()
      }else{
        setLoading(false)
        historyArray.push(keywordIndex)
        setKeyWordHistory(historyArray)
        setIsImposter(Math.floor(Math.random()*np+1))
        sessionStorage.setItem("keywordHistory",JSON.stringify(historyArray))
        setRevealCount(0)
        setImposter(false)
        setKeyWord(keywordIndex)
      }
    }

    useEffect(()=>{
       getKeyWord()
    },[round])
    


    useGSAP(()=>{
      if(reveal){
        gsap.fromTo('.timer',{
          "--end":"0%"
        },{
          "--end":"100%",
          duration:5
        })
      }else{
        gsap.fromTo('.timer',{
          "--end":"0%"
        },{
          "--end":"0%",
          duration:0
        })
      }
    },[reveal])
    
  return (
    <div className='play-ground'>
      {
        !loading?<>
        <h1 className="round">
        Round {round}
      </h1>
        {/* {reveal?  */}
      <h1 className="timer">
        <div className="after">

        </div>
        <p>{timerState}</p>
        
        </h1>
        </>:<h1>Loading...</h1>
      }
      
    {/* } */}
      <div className="game-card_wrapper">
        <div className={`game-card ${reveal?"revealed":"hide"}`}>
            <div className="card-back">
              <img src={cardBack} alt="" />
                                <p className="round-keyword">FI</p> 

            </div>
            <div className="card-front">
            <p className="round-keyword">{!rI?revealCount>0 && timer>0?keywords[keyword]:"":"Imposter"}</p> 
            </div>
        </div>
      </div>
      {!loading?
      <>
      {revealCount<np?!reveal?<button className={`btn-reveal_hide ${!reveal?"reveal":"hide"}`} onClick={toggleReveal}>
        Reveal
      </button>:<button className={`btn-reveal_hide ${!reveal?"reveal":"hide"}`} disabled>
        Reveal
      </button>:<button className={`btn-reveal_hide ${!reveal?"reveal":"hide"}`} disabled={reveal} onClick={()=>{
        sessionStorage.setItem('game-round',round+1)
       
        setRound(prev=>prev+1)
        }}>
        Round {round+1}
      </button>}
      </>
    :  <h1>Loading...</h1>
    }
      
    </div>
  )
}

export default PlayGound
