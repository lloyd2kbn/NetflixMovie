import React, { useEffect, useState } from 'react'
import './Nav.css'
function Nav() {
    const [show,handleShow]=useState(false)
    useEffect(()=>{
            window.addEventListener("scroll",()=>{
                if(window.scrollY>100){
                    handleShow(true)
                }else{
                    handleShow(false)
                }
            })
            return ()=>{
                window.removeEventListener("scroll")
            }
    },[])
  return (
    <div className={`nav ${show&&"nav__black"}`}>
            <img 
                    className='nav__logo'
                    src='https://th.bing.com/th/id/R.ff911fd3b5d9242031ed23e1008567ad?rik=sRapdwwdvn5fMw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-dxSeAe08fY4%2fUppSJnHKudI%2fAAAAAAAADeI%2fMrAj_P4TGtI%2fw1200-h630-p-nu%2fNetflix_Web_Logo.jpg&ehk=Cw9kme%2byN1Du0AR5iYySI0S%2fD1Tmuihzh%2bpfiMja8SY%3d&risl=&pid=ImgRaw&r=0'
                    alt='Netflix Logo'
            /> 
    </div>
  )
}

export default Nav