import React, { useEffect, useState } from 'react'
import { useCart } from './CartProvider'
import {useNavigate} from 'react-router'
import SmallLoader from './SmallLoader'

const SeeCart = () => {
    const { cartItems, updateCartItem, clearCart, removeItem, updateQuantity } = useCart(); 
    const [ deliveryFee, setdeliveryFee] = useState('');
    const [yoursavings, setyoursavings] = useState('');
    const [totalPayable, settotalPayable] = useState('');

  const [statuscartlabel, setstatuscartlabel] = useState(false);

    const [addresses, setaddresses] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');

    const [showForm, setshowForm] = useState(false);
    const [selectedAddress, setselectAddress] = useState(null);
    const [selectedPayment, setselectedPayment] = useState('cashondelivery');

    const [currentStage, setcurrentStage] = useState(1);

    const [addnotchecked, setaddnotchecked] = useState(false)

    const sizesMap = {
      '66e0ac832e6bda2ea8fee821' : ['7', '8', '9', '10', '11'],  //shoe sizes
      '66e0acbc2e6bda2ea8fee823' : ['34', '36', '38', '40', '42'],  //suit sizes
      '66e0ace82e6bda2ea8fee825' : ['28', '30', '32', '34', '36'],  //jeans sizes
      '66e0ac1e2e6bda2ea8fee81d' : ['M', 'L', 'XL', 'XXL'],  //chudidar sizes
    };
    // const availableSizes = sizesMap[item.ctgry];
    const shoeSizes = ['7', '8', '9', '10', '11'];
    
    const svgRupee=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='bigRupee'>
    <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>

    const svgCartRupee = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width='13px' height='13px' fill='#333'>
    <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>


    const svgInfo = <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="gray"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

    useEffect(() => {
      const  storedAddresses = JSON.parse(localStorage.getItem('addresses'));
      if(storedAddresses){
        setaddresses(storedAddresses);
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }, [addresses]);

// reach solo item
const navigateSoloLaptop = (id, ctgryId) => {
  if(ctgryId === '66b7094e89c2a12074133b29') {
    window.open('/sololaptop/'+id, '_blank');
  } else if(ctgryId === '66dde0197a66622cc0734fee') {
    window.open('/solophone/'+id, '_blank');
  } else if(ctgryId === '66e0ab462e6bda2ea8fee817') {
    window.open('/solotv/'+id, '_blank');
  } else if(ctgryId === '66e0ab0a2e6bda2ea8fee815') {
    window.open('/soloac/'+id, '_blank');
  } else if(ctgryId === '66e0abb42e6bda2ea8fee819') {
    window.open('/solofridge/'+id, '_blank');
  } else if(ctgryId === '66e0abe62e6bda2ea8fee81b') {
    window.open('/sologame/'+id, '_blank');
  } else if(ctgryId === '66e0ac1e2e6bda2ea8fee81d') {
    window.open('/solochudidar/'+id, '_blank');
  } else if(ctgryId === '66de8d5d74a2d32f040c29ba') {
    window.open('/solosaree/'+id, '_blank');
  } else if(ctgryId === '66e0ac4a2e6bda2ea8fee81f') {
    window.open('/solohandbag/'+id, '_blank');
  } else if(ctgryId === '66e0ac832e6bda2ea8fee821') {
    window.open('/soloshoe/'+id, '_blank');
  } else if(ctgryId === '66e0acbc2e6bda2ea8fee823') {
    window.open('/solosuit/'+id, '_blank');
  } else if(ctgryId === '66e0ace82e6bda2ea8fee825') {
    window.open('/solojeans/'+id, '_blank');
  } else if(ctgryId === '66e863d6e2140616a4dbd9ef') {
    window.open('/solowatch/'+id, '_blank');
  }
};

// CLEAR CART
const handleClearCart = () => {
  document.querySelector('.delete-container').style.display='flex';
}
const deleteYes = () => {
  clearCart();  
  document.querySelector('.delete-container').style.display='none'    
}
const deleteNo = () => {
  document.querySelector('.delete-container').style.display='none'    
}

// remove item
const handleRemoveItem = (id) => {
  removeItem(id);
}
const navigate = useNavigate();

const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
const totalDiscount = cartItems.reduce((acc, item) => acc + ((item.realprice - item.price) * item.quantity), 0);
const deliveyAmount = 40;
useEffect(() => {
  if(totalPrice < 500){
    setdeliveryFee(deliveyAmount);
  }else{
    setdeliveryFee(0);
  }
  if(deliveryFee !== 0){
    setyoursavings(totalDiscount);
    settotalPayable(totalPrice  + deliveryFee);
  }else{
    setyoursavings(totalDiscount + deliveyAmount);
    settotalPayable(totalPrice  - deliveyAmount);
  }
},[totalPrice, deliveryFee, totalDiscount])


const handleToggleForm  = (e) => {
  setshowForm(!showForm);
}
// .......................address
const handleSaveAddress = (e) => {
  e.preventDefault();

  const newAddress = {name, phone, area, landmark, city, state, pincode};
  setaddresses([...addresses, newAddress]);

setName('');
setPhone('');
setArea('');
setLandmark('');
setCity('');
setState('');
setPincode('');

setshowForm(false);
}

// DELETE ADDRESS
const deleteAddress = (addressINDEX) => {
  document.querySelector('.deleteADD-container').style.display='flex';
  document.querySelector('.delete-box').setAttribute('dataId',addressINDEX);
}
const deleteADDYes = () => {
  const address = parseInt(document.querySelector('.delete-box').getAttribute('dataId'), 10);
  setaddresses(addresses.filter((_,index) => index !== address));
  // if selected address deleted then rests
  if(selectedAddress === address){
  setselectAddress(null);
  }  document.querySelector('.deleteADD-container').style.display='none'    
}
const deleteADDNo = () => {
  document.querySelector('.deleteADD-container').style.display='none'    
}

const buyButton = () => {
  setstatuscartlabel(true);

setTimeout(() => {
  if(currentStage === 1){
    setcurrentStage(2); //show address
    // setaddnotchecked(false);
  }
  else if(currentStage === 2 ){
    if (selectedAddress !== null && selectedAddress !== undefined){
    setcurrentStage(3); //show payment
    setaddnotchecked(false);
  }else{
    setaddnotchecked(true)
  }
}
  else if(currentStage === 3){
    if(selectedPayment){
    setcurrentStage(4); //show sucess message
    clearCart();
    }
  }
}, 1100);

  setTimeout(() => {
    setstatuscartlabel(false);
    },1000);  

}

  return (<>

<div className='delete-container'>
    <div className='delete-box'>
      <p id='delete-para'>Remove all items from cart?</p>
      <div className='confirm-btns'>
      <button id='delete-no' onClick={()=>deleteYes()}>YES</button>
      <button id='delete-yes' onClick={()=>deleteNo()}>NO</button>
      </div>
    </div>
  </div>

  <div className='deleteADD-container'>
    <div className='delete-box'>
      <p id='delete-para'>Delete address</p>
      <div className='confirm-btns'>
      <button id='delete-no' onClick={()=>deleteADDYes()}>YES</button>
      <button id='delete-yes' onClick={()=>deleteADDNo()}>NO</button>
      </div>
    </div>
  </div>


  {cartItems.length === 0 & currentStage !== 4 ? (
    <div className='cartWishMainDiv'>
    <div className='emptyCartDiv'>
    <img src={require('../assests/empty-cart.png')}/>
    <p id='soLight'>Hey, it feels so light!</p>
    <p id='letsAdd'>There is nothing in your cart. Let's add some items.</p>
    <button id='conShop' onClick={() => navigate('/category')}>CONTINUE SHOPPING</button>
    </div>
    </div>) 
    : 
    (<> 
      <div className='cart-main-container' id='PaymentHead'>
      {currentStage === 1 &&
      <div className='cart-sub-container cart-sub-containerMAX'>
      <p id='cart-label'>SHOPPING CART</p>
      <div className='cart-heading'>
      <p>Product</p>
      <p>Quantity</p>
      <p>Subtotal</p>
      </div>
      {cartItems.map((item,index) => (
      <div key={index}>
        <div className='cart-main-div'>
          <button className='cart-remove-btn' onClick={()=>handleRemoveItem(item._id)}><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg>          </button>
          <div className='cart-img'>
            <img src={item.photo} alt={item.title} onClick={()=>navigateSoloLaptop(item._id,item.ctgry)}/>
            <div className='cart-item-info'>
              <p id='cart-title' onClick={()=>navigateSoloLaptop(item._id,item.ctgry)}>{item.title}</p>
              {item.size &&
              <div className='cart-size-dropdown'>
              <p>Selected size:</p>
              <select value={item.size} onChange={(e) => updateCartItem(item._id,{size : e.target.value})}>
              {sizesMap[item.ctgry]?.map((size) => (
                    <option key={size} value={size}>{size}</option>
            ))} 
            </select>
              </div>
              }
            </div>
          </div>
          <p id='cart-item-name'>{item.brandName}</p>
          <div className='cart-quantity-div'>
          <button onClick={() => updateQuantity(item._id, false)}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M200-440v-80h560v80H200Z"/></svg>            </button>
          <div className='quantity-cart'>{item.quantity}</div>
          <button onClick={() => updateQuantity(item._id, true)}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>          </button>
          </div>
          <div className='cart-subtotal-div'>
            <div>{svgRupee}</div>
            <p id='cart-item-su btotal'>{Number(item.price * item.quantity).toLocaleString('en-IN')}</p></div>
        </div>
        {/* ........................................................................................ */}
      </div>
            ))}
      <div className='cart-clear-checkout-btns'>
        <button className='cart-clear-btn' onClick={handleClearCart}>Clear Cart</button>
      </div>
      </div>
      }
{/* ........................................................................................... */}
{currentStage === 1 &&
      <div className='cart-sub-container cart-sub-containerMINI'>
      <p id='cart-label'>SHOPPING CART</p>
      {cartItems.map((item,index) => (
             <div key={index} className='wish-main-container'>
             <div className='wish-main-div'>
               <button className='cart-remove-btn' onClick={() => handleRemoveItem(item._id)}><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg></button>
               <div className='cart-img'>
                 <img src={item.photo} alt={item.title} onClick={()=>navigateSoloLaptop(item._id,item.ctgry)}/>
               </div>
               <div className='wish-item-info'>
               <p id='wish-item-name'>{item.brandName}</p>
               <p id='wish-title' onClick={()=>navigateSoloLaptop(item._id,item.ctgry)}>{item.title}</p>
               <div>{item.size &&
              <div className='cart-size-dropdown'>
              <p>Size:</p>
              <select value={item.size} onChange={(e) => updateCartItem(item._id,{size : e.target.value})}>
              {sizesMap[item.ctgry]?.map((size) => (
                    <option key={size} value={size}>{size}</option>))} 
            </select>
              </div>
              }</div>
               <div className='cart-quantity-div'>
          <button onClick={() => updateQuantity(item._id, false)}><svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#5f6368"><path d="M200-440v-80h560v80H200Z"/></svg>            </button>
          <div className='quantity-cart'>{item.quantity}</div>
          <button onClick={() => updateQuantity(item._id, true)}><svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>          </button>
          </div>
                 </div>
               <div className='cart-subtotal-div' style={{flexDirection:'column',gap:'5px'}}>
                 <div className='wishsvgPara'>
                <p>{svgRupee}</p>
                <p id='cart-item-su btotal'>{Number(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
                 {item.discount && <div style={{display:'flex',gap:'4px',justifyContent:'center',alignItems:'center'}}>
                 <p className='cart-item-offer' style={{color:'green'}}>{item.discount}%</p>
                 <p className='cart-item-offer' style={{color:'green'}}>Off</p>
                 </div>}
                 </div>
             </div>
           </div> 
      ))}
      <div className='cart-clear-checkout-btns'>
        <button className='cart-clear-btn' onClick={handleClearCart}>Clear Cart</button>
      </div>
      </div>
}
{/* ................................................................................................ */}
{/* adress */}
      {currentStage === 2 &&
      <div className='cart-address'> {/* style={{minWidth:'62%'}} */}
      <p className='selectAddress'>SELECT DELIVERY ADDRESS</p>

     {addresses.length === 0 ? (
      <div className='noAddress'>
     <p>NO ADDRESS FOUND</p>
     <p className='addlabel'>Please add new address to Proceed</p>
      </div>) :
      <>
      {addresses.map((address, index) => (
      <div className='savedAddress' key={index} >
      <div className='checkboxName'>
      <input type='radio' id={`address-${index}`} name='selectedAddress' checked={selectedAddress === index} onChange={()=>setselectAddress(index)}/>
      <label htmlFor={`address-${index}`}>{address.name}</label></div>
      <div className='add-phone' >
      <p>{address.area}, {address.landmark}, {address.city}, {address.state} - {address.pincode}</p>
      <p>Phone: +91 {address.phone}</p></div>
      <button className='delAddress' aria-label='Delete Address' onClick={() => deleteAddress(index)}>Delete</button>
    </div>
      ))} </>
      }

      
      <div className='addnewADDbbtnDIV'><button onClick={handleToggleForm}>ADD NEW ADDRESS</button></div>
      {showForm && (
        <form className='addNewAddress' onSubmit={handleSaveAddress}>
        <input type='text' placeholder='Full Name' required value={name} onChange={(e)=>setName(e.target.value)}></input>
        <input type='text' placeholder='Mobile N0.'required value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
        <input type='text' placeholder='Area'required value={area} onChange={(e)=>setArea(e.target.value)}></input>
        <input type='text' placeholder='Landmark'required value={landmark} onChange={(e)=>setLandmark(e.target.value)}></input>
        <div className='cityinputdiv'>
          <input type='text' placeholder='City/Town/Village'required value={city} onChange={(e)=>setCity(e.target.value)}></input>
        <input type='text' placeholder='State'required value={state} onChange={(e)=>setState(e.target.value)}></input>
        </div>
        <input type='text' placeholder='Pin Code'required value={pincode} onChange={(e)=>setPincode(e.target.value)}></input>
        <button className='saveAddress' type='submit' >Save Address</button>
        </form>)
        }
    </div>
      }

{/* payment */}
   {currentStage === 3 &&
      <div className='paymentContainer'>

      <div className='paymentSubContainer'>        
        <input id='paymentRadio' type='radio' name='paymenttype'/>
        <div className='paymentInfo'>
         <div className='paymentImagesPara'>
           <p>UPI</p>
           <div className='paymentImagesSubContainer'>
           <div className='paymentsoloImage'><img src={require('../assests/paymentImages/phonepeSmall.png')}/></div>
           <div className='paymentsoloImage'><img src={require('../assests/paymentImages/googlepaySmall.png')}/></div>
           <div className='paymentsoloImage'><img src={require('../assests/paymentImages/paytmSmall.png')}/></div>
           <div className='paymentsoloImage'><img src={require('../assests/paymentImages/amazonpaySmall.png')}/></div>
           <div className='paymentsoloImage'><img src={require('../assests/paymentImages/bhimSmall.png')}/></div>
           </div>
          </div>
          <p>Scan and pay with any UPI apps</p>
        </div>
        <p className='unsupport'>Unavailable</p>
        </div>  

      <div className='paymentSubContainer'>        
        <input id='paymentRadio' type='radio' name='paymenttype'/>
        <div className='paymentInfo'>
        <div className='paymentImagesPara'>
        <p>Credit / Debit / ATM Card</p>
        <div className='paymentImagesSubContainer'>
        <div className='paymentCARDsoloImage'><img src={require('../assests/paymentImages/rupayCARD.webp')}/></div>
          <div className='paymentCARDsoloImage'><img src={require('../assests/paymentImages/masters_card.webp')}/></div>
          <div className='paymentCARDsoloImage'><img src={require('../assests/paymentImages/visaCARD.webp')}/></div>
        </div>
        </div>
        <p>Add and Secure Cards as per RBI goidelines</p>
        </div>
        <p className='unsupport'>Unavailable</p>
        </div>  
        <div className='paymentSubContainer'>        
        <input id='paymentRadio' type='radio' />
        <div className='paymentInfo'>
        <div className='paymentImagesPara'>
        <p className='firstP'>Net Banking</p>
        <div className='paymentImagesSubContainer'>
          <div className='paymentsoloImage'><img src={require('../assests/paymentImages/boi_bank_.png')}/></div>
          <div className='paymentsoloImage'><img src={require('../assests/paymentImages/ic_bank.png')}/></div>
          <div className='paymentsoloImage'><img src={require('../assests/paymentImages/icci_bank.png')}/></div>
          <div className='paymentsoloImage'><img src={require('../assests/paymentImages/pnb_bank_.png')}/></div>
          <div className='paymentsoloImage'><img src={require('../assests/paymentImages/sbi_bank.png')}/></div>
        </div>
        </div>
        <p className='para2'>This has low success, use UPI, cards or COD for better experience</p>
        </div>
        <p className='unsupport'>Unavailable</p>
        </div>

        <div className='paymentSubContainer cashOnContainer'>        
        <input id='paymentRadio' type='radio' checked={selectedPayment === 'cashondelivery'} readOnly/>
        <div className='paymentInfo cashOn'>
        <div className='paymentImagesPara'>
        <p className='firstP'>Pay on Delivery</p>
        <div className='paymentImagesSubContainer'>
          <div className='paymentsoloImage'><img src={require('../assests/paymentImages/icons8-cash.gif')}/></div>
        </div>
        </div>
        <p style={{fontWeight:'400'}}>pay at the time of delivery through any mode</p>
        </div>
        </div>
      </div>
   }
   
{/* order sucessfully */}
{currentStage === 4 &&
    <div className='cartWishMainDiv'>
<div className='placedContainer'>
  <p id='succ'>Order successfully placed!</p>
  <div className='truckContainer'>
  <div className='truckdiv'><img src={require("../assests/paymentImages/icons8-truck.gif")}/></div>
  <p id='reachingYou'>Your order is reaching to you!</p></div>
  <button className='placedbutton' onClick={() => navigate('/category')}>shop more</button>
</div>
</div>
}

    {currentStage !== 4 &&
      <div className='orderContainer'>
      <div className= 'order-sub-container'>
        <p className='priceDetail'>PRICE DETAILS</p>

        <div className='cart-totalMRP'>
          <p>Total MRP</p>
            <p style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black',fontWeight:'550'}}>{svgCartRupee}{totalPrice.toLocaleString('en-IN')}</p>
        </div>

        <div >
        <p >Total Discount</p>
        <p style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black',fontWeight:'550'}}>-{svgCartRupee}{totalDiscount.toLocaleString('en-IN')}</p>
        </div>

        <div>
        <p >Delivery Charges</p>
        <p style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black',fontWeight:'550'}}>{deliveryFee === 0 ? 'FREE' : (<> {svgCartRupee}{deliveryFee} </>)}</p>
        </div>

        <div  className='cart-savingDiv'>
        <p>Your Total Savings</p>
        <p style={{display:'flex',justifyContent:'center',alignItems:'center'}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width='13px' height='13px' fill='rgb(226, 65, 65)'>
        <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
          {yoursavings.toLocaleString('en-IN')}</p>
        </div>

        <div className='cart-totalAmount'>
        <p id='cart-totalpayable'>Total Payable Amount</p>
        <p style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'1.26em'}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width='.9rem' height='.93rem' fill='black'>
        <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>          
          {totalPayable.toLocaleString('en-IN')}</p>
        </div>

      </div>
      {currentStage < 4 &&
      <>
      <button className='cart-placeorder-btn' onClick={buyButton}>
      {statuscartlabel ?(<SmallLoader/>) :
      <>{currentStage === 2 ? 'CONTINUE' : 'PLACE ORDER'}</>}</button>

      <div className='payDivCart'>
          <p className='payDivCartPayment'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width='.9rem' height='.93rem' fill='black'>
        <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>          
          {totalPayable.toLocaleString('en-IN')}</p>
      <a href='#PaymentHead' className='cart-placeorder-btn2' onClick={buyButton}>{currentStage === 2 ? 'CONTINUE' : 'PLACE ORDER'}</a>
        </div>
        </>
      }
      {addnotchecked && 
      <p>{currentStage === 2 && 'please choose address'}</p>}
      </div>
    }
 </div>     
      
</>)
}
  </>)
}

export default SeeCart;