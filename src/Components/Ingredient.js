import { useState} from 'react';
export default function Ingredient({name,amount,measure,deleteIngredient,updateIngredient,measures,category}) {
    const [editing,setEditing] = useState(false)
    const overallStyle = {
        'margin':'10px auto',
        'width':'90%',
        'maxWidth':'500px',
        'border': '2px solid black',
        'borderRadius':'15px',
        'padding':'5%'
    }
    const styles= {buttonStyle: {
        'border': '.25px solid black',
        'cursor': 'pointer',
        'borderRadius': 2,
        'float': 'right',
        'marginRight':10
    }}
    const handleSubmit = (event) => {
        event.preventDefault();
        const elements = event.target.elements;
        updateIngredient(elements.name.value,elements.amount.value,elements.measure.value,category);
        setEditing(false);

    }
    return (
        <div style={overallStyle}>
            {
                editing ?
                
                <form onSubmit={handleSubmit}>
                    <input name="name" type="text" placeholder="ingredient" disabled={true} defaultValue={name}></input>
                    <input name="amount" type="text" placeholder="amount" defaultValue={amount}></input>
                    <input name="measure" list="measures" placeholder="cup" defaultValue={measure}></input>
                    <input name="submit" type="submit"></input>
                    <datalist id="measures">
                        {measures.map(measure => <option value={measure}/>)}
                    </datalist>
                </form>
                :
                <div>{name}: {amount} {measure === '' ? '' : amount < 2 ? measure: `${measure}s`} 
                <span style={styles.buttonStyle} onClick={() => setEditing(true)}>✏️</span>️ 
                <span onClick={() => deleteIngredient(name,category)}style={styles.buttonStyle}>🗑️</span></div>
            }
        </div>
    )
}