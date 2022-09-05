import { createContext, useContext, useState } from "react";
import image1 from "./components/Images/camera.jpg";
import image2 from "./components/Images/drone.jpg";
import image3 from "./components/Images/television.jpg";

const Cart = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState([]);

  const productsArray = [{
    id: "sudjkgbfsudfbcn87",
    name: "CAMERA",
    price: "25000.00",
    image: image1,
  },
  {
    id: "sd9fuujsdf98dvdvi",
    name: "DRONE",
    price: "150000.00",
    image: image2,
  },
  {
    id: "sifsd9cvd98f9vd7hvd3",
    name: "TELEVISION",
    price: "15000.00",
    image: image3,
  }];

  const [products] = useState(productsArray);

  return (
    <Cart.Provider value={{ cart, setCart, products }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
