import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react'
import '../stylesheets/watchPage.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { useCart } from './CartProvider'
import SmallLoader from './SmallLoader'
import { useWishlist } from './WishlistProvider'


const WatchPage = () => {
  const{ addToCart} = useCart();
  
  const [showADDnew, setshowADDnew] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const initialBrand = queryParams.get('brand')?.toLowerCase() || '';
  

  const { wishlistItems,addToWishlist } = useWishlist();
const [isInWishlist, setisInWishlist] = useState(false);
const [moveHeart, setmoveHeart] = useState({});

  const [mobile,setMobile] = useState([]); 
  const [dublicateBrand,setdublicateBrand] = useState([]); 
  const [dublicateColour,setdublicateColour] = useState([]);
  const [priceRange,setpriceRange] = useState([]); //filter price
  const [showFilterBrand , setshowFilterBrand] = useState(true); // show/hide filter toggles
  const [showFilterColor,setshowFilterColor] = useState(true);// show/hide filter toggles
  const [showFilterPrice,setshowFilterPrice] = useState(true); // show/hide filter toggles
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [showFilterContainer, setshowFilterContainer] = useState(false);

  // filter functionality
  const [filteredProducts,setfilteredProducts] = useState([]);
  const [selectedBrand,setSelectedBrand] = useState( initialBrand ? [initialBrand] : []);
  const [selectedColour,setSelectedColour] = useState([]);
  const [selectedPrice,setSelectedPrice] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [FiltererrorMessage, setFiltererrorMessage] = useState(false);
  const [loading,setLoading] = useState(false);

  const [statuscartlabel, setstatuscartlabel] = useState(false);
const [cartlabel,setcartlabel] = useState('ADD TO CART');
const [cartMessage, setcartMessage] = useState('') //cart added message
const [messageVisible, setmessageVisible] = useState(false);
const [cartLoading, setcartLoading] = useState({});


  const svgRupee=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='bigRupee'>
    <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
  const svgRupeeSmall=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='smallRupee'>
    <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
  const svgHeart=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>  
const getData = () => {
  setLoading(true);
  axios.get('https://website-api-nu.vercel.app/product/category/66e863d6e2140616a4dbd9ef')
  .then(res=>{
    setLoading(false);
    setMobile(res.data.product);
    const products = res.data.product;
    setfilteredProducts(products); //initially filtered as all products
    setdublicateColour([...new Set(res.data.product.map(product => product.colour.toLowerCase()))]); //colour filter
    setdublicateBrand([...new Set(res.data.product.map(product => product.brandName.toLowerCase()).sort())]); //brand filter
    const priceRangeLabel = [
      {label:`lowest - highest`, value: `low-high`},
      {label:`highest - lowest`, value: `high-low`},
      // {label:`< 5,000`,value:`0-5000`},
      // {label:`5,000-20,000`,value:`5000-20000`},
      // {label:`20,000-50,000`,value:`20000-50000`},
      // {label:`50,000-75,000`,value:`50000-75000`},
      // {label:`75,000-1,00,000`,value:`75000-100000`}
    ];
    setpriceRange(priceRangeLabel);
})
  .catch(err =>{
    setLoading(false);
    setErrorMessage('failed to load products')
  })
}
useEffect(() => {
  getData();
},[])


const toggleDiscountFilter = () => {
  setShowDiscountOnly((prev) => !prev); // Toggle the discount filter state
}

const showFilterToggle = () => {
  setshowFilterContainer(prev =>{
    const isShownfilter = !prev;
    const content = document.querySelector('.super-box');
    if(content){
      content.style.filter = isShownfilter ? 'blur(5px)' : 'none';
      content.style.pointerEvents = isShownfilter ? 'none' : 'all';
    }
    return isShownfilter;
  });
}
// filter handlers
const filterBrandHandler = (brand) => {
  const updatedBrand = selectedBrand.includes(brand) ? 
  selectedBrand.filter(b => b !== brand) : [...selectedBrand,brand];
  setSelectedBrand(updatedBrand);
}
const filterColourHandler = (colour) => {
  const updatedColour = selectedColour.includes(colour) ? 
  selectedColour.filter(c => c !== colour) : [...selectedColour,colour];
  setSelectedColour(updatedColour);
}
const filterPriceHandler = (priceValue) => {
    // setSelectedPrice(priceValue);
    setSelectedPrice(priceValue === selectedPrice ? '' : priceValue); // Toggle functionality
}

useEffect(() => {
  let filtered = mobile; //start with all products

  if(selectedBrand.length > 0 /*&& selectedBrand*/){
    filtered = filtered.filter(product => product.brandName && selectedBrand.includes(product.brandName.toLowerCase()));
  }
  if(selectedColour.length > 0 ){
    filtered = filtered.filter(product => selectedColour.includes(product.colour.toLowerCase()));
  }
  if(selectedPrice.length > 0 && selectedPrice !== 'low-high' && selectedPrice !== 'high-low'){
    const [min,max] = selectedPrice.split('-').map(Number);
    filtered = filtered.filter(product => product.price >= min &&  product.price <= max);
  }
   if (selectedPrice === 'low-high'){
    filtered = [...filtered].sort((a,b)=>a.price - b.price); //sort in ascending price
  }
  if (selectedPrice === 'high-low'){
    filtered = [...filtered].sort((a,b)=>b.price - a.price); //sort in descending price
  }
 // Apply Discount Filter
 if (showDiscountOnly) {
  filtered = filtered.filter(item => item.realprice > item.price);
}


if(filtered.length === 0){
  setFiltererrorMessage(true);
}
else{
  setFiltererrorMessage(false);
}

 setfilteredProducts(filtered); //set filtered products  
},[selectedBrand,selectedColour,showDiscountOnly,selectedPrice,mobile]);


// show hide filters
const showFilterHandlerBrand = () => {
  setshowFilterBrand(!showFilterBrand);
}
const showFilterHandlerColor = () => {
  setshowFilterColor(!showFilterColor);
}
const showFilterHandlerPrice = () => {
  setshowFilterPrice(!showFilterPrice);
}

// reach solo item
const navigateSoloLaptop = (id) =>{
  window.open('/solowatch/'+id,'_blank');
}

const navigate = useNavigate();
// update
const updateProduct = (id) => {
  navigate('/updateProduct/'+id,'_blank');
}
// delete
const deleteProduct = (id) => {
  document.querySelector('.delete-container').style.display='flex';
  document.querySelector('.delete-box').setAttribute('dataId',id);
}
const deleteYes = () => {
  const dataID = document.querySelector('.delete-box').getAttribute('dataId');
  axios.delete(`https://website-api-nu.vercel.app/product/${dataID}`)
  .then(res => {
  document.querySelector('.delete-container').style.display='none'    
  getData();
  })
.catch(err=> {
  document.querySelector('.delete-container').style.display='none'    
  getData();
})
}
const deleteNo = () => {
  document.querySelector('.delete-container').style.display='none'    
}
// cart
const handleAddtoCart = (productDetails,index) => {
  const product = {
    brandName: productDetails.brandName,
    _id: productDetails._id,
    title: productDetails.title,
    price: productDetails.price,
    realprice: productDetails.realprice,
    discount: productDetails.discount,
    size: productDetails.size,
    photo: productDetails.photo,
    colour: productDetails.colour,
    ctgry: productDetails.ctgry
  };
  addToCart(product);

  setcartMessage('Successfully added to cart!');
  setstatuscartlabel(true);
  setcartLoading(prev => ({...prev, [index] : true}));
  const buttons = document.querySelectorAll('.items-Cart');
  buttons.forEach(button => {
    button.style.pointerEvents = ' none';
  });

  setTimeout(() => {
  setmessageVisible(true);
  setstatuscartlabel(false);
  }, 300);
  
  setTimeout(() => {
    setmessageVisible(false);
    setcartLoading(prev => ({...prev, [index] : false}));
  }, 1500);
  
  setTimeout(() => {
    setcartMessage('');
    buttons.forEach(button => {
      button.style.pointerEvents = 'all';
    });
  }, 1800);
}
useEffect(() => {
  const wishlistStatus = {};
  wishlistItems.forEach(item => {
    wishlistStatus [item._id] = true;
  });
  setisInWishlist(wishlistStatus);
},[wishlistItems]);

const wishlistHandler = (productDetails,index) => {
  const product = {
    brandName: productDetails.brandName,
    _id: productDetails._id,
    title: productDetails.title,
    price: productDetails.price,
    realprice: productDetails.realprice,
    discount: productDetails.discount,
    size: productDetails.size,
    photo: productDetails.photo,
    ctgry: productDetails.ctgry
  };
  addToWishlist(product);
  setisInWishlist(prev => ({ ...prev, [product._id] : true}));
  setmoveHeart(prev => ({ ...prev, [product._id] : true }));
  setTimeout(() => {
  setmoveHeart(prev => ({ ...prev, [product._id] : false }));
  }, 2000);
}

const token = localStorage.getItem('token');
const user = localStorage.getItem('username')

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT
  
      // Perform validation only if `decoded` has the expected structure
      if (decoded?.email === 'iamniteshadmin@gmail.com' && user === 'aryan') {
        setshowADDnew(true);
      } else {
        setshowADDnew(false);
      }
    }
  }, [user]);

  return (<>
  {cartMessage && <div className={`cart-msg ${messageVisible ? 'cart-msg-move' : ''}`}>{cartMessage}</div>}

  <div className='delete-container'>
    <div className='delete-box'>
      <p id='delete-para'>Are you sure want to remove?</p>
      <div className='confirm-btns'>
      <button id='delete-yes' onClick={()=>deleteNo()}>NO</button>
      <button id='delete-no' onClick={()=>deleteYes()}>DELETE</button>
      </div>
    </div>
  </div>
  {loading ? (<div className='loaderNewCont'><div class="loaderNew"></div></div>) :
errorMessage ? (<p id='noMatch errMsg'>{errorMessage}</p>) :  //error message
(<>
  <div className='svgfilterDiv'>
<svg xmlns="http://www.w3.org/2000/svg" onClick={showFilterToggle} className='filterSvg' height="26px" width="26px" viewBox="0 -960 960 960"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>
</div>

<div className='category-container'>
<div className='filter-container filter-container1'>
<div className='total-items'>
<h4>WATCH</h4>
<span>({filteredProducts.length} Items)</span>
</div>

<p id='filter'>FILTERS</p>
<div className='filters-details-box'>
  <div className='filter-brandBtn-arrow-container' onClick={showFilterHandlerBrand}>
    <button>BRAND {`(${dublicateBrand.length})`}<p>&#10094;</p></button>
  </div>
  {showFilterBrand && 
  <div className='filter-checkbox'>
  {dublicateBrand.map((brand,index) => {
  return (brand && (
    <div className='filter-checkboxes' key={index} >
  <input type='checkbox' value={brand} id={brand} onChange={()=>filterBrandHandler(brand)} 
  checked={selectedBrand.includes(brand)}/>
  <label htmlFor={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</label></div>
  ))
  })}
</div>}
</div>

<div className='filters-details-box'>
  <div className='filter-brandBtn-arrow-container'  onClick={showFilterHandlerColor}>
    <button>COLORS</button> <p>&#10094;</p>
  </div>
  {showFilterColor &&
   <div className='filter-checkbox'>
   {dublicateColour.map((colour,index) => {
     return (colour && (
       <div className='filter-checkboxes' key={index}>
      <input type='checkbox' value={colour} id={colour} onChange={() => filterColourHandler(colour)} 
      checked={selectedColour.includes(colour)}/><label htmlFor={colour}>{colour}
        <div className='filter-color' style={{backgroundColor:colour}}/></label>
       </div>
     ))
   })}
 </div>
  }
</div> 

<div className='filters-details-box'>
  <div className='filter-brandBtn-arrow-container' onClick={showFilterHandlerPrice}>
    <button>SORT</button> <p>&#10094;</p>
  </div>
  {showFilterPrice &&
  <div className='filter-checkbox' >
    <div className='filter-checkboxes'>
    <input type="checkbox" id="discountOnly"  onChange={() => toggleDiscountFilter()} checked={showDiscountOnly}/>
    <label htmlFor="discountOnly">Discount</label>
    </div>
  {priceRange.map((prices,index) => {
    return (
    <div className='filter-checkboxes' key={index} >
    <input type='checkbox' name='price' id={prices.value} value={prices.value} onChange={() => filterPriceHandler(prices.value)}
     checked={selectedPrice === prices.value}/>
    <label htmlFor={prices.value}>{prices.label}</label>
    </div>
    )
  })}
  </div>
  }
</div>
</div>

{showFilterContainer &&
<div className='filter-container filter-container2'>
<div className='total-items'>
<h4>WATCH</h4>
<span>({filteredProducts.length} Items)</span>
</div>

<p id='filter'>FILTERS</p>
<div className='filters-details-box'>
  <div className='filter-brandBtn-arrow-container' onClick={showFilterHandlerBrand}>
    <button>BRAND {`(${dublicateBrand.length})`}<p>&#10094;</p></button>
  </div>
  {showFilterBrand && 
  <div className='filter-checkbox'>
  {dublicateBrand.map((brand,index) => {
  return (brand && (
    <div className='filter-checkboxes' key={index} >
  <input type='checkbox' value={brand} id={brand} onChange={()=>filterBrandHandler(brand)} 
  checked={selectedBrand.includes(brand)}/>
  <label htmlFor={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</label></div>
  ))
  })}
</div>}
</div>

<div className='filters-details-box'>
  <div className='filter-brandBtn-arrow-container'  onClick={showFilterHandlerColor}>
    <button>COLORS</button> <p>&#10094;</p>
  </div>
  {showFilterColor &&
   <div className='filter-checkbox'>
   {dublicateColour.map((colour,index) => {
     return (colour && (
       <div className='filter-checkboxes' key={index}>
      <input type='checkbox' value={colour} id={colour} onChange={() => filterColourHandler(colour)} 
      checked={selectedColour.includes(colour)}/><label htmlFor={colour}>{colour}
        <div className='filter-color' style={{backgroundColor:colour}}/></label>
       </div>
     ))
   })}
 </div>
  }
</div> 

<div className='filters-details-box'>
  <div className='filter-brandBtn-arrow-container' onClick={showFilterHandlerPrice}>
    <button>SORT</button> <p>&#10094;</p>
  </div>
  {showFilterPrice &&
  <div className='filter-checkbox' >
    
    <div className='filter-checkboxes'>
    <input type="checkbox" id="discountOnly"  onChange={() => toggleDiscountFilter()} checked={showDiscountOnly}/>
    <label htmlFor="discountOnly">Discount</label>
    </div>

  {priceRange.map((prices,index) => {
    return (
    <div className='filter-checkboxes' key={index} >
    <input type='checkbox' name='price' id={prices.value} value={prices.value} onChange={() => filterPriceHandler(prices.value)}
     checked={selectedPrice === prices.value}/>
    <label htmlFor={prices.value}>{prices.label}</label>
    </div>
    )
  })}
  </div>
  }
</div>
</div>
}
{FiltererrorMessage ? (<p id='noMatch'>{'No product matches the filter.'}</p>) :
<div className='super-box'>
  <img id='watchBanner' src={require("../assests/watchBanner2.webp")} style={{marginBottom:'1pc'}}/>
{ (filteredProducts.length > 0 ? filteredProducts : mobile).map((eachMobile,index)  => {
  return (
    <div className='chudidar-main-container' key={eachMobile._id}>
    <div className='watchItemImg-container'>
        <div className='suitItemImg-box' onClick={()=>navigateSoloLaptop(eachMobile._id)}>
            <a onClick={()=>navigateSoloLaptop(eachMobile._id)}><img className='suitItem-img' alt={eachMobile.title} 
            src={eachMobile.photo}/></a>
            </div>
            <div className={`heart ${moveHeart[eachMobile._id] ? 'heartmove' : ''}`}onClick={()=>wishlistHandler(eachMobile,index)} style={{fill: isInWishlist[eachMobile._id] ? 'red' : 'gray'}}>{svgHeart}</div>
            </div>
    <div className='handbagItemDetails-container'>
      <p id='brandName' style={{textTransform:'uppercase'}}>{eachMobile.brandName}</p>
      <a className='chudidarItem-name' id='handbagItem-name-ID' onClick={()=>navigateSoloLaptop(eachMobile._id)}>{eachMobile.title}</a>
      <div className='handbagItemPriceDetail'>
        <div className='handbagItem-Price'>{svgRupee}<p id='mobleItem-realprice'>{Number(eachMobile.price).toLocaleString('en-IN')}</p></div>
        {eachMobile.discount && <div className='handbagItem-cancelPrice'>{svgRupeeSmall}<p id='mobleItem-cancelprice'>{Number(eachMobile.realprice).toLocaleString('en-IN')}</p>
         <p id='handbagitem-discount'>{eachMobile.discount} % off</p></div>}
      </div>
      <button className='items-Cart' id='items-card-ID' onClick={()=>handleAddtoCart(eachMobile,index)}>{statuscartlabel & cartLoading[index] ? (<SmallLoader/>):(<> {cartlabel}</>)}</button>
      { showADDnew && <div className='upd-del'>
          <button id='updateItem' onClick={() => updateProduct(eachMobile._id)}>Update</button>
          <button id='deleteItem' onClick={() => deleteProduct(eachMobile._id)}>Delete</button>
        </div>}
    </div>
    </div> 

  )
})
}
</div>
}

</div> 
</>)}
  </>)
}

export default WatchPage;