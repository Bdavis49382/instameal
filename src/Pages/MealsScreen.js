import {useState, useEffect} from 'react';
import Sidebar from '../Components/Sidebar';
export default function MealsScreen({userId,setScreen}) {
    const [meals,setMeals] = useState([]);
    const [numVisible,setNumVisible] = useState(5);
    const loadMeals = async () => {
        const mealsResponse = await fetch(`https://instamealbackend.onrender.com/recipes/makeableForUser/${userId}`);
        const mealsData = await mealsResponse.json();
        setMeals(mealsData)
    }
    const showMore = () => {
        setNumVisible(meals.length);
    }
    const showLess = () => {
        setNumVisible(5);
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
                    {meals.filter(meal => !meal.makeable)
                    .sort((meal1,meal2) => meal1.missingIngredients.length - meal2.missingIngredients.length)
                    .map((meal,index) => index < numVisible ?<li key={meal.id}>{meal.name} -missing: {meal.missingIngredients.join(',')}</li>:'')}
                </ul>
                {numVisible == meals.length
                ?
                <button onClick={showLess}>See Less</button>
                :
                <button onClick={showMore}>See More</button>
            }

            </div>
             :
             <p>...loading</p>
            }
            </div>
        </div>
    )
}