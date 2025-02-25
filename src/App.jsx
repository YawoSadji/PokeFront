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
  const handleAddToSquad = ()
  const handleRemoveFromSquad = ()
  const isBattleButtonEnabled = state.squad.length >=2;
  
  return(
    <div className="container">
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
            {state.squad.includes(pokemon.name)?
            (
              <button className="btn btn-danger" onClick={()=>handleRemoveFromSquad(pokemon.name)}>Remove from Squad</button>
            ):(
              <button className="btn btn-success" onClick={()=>handleAddToSquad(pokemon.name)}>Add To Squad</button>
            )
          }
          </div>
          </div>))
        )}
    </div>
    <div>
      <h2>Squad Members:</h2>
      <ul>
        {state.squad.map((pokemon, index)=>(
          <li key={index}>{pokemon}</li>
        ))}
      </ul>
      <button className="btn btn-primary" disabled={!isBattleButtonEnabled}>Battle</button>
    </div>
    </div>
  );
}

export default App
