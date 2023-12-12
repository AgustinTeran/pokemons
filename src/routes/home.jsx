import { useEffect, useState } from "react";
import Main from "../components/layout/main";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSpinner, IonButton, IonModal, IonRefresher, IonRefresherContent
} from '@ionic/react';
import { getPokemons } from "../functions/fetchs/getPokemons";
import PokemonCard from "../components/customs/pokemonsCard";

export default function Home(){
  var [offsetUsed,setOffsetUsed] = useState([])
  var [pokemons,setPokemons] = useState(null)

  useEffect(() => {
    getPokemons(offsetUsed)
    .then(res => {setPokemons(res.results);setOffsetUsed([...offsetUsed,res.randomOffset])})
    
  },[])


  async function handleRefresh(event){
    var newPokemons = await getPokemons([])
    setPokemons([...newPokemons.results])
    setOffsetUsed([newPokemons.randomOffset])
    event.detail.complete()
  }


  if(!pokemons){
    return (
    <Main className={"flex justify-center"}>
     <IonSpinner className="w-10 h-10 mt-5"></IonSpinner>

    </Main>
    )
  }



  return (
    <Main className={"flex flex-wrap"}>
      <IonContent className="h-[calc(100vh-96px)]">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList className="flex flex-wrap gap-5 items-center justify-evenly px-4">
          {pokemons && pokemons.map((item, index) => (
            <PokemonCard key={item.name} item={item} index={index} id={item.url.split("/")[6]}/>
          ))}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={async(ev) => {
            var res = await getPokemons(offsetUsed)
            setOffsetUsed([...offsetUsed,res.randomOffset])
            setPokemons([...pokemons,...res.results])
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
    </Main>
  )
}