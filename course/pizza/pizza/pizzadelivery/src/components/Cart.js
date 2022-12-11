import { connect } from "react-redux";
import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const Cart = (props) => {
  const cart = useSelector((state) => state.cartItems);
  console.log(cart);
  // const dispatch = useDispatch();
  const newState = JSON.stringify(cart);
  console.log(newState)
  localStorage.setItem("LState", newState);
   const LState = localStorage.getItem("LState");
  console.log(newState);
  const [card, setCard] = useState('')
  
  const handler=(e)=>{
    e.preventDefault();
    console.log(e.target.value)
    setCard(e.target.value)

  }
  const addorder=(e)=>{
      e.preventDefault();
      console.log("http://localhost:8000/api/addorder");
    axios.post("http://localhost:8000/api/addorder",{
        // name:name.toString(),
        // mobile:mobile.toString(),
        // id:Math.floor(Math.random()*100)
        cart:cart,
        card:card,
        user:localStorage.getItem("userdetails")
        // alert("Order placed Successfully")
    })
    .then(res=>{
        console.log(cart)
    })
  }

  console.log(cart[0])
  return (
    <div className="container">
      <h2>Cart</h2>
      
    
      <form method="post" >
      <div className="container-fluid row">
                {cart==""?<h4>No items in the cart</h4>:cart.map((val,index)=>
                <div className="col-md-4">
                <div className="card" style={{width: "18rem"}}>
      <img src={val.image} className="card-img-top" alt="..." height="170px"/>
      <div className="card-body">
        <h5 className="card-title" name="name">{val.name}</h5>
        <p className="card-text" name="price">{val.price}</p>
        <a href="#" className="btn btn-primary" 
                onClick={() => props.remove()}>Remove</a>
      </div>
    </div>
                    </div>)}
                    <hr/>
                
                    <input className="form-control" type="text" placeholder="Enter Credit card details" onChange={handler} aria-label="default input example"style={{width:"300px"}}/>
                    <button type="submit" class="btn btn-primary" style={{width:"90px"}} onClick={addorder} href="/Dash">Checkout</button>
                    </div>
                    </form>
           
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};
const mapDispatchTopProps = (dispatch) => {
  return {
    remove: function () {
      dispatch({
        type: "REMOVE",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchTopProps)(Cart);
