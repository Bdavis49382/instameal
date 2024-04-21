import {useState} from 'react';
import { useLoaderData } from 'react-router-dom';

export const loadMeals = async ({params}) => {
    const mealsResponse = await fetch(`https://instamealbackend.onrender.com/recipes/makeableForUser/${params.uid}`);
    const mealsData = await mealsResponse.json();
    return mealsData;
}

export default function MealsScreen() {
    const meals = useLoaderData();
    const [numVisible,setNumVisible] = useState(5);
    const showMore = () => {
        setNumVisible(meals.length);
    }
    const showLess = () => {
        setNumVisible(5);
    }
    return (
        <div className='App'>
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
                {numVisible === meals.length
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