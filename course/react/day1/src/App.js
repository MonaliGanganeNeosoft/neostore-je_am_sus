import logo from './logo.svg';
import Expanse from './components/Expanse'
import './App.css';

function App() {
  const expance = [
    {
      id:1,
      title:'Moni',
      amount:3434,
      date:new Date(2021,8,23),
    },
    {
      id:2,
      title:'goli',
      amount:434,
      date:new Date(2021,8,3),
    }
  ]
  return (
    <div className="App">
      <Expanse title={expance[0].title} amount ={expance[0].amount} date={expance[0].date}/>
      <Expanse title={expance[1].title} amount ={expance[1].amount} date={expance[1].date}/>
      
    </div>
  );
}

export default App;
