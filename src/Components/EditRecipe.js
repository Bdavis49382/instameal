import { Button, ButtonGroup, Form, Modal} from "react-bootstrap";
const measures = ['gallon','l','lb','quart','pint','cup','oz','tsp','tbsp','ml']
export default function EditRecipe({showModal,handleCloseModal,recipe, updateIngredient, isModalAdding, setIsModalAdding, addRecipe}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const elements = event.target.elements;

        handleCloseModal();
    };

    const handleCancel = () => {
        handleCloseModal();
    }

    return (
        <>
        <Modal centered show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{recipe.name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {recipe.ingredients?.map(ingredient => 
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
                    
                    )}
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