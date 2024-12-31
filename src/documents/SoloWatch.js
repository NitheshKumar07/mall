import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import '../stylesheets/soloLaptop.css'
import { useCart } from './CartProvider'
import SmallLoader from './SmallLoader'

const SoloWatch = () => {
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

    const [mobile,setMobile] = useState([]);

const svg = <svg id='carousel-content-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" /></svg>
const svg1 = <svg id='carousel-content-svg1' fill='rgb(161, 159, 159)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" /></svg>
const watsapp = <svg xmlns="http://www.w3.org/2000/svg" fill=' #25d366' viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
  

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
    const cashSvg = <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#333"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg>
    const shieldSvg = <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#333"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>

    const params = useParams();

    useEffect(()=>{
        axios.get(`https://website-api-nu.vercel.app/product/${params.id}`)
        .then((res=>{
            setSoloLaptopDetails(res.data.product);
        }))
        .catch(err => {
          // setLoading(false);
          // setErrorMessage('Failed to load products');
        });    
      },[params.id])
      
const currentURL = window.location.href;
const shareMessage = soloLaptopDetails
&& `Checkout this product:\n${soloLaptopDetails.title}\nPrice: ₹${Number(soloLaptopDetails.price).toLocaleString('en-IN')} ${soloLaptopDetails.discount ? `(${soloLaptopDetails.discount}% OFF)` : ''}\n\n${currentURL}`
const watsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;



     // load 11 products
 useEffect(() => {
  // setLoading(true);
  
  axios.get('https://website-api-nu.vercel.app/product/category/66e863d6e2140616a4dbd9ef')
    .then(res => {
      if (!soloLaptopDetails || !soloLaptopDetails.brandName) {
        return;
      }
        // setLoading(false);
        const sameBrandItems = res.data.product.filter(item => item.brandName && item.brandName === soloLaptopDetails.brandName  && item._id !== soloLaptopDetails._id).slice(0,3);

        const remainingCount = 8-sameBrandItems.length;
           const otherBrands = res.data.product.filter(item => item.brandName && item.brandName !== soloLaptopDetails.brandName && item._id !== soloLaptopDetails._id).slice(0,remainingCount);

          //  combine both arrays
        const totalItems = [...sameBrandItems, ...otherBrands];

        setMobile(totalItems);

    })
    .catch(err => {
      // setLoading(false);
      // setErrorMessage('Failed to load products');
    });
}, [soloLaptopDetails]);

// new shoe slide
const shoeMoveContainer = document.querySelector('.homeShoe-subcontainer');
if (shoeMoveContainer) {
        document.querySelector('.homeShoeleftmove').addEventListener('click', () => {
          const clientWidth = shoeMoveContainer.clientWidth;
          shoeMoveContainer.scrollLeft -= (clientWidth - 200);
        })
}
if (shoeMoveContainer) {
        document.querySelector('.homeShoerightmove').addEventListener('click', () => {
          const clientWidth = shoeMoveContainer.clientWidth;
          shoeMoveContainer.scrollLeft += (clientWidth - 200);
        })
}

    const toggleShowMore = () => {
      setShowMore(!ShowMore);
    }
    const navigate = useNavigate();
    // buy
    const buyNow = () => {
      const token = localStorage.getItem('token');
      if(!token){
        navigate('/login');
        return;
      }else {
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
  const navigateSoloShoe = (id) => {
    window.open('/solowatch/'+id,'_blank');
  }

  const handleShare = (url) => {
    // securely open in new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  
  return (<>
  {cartMessage && <div className={`cart-msg ${messageVisible ? 'cart-msg-move' : ''}`}>{cartMessage}</div>}

  {soloLaptopDetails ? <>
  <div className='soloLaptop-Container allmargin'>
    
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
      <div className='shareLogo' onClick={() => handleShare(watsappURL)}>{watsapp}</div>
    </div>
  </div>

  <div className='two-btns'>
  <button id='soloItem-cart-btn' onClick={handleAddtoCart}> {statuscartlabel ? (<SmallLoader/>):(<>{CART} {cartlabel}</>)}</button>
  <button id='soloItem-buy-btn' onClick={buyNow}>{ statusbuylabel ? <SmallLoader/> : 'BUY NOW'}</button>
  </div>

  <div className='svgsContainer'>
    <div className='Solosvg1'>
      <div>{shieldSvg}</div>
      <p>12 - 24 Months Warranty</p>
    </div>
    <div className='Solosvg1'>
    <div className='solotruckdiv'><img src={require('../assests/icons8-return-24.png')}/></div>
    <p>7 Days Return</p>
    </div>
    <div className='Solosvg1'>
      <div className='solotruckdiv'><img src={require('../assests/icons8-truck-48.png')}/></div>
      <p>Free Shipping Across India</p>
    </div>
    <div className='Solosvg1'>
      <div>{cashSvg}</div>
      <p>Pay on Delivery Available</p>
    </div>
  </div>
    
  {/* <img src={require('../assests/paymentBanner.webp')} style={{maxWidth:'30PC'}}/> */}


  <div className='soloItemDescription-BOX' id='soloItemDescription-BOX-ID'>
  <h4 className='soloItemDescriptionHEADING'>PRODUCT DETAILS</h4>
  {soloLaptopDetails.brandName && <p>Brand:<span id='soloItemDescription-brandName'>{soloLaptopDetails.brandName}</span></p>}
  {soloLaptopDetails.colour && <p>Dial Colour:<span id='soloItemDescription-colour'>{soloLaptopDetails.colour}</span></p>}
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
<div className='homeShoemoveContainer'>
        <p id='simProd'>Similar Products</p>
        <div className='homeShoetmove'>
        <button className='homeShoeleftmove' >&#10094;</button>
        <button className='homeShoerightmove' >&#10095;</button>
        </div>
        
        <div className='homeShoe-subcontainer'>
            {mobile.map((eachmobile) => {
              return(
                <div className='singleShoemovebox' key={eachmobile._id} onClick={()=>navigateSoloShoe(eachmobile._id)}>
                <div className='shoemoveImgMain-container'>
                <img src={eachmobile.photo} alt={eachmobile.title} img/>
                </div>
              <div className='shoemoveTitleMain-container'>
                <p className='moveShoeTitle'>{eachmobile.title}</p>
                <div className='shoemovepriceMain-contaner'>
                  <div className='shoeMovePrice'><div>{svg}</div><p>{Number(eachmobile.price).toLocaleString('en-IN')}</p></div>
                  <div className='shoeMovePrice shewMoveCancel'><p>{eachmobile.discount && <div>{svg1}{Number(eachmobile.realprice).toLocaleString('en-IN')}</div>}</p></div>
                </div>
              </div>
            </div>
              )
            })}
          </div>  
</div>
</>
:
<div className='loaderNewCont'><div class="loaderNew"></div></div>}

  </>)
}

export default SoloWatch;