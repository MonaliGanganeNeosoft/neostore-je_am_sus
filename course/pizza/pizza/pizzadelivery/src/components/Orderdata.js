import React,{useEffect,useState} from 'react'
import {getOrders} from '../config/MyService'

export default function Orderdata() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getOrders()
      //   console.log(a)
        .then(res=>{
          console.log(res.data.data);
          setOrders(res.data.data);
          // if(res.data.err==0){
          //     setPostdata(res.data.a);
          // }
      })
    //   console.log(postdata)
      
      
  }, [])
  let arr=[];
  for(let i=0;i<orders.length;i++){
    // arr.push(orders[i].name)
    // arr.push(" ")
    console.log(orders[i].name)
  }
    return (
        <div>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Card details</th>
    </tr>
  </thead>
  <tbody>
   {orders.map((val,index)=>
   <tr>
       <td>{index+1}</td>
       <td>{val.name}</td>
       <td>{val.price}</td>
       <td>{val.card}</td>
   </tr>
   )}
  </tbody>
</table>
        </div>
    )
}
