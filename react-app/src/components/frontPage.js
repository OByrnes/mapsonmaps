import React, {useEffect, useState} from 'react';
import CurrentMap from './currentMap'
import { useDispatch, useSelector } from "react-redux";
import "./frontPageCSS.css"

import { getAllMarkers } from "../store/maps"


const FrontPage = () => {
    const maps = useSelector(state => state.maps)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllMarkers())
    },[])
    const [current, setCurrent] = useState(1)
    console.log(process.env.REACT_APP_MAPS_KEY)
    
    return (
        <div className="front-page__container">
            <ul id="tabs">
                <li id={current===1? 'current' : 'notCurrent'} onClick={()=>setCurrent(1)}><div > <i className="fas fa-map"></i>   One</div></li>
                <li id={current===2? 'current' : 'notCurrent'} onClick={()=>setCurrent(2)}><div ><i className="fas fa-map"></i>Two</div></li>
                <li id={current===3? 'current' : 'notCurrent'} onClick={()=>setCurrent(3)}><div ><i className="fas fa-map"></i> Three</div></li>
                <li id={current===4? 'current' : 'notCurrent'} onClick={()=>setCurrent(4)}><div ><i className="fas fa-map"></i> Four</div></li>
                <li id={current===5? 'current' : 'notCurrent'} onClick={()=>setCurrent(5)}><div > <i className="fas fa-map"></i> Five</div></li>

            </ul>
            <div>
                <CurrentMap current={current}/>
            </div>

        </div>
    )
}

export default FrontPage