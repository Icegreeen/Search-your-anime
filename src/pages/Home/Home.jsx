import React, { useState, useEffect } from 'react';

import SearchInput from '../../components/SearchInput/SearchInput';
import './styles.css';

const api = 'https://kitsu.io/api/edge/'

export default function Home() {
    const [info, setInfo] = useState({});
    const [ text, setText ] = useState('');
    
    useEffect(() => {
        if (text) {
            setInfo({});

            fetch(`${api}anime?filter[text]=${text}&page[limit]=10`)
                .then((res) => res.json())
                .then((res) => {
                    setInfo(res);
                })
        }
    }, [text]);

    return (
       <div className="container">
           <h1>Search for your favorite anime.</h1>

            <SearchInput 
                value={text} 
                onChange={(search) => setText(search)} 
            />

            {text && !info.data && (<span>Loading...</span>)}

                <div className="animes">
                    {info.data && (
                        <ul className="animeList">
                            {info.data.map((anime) => (
                                <li key={anime.id}>
                                    <img 
                                        src={anime.attributes.posterImage.small} 
                                        alt={anime.attributes.canonicalTitle}
                                    />

                                    {anime.attributes.canonicalTitle}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
        </div>  
    );
}