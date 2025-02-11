import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
function App() {
  const [pokemons, setPokemons]= useState([]);
  const [loading, setLoading]= useState(true);
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(response => response.json())
    .then(data => {
      setPokemons(data.results);
      setLoading(false);
    })
    .catch(error => console.error(error));
  }, []);

  
  return(
    <Carousel>
      {loading?(
        <Carousel.Item> 
          <div>Loading...</div>
        </Carousel.Item>
        ):(pokemons.map((pokemon, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src="https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon/${index +1000}" />
          
          </Carousel.Item>)))}
  </Carousel>
  );
}

export default App
