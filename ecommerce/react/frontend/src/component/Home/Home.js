import React, { useEffect } from 'react'
import ProductCard from "./ProductCard";
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from 'react-alert';
// const product = {
//         name:"table",
//         images:[{url:"https://img.muji.net/img/item/4547315892464_02_400.jpg"}],
//         price:"Rs 2000",
//         _id:"moni"
//     }
const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,products,productsCount}=useSelector(
        (state)=>state.products
    )
    useEffect(()=>{
        if(error){
            return alert.error(error);
        }
        dispatch(getProduct());
    },[dispatch,error,alert])
    return (
       <>
       {loading ? (<Loader />):(
           <>
           <MetaData title="Home page working"/>
       <h2 className='homeHeading' style={{textAlign:"center"}}>Fetured Products</h2>
       <div className='container' id='container' style={{display:"flex",flexWrap:"wrap"}}>
       {products && products.map(product=>(
                <ProductCard key={product._id} product={product} />
            ))}
       </div>
           </>
       )}
       </>
    )
}

export default Home
