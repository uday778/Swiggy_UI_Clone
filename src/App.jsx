import { Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import RestaurantMenu from "./components/RestaurantMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Head />}>
        <Route path="/" element={<Body />}/>
        <Route path="/restaurantmenu/:id" element={<RestaurantMenu />}/>
      </Route>
    </Routes>
  );
}

export default App;
