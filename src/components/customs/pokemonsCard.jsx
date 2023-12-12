import { IonCard, IonCardHeader, IonCardTitle, IonModal, IonSpinner  } from "@ionic/react"
import { useState } from "react"
import { getPokemon } from "../../functions/fetchs/getPokemon"

export default function PokemonCard({item,index,id}){
  var [isOpen,setIsOpen] = useState(false)
  var [pokemon,setPokemon] = useState(null)


  return (
    <IonCard onClick={async() => {
      setIsOpen(true)
      if(!pokemon) setPokemon(await getPokemon(item.name))
      }} className="flex-1 cursor-pointer basis-60 flex flex-col items-center">
      <img className="h-40" alt={`avatar ${item.name}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`} />
      <IonCardHeader>
        <IonCardTitle className="capitalize">{item.name}</IonCardTitle>
      </IonCardHeader>
    <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} initialBreakpoint={0.80} breakpoints={[0, 0.25, 0.5, 0.80]}>
      {
        !pokemon && <IonSpinner className="w-10 h-10 mx-auto mt-6"/>
      }
      {
        pokemon && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <h3 className="text-3xl capitalize">{item.name}</h3>
            <div className="flex flex-wrap gap-8 justify-center">
              <img className={`w-[300px] aspect-square`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`} alt={`avatar ${item.name}`} />
              <div className="flex flex-col justify-center gap-3 max-w-[300px]">
                <h4 className="text-xl">Base experience: {pokemon.base_experience}</h4>
                <h4 className="text-xl">Height: {pokemon.height}</h4>
                <h4 className="text-xl">Weight: {pokemon.weight}</h4>
                <h4 className="text-xl">Abilities: {pokemon.abilities.map((e,i) => {
                  if(!i) return e.ability.name
                  if(i + 1 === pokemon.abilities.length) return ` and ${e.ability.name}`
                  return `, ${e.ability.name},`
                })}</h4>
              </div>
            </div>
          </div>
        )
      }
      
    </IonModal>
    </IonCard>
  )
}