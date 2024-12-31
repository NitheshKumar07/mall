import React, { useEffect } from 'react'
import { useWishlist } from './WishlistProvider';
import {useNavigate} from 'react-router'

const Wishlist = () => {
    const { wishlistItems,clearWish,removeWish } = useWishlist();     
    const svgRupee=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='bigRupee'>
    <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>

const navigate = useNavigate();

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

// clear wish
const handleclearwish = () => {
  document.querySelector('.delete-container').style.display='flex';
}
const deleteYes = () => {
  clearWish();  
  document.querySelector('.delete-container').style.display='none'    
}
const deleteNo = () => {
  document.querySelector('.delete-container').style.display='none'    
}

// remove from wihlist
const handleRemoveWish = (id) => {
  removeWish(id);
}

  return (<>
  <div className='delete-container'>
    <div className='delete-box'>
      <p id='delete-para'>Remove all items from wishlist?</p>
      <div className='confirm-btns'>
      <button id='delete-no' onClick={()=>deleteYes()}>YES</button>
      <button id='delete-yes' onClick={()=>deleteNo()}>NO</button>
      </div>
    </div>
  </div>

  {wishlistItems.length === 0 ? (
    <div className='cartWishMainDiv'>
    <div className='wishlistEmptyDiv'> 
      <img className='wishlistImage' src={require('../assests/wishlistEmpty.jpg')}/>
      <button className='startshop' onClick={() => navigate('/category')}>START SHOPPING</button>
    </div>
    </div>)
    : (
    <> 

<div className='cart-main-container'>
      <div className='cart-sub-container'>
      <p id='cart-label'>WISHLIST</p>
      {wishlistItems.map((item,index) => (
             <div key={index} className='wish-main-container'>
             <div className='wish-main-div'>
               <button className='cart-remove-btn' onClick={() => handleRemoveWish(item._id)}><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg></button>
               <div className='cart-img'>
                 <img src={item.photo} alt={item.title} onClick={()=>navigateSoloLaptop(item._id,item.ctgry)}/>
               </div>
               <div className='wish-item-info'>
               <p id='wish-item-name'>{item.brandName}</p>
                   <p id='wish-title' onClick={()=>navigateSoloLaptop(item._id,item.ctgry)}>{item.title}</p>
                 </div>
               <div className='cart-subtotal-div' style={{flexDirection:'column',gap:'5px'}}>
                 <div className='wishsvgPara'>
                <p>{svgRupee}</p>
                 <p id='cart-item-subtotal'>{Number(item.price).toLocaleString('en-IN')}</p>
                 </div>
                 {item.discount && <div style={{display:'flex',gap:'5px',justifyContent:'center',alignItems:'center'}}>
                 <p style={{color:'green'}}>{item.discount}%</p>
                 <p style={{color:'green'}}>Off</p>
                 </div>}
                 </div>
             </div>
           </div> 
      ))}
      <div className='cart-clear-checkout-btns'>
        <button className='cart-clear-btn' onClick={handleclearwish}>Clear Wishlist</button>
      </div>
      </div>
      </div>

      {/* {wishlistItems.map((item,index) => (
      <div className='item-main-container mobileItem-container' key={index} style={{marginTop:'10px'}}>
      <div className='mobileItemImg-container' style={{height:'300px'}}>
          <div className='laptopItemImg-box'>
              <a onClick={()=>navigateSoloLaptop(item._id)}><img className='laptopItem-img' alt={item.title} 
              src={item.photo}/></a>
              </div>
      </div>
      <div className='handbagItemDetails-container' style={{padding:'7px 10px'}}>
        <p id='brandName'>{item.brandName}</p>
        <a className='chudidarItem-name' id='handbagItem-name-ID' onClick={()=>navigateSoloLaptop(item._id)}>{item.title}</a>
        <div className='sizeChart'>
        <p>Select Size:</p>
        <input type='radio' value='7' name={`ShoeSize-${item._id}`} id='size7' />
        <label htmlFor='size7'>7</label>
        <input type='radio' value='8' name={`ShoeSize-${item._id}`} id='size8' />
        <label htmlFor='size8'>8</label>
        <input type='radio' value='9' name={`ShoeSize-${item._id}`} id='size9' />
        <label htmlFor='size9'>9</label>
        <input type='radio' value='10' name={`ShoeSize-${item._id}`} id='size10'/>
        <label htmlFor='size10'>10</label>
        <input type='radio' value='11' name={`ShoeSize-${item._id}`} id='size11' />
        <label htmlFor='size11'>11</label>     
    </div>
   
        <div className='handbagItemPriceDetail'>
          <div className='handbagItem-Price'>{svgRupee}<p id='mobleItem-realprice'>{Number(item.price).toLocaleString('en-IN')}</p></div>
          {item.discount && <div className='handbagItem-cancelPrice'>{svgRupeeSmall}<p id='mobleItem-cancelprice'>{Number(item.realprice).toLocaleString('en-IN')}</p>
           <p id='handbagitem-discount'>({item.discount} % off)</p></div>}
        </div>
        <button className='items-Cart' id='items-card-ID'>Remove from cart</button>
        </div>
      </div>
            ))} */}
</>)
}
  </>)
}

export default Wishlist;