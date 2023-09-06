import {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
export default function MealsScreen({userId,setScreen}) {
    const [meals,setMeals] = useState([]);
    const loadMeals = async () => {
        const mealsResponse = await fetch(`https://instamealbackend.onrender.com/recipes/makeableForUser/${userId}`);
        const mealsData = await mealsResponse.json();

        setMeals(mealsData)
    }
    useEffect(() => {
       loadMeals(); 
    },[])
    return (
        <div className='App'>
            <Sidebar setScreen={setScreen}/>
            <div>

            <h1>Makeable meals</h1>
            {meals.length !== 0 ? 
            <div>
                <ul style={{listStyle:'none'}}>
                    {meals.filter(meal => meal.makeable).map(meal => <li key={meal.id}>{meal.name}</li>)}
                </ul>
                <h1>Other possibilities</h1>
                <ul style={{listStyle:'none'}}>
                    {meals.filter(meal => !meal.makeable).sort((meal1,meal2) => meal1.makeableScore - meal2.makeableScore).map(meal => <li key={meal.id}>{meal.name}</li>)}
                </ul>

            </div>
             :
             <p>...loading</p>
            }
            </div>
        </div>
    )
}