import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import '../stylesheets/soloLaptop.css'
import { useCart } from './CartProvider'
import SmallLoader from './SmallLoader'

const SoloFridge = () => {
  const{ addToCart} = useCart();

    const [soloLaptopDetails,setSoloLaptopDetails] = useState(null);
    const [ShowMore,setShowMore] = useState(false);
    const [contentHeight,setContentHeight] = useState('65px');
    const [isOverflowing, setIsOverflowing] = useState(false); // To control whether "View More" is shown
    const [statuscartlabel, setstatuscartlabel] = useState(false);
    const [statusbuylabel, setstatusbuylabel] = useState(false); //for buy
    const [cartlabel,setcartlabel] = useState('ADD TO CART');
    const [cartMessage, setcartMessage] = useState('') //cart added message
    const [messageVisible, setmessageVisible] = useState(false);
    const contentRef = useRef(null);
  

    const collapsedHeight = parseInt('65px');
    useEffect(() => {
      // Dynamically calculate the full height of the content when "Show More" is clicked
      if(contentRef.current){      
        const fullHeight = contentRef.current.scrollHeight;
        setIsOverflowing(fullHeight > collapsedHeight);
        setContentHeight(ShowMore ? fullHeight+'px' : collapsedHeight);
      }
    },[ShowMore,soloLaptopDetails])

    const CART = <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.95491 6.43502C3.15547 6.2555 3.41519 6.15625 3.68435 6.15625L16.3156 6.15625C16.5847 6.15625 16.8444 6.2555 17.045 6.43502C17.2456 6.61453 17.3729 6.8617 17.4026 7.12922L18.5137 17.1292C18.5307 17.2821 18.5153 17.4368 18.4684 17.5834C18.4215 17.7299 18.3442 17.8648 18.2416 17.9794C18.1391 18.0941 18.0134 18.1858 17.873 18.2485C17.7326 18.3113 17.5805 18.3438 17.4267 18.3438H2.57324C2.41942 18.3438 2.26732 18.3113 2.12689 18.2485C1.98646 18.1858 1.86085 18.0941 1.75826 17.9794C1.65567 17.8648 1.57841 17.7299 1.53153 17.5834C1.48465 17.4368 1.46919 17.2821 1.48618 17.1292L2.59729 7.12922C2.62702 6.86169 2.75434 6.61453 2.95491 6.43502ZM3.68435 7.09375C3.6459 7.09375 3.6088 7.10793 3.58015 7.13357C3.55149 7.15922 3.53331 7.19453 3.52906 7.23274L2.41795 17.2327C2.41552 17.2546 2.41773 17.2767 2.42443 17.2976C2.43112 17.3186 2.44216 17.3378 2.45682 17.3542C2.47147 17.3706 2.48942 17.3837 2.50948 17.3926C2.52954 17.4016 2.55127 17.4062 2.57324 17.4062H17.4267C17.4486 17.4062 17.4704 17.4016 17.4904 17.3926C17.5105 17.3837 17.5284 17.3706 17.5431 17.3542C17.5577 17.3378 17.5688 17.3186 17.5755 17.2976C17.5822 17.2767 17.5844 17.2546 17.582 17.2327L16.4708 7.23274C16.4666 7.19453 16.4484 7.15922 16.4198 7.13357C16.3911 7.10793 16.354 7.09375 16.3156 7.09375L3.68435 7.09375Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10 3.1355C9.29552 3.1355 8.61989 3.41535 8.12175 3.9135C7.6236 4.41164 7.34375 5.08727 7.34375 5.79175L7.34375 8.29175C7.34375 8.55063 7.13388 8.7605 6.875 8.7605C6.61612 8.7605 6.40625 8.55063 6.40625 8.29175L6.40625 5.79175C6.40625 4.83863 6.78488 3.92454 7.45884 3.25058C8.13279 2.57662 9.04688 2.198 10 2.198C10.9531 2.198 11.8672 2.57662 12.5412 3.25058C13.2151 3.92454 13.5938 4.83863 13.5938 5.79175V8.29175C13.5938 8.55063 13.3839 8.7605 13.125 8.7605C12.8661 8.7605 12.6562 8.55063 12.6562 8.29175V5.79175C12.6562 5.08727 12.3764 4.41164 11.8783 3.9135C11.3801 3.41535 10.7045 3.1355 10 3.1355Z" fill="white"/>
    </svg>    

    const params = useParams();

    useEffect(()=>{
        axios.get(`http://www.localhost:3000/product/${params.id}`)
        .then((res=>{
            console.log(res.data.product);
            setSoloLaptopDetails(res.data.product);
        }))
        .catch(err => console.log(err))
    },[params.id])

    const toggleShowMore = () => {
      setShowMore(!ShowMore);
    }


    const navigate = useNavigate();
    // buy
    const buyNow = () => {
      const product = {
        brandName: soloLaptopDetails.brandName,
        _id: soloLaptopDetails._id,
        title: soloLaptopDetails.title,
        price: soloLaptopDetails.price,
        realprice: soloLaptopDetails.realprice,
        discount: soloLaptopDetails.discount,
        size: soloLaptopDetails.size,
        photo: soloLaptopDetails.photo,
        colour: soloLaptopDetails.colour,
        ctgry: soloLaptopDetails.ctgry
      };
      addToCart(product);
      setstatusbuylabel(true);
    
      setTimeout(() => {
        setstatusbuylabel(false);      
        navigate('/seecart')
      }, 1000);
    }

// cart
const handleAddtoCart = () => {
  const product = {
    brandName: soloLaptopDetails.brandName,
    _id: soloLaptopDetails._id,
    title: soloLaptopDetails.title,
    price: soloLaptopDetails.price,
    realprice: soloLaptopDetails.realprice,
    discount: soloLaptopDetails.discount,
    size: soloLaptopDetails.size,
    photo: soloLaptopDetails.photo,
    colour: soloLaptopDetails.colour,
    ctgry: soloLaptopDetails.ctgry
  };
  addToCart(product);

  setcartMessage('Successfully added to cart!');
  setstatuscartlabel(true);
  document.querySelector('body').style.pointerEvents = 'none';
  document.querySelector('body').style.opacity = .8;
    
  setTimeout(() => {
  setmessageVisible(true);
  setstatuscartlabel(false);
  }, 300);
  
  setTimeout(() => {
    setmessageVisible(false);
  }, 2000);
  
  setTimeout(() => {
    setcartMessage('');
    document.querySelector('body').style.pointerEvents = 'all';
    document.querySelector('body').style.opacity = 1;
      }, 2500);
  }

  return (<>
  {cartMessage && <div className={`cart-msg ${messageVisible ? 'cart-msg-move' : ''}`}>{cartMessage}</div>}

  {soloLaptopDetails ? 
  <div className='soloLaptop-Container'>
    
  <div className='soloLaptopImg-Container'>
      <div className='soloLaptopImg-box'>
          <img id='soloLaptop-img' alt={soloLaptopDetails.title} src={soloLaptopDetails.photo}/>
      </div>
  </div>
  
  <div className='soloLaptop-details-decription-container'>
  <div className='soloLaptopDetails-container'>
    {soloLaptopDetails.brandName && <p id='soloItem-brandName'>{soloLaptopDetails.brandName}</p>}
    <p id='soloItem-title'>{soloLaptopDetails.title}</p>
    <div className='soloItem-complete-price'>
     <div className='soloItem-realPrice'><p id='soloItem-realRupee'>₹ {Number(soloLaptopDetails.price).toLocaleString('en-IN')} <span id='mrpText'>MRP</span></p><p id='tax'>inclusive of all taxes</p></div>
     {soloLaptopDetails.discount && <div className='soloItem-cancelPrice'><p id='soloItem-cancelRupee'>₹ {Number(soloLaptopDetails.realprice).toLocaleString('en-IN')}</p>
      <p id='soloItem-discount'>{soloLaptopDetails.discount}% OFF</p></div>}
    </div>
  </div>

  <div className='two-btns'>
  <button id='soloItem-cart-btn' onClick={handleAddtoCart}> {statuscartlabel ? (<SmallLoader/>):(<>{CART} {cartlabel}</>)}</button>
  <button id='soloItem-buy-btn' onClick={buyNow}>{ statusbuylabel ? <SmallLoader/> : 'BUY NOW'}</button>
  </div>

  <div className='soloItemDescription-BOX' id='soloItemDescription-BOX-ID'>
  <h4 className='soloItemDescriptionHEADING'>PRODUCT DETAILS</h4>
  {soloLaptopDetails.brandName && <p>Brand:<span id='soloItemDescription-brandName'>{soloLaptopDetails.brandName}</span></p>}
  {soloLaptopDetails.colour && <p>Colour:<span id='soloItemDescription-colour'>{soloLaptopDetails.colour}</span></p>}
  {soloLaptopDetails.productCode && <p>Product code:<span id='soloItemDescription-colour'>{soloLaptopDetails.productCode}</span></p>}
  {soloLaptopDetails.description && <div><div id='soloItemDescriptionTEXT' ref={contentRef} style={{height:contentHeight}}>
    {soloLaptopDetails.description.split('\n').map((sentence,index) => {
     return (<p key={index}>{sentence}</p>);
    })}</div>
  { isOverflowing &&
    <button onClick={toggleShowMore} id='descriptionShowMoreBtn'>{ShowMore ? 'View Less' : 'View More'}</button>
  }
  </div>}
  </div>

  </div>


</div>
:
<p>loading...</p>}

  </>)
}

export default SoloFridge;