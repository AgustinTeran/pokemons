import { useEffect, useState } from "react";
import Main from "../components/layout/main";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSpinner
} from '@ionic/react';
import { getPokemons } from "../functions/fetchs/getPokemons";

export default function Home(){
  var [offset,setOffset] = useState(0)
  var [pokemons,setPokemons] = useState(null)

  useEffect(async() => {
    setPokemons(await getPokemons(offset))
  },[])

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
      <IonList className="flex flex-wrap gap-5 items-center justify-evenly px-4">
        {pokemons && pokemons.map((item, index) => (  
          <IonCard key={item.name} className="flex-1 basis-60 flex flex-col items-center">
            <img className="h-40" alt={`avatar ${item.name}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.url.split("/")[6]}.png`} />
            <IonCardHeader>
              <IonCardTitle className="capitalize">{item.name}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        ))}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={async(ev) => {
          setPokemons([...pokemons,...await getPokemons(offset + 20)])
          setOffset(prev => prev + 20)
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
    </Main>
  )
}