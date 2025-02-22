import { useState } from 'react'
import './App.css'
import data from './assets/data.js'
import Detail from './components/Detail.jsx'
// import Product from './components/Product.jsx'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [clicks,setClicks] = useState(0);
  let [loading, setLoading] = useState(false);

  return (
    <>

      <header className='flex bg-gray-100 py-3 px-10 items-center'>
        <div className='text-2xl'>
          ShoeShop
        </div>
        <nav className='flex items-center'>
          <ul className='flex items-center space-x-5 my-auto'>
            <li>
              <Link 
                to={"/"} 
                className="text-black !no-underline hover:underline-offset-4"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to={"/detail"} 
                className="text-black !no-underline hover:underline-offset-4"
              >
                Detail
              </Link>
            </li>
            <li className="hover:underline-offset-4 hover:cursor-pointer" onClick={()=>{navigate('./event')}}>Event</li>        
          </ul>
        </nav>
      </header>

      
      <Routes>
        <Route path="/" element={
          <>
            <div className="h-[300px] bg-[url(./assets/img/bg.png)] bg-cover bg-center"></div>
          
            <div className="grid grid-cols-3 gap-4 p-4">
              {/* <Product shoes={shoes[0]} i={1} />
              <Product shoes={shoes[1]} i={2} />
              <Product shoes={shoes[2]} i={3} /> */}

            {
              shoes.map((a,i) => {
                return(
                  <Product shoes={shoes[i]} i={i} key={i}/>
                )
              })
            }

            </div>

            {loading && <p className='text-center text-gray-500'>로딩중입니다...</p>}

            {clicks<2 && (
              <button className="border px-4 py-2 rounded" onClick={()=>{
                setLoading(true);
                setClicks((prev)=>prev+1);

                (clicks === 0) ?
                axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
                  let copy = [...shoes];
                  console.log(result.data);
                  copy.push(...result.data);
                  setShoes(copy);
                  setLoading(false);
                })
                :
                axios.get('https://codingapple1.github.io/shop/data3.json').then((result)=>{
                  let copy = [...shoes];
                  console.log(result.data);
                  copy.push(...result.data);
                  setShoes(copy);
                  setLoading(false);

                })
                .catch(()=>{
                  console.log('실패함');
                })

              }}>더보기</button>)
            }
          </>

        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>}></Route>
        </Route>
        <Route path='/about' element={<About />} >
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<div>위치정보임</div>} />
        </Route>

        <Route path='*' element={<div>404 없는 페이지</div>} />
      </Routes>

    </>
  )
}

function Event(){
  return(
    <div className='text-center'>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </div>
  )
}


function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>

  )
}




function Product (props){

  const navigate = useNavigate();

  return(
      <div className='justify-items-center hover:cursor-pointer'>
          <img className='w-4/5' src={"https://codingapple1.github.io/shop/shoes" + (props.i+1) + ".jpg"} 
          onClick={()=>{navigate('/detail/' + props.i);}}
          />
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}원</p>
      </div>

  )

}


export default App
