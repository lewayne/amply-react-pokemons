import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";

const PokemonSearch: FunctionComponent = () => {
  const [term, setTerm] = useState<string>("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setPokemons([]);
      return;
    }

    PokemonService.searchPokemon(term).then((pokemons) =>
      setPokemons(pokemons)
    );
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-content">
            <div className="input-field text-center">
              <input
                type="text"
                className="text-center"
                placeholder="Rechercher un pokémon"
                value={term}
                onChange={(e) => handleInputChange(e)}
                style={{ width: "100%" }}
              />
            </div>
            <div className="collection">
              {pokemons.map((pokemon) => (
                <table className="table table-striped">
                  <tr>
                    <td>
                      <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                        <span style={{ color: "white !important" }}>
                          {pokemon.name}
                        </span>
                      </Link>
                    </td>
                  </tr>
                </table>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
