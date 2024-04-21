import {useState} from 'react';
import { Button, Container, Form, ListGroup, ListGroupItem, InputGroup, Stack } from 'react-bootstrap';
import { useLoaderData, useNavigation, useParams, useRevalidator } from 'react-router-dom';
import EditRecipe from '../Components/EditRecipe';

const categories = ["Dessert","Beef","Chicken"];
export const loadRecipes = async ({params}) => {
    const response = await fetch(`https://instamealbackend.onrender.com/recipes/forUser/${params.uid}`);
    const recipesData = await response.json();
    return recipesData;
}

export default function RecipeScreen() {
    const recipes = useLoaderData();
    const revalidator = useRevalidator();
    const navigation = useNavigation();
    const userId = useParams().uid;
    const [adding,setAdding] = useState(false);
    const [focusCategory,setFocusCategory] = useState("Chicken");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalRecipe, setEditModalRecipe] = useState({});
    const [isModalAdding, setIsModalAdding] = useState(false);
    const [recipeNameToAdd, setRecipeNameToAdd] = useState("");

    const addIngredient = async (name,amount,measure,category) => {
        const recipe = getRecipe(category);
        await fetch(`https://instamealbackend.onrender.com/recipes/updateIngredient/${recipe.id}`, {
            method: 'PUT',
            body: JSON.stringify({name,amount,measure}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        revalidator.revalidate();
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
        revalidator.revalidate();
    }
    const addRecipe = async (name) => {
        const newRecipe = {name,users:[userId],ingredients:{}}
        await fetch(`https://instamealbackend.onrender.com/recipes/create`, {
            method: 'POST',
            body: JSON.stringify(newRecipe),
            headers: {
                "Content-Type": "application/json"
            }
        })
        revalidator.revalidate();
        // setRecipes([...recipes,newRecipe])
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

    const addNewRecipe = (event) => {
        event.preventDefault();


    };
    return (
        <>
            <div className="bg-light w-900">
                <Container className="p-3">
                    <h1 className="display-5">Recipes</h1>
                    <p className="lead">Choose a category to view or change recipes.</p>
                    {categories.map(category => 
                        <Button variant="light" key={category} onClick={() => setFocusCategory(category)}>{category}</Button>
                    )}
                    <hr className="my-4" />
                </Container>
            </div>
            <EditRecipe 
                showModal={isEditModalOpen}
                handleCloseModal={() => setIsEditModalOpen(false)}
                recipe={editModalRecipe}
                updateIngredient={updateIngredient}
                isModalAdding={isModalAdding}
                setIsModalAdding={setIsModalAdding}
                addRecipe={addRecipe}
            />
            {
                navigation.state !== 'loading' ?
                <Container className='justify-content-start'>
                    <h1>{focusCategory}</h1>
                    <Stack direction="vertical" gap={.5} className="p-3">
                        <ListGroup className="rounded">
                            <ListGroupItem className="bg-dark p-1">
                                <Form onSubmit={addNewRecipe}>
                                    <InputGroup className="w-100">
                                        <Form.Control name="name" placeholder="Add new recipe" className="rounded-end-0" value={recipeNameToAdd} onChange={(event) => setRecipeNameToAdd(event.target.value)}></Form.Control>
                                        <Button type="submit" variant="primary">Add</Button>
                                    </InputGroup>
                                </Form>
                            </ListGroupItem>
                            {recipes.map(recipe => 
                                <ListGroupItem>
                                    {/* Todo: make a Recipe.js just like the ingredient.js for displaying the recipes in a list. Perhaps RecipeDisplay.js */}
                                    <p>{recipe.name}</p>
                                </ListGroupItem>
                            
                            )}
                            {/* { getIngredients().map((ingredient,i) =>
                            <ListGroupItem key={i} className="bg-dark p-1">
                                <Ingredient 
                                    ingredient={ingredient} 
                                    deleteIngredient={deleteIngredient} 
                                    setEditModalIngredient={setEditModalIngredient} 
                                    setIsEditModalOpen={setIsEditModalOpen} 
                                    measures={measures} 
                                    category={focusCategory}/>
                            </ListGroupItem>
                            )} */}
                        </ListGroup>
                    </Stack>
                </Container>
                :
                <Container>
                    <h3>loading..</h3>
                </Container>

            }
        </>
        // <div className='App'>
        //     <div>
        //     <h1>Recipes</h1>
        //     {recipes.length !== 0 ?
        //     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'30px 10px'}}>
        //         {recipes.map(recipe => <IngredientColumn 
        //             ingredients={recipe.ingredients} 
        //             category={recipe.name} 
        //             addIngredient={addIngredient}
        //             updateIngredient={updateIngredient}
        //             deleteIngredient={deleteIngredient} 
        //             />)}
        //             {adding ?
        //             <form onSubmit={handleSubmit} style={{margin:'auto auto'}}>
        //                 <input name="name" type="text"></input>
        //             </form> 
        //             :
        //             <div 
        //                 style={{width:'10%',margin:'auto auto',padding:'5px',border:'2px solid black',borderRadius:10,cursor:'pointer'}}
        //                 onClick={() => setAdding(true)}
        //             >+</div>
                    
        //         }
        //     </div>
        //     :
        //     <p>loading...</p>}
        //     </div>
        //     <div style={{height:'50vh'}}>

        //     </div>
        // </div>
    )
}