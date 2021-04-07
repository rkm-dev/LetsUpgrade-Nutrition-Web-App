import React, { Component } from 'react'

export default class Food extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            foods : [],
            searchedFoods : [],
            currentFood :  {
                name:"---",
                calories:0,
                carbs:0,
                protein:0,
                fibre:0,
                fats:0,
                weight:100,
            }
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/food')
        .then((response=>response.json()))
        .then((foods)=>{
            this.setState({foods:foods.foods});
            console.log(foods)
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    searchFood(searchValue) {
        if(searchValue !== "") {
            let searchedFoods = this.state.foods.filter((food,index)=>{
                return food.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            this.setState({searchedFoods:searchedFoods});
        }
        else {
            this.setState({searchedFoods:[]});
        }
    }

    selectFood(food){
        this.setState({currentFood:food});
    }

    calculateWeightChange(weight) {
        let currfood = this.state.currentFood;
        if(weight!=="" && weight!==0) {
            currfood.calories = (currfood.calories*weight)/currfood.weight;
            currfood.protein  = (currfood.protein *weight)/currfood.weight;
            currfood.carbs    = (currfood.carbs   *weight)/currfood.weight;
            currfood.fats     = (currfood.fats    *weight)/currfood.weight;
            currfood.fibre    = (currfood.fibre   *weight)/currfood.weight;
            currfood.weight   = weight;
        }
        this.setState({currentFood:currfood});
    }

    render() {
        return (
            <div className='container'>
                <div className='form-group' style={{marginTop:"30px"}}>
                    <input className='form-control' placeholder="Search food" onChange={(event)=>{
                        this.searchFood(event.target.value)
                    }}/>
                </div>
                <ul className='search-result' style={{padding:"5px"}}>
                    {
                        this.state.searchedFoods.map((food,index)=>(
                            <li className='result' key={index} 
                                style={{cursor:"pointer", listStyleType:"none", 
                                        paddingBottom:"8px" ,borderBottom:"1px solid rgb(212, 212, 212)"}
                                } 
                                onClick={()=>{
                                    this.selectFood(food)
                                }}
                            >
                                {food.name}
                            </li>
                        ))
                    }
                </ul>
                <div className='product-display'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Calories</th>
                                <th>Carbs</th>
                                <th>Protein</th>
                                <th>Fibre</th>
                                <th>Fat</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.currentFood.name}</td>
                                <td>{this.state.currentFood.calories.toFixed(2)}</td>
                                <td>{this.state.currentFood.carbs.toFixed(2)}</td>
                                <td>{this.state.currentFood.protein.toFixed(2)}</td>
                                <td>{this.state.currentFood.fibre.toFixed(2)}</td>
                                <td>{this.state.currentFood.fats.toFixed(2)}</td>
                                <td>
                                    <input type="number" defaultValue={this.state.currentFood.weight} 
                                    onChange={(e)=>{
                                        this.calculateWeightChange(Number(e.target.value));
                                    }}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
