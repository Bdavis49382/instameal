import './App.css';
import MealsScreen from './Pages/MealsScreen';
import RecipeScreen from './Pages/RecipeScreen';
import InventoryScreen from './Pages/InventoryScreen';
import {useState} from 'react';


function App() {
  const [screen,setScreen] = useState('inventory');
  switch (screen) {
    case 'meals':
      return <MealsScreen userId="YwuLfa7WCCQcg9Wk7xrl" setScreen={setScreen}></MealsScreen>
    case 'recipes':
      return <RecipeScreen userId="YwuLfa7WCCQcg9Wk7xrl" setScreen={setScreen}></RecipeScreen>
    case 'inventory':
      return <InventoryScreen userId="YwuLfa7WCCQcg9Wk7xrl" setScreen={setScreen}></InventoryScreen>
    default:
      return <p>Error...</p>
  }
  // return (
  //   <div className="App">
     
  //   </div>
  // );
}

export default App;
