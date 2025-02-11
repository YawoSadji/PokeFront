import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function App() {
  const [pokemons, setPokemons]= useState([]);
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
    <>
    <div>
      <h1>
        PokeFront
        <Badge bg="secondary" as={Button}>
          All Pokemon
        </Badge>
      </h1>
    </div>
    <Carousel>
      {loading?(
        <Carousel.Item> 
          <div>Loading...</div>
        </Carousel.Item>
        ):(pokemons.map((pokemon, index) => (
        <Carousel.Item key={index}>
          <h3>{pokemon.name}</h3>
          <p>URL: {pokemon.url}</p>
        </Carousel.Item>)))}
  </Carousel>
  </>
  );
}

export default App
