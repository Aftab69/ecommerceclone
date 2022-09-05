import React, { useRef } from 'react';
import { useEffect } from "react";
import { CartState } from "../Context";
import SingleProduct from "./SingleProduct";
import emailjs from "@emailjs/browser";
import "./Checkout.css";

const Cart = () => {
  const { cart } = CartState();
  const { total, setTotal } = CartState();

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]); 
  
  let productnames = "";
  cart.map((each)=>(
    productnames=productnames+": "+each.name
  ))
  console.log(productnames)
  
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8pat0om', 'template_ui3wpc9', form.current, 'ZiJUUW6UQfngNLJ73')
      .then((result) => {
          console.log(result.text);
          window.alert("Message sent successfully");
      }, (error) => {
          console.log(error.text);
          window.alert("Error");
      });
      e.target.reset();
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
      <span style={{ fontSize: 30 }}>My Cart</span>
      <br />
      <span style={{ fontSize: 30 }}>Total: {total}</span>
      <div className="productContainer">
        {cart.map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
      <button>Checkout</button>
    </div>
    <div id='contact' className='contactpageContainer'>
           <div className='contactpageHeading'>
                {/* <p>-: Contact Me :-</p> */}
           </div>
           <div className='contactformContainer'>
               <form ref={form} onSubmit={sendEmail} className='formContainer'>
                  <input type="text" name="user_name" placeholder='Enter your name' required />
                  <input type="email" name="user_email" placeholder='Enter a valid email address' required />
                  <textarea type="text" name="message" placeholder='Enter your address' required />
                  <textarea type="number" name="message" placeholder='Enter your phone number' required />
                  <textarea type="text" name="message" value={`Amount to pay- Rs ${total}; Items${productnames}`} placeholder='Enter your address' required />
                  <button type="submit" value="Send">Order</button>
               </form>
           </div>
           <div className='contactpageFooterElements'>
               <div className='footerEmail'>
                    <p>Email:</p>
                    <p>aftabhssn3@gmail.com</p>
                </div>
               <div className='footerAddress'>
                    <p>Address:</p>
                    <p>Six Mile, Guwahati, Assam, India</p>
               </div>
               <div className='footerNumber'>
                    <p>Phone No:</p>
                    <p>+917576081171</p>
               </div>
           </div>
       </div>
    </>
    
  );
};

export default Cart;
