import {useEffect,useState} from 'react';
import IngredientColumn from './IngredientColumn';
import Sidebar from './Sidebar';
export default function RecipeScreen({userId,setScreen}) {
    const [recipes,setRecipes] = useState([]);
    const [adding,setAdding] = useState(false);
    const loadRecipes = async () => {
        const response = await fetch(`https://instamealbackend.onrender.com/recipes/forUser/${userId}`);
        const recipesData = await response.json();
        setRecipes(recipesData);
    }
    const addIngredient = async (name,amount,measure,category) => {
        const recipe = getRecipe(category);
        await fetch(`https://instamealbackend.onrender.com/recipes/updateIngredient/${recipe.id}`, {
            method: 'PUT',
            body: JSON.stringify({name,amount,measure}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        loadRecipes(); 
    }
    const getRecipe = (name) => {
        const recipe =  recipes.find(recipe => recipe.name === name)
        if (recipe === undefined) {
            console.log('error adding ingredient. Recipe not found.')
        }
        return recipe;
    }
    const updateIngredient = async (name,newAmount,measure,category) => {
        addIngredient(name,newAmount,measure,category);    
    }
    const deleteIngredient = async (name,category) => {
        const recipe = getRecipe(category);
        await fetch(`https://instamealbackend.onrender.com/recipes/deleteIngredient/${recipe.id}`, {
            method: 'DELETE',
            body: JSON.stringify({name}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        loadRecipes(); 
    }
    const addRecipe = async (name) => {
        await fetch(`https://instamealbackend.onrender.com/recipes/create`, {
            method: 'POST',
            body: JSON.stringify({name,users:[userId],ingredients:{}}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        loadRecipes(); 
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const elements = event.target.elements;
        if (elements.name.value.length > 0) {
            addRecipe(elements.name.value);
            setAdding(false);
        }
        else {
            alert('Enter a name for your new recipe')
        }
    }
    useEffect(() => {
       loadRecipes(); 
    },[])
    return (
        <div className='App'>
            <Sidebar setScreen={setScreen}/>
            <div>
            <h1>Recipes</h1>
            {recipes.length !== 0 ?
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'30px 10px'}}>
                {recipes.map(recipe => <IngredientColumn 
                    ingredients={recipe.ingredients} 
                    category={recipe.name} 
                    addIngredient={addIngredient}
                    updateIngredient={updateIngredient}
                    deleteIngredient={deleteIngredient} 
                    />)}
                    {adding ?
                    <form onSubmit={handleSubmit} style={{margin:'auto auto'}}>
                        <input name="name" type="text"></input>
                    </form> 
                    :
                    <div 
                        style={{width:'10%',margin:'auto auto',padding:'5px',border:'2px solid black',borderRadius:10,cursor:'pointer'}}
                        onClick={() => setAdding(true)}
                    >+</div>
                    
                }
            </div>
            :
            <p>loading...</p>}
            </div>
        </div>
    )
}