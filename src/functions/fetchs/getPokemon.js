export async function getPokemon(name){
  try {
    var res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    var data = await res.json()
    return data
  } catch (error) {
    return {
      error
    }
  }
  
}