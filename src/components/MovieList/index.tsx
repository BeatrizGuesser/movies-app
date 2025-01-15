'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';

export interface MovieType {
    id: number,
    title: string,
    poster_path: string,
    overview: string,
    vote_average: number,
}

export default function MovieList() {

    const [movies, setMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'cf48183d5fe48a0f3f411b1c9d6eec8c',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results);
        })
    }

    return (
        <ul className="movie-list">
            {movies.map((movie) =>
                <li key={movie.id} className='movie-card'>
                    <p>
                        {movie.title}
                    </p>
                    <p className='description'>
                        {movie.overview}
                    </p>
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                    <p>
                        {movie.vote_average}
                    </p>
                </li>
            )}
        </ul>
    )
}