export default function Sidebar({setScreen}) {
    const optionStyle = {
        backgroundColor:'lightgray',
        listStyleType:'none',
        padding:0,
        cursor:'pointer',
        border:'.5px solid black'
    }
    return (
        <div style={{backgroundColor:'gray',height:'100vw'}}>
            <ul style={{marginTop:'20vw',padding:0}}>
                <li onClick={() => setScreen('meals')} style={optionStyle}>Meals</li>
                <li onClick={() => setScreen('recipes')}style={optionStyle}>Recipes</li>
                <li onClick={() => setScreen('inventory')}style={optionStyle}>Inventory</li>
            </ul>
        </div>
    )
}