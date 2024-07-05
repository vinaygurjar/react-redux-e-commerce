import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { DLT } from '../redux/actions/Action';



const Header = () => {

  const [price, setPrice] = useState(0);
  //console.log(price);

  const getdata = useSelector((state)=>state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

     const [anchorE1, setAnchorE1 ] = useState(null);
     const open = Boolean(anchorE1);
     const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
     };
     const handleClose = () => {
        setAnchorE1(null);
     };

     const dlt = (id) => {
      dispatch(DLT(id));
     }

     const total = () => {
      let price = 0;
      getdata.map((ele,k)=>{
        price = ele.price + price
      });
      setPrice(price);
     }

     useEffect(()=>{
      total();
     },[total])

  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark" style={{height:"60px"}}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
          </Nav>
          <Badge badgeContent={getdata.length} color="primary"
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
          >
          <i class="fa-solid fa-cart-shopping text-light" style={{fontSize:25, cursor:"pointer"}}></i>
          </Badge>
        </Container>
        <Menu
           id='basic-menu'
           anchorEl={anchorE1}
           open={open}
           onClose={handleClose}
           MenuListProps={{'aria-labelledby': 'basic-button',
        }}
        >

          {
            getdata.length ? 
            <div className='card_details' style={{width:"24rem", padding:10}}>
              <table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getdata.map((e)=>{
                      return(
                        <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            <img src={e.imgdata} style={{width:"5rem", height:"5rem"}} alt='' />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price: ₹{e.price}</p>
                            <p>Quantity: {e.qnty}</p>
                            <p style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                              <i className='fas fa-trash smalltrash'></i>
                            </p>
                          </td>
                          <td className='mt-5' style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                          <i className='fas fa-trash largetrash'></i>
                          </td>
                        </tr>
                        </>
                      )
                    })
                  }
                  <p className='text-center'>Total : ₹{price}</p>
                </tbody>
              </table>
            </div> :
            <div className='card_details d-flex justify-content-center align-items-center' style={{width:"24rem", padding:10, position:"relative"}}>
            <i className='fas fa-close smallclose' onClick={handleClose} style={{position:"absolute", top:2, right:20, fontSize:23, cursor:"pointer"}}></i> 
            <p style={{fontSize:22}}>Your Cart Is Empty</p> 
            <img src='./cart.gif' alt='' className='emptycart_img' style={{width:"5rem", padding:10}}/> 
            </div>
          }
        </Menu>
      </Navbar>
    </div>
  )
}

export default Header