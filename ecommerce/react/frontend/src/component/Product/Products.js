import React,{useEffect, useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors,getProduct } from '../../actions/productAction';
import Loader from "../layout/Loader/Loader";
import ProductCard from '../Home/ProductCard';
import MetaData from '../layout/MetaData';
import "./Products.css";
import  Pagination  from 'react-js-pagination';


const Products = () => {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage]=useState(1);
    const {products,loading,error,productsCount,resultPerPage}=useSelector(
        (state)=>state.products
    )
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    useEffect(()=>{
        dispatch(getProduct(currentPage));

    },[,currentPage]);
    return (
        <>
        {loading?(
            <Loader/>
        ):(
            <>
            <MetaData title="Products --amzing"/>
           <h2 className="productsHeading" style={{textAlign:"center"}}>Products</h2>
           <div className="products">
               {products && 
               products.map((product)=>(
                   <ProductCard key={product._id} product={product}/>
               ))}

           </div>

           {
               resultPerPage < productsCount && (
                <div className="paginationBox" style={{display:"flex",justifyContent:"center",margin:"6vmax"}}>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
               )
           }
            </>
        )}
        </>
    )
}

export default Products
