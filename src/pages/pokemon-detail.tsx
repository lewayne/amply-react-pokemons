import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Pokemon from '../models/pokemon'; 
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type'; 
import { useHistory } from "react-router-dom";
import PokemonService from '../services/pokemon-service';
import Loader from '../components/loader';

type Params = { id: string };

const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
// RouteComponentProps : Pour typer le paramètre réçu depuis le router, c'est un props isue du router
// le router de react va associer ce  prop à un object match, qui contient toutes les données passées par le router
    //const pokemons = usePokemons(); //hook personnaliser
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const history = useHistory();

    useEffect(() => {
        /*POKEMONS.forEach(pokemon => {
            if (match.params.id === pokemon.id.toString()) {
                setPokemon(pokemon);
            }
        })*/
       /* fetch(`http://localhost:3001/pokemons/${match.params.id}`)
          .then((response) => response.json())
          .then((pokemon) => {
                if(pokemon.id) setPokemon(pokemon);
          });*/
        PokemonService.getPokemon(+match.params.id).then((pokemon) =>
            setPokemon(pokemon)
        );
    }, [match.params.id]);

    const prevPage = () => {
        history.goBack();
    };

    return (
      <div>
        {pokemon ? (
          <div className="row text-center">
            <div className="col-12 col-md-8 offset-m2 mx-auto">
              <h2 className="header center">{pokemon.name}</h2>
              <div className="card hoverable ">
                <div className="card-image">
                  <img
                    src={pokemon.picture}
                    alt={pokemon.name}
                    style={{ width: "250px", margin: "0 auto" }}
                  />
                  <Link
                    to={`/pokemon/edit/${pokemon.id}`}
                    className="btn btn-success text-right"
                  >
                    <i className="material-icons">edit</i>
                  </Link>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <table className="bordered striped">
                      <tbody>
                        <tr>
                          <td>Nom</td>
                          <td>
                            <strong>{pokemon.name}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Points de vie</td>
                          <td>
                            <strong>{pokemon.hp}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Dégâts</td>
                          <td>
                            <strong>{pokemon.cp}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Types</td>
                          <td>
                            {pokemon.types.map((type) => (
                              <span key={type} className={formatType(type)}>
                                {type}
                              </span>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <td>Date de création</td>
                          <td>{formatDate(pokemon.created)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card-action">
                    {/**<!--Link to="/">Retour</Link-->  */}
                    <button onClick={prevPage} style={{ cursor: "pointer" }}>
                      {" "}
                      goBack{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h4 className="text-center">
              <Loader />
          </h4>
        )}
      </div>
    );
}

export default PokemonsDetail;