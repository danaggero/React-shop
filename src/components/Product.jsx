import { useState } from "react";
import data from '../assets/data'

function Product (){
    let [shoes] = useState(data);
    return(
        <div className='justify-items-center'>
            <img className='w-4/5' src="https://codingapple1.github.io/shop/shoes1.jpg" alt="" />
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].price}원</p>
        </div>

    )

}

export default Product;