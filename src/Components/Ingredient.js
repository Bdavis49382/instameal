import { useState} from 'react';
import { Button, ButtonGroup, Stack } from 'react-bootstrap';
import { Trash3Fill } from 'react-bootstrap-icons';
import Ing from '../Models/Ingredient';
export default function Ingredient({ingredient,deleteIngredient,setIsEditModalOpen, setEditModalIngredient,category}) {
    const [editing,setEditing] = useState(false)

    const {name,measure,amount} = ingredient;

    const handleSubmit = (event) => {
        event.preventDefault();
        const elements = event.target.elements;
        // updateIngredient(elements.name.value,elements.amount.value,elements.measure.value,category);
        setEditing(false);

    }

    const handleEdit = () => {
        setEditModalIngredient(ingredient);
        setIsEditModalOpen(true);
    };

    return (
        <>
            <div className="text-bg-dark">
                <Stack direction="horizontal" gap={2} className="justify-content-between pe-4">
                    <div>
                        <p className="mb-0 fs-4">{name}</p>
                        <p className="mt-0 fw-light fs-6 ps-2 opacity-75">{amount} {measure}</p>
                    </div>
                    <ButtonGroup className="align-content-center" >
                        <Button onClick={handleEdit}>Edit</Button>
                        <Button variant="danger" onClick={() => deleteIngredient(ingredient.name)}><Trash3Fill></Trash3Fill></Button>
                    </ButtonGroup>
                </Stack>
            </div>
        </>
    )
}