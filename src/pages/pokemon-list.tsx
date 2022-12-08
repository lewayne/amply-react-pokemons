import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../components/pokemon-card"; 
import PokemonSearch from "../components/pokemon-search";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";


const PokemonList: FunctionComponent = () => {
  //const pokemons = usePokemons(); //hook personnaliser
   
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    //setPokemons(POKEMONS);
    /*fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .then((pokemons) => {
        setPokemons(pokemons);
      });*/
      PokemonService.getPokemons().then(pokemons => setPokemons(pokemons))
  }, []);  

  return (
    <div>
      <h1 className="text-center">Pokemons List </h1>
      <div className="container"> 
        <div className="row">
          <div className="col-12">
            <PokemonSearch />
          </div>
        </div>
        <div className="row">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <Link
          className="badge badge-success"
          style={{ position: "fixed", bottom: "25px", right: "25px" }}
          to="pokemon/add"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default PokemonList