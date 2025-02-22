import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styled from 'styled-components'
import Nav from 'react-bootstrap/Nav';



function Detail(props) {
    let [count,setCount] = useState(0);
    let { id } = useParams();
    let [banner,setBanner] = useState(true);
    let [tab, setTab] = useState(0);

    useEffect(()=>{
        let a = setTimeout(()=>{setBanner(false)}, 2000);
        console.log(2);
        return () => {
            clearTimeout(a);
            console.log(1);
        }
    })


    const s_data = props.shoes.find((x) => x.id === parseInt(id, 10));


    return (
        <>
        <div className="container">

        {
            banner ? <div className="alert alert-warning">2초이내 구매시 할인</div> : null
        }


            <div className="row">
                <div className="col-md-6">
                    <img className="w-max-5" src={`https://codingapple1.github.io/shop/shoes${s_data.id + 1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{s_data.title}</h4>
                    <p>{s_data.content}</p>
                    <p>{s_data.price} 원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>

        <Nav className="mx-10" variant="tabs" defaultActiveKey="Link0">
        <Nav.Item>
            <Nav.Link onClick={()=>setTab(0)} eventKey="Link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link onClick={()=>setTab(1)} eventKey="Link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link onClick={()=>setTab(2)} eventKey="Link2">버튼2</Nav.Link>
        </Nav.Item>
        </Nav>

        <TabContent tab={tab}/>
        </>
    );
}

const TabContent = ({tab}) => {

    return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]
}


const EventBanner = () => {
    let [banner,setBanner] = useState(true);
    
    
    useEffect(()=>{
        setTimeout(()=>{setBanner(false)}, 2000);
    })


    return(
        banner ? <div className="alert alert-warning" onClick={()=>{setTimeout(()=>{alert('시간이 지났습니다.')},1500); setBanner(false);}
    }>2초이내 구매시 할인</div> : null
    )
}



export default Detail;
