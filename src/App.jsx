import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function App() {
  const [pokemons, setPokemons]= useState([]);
  const [loading, setLoading]= useState(true);
  const handleAddClick = () => {
    console.log("Button Clicked"); 
  };
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
            {/* <p className="card-text">URL: {pokemon.url}</p> */}
            <button onClick={handleAddClick}>Add</button>
          </div>
          </div>))
        )}
    </div>
    </div>
    </div>
  );
}

export default App
