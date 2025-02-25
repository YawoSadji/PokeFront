import { useState, useEffect, useReducer } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
const initialState = { squad: [], }
const reducer = (state, action)=>{
  switch (action.type){
    case 'add':
      if(!state.squad.includes(action.payload)){
        return {...state, squad: [...state.squad, action.payload]}
      }
      return state;
    case 'remove':
      return{...state, squad: state.squad.filter((item)=>item !== action.payload), }
    default:
      return state;
  }
};

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [state, dispatch]= useReducer(reducer, initialState);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
      setPokemons(data.results);
      setLoading(false);
    })
    .catch(error => console.error(error));
  }, []);

  
  return(
    <div className="container">
      {state}
      <div>
        <div>
        <h1>
          PokeFront
          <Badge bg="secondary" as={Button}>
            All Pokemon
          </Badge>
        </h1>
      </div>
      <div className="row">
        {loading?(
          <Carousel.Item> 
            <div>Loading...</div>
          </Carousel.Item>
          ):(pokemons.map((pokemon, index) => (
          <div key={index} className="col-md-3">
            <div className="card">
            <h5 className="card-titile">{pokemon.name}</h5>
            <button className="btn btn-success" onClick={(pokemon)=>dispatch({type:"add", payload: pokemon.index})}>Add</button>
            <button className="btn btn-danger" onClick={(pokemon)=>dispatch({type: "remove", payload: pokemon.index})}>Remove</button>
          </div>
          </div>))
        )}
    </div>
    </div>
    </div>
  );
}

export default App
