import React, {FunctionComponent, useState} from 'react'
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';

const PokemonAdd: FunctionComponent = ()=>{
    const [id] = useState<number>(new Date().getTime());
    const [pokemon] = useState<Pokemon>(new Pokemon(id));
    // on crée un pokemon viege et on lui passe cet identifiant

    return (
      <div className="row">
        <h2 className="header text-center">Ajouter un pokémon</h2>
        <PokemonForm pokemon={pokemon} isEditForm={false}> </PokemonForm>
        
      </div>
    );

}

export default PokemonAdd;