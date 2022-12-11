import Card from './Card';
import './expance.css';
import ExpanseDate from './ExpanseDate';
function Expanse(props){
    // const expanceDate = new Date(2021,2,28);
    // const expensTitle = 'car insurance';
    // const ExpanceAmount = 4900.9;

       return(
        <Card className='expanse-item'>
           <ExpanseDate date={props.date}/>
           <div className='expance-item_desc'>
               <h2 >{props.title}</h2>
               <div className='expance-item-price'>${props.amount}</div>
           </div>
        </Card>
    )
}
export default Expanse;