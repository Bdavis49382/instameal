import { useLoaderData, useParams, useRevalidator, useNavigation } from 'react-router-dom';
import { Button, Container, Form, InputGroup, Stack, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useState } from 'react';
import Ingredient from '../Components/Ingredient';
import Ing from '../Models/Ingredient'; 
import EditIngredient from '../Components/EditIngredient';

export const loadUser = async ({params}) => {
    const response = await fetch(`https://instamealbackend.onrender.com/users/${params.uid}`);
    const userData = await response.json();
    return userData.inventory;
}
const measures = ['','gallon','l','lb','quart','pint','cup','oz','tsp','tbsp','ml']

export default function InventoryScreen() {
    // TODO: remove this so that it actually uses the database
    const categories = ["Spices","Cooking","Baking"];

    const [focusCategory, setFocusCategory] = useState(categories[0]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalIngredient, setEditModalIngredient] = useState({});
    const [isModalAdding, setIsModalAdding] = useState(false);
    const [ingredientToAdd, setIngredientToAdd] = useState("");
    const inventory = useLoaderData();
    const revalidator = useRevalidator();
    const navigation = useNavigation();


    const userId = useParams()["uid"];


    const deleteIngredient = async (ingredientName) => {
        await fetch(`https://instamealbackend.onrender.com/users/${userId}/deleteIngredient`,{
            method:'DELETE',
            body:JSON.stringify({ingredient:ingredientName}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // calls the load data again.
        revalidator.revalidate();
    }

    const addIngredient = async (ingredient) => {
        const {name,amount,measure} = ingredient;
        await fetch(`https://instamealbackend.onrender.com/users/${userId}/addIngredient`,{
            method:'POST',
            body:JSON.stringify({ingredient:name,amount,measure,category:focusCategory.toLowerCase()}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // calls the load data again.
        revalidator.revalidate();
    }

    const updateIngredient = async (ingredient) => {
        console.log('changing to',ingredient);
        const {name, amount, measure} = ingredient;
        // if (measure[measure.length - 1] === 's') {
        //     measure = measure.slice(0,measure.length - 1);
        // }
        await fetch(`https://instamealbackend.onrender.com/users/${userId}/updateIngredient`,{
            method:'PUT',
            body:JSON.stringify({ingredient:name,newAmount:amount,measure}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // calls the load data again.
        revalidator.revalidate();
    }

    const getIngredients = () => {
        const ingredients = Object.keys(
            Object.fromEntries(
                Object.entries(inventory)
                .filter(([ingredientName,ingredient]) => ingredient.category === focusCategory.toLowerCase())))
                .sort()
                .map(ing => new Ing(ing,inventory[ing].amount,inventory[ing].measure));
        return ingredients;
    }

    const addNewIngredient = (event) => {
        event.preventDefault();
        // TODO: decide if I want this check to go to all categories or not.
        if (getIngredients().filter(ing => ing.name === ingredientToAdd)) {
            alert(`You already have ${ingredientToAdd} in your inventory`);
            return;
        }
        setEditModalIngredient(new Ing(ingredientToAdd,0,0));
        setIngredientToAdd("");
        setIsModalAdding(true);
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <div className="bg-light w-900">
                <Container className="p-3">
                    <h1 className="display-5">Inventory</h1>
                    <p className="lead">Choose a category to view or change inventory</p>
                    {categories.map(category => 
                        <Button variant="light" key={category} onClick={() => setFocusCategory(category)}>{category}</Button>
                    )}
                    <hr className="my-4" />
                </Container>
            </div>
            <EditIngredient 
            showModal={isEditModalOpen} 
            handleCloseModal={() => setIsEditModalOpen(false)} 
            ingredient={editModalIngredient} measures={measures}
            updateIngredient={updateIngredient}
            isModalAdding={isModalAdding}
            setIsModalAdding={setIsModalAdding}
            addIngredient={addIngredient}
            />
            <div>
            {navigation.state !== "loading" ?
            <Container className="justify-content-start">
                <h1>{focusCategory}</h1>
                <Stack direction="vertical" gap={.5} className="p-3">
                    <ListGroup className="rounded">
                        <ListGroupItem className="bg-dark p-1">
                            <Form onSubmit={addNewIngredient}>
                                <InputGroup className="w-100">
                                    <Form.Control name="name" placeholder="Add new ingredient" className="rounded-end-0" value={ingredientToAdd} onChange={(event) => setIngredientToAdd(event.target.value)}></Form.Control>
                                    <Button type="submit" variant="primary">Add</Button>
                                </InputGroup>
                            </Form>
                        </ListGroupItem>
                        { getIngredients().map((ingredient,i) =>
                        <ListGroupItem key={i} className="bg-dark p-1">
                            <Ingredient 
                                ingredient={ingredient} 
                                deleteIngredient={deleteIngredient} 
                                setEditModalIngredient={setEditModalIngredient} 
                                setIsEditModalOpen={setIsEditModalOpen} 
                                measures={measures} 
                                category={focusCategory}/>
                        </ListGroupItem>
                        )}
                    </ListGroup>
                </Stack>
            </Container>
            :
            <Container>
                <h3>loading...</h3>
            </Container>
            }
            </div>
        </div>
    )
}