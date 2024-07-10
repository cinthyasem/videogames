import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function Detail( ){
    const { id } = useParams();.
    const [ VideoGame, setVideoGame] = useState({});

    useEffect (() => {
        const VideoGameId = id;
        axios(`http://localhost:3001/getVideoGameByID/${VideoGameId}`)
    } )

    return (
        <div className="detail"></div>

        )

}

export default Detail;