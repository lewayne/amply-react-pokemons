import { useState, useEffect} from 'react';
import POKEMONS from '../models/mock-pokemon';
import Pokemon from '../models/pokemon';

const usePokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        setPokemons(POKEMONS)
    }, []); // [] Permet d'éviter de déclencler le hook d'éffect à chaque changement de notre app

    return pokemons;
}

export default usePokemons;