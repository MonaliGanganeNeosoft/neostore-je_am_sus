import React ,{useEffect,useState}from 'react';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";

import Loader from "../layout/Loader/Loader";


import {useSelector,useDispatch} from "react-redux";
import { clearErrors,getProductDetails } from '../../actions/productAction';
import ReactStars from "react-rating-stars-component";
import {useAlert} from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";



const ProductDetails = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1);
    const {product,loading,error}=useSelector(
        (state)=>state.productDetails
    );
    
   
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(match.params.id))
    }, [dispatch,match.params.id,error,alert]);

    const increaseQuantity = () => {
        if (product.product_stock <= quantity) return;
   
       const qty = quantity + 1;
       setQuantity(qty);
     };
   
     const decreaseQuantity = () => {
       if (1 >= quantity) return;
   
       const qty = quantity - 1;
       setQuantity(qty);
     };


     const addToCartHandler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item Added To Cart");
      };

     const options = {
      size: "large",
      value: product.product_rating,
      readOnly: true,
      precision: 0.5,
    };

    return (
        <>
        {loading?(<Loader />):
        <>
        <div className="ProductDetails">
                <Carousel>
                    {
                      product.product_image && 
                        product.product_image.map((item,i)=>(
                            <img
                            className="CarouselImage"
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}
                            />
                        ))
                    }
                </Carousel>
            <div>
                    <div className='detailsBlock-1'>
                        <h2>{product.product_name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className='detailsBlock-2'>
                        <ReactStars {...options} />
                        
                    </div>


                    <div className='detailsBlock-3'>
                        <h1>{`Rs${product.product_cost}`}</h1>
                        <div className='detailsBlock-3-1'>
                        <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                                <button onClick={addToCartHandler}   >Add to cart</button>
                        </div>
                        <p>
                      Status:
                      <b className={product.product_stock < 1 ? "redColor" : "greenColor"}>
                        {product.product_stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p>
    
                    </div>
                    <div className='detailsBlock-4'>
                        Description:<p>{product.product_desc}</p>
    
                    </div>
                    <button  className='submitReview'>Submit Review
                    </button>
            </div>

        </div>
        </>}
        
        
        </>
    )
}

export default ProductDetails
