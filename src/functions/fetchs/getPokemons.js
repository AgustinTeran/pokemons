export async function getPokemons(offsetUsed){
  //              cuantos pokemones maximo quiero mostrar
//                          |
  var offsetsMax =         600               / 20
  try {
    var randomOffset = (Math.floor(Math.random() * offsetsMax)) * 20
    if(offsetUsed.length === offsetsMax) return {results: [],randomOffset:null}

    let maxIteration = 0
    while (offsetUsed.includes(randomOffset)) {
      maxIteration++

      // Limite de iteraciones
      if(maxIteration > 50) return {results: [],randomOffset:null}
      randomOffset = (Math.floor(Math.random() * offsetsMax)) * 20
    }
    var res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${randomOffset}`)
    var data = await res.json()
    return {results: data.results,randomOffset}
  } catch (error) {
    return {
      error
    }
  }
  
}