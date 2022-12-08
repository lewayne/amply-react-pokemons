import React, { FunctionComponent, useState } from "react";
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-type";
import Pokemon from "../models/pokemon";
import './pokemon-card.css';
import { useHistory} from 'react-router-dom'

type Props = {
    pokemon: Pokemon,
    borderColor?: string
};

const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#009688'}) => {
  const [color, setColor] = useState<string>();
  const history = useHistory();
  const showBorder = () => {
    setColor(borderColor); 
  }
  
  const hideBorder = () => {
    setColor('#f5f5f5');
  };

  const goToPokemon = (id: number) => { 
    history.push(`/pokemon/${id}`);
  }


  return (
    <div className="col-6 col-md-4 mb-3" onClick={() =>goToPokemon(pokemon.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
      <div className="card horizontal" style={{ borderColor : color, cursor: "pointer" }}>
        <div className="row">
          <div className="col-5 align-self-center">
            <img
              className="card-img-top img-fluid"
              src={pokemon.picture}
              alt={pokemon.name}
            />
          </div>
          <div className="col-7">
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <p className="card-text">
                <small>{formatDate(pokemon?.created)}</small>
              </p>
              {pokemon.types.map((type) =>( 
                <span key={type} className={formatType(type) } >{type} </span> 
                
              ))}
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;