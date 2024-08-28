import React ,{ useState, useEffect}from 'react'
import './App.css'
import PokemonList from './PokemonList'
import axios from "axios"
import Paganation from './Paganation'


function App() {

  const [pokemon,setPokemon] = useState([])
  const [currentstateUrl,setCurrentstateUrl]=useState("https://pokeapi.co/api/v2/pokemon")
  const [nextstateUrl,setNextstateUrl]=useState()
  const [prevstateUrl,setprevstateUrl]=useState()
  const [loading,setLoading]= useState(true)
  useEffect(()=>{
    setLoading(true)
    let cancel;
    axios.get(currentstateUrl,{
      cancelToken: new axios.CancelToken(c=>cancel =c)
    }).then(res=>{
      setLoading(false)
      setNextstateUrl(res.data.next)
      setprevstateUrl(res.data.previous)
      setPokemon(res.data.results.map(p=>p.name))

      return ()=>{
        cancel()
      }
    })
  },[currentstateUrl])
  console.log(nextstateUrl)
function goToNextPage(){
  setCurrentstateUrl(nextstateUrl)
}
function goToPrevPage(){
  setCurrentstateUrl(prevstateUrl)
}

  if (loading) return "Loading..."
  return (
    <>
      <h1 className='title'>Pokemon Names</h1>
    <PokemonList  pokemon={pokemon}/>
    <Paganation
     
      goToNextPage={nextstateUrl ?goToNextPage : null }
      goToPrevPage={prevstateUrl ? goToPrevPage : null}
    />

    </>
  )
}

export default App
