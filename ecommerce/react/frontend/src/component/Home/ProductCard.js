import React from "react";
  import { Link } from "react-router-dom";
  import { Card, Button } from "react-bootstrap";
  import ReactStars from "react-rating-stars-component";
  
  const ProductCard = ({ product }) => {
    const options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "tomato",
      size: window.innerWidth < 600 ? 20 : 25,
      value:product.product_rating,
      isHalf: true,
    };
    return (
      <>
        <Link className="productCard" to={`/product/${product._id}`}>
          <Card style={{ width: "18rem",marginLeft:"10px",marginBottom:"10px" }}>
            <Card.Img
              variant="top"
              src={product.product_image[0].url}
              alt={product.product_name}
              style={{height:"150px"}}
            />
            <Card.Body>
              <Card.Title>{product.product_name}</Card.Title>
              <Card.Text>
                <ReactStars {...options} />
              </Card.Text>
              <span>{`Rs${product.product_cost}`}</span>
            </Card.Body>
          </Card>

          {/* <img src={product.images[0].url} /> */}
        </Link>
      </>
    );
  };
  
  export default ProductCard;
  