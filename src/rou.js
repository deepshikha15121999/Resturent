

import "./style.css"
import { useState, useEffect } from "react"
import PayBill from "./Bill"
function SearchData() {
    const [Data, setData] = useState([])
    const [Menu, setMenu] = useState([])
    const [Search, setSearch] = useState([])
    const [Input, setInput] = useState("")
    const [Item, setItem] = useState([])
    const [price, setprice] = useState(80)
    const [Bool, setBool] = useState(true)
    const [sum, setsum] = useState(0)
    useEffect(() => {
        const search = async () => {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
            const result = await (response.json())
            setData(result)
            let object = {}
            let arr = []
            for (let i of result.meals) {
                object[i.strCategory] = ""
            }
            for (let j in object) {
                arr.push(j)
            }
            setMenu(arr)
        }
        search()
    })
    const displayData = () => {
        let newArr = []
        for (let i of Data.meals) {
            if (Input === i.strCategory) {
                newArr.push(i)
            }
            else if (Input === "All") {
                newArr.push(i)
            }
        }
        setSearch(newArr)
        setInput("")
        console.log(newArr);
    }
    function Invoice() {
        setBool(false)
    }
    return (
        <div className="container">
            {Bool ?
                <div className="section1">
                    <div className="name">
                        <img className="image" src="https://www.themealdb.com/images/meal-icon.png" alt="" />
                        <div>
                            <h2>𝕾𝖆𝖑𝖔𝖓𝖎'𝖘</h2>
                            <h2>𝕽𝖊𝖘𝖙𝖆𝖚𝖗𝖆𝖓𝖙</h2>
                        </div>
                        <img className="image" src="https://www.themealdb.com/images/meal-icon.png" alt="" />
                    </div>
                    <hr />
                    <div className="main">
                        <div>
                            <select onChange={(e) => { setInput(e.target.value) }}>
                                <option>Menu</option>
                                <option>All</option>
                                {Menu.map((item, index) => {
                                    return (
                                        <option>{item}</option>
                                    )
                                })}
                            </select>
                            <input type="search" placeholder="search....." value={Input} onChange={(e) => {
                                setInput(e.target.value)
                            }} />
                            <button onClick={() => { displayData() }} className="button">Search</button>
                        </div>
                        <div><button onClick={() => { Invoice() }} className="invoice">Invoice</button></div>
                    </div>
                    <div className="search">
                        {Search.map((item, index) => {
                            return (
                                <div key={index} >
                                    <img src={item.strMealThumb} alt="" />
                                    <div className="grid">
                                        <h3>{item.strMeal}</h3>
                                        <h5>Rs. 80</h5>
                                        <button onClick={() => {
                                            setItem([...Item, { Discription: item.strMeal, Price: price }])
                                            setprice(80)
                                            setsum(sum + price)
                                        }}>ADD</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div> : <div className="section2">
                    <button onClick={() => {
                        setBool(true)
                    }}>Back</button>
                    <div className="heading1">
                        <PayBill obj={Item} />
                        <div className="total"><h4 className="span">TOTAL:</h4><p className="span"></p><p className="span">{sum}</p></div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchData