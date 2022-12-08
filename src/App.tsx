//import React from "react";
import React, { FunctionComponent} from "react"; 
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonList from './pages/pokemon-list'
import PageNotFound from './pages/page-not-found'
import PokemonEdit from "./pages/pokemon.edit";
import PokemonAdd from "./pages/pokemon-add";
import Login from "./pages/login";
import PrivateRoute from "./PrivateRoute";


const App: FunctionComponent = () => {    
  return (
    <Router>
      {/* La barre de navigation comun à toutes les pages */}
      <nav className="navbar navbar-light bg-light text-center row">
        <p
          className="navbar-brand text-center col-6 mx-auto"
          style={{ fontSize: "2.1em" }}
        >
          <Link to="/">Pokédex</Link>
        </p>
      </nav>

      <Switch>
        <PrivateRoute exact path="/" component={PokemonList} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/pokemons" component={PokemonList} />
        <PrivateRoute exact path="/pokemon/add" component={PokemonAdd} />
        <PrivateRoute exact path="/pokemon/edit/:id" component={PokemonEdit} />
        <PrivateRoute path="/pokemon/:id" component={PokemonsDetail} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;

/*export default class App extends React.Component{
  const nam e: String = "React";
    renter() {
        return(
            <h1>Hello, {name} !!!</h1>
        );
    }

}*/
