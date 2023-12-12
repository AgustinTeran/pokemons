export async function getPokemons(offset){
  try {
    var res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}`)
    var data = await res.json()
    console.log(data.results);
    return data.results
  } catch (error) {
    return {
      error
    }
  }
  
}