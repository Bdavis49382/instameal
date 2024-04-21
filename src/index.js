import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './Testing/reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Pages/HomeScreen';
import InventoryScreen from './Pages/InventoryScreen';
import RecipeScreen, { loadRecipes } from './Pages/RecipeScreen';
import { loadUser } from './Pages/InventoryScreen';
import MealsScreen, { loadMeals } from './Pages/MealsScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "instameal",
        element: <HomeScreen/>
      },
      {
        path: "inventory/:uid",
        element: <InventoryScreen/>,
        loader: loadUser
      },
      {
        path: "recipes/:uid",
        element: <RecipeScreen/>,
        loader: loadRecipes
      },
      {
        path: "meals/:uid",
        element: <MealsScreen/>,
        loader: loadMeals
      }
    ]
  }
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
