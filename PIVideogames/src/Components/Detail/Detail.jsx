import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Detail.css"

function Detail( ){
    const { id } = useParams();
    const [ VideoGame, setVideoGame] = useState({});

    useEffect (() => {
        const VideoGameId = id;
        axios(`http://localhost:3001/getVideoGameByID/${VideoGameId}`)
        .then(({data}) => setVideoGame(data)
         )
         return setVideoGame({}) 
         }, [id]);

    return (
        <div className="detail">
            {
                VideoGame ? (
                    <div className="detail__container">
                    <h2>ID:{VideoGame.id}</h2>
                    <h2>Name:{VideoGame.name}</h2>
                    <h2>Released:{VideoGame.released}</h2>
                    <h2>Platforms:{VideoGame.platforms}</h2>
                    <h2>Rating:{VideoGame.rating}</h2>
                    <h2>Description:</h2>
                    <p>{VideoGame.description}</p>
                    <img src={VideoGame.image}/>
                    </div>
                ) : "" 
            }
        </div>

            )

}

export default Detail;