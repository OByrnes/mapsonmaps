import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import MapPageA from './mapPageA';
import MapPageB from './mapPageB';
import MapPageC from './mapPageC';
import MapPageD from './mapPageD';
import MapPageE from "./mapPageE";
import "./frontPageCSS.css"


const CurrentMap = ({current}) => {
    switch(current) {

        case 1:   return <><div><MapPageA/></div></>;
        case 2:   return <><div><MapPageB /></div></>;
        case 3: return <><div><MapPageC /></div></>;
        case 4:  return <><div><MapPageD /></div></>;
        case 5:  return <><div><MapPageE /></div></>;
        default:      return <h1>No project match</h1>
      }
}

export default CurrentMap