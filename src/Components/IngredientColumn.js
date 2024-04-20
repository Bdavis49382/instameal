import Ingredient from './Ingredient';
import {useState} from 'react';
const measures = ['gallon','l','lb','quart','pint','cup','oz','tsp','tbsp','ml']
export default function IngredientColumn({ingredients,category,updateIngredient,addIngredient,deleteIngredient}) {
    const [adding,setAdding] = useState(false);
    const handleSubmit = (event,category) => {
        event.preventDefault();
        const elements = event.target.elements;
        addIngredient(elements.name.value,elements.amount.value,elements.measure.value,category)
        event.target.reset();

    }
    const styles = {
        buttonStyle: {
            margin:'0 auto',
            width: '10%',
            border: '3px solid black',
            borderRadius: 14,
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingBottom: '8px',
            paddingTop: '5px',
            cursor:'pointer'
        }
    }
    return (
        <div>
            <h2>{category.toUpperCase()}</h2>
            <h4>👁️</h4>
            <ul style={{padding:5}}>
                {Object.keys(ingredients).sort().map(ingredient => <Ingredient
            key={ingredient} 
            deleteIngredient={deleteIngredient} 
            updateIngredient={updateIngredient}
            name={ingredient} 
            measures={measures}
            amount={ingredients[ingredient].amount} 
            category={category}
            measure={ingredients[ingredient].measure}/>)}
            </ul>     
        {
            adding ?
            <form onSubmit={(event) => {
                handleSubmit(event,category);
                setAdding(false);
                }}>

                <input name="name" type="text" placeholder="ingredient"></input>
                <input name="amount" type="text" placeholder="amount"></input>
                <input name="measure" list="measures" placeholder="cup"></input>
                <input name="submit" type="submit"></input>
                <datalist id="measures">
                    {measures.map(measure => <option value={measure}/>)}
                </datalist>
            </form>
            :
            <div style={{margin:'0 auto',width:'10%'}}>
                <span style={styles.buttonStyle} onClick={() => setAdding(true)}>+</span>
            </div>

        }
        </div>
    )
}