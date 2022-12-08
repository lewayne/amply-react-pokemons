import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";
import { useHistory} from 'react-router-dom' 
import PokemonService from "../services/pokemon-service";

type Props = {
  pokemon: Pokemon,
  isEditForm: boolean
};

type Field = {
    value?: any,
    error?: string,
    isValid?:boolean
}

type Form = {
  picture : Field,
  name: Field,
  hp: Field,
  cp: Field,
  types: Field
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
  const history = useHistory();
  const [form, setForm] = useState<Form>({
    picture: {value: pokemon.picture},
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
  });

  const types: string[] = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const selectType = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checked = e.target.checked;
    let newField: Field;
    if (checked) {
      // on ajoute à la liste des pokemons
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      const newTypes: string[] = form.types.value.filter(
        (currentType: string) => currentType !== type
      );
      newField = { value: newTypes };
    }

    setForm({ ...form, ...{ types: newField } });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      pokemon.picture = form.picture.value;
      pokemon.name = form.name.value;
      pokemon.hp = form.hp.value;
      pokemon.cp = form.cp.value;
      pokemon.types = form.types.value;

      isEditForm ? updatePokemon() : addPokemon()
    }
  };

  const addPokemon = () => {
    PokemonService.addPokemon(pokemon).then(() => history.push(`/pokemons`));
  };

   const updatePokemon = () => {
     PokemonService.updatePokemon(pokemon).then(() => history.push(`/pokemon/${pokemon.id}`));
   };

  const deletePokemon = () => {
    PokemonService.deletePokemon(pokemon).then(() => history.push(`/pokemons`));
  };

  const isTypesValid = (type: string): boolean => {
    if (form.types.value.length === 1 && hasType(type)) return false;
    if (form.types.value.length >= 3 && !hasType(type)) return false;
    return true;
  };

  const isAddForm = () => {
    return !isEditForm;
  };


  const validateForm = () => {
    let newForm: Form = form;

    //validator picture
    if(isAddForm()){
      const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
      const end = ".png";

      if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)){
        const errorMsg: string = "L'url n'est pas valide";
        const newField: Field = {value: form.picture.value, error: errorMsg, isValid: false}
        newForm = {...form, ...{picture: newField}}
      }
      else{ 
        const newField: Field = {value: form.picture.value, error: "", isValid: true}
        newForm = {...form, ...{picture: newField}}
      }
    }
    
    //validator name
    if (!/^[a-zAZàéè]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = "Le nom du pokémon est réquis (1-25).";
      const newField: Field = {
        value: form.name.value,
        error: errorMsg,
        isValid: true,
      };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = {
        value: form.name.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ name: newField } };
    }

    //validator hp
    if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string =
        "Les points de vie du pokémon sont compris entre 0 et 999";
      const newField: Field = {
        value: form.hp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: Field = {
        value: form.hp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    //validator cp
    if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string =
        "Les dégâts du pokémon esont compris entre 0 et 99.";
      const newField: Field = {
        value: form.cp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField: Field = {
        value: form.cp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setForm(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  };

  return (
    <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
      <div className="col-12 col-md-8 mx-auto ml-5">
        <div className="card hoverable">
          {isEditForm && (
            <div className="card-image text-center">
              <img
                src={pokemon.picture}
                alt={pokemon.name}
                style={{ width: "250px", margin: "0 auto" }}
              />

              <span className="btn btn-danger">
                <i onClick={deletePokemon} className="material-icons">
                  delete
                </i>
              </span>
            </div>
          )}

          <div className="card-stacked">
            <div className="card-content">
              {/* Pokemon url */}
              {isAddForm() && (
                <div className="form-group">
                  <label htmlFor="name">Picture</label>
                  <input
                    id="picture"
                    type="text"
                    name="picture"
                    className="form-control"
                    value={form.picture.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.picture.error && (
                    <div className="badge badge-danger ">
                      {form.picture.error}
                    </div>
                  )}
              </div>
              )}
              

              {/* Pokemon name */}
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name.value}
                  onChange={(e) => handleInputChange(e)}
                ></input>
                {form.name.error && (
                  <div className="badge badge-danger ">{form.name.error}</div>
                )}
              </div>
              {/* Pokemon hp */}
              <div className="form-group">
                <label htmlFor="hp">Point de vie</label>
                <input
                  id="hp"
                  type="number"
                  name="hp"
                  className="form-control"
                  value={form.hp.value}
                  onChange={(e) => handleInputChange(e)}
                ></input>
                {form.hp.error && (
                  <div className="badge badge-danger ">{form.hp.error}</div>
                )}
              </div>
              {/* Pokemon cp */}
              <div className="form-group">
                <label htmlFor="cp">Dégâts</label>
                <input
                  id="cp"
                  type="number"
                  name="cp"
                  className="form-control"
                  value={form.cp.value}
                  onChange={(e) => handleInputChange(e)}
                ></input>
                {form.cp.error && (
                  <div className="badge badge-danger ">{form.cp.error}</div>
                )}
              </div>
              {/* Pokemon types */}
              <div className="form-group">
                <label>Types</label>
                {types.map((type) => (
                  <div key={type} style={{ marginBottom: "10px" }}>
                    <label>
                      <input
                        id={type}
                        type="checkbox"
                        value={type}
                        disabled={!isTypesValid(type)}
                        checked={hasType(type)}
                        onChange={(e) => selectType(type, e)}
                      ></input>
                      <span>
                        <p className={formatType(type)}>{type}</p>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-action center">
              {/* Submit button */}
              <button type="submit" className="btn">
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
