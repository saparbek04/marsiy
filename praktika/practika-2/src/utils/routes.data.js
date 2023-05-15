import Cart from "../screens/Cart/Cart";
import filterArea from "../screens/FilterArea/filterArea";
import Home from "../screens/Home/Home";
import Meals from "../screens/Meals/Meals";
import MealsYoutube from "../screens/MealsYoutube/MealsYoutube";
import Notfound from "../screens/Notfound/Notfound";

export const RoutesData = [
    {path: '/', element: Home},
    {path: "/category/:categoryName", element: Meals},
    {path: "/meal/:idMeal", element: MealsYoutube},
    {path: "/filterArea/:area", element: filterArea},
    {path: "/cart", element: Cart},
    {path: "*", element: Notfound}
]