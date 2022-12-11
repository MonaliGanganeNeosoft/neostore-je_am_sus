import React, { Fragment, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeftRight } from 'react-icons/bs'
import { MdAccountBox, MdLibraryBooks } from 'react-icons/md'



import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

import { MdModeEditOutline } from 'react-icons/md'
import { Button } from 'react-bootstrap'

const Shipping = ({history}) => {

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);


  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  
  const proceedToPayment = () => {
    // const data = {
    //   subtotal,
    //   shippingCharges,
    //   tax,
    //   totalPrice,
    // };

    // sessionStorage.setItem("orderInfo", JSON.stringify(data));

    //history.push("/order/confirm");
    history.push("/process/payment");
    
  };
  return (
    <>
    {loading ? (<Loader />):(
        <>
        <div className="outerclass" style={{border:"2px solid red",display:"flex",flexWrap:"wrap"}}>
                        <div className="p-4" style={{border:"2px solid red",width:"400px"}}>
                            <h3>My Account</h3>
                            <hr />
                            <div className="myaccountmain">
                                <div style={{ width: '200%', border:"2px solid red"}}>
                                    <div>
                                    <img src={user.avatar.url} alt={user.name} />
                                    <p className='text-center'>{user.first_name} {user.last_name}</p>

                                        {/* <Link to="/me/update">Edit Profile</Link> */}
                                    </div>
                                    <div className="myaccountsidebar">
                                        <button className='btn w-100' ><HiOutlineMenuAlt2 style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/orders">Orders</Link></button>
                                        <button className='btn w-100' ><MdAccountBox style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/account">Profile</Link></button>
                                        <button className='btn w-100' ><MdLibraryBooks style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/shipping">Address</Link></button>
                                        <button className='btn w-100' ><BsArrowLeftRight style={{ margin: '0 4 4 0', fontSize: 'larger' }} /><Link to="/password/update">Change Password</Link></button>
                                    </div>
                                </div>
                                <div style={{ width: '70%' }}>
                                
                                </div>
                            </div>
                        </div>
            <div className="p-6" style={{border:"2px solid red",width:"800px"}}>
                        <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
                            <h2>Address</h2>
                            <hr />
                            <table >
                                <tbody >
                                    <tr>
                                        {/* <td>address</td> */}
                                        <td>{address}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>pincode</td>
                                        <td>{address.pincode}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td>city</td>
                                        <td>{address.city}</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile Number</td>
                                        <td>{user.phone_no}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{user.email}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                            <hr />
                            <p><Button variant="light"><MdModeEditOutline style={{ fontSize: 'large', marginRight: '5px' }} /><Link to="/me/updateAddress">Edit Address</Link></Button></p>
                            
                        </div >
                        <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
                            <h2>Add Address</h2>
                            
                            <p><Button variant="light"><Link to="/addAddress">Add Address</Link></Button></p>
                            
                        </div >
                        <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
                            <h2>Process to Payment</h2>
                            
                            <p><Button variant="primary" onClick={proceedToPayment}>Checkout</Button></p>
                            
                        </div >
            </div>
        </div>

        </>
    )}
    </>
  )
}

export default Shipping
