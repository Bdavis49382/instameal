import {useState, useEffect} from 'react';
import IngredientColumn from './IngredientColumn';
import Sidebar from './Sidebar';
export default function InventoryScreen({userId,setScreen}) {
    const [inventory,setInventory] = useState([]);
    const loadUser = async () => {
        const response = await fetch(`https://instamealbackend.onrender.com/users/${userId}`);
        const userData = await response.json();
        setInventory(userData.inventory);
    }
    const deleteIngredient = async (ingredientName) => {
        await fetch(`https://instamealbackend.onrender.com/users/${userId}/deleteIngredient`,{
            method:'DELETE',
            body:JSON.stringify({ingredient:ingredientName}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        loadUser();
    }
    const addIngredient = async (ingredientName,amount,measure,category) => {
        if (measure[measure.length - 1] === 's') {
            measure = measure.slice(0,measure.length - 1);
        }
        await fetch(`https://instamealbackend.onrender.com/users/${userId}/addIngredient`,{
            method:'POST',
            body:JSON.stringify({ingredient:ingredientName,amount,measure,category}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        loadUser();
    }
    const updateIngredient = async (ingredientName,newAmount,measure) => {
        if (measure[measure.length - 1] === 's') {
            measure = measure.slice(0,measure.length - 1);
        }
        await fetch(`https://instamealbackend.onrender.com/users/${userId}/updateIngredient`,{
            method:'PUT',
            body:JSON.stringify({ingredient:ingredientName,newAmount,measure}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        loadUser();
    }
    useEffect( () => {
        loadUser();
    },[])
    return (
        <div className='App'>
            <Sidebar setScreen={setScreen}/>
            <div>

            <h1>Inventory</h1>
            {inventory.length !== 0 ?
            <div style={{
                display:'grid',
                gridTemplateColumns:'1fr 1fr 1fr'
            }}>
                <IngredientColumn 
                    ingredients={Object.fromEntries(Object.entries(inventory).filter(([ingredientName,ingredient]) => ingredient.category === 'baking'))}
                    category='baking'
                    userId={userId}
                    updateIngredient={updateIngredient}
                    addIngredient={addIngredient} 
                    deleteIngredient={deleteIngredient}
                    />
                <IngredientColumn 
                    ingredients={Object.fromEntries(Object.entries(inventory).filter(([ingredientName,ingredient]) => ingredient.category === 'cooking'))}
                    category='cooking'
                    userId={userId}
                    updateIngredient={updateIngredient}
                    addIngredient={addIngredient} 
                    deleteIngredient={deleteIngredient}
                    />
                <IngredientColumn 
                    ingredients={Object.fromEntries(Object.entries(inventory).filter(([ingredientName,ingredient]) => ingredient.category === 'spices'))}
                    category='spices'
                    userId={userId}
                    updateIngredient={updateIngredient}
                    addIngredient={addIngredient} 
                    deleteIngredient={deleteIngredient}
                    />
            </div>
                :
                <p>loading...</p>
            }
            </div>
        </div>
    )
}