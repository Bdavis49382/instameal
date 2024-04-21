import { Button, ButtonGroup, Form, Modal} from "react-bootstrap";
import Ing from "../Models/Ingredient";

export default function EditIngredient({showModal,handleCloseModal,ingredient, measures, updateIngredient, isModalAdding, setIsModalAdding, addIngredient}){

    const handleSubmit = (event) => {
        event.preventDefault();
        const elements = event.target.elements;
        const newIng = new Ing(ingredient.name, elements.amount.value, elements.measure.value)
        if (isModalAdding) {
            console.log(newIng)
            addIngredient(newIng)
        }
        else {
            updateIngredient(newIng);
        }

        setIsModalAdding(false);
        handleCloseModal();
    }
    const handleCancel = () => {
        handleCloseModal();
    }
    return (
        <>
        <Modal centered show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{ingredient.name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formBasicAmount" className="mb-2">
                        <Form.Label>Set Amount</Form.Label>
                        <ButtonGroup className="w-100">
                            <Form.Control name="amount" placeholder="Enter amount..." className="rounded-0 rounded-start-1" defaultValue={ingredient.amount} />
                            <Form.Control name="measure" as="select" className="rounded-0 rounded-end-1 w-auto" defaultValue={ingredient.measure}>
                                {measures.map((measure,i) => 
                                    <option key={i} >{measure}</option>
                                )}
                            </Form.Control>
                        </ButtonGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}