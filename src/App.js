import React from 'react'
import { useEffect, useState } from "react"
import './App.css'

const load = require('lodash')


export default function App() {

  const [searchData, setsearchData] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [list, setlist] = useState([])

  const [data, setdata] = useState([])
  const dic = {}
  { console.log(list) }

  const getData = async () => {
    const response = await fetch('https://themealdb.com/api/json/v1/1/search.php?s')
    const result = await response.json()
    setdata(result.meals)
    console.log(result)
  }
  useEffect(() => {
    getData()
  }, [])

  const search = () => {
    if (searchData.length > 3) {
      let filter_item = load.filter(data, { 'strCategory': searchData })
      setFilteredData(filter_item)
    }
  }

  return (

    <div id='box1'>
      <center><h1>WELCOME TO THE MEAL</h1></center>
      <input type='search' id='search1' placeholder="search" onChange={(s) => {
        setsearchData(s.target.value)
        search()
      }} />
      <div id='box2'>
        {
          searchData.length > 3 ?

            filteredData.map((item, index) => {
              return (
                <div id='' key={index}>

                  <img src={item.strMealThumb}></img>


                  <h3>{item.strCategory}</h3>
                  
                  <span>
                    <button onClick={() => {

                    }}>Add</button>
                    <h2>${1000}</h2>
                  </span>
                </div>
              )
            }) :
            data.map((item, index) => {
              return (
                <div key={index}>

                  <img src={item.strMealThumb}></img>

                  <h2>${1000}</h2>
                  <h3>{item.strCategory}</h3>
                  
                  <button onClick={() => {
                    let recipt = {
                      'dish': item.strMeal,
                      'price': 1000
                    }
                    setlist([...list, recipt])
                  }}>Add</button>

                </div>
              )
            })
        }
      </div>
      <button id='invoice' onClick={() => {
      }}>INVOICE</button>
      {
        list.map((item)=>{
          return(
            <div>
                <table>
                  <td>name:{item.strMeal}</td>
                  <td>price:1000</td>
                </table>
            </div>
          )
        })
      }
    </div>
  )
}
