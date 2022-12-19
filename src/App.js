// import { result } from 'lodash'
import React from 'react'
import { useEffect, useState } from "react"
import './App.css'

export default function App() {
  const [searchData, setsearchData] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [list, setlist] = useState([])
  const [data, setdata] = useState([])
  const [total, settotal] = useState(0)
  const [bill, setbill] = useState(true)

  const getData = async () => {
    const response = await fetch('https://themealdb.com/api/json/v1/1/search.php?s')
    const result = await response.json()
    setdata(result.meals)
  }
  useEffect(() => {
    getData()
  }, [])

  let search1 = () => {
    let new_array = []
    for (let i of data) {
      if (i['strCategory'] === searchData) {
        new_array.push(i)
      }
    }

    setFilteredData(new_array)
    setsearchData('')
    console.log(filteredData);
  }
  return (
    <div id='box1'>
      <center><h1>WELCOME TO THE MEAL</h1></center>
      <input id='input_sea' placeholder="search the text" value={searchData} onChange={(s) => {
        setsearchData(s.target.value)
      }} />
      <button id='sea' onClick={() => {
        search1()
      }}>search</button>
      <button id='invoice' onClick={() => {
        setbill(false)
      }}>INVOICE</button>
      <div id='box2'>
        {
          searchData.length > 3 ?
            filteredData.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.strMealThumb}></img>
                  <h1>{item.strCategory}</h1>
                  <h3>{item.strMeal}</h3>
                  <h4>${1000}</h4>

                  <button id='add' onClick={() => {
                    let recipt = {
                      'dish': item.strMeal,
                      'category': item.strCategory,
                      'price': 1000
                    }
                    setlist([...list, recipt])
                    settotal(total + 1000)
                  }}>Add</button>
                </div>
              )
            })
            :
            data.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.strMealThumb}></img>

                  <h1>{item.strCategory}</h1>
                  <h3>{item.strMeal}</h3>
                  <div id='span'>
                    <button id='rupees'>${1000}</button>
                    <button id='add' onClick={() => {
                      let recipt = {
                        'dish': item.strMeal,
                        'category': item.strCategory,
                        'price': 1000
                      }
                      setlist([...list, recipt])
                      settotal(total + 1000)
                    }}>Add</button>
                  </div>

                </div>
              )
            })
        }
      </div>

      {
        bill ? " " : (() => {
          return (
            <div id='recipt'>
              <center><p id='strong1'><strong>RECIPT</strong></p></center>
              <hr></hr>
              <center><p>ORDER RECIPT</p>
                <p>17/12/2022</p>
                <p>ADRESS:KATRAJ</p>
                <hr></hr>
              </center>
              <table>
                <tr>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                </tr>
                {
                  list.map((item) => {
                    return (
                      <tr>
                        <td>{item.dish}</td>
                        <td>{item.price}</td></tr>
                    )
                  })
                }
                <tr>
                  <td>TOTAL</td>
                  <td>${total}</td>
                </tr>
              </table>
            </div>
          )
        })()

      }
    </div>
  )
}
