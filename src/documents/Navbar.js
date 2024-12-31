import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from './CartProvider'
import axios from 'axios';

const Navbar = () => {
  const { cartItems,clearCart } = useCart();

  const [handbagBrand, sethandbagBrand] = useState([]);
  const [chudidarBrand, setchudidarBrand] = useState([]);
  const [sareeBrand, setsareeBrand] = useState([]);
  const [suitBrand, setsuitBrand] = useState([]);
  const [jeansBrand, setjeansBrand] = useState([]);
  const [shoeBrand, setshoeBrand] = useState([]);
  const [watchBrand, setwatchBrand] = useState([]);
  const [mobileBrand, setmobileBrand] = useState([]);
  const [laptopBrand, setlaptopBrand] = useState([]);
  const [tvBrand, settvBrand] = useState([]);
  const [acBrand, setacBrand] = useState([]);
  const [fridgeBrand, setfridgeBrand] = useState([]);
  const [showADDnew, setshowADDnew] = useState(false);

  
  const [isHovered, setisHovered] = useState({women : false, men : false, watch : false, mobile : false, tv : false });
  const handleMouseEnter = (categories) => setisHovered(prev => ({ ...prev, [categories] : true}));
  const handleMouseLeave = (categories) => setisHovered(prev => ({ ...prev, [categories] : false}));
  const handleClick = () => setisHovered({women : false, men : false, watch: false, mobile : false, tv : false });

// ....women
  useEffect(() => {
    axios.get('https://website-api-nu.vercel.app/product/category/66e0ac4a2e6bda2ea8fee81f')
    .then((res) => {
      sethandbagBrand([...new Set(
        res.data.product
          .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
          .filter(brandName => brandName) // Filter out any empty or undefined values
      )].sort());
    })
    .catch((err) => err)
  },[])
  useEffect(() => {
    axios.get('https://website-api-nu.vercel.app/product/category/66e0ac1e2e6bda2ea8fee81d')
    .then((res) => {
      setchudidarBrand([...new Set(
        res.data.product
          .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
          .filter(brandName => brandName) // Filter out any empty or undefined values
      )].sort());
    })
    .catch((err) => err)
  },[])
  useEffect(() => {
    axios.get('https://website-api-nu.vercel.app/product/category/66de8d5d74a2d32f040c29ba')
    .then((res) => {
      setsareeBrand([...new Set(
        res.data.product
          .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
          .filter(brandName => brandName) // Filter out any empty or undefined values
      )].sort());
    })
    .catch((err) => err)
  },[])
//.......men
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66e0acbc2e6bda2ea8fee823')
  .then((res) => {
    setsuitBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[])
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66e0ace82e6bda2ea8fee825')
  .then((res) => {
    setjeansBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[])
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66e0ac832e6bda2ea8fee821')
  .then((res) => {
    setshoeBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[])
// ...watch,mobile,laptop
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66e863d6e2140616a4dbd9ef')
  .then((res) => {
    setwatchBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[])
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66dde0197a66622cc0734fee')
  .then((res) => {
    setmobileBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[])
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66b7094e89c2a12074133b29')
  .then((res) => {
    setlaptopBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[]) 
// tv, ac, fridge
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66e0ab462e6bda2ea8fee817')
  .then((res) => {
    settvBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[])
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66e0ab0a2e6bda2ea8fee815')
  .then((res) => {
    setacBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[])
useEffect(() => {
  axios.get('https://website-api-nu.vercel.app/product/category/66e0abb42e6bda2ea8fee819')
  .then((res) => {
    setfridgeBrand([...new Set(
      res.data.product
        .map(product => product.brandName?.trim().toLowerCase()) // Normalize case and trim whitespace
        .filter(brandName => brandName) // Filter out any empty or undefined values
    )].sort());
  })
  .catch((err) => err)
},[]) 


const categoryHead = (catPath) => {
  navigate(catPath);
  handleClick();
} 



  const navigate = useNavigate();
  const reachToCart = () => {
    navigate('/seecart');
  }
  const reachToWishlist = () => {
    navigate('/wishlist');
  }
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username');
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


  const logoutHandler = () => {
    if(token){
    document.querySelector('.logout-container').style.display='flex';
    }
  }
  const deleteYes = () => {
    document.querySelector('.logout-container').style.display='none'    
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  }
  const deleteNo = () => {
    document.querySelector('.logout-container').style.display='none'    
  }
  const location = useLocation();
  const path = location.pathname;

  if (path === "/login" || path === "/signup") {
    return null; // Hide header on login and signup pages
  }


  return (<>
   <div className='logout-container'>
  <div className='delete-box'>
    <p id='delete-para'>Are you sure?</p>
    <div className='confirm-btns'>
    <button id='delete-yes' onClick={()=>deleteNo()}>CANCEL</button>
    <button id='delete-no' onClick={()=>deleteYes()}>LOGOUT</button>
    </div>
  </div>
  </div>

  {path === '/seecart' ?
  <header>
  <div className="nav-bar">
  <Link to='/' id='mall-logo'>Mall</Link>
    {/* <Link to='/' id='mall-logo' style={{marginLeft:'-87%'}}>
      <div className='niteshLogo'><img src={require('../assests/niteshLOGO.png')}/></div>
      </Link> */}
  </div>
</header> 
  : 
    <header>
    <div className="nav-bar">
      <Link to='/' id='mall-logo'>Mall</Link>
      {/* <Link to='/' id='mall-logo'>
      <div className='niteshLogo'><img src={require('../assests/niteshLOGO.png')}/></div>
      </Link> */}


      <div className="category">
      <div className='category-subCont'  onMouseEnter={() => handleMouseEnter('women')} onMouseLeave={() => handleMouseLeave('women')}>
          <button >women</button>
          <div className={`fullCat-container ${isHovered.women ? 'showLinks bagImage' : '' }`} style={{color:'wheat'}}>
            <div className='fullCat-box'>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/sareepage')}>Saree</p>
                <ul className='catUL'>
                {sareeBrand.map((brand,index) => {
                   return (brand &&
                    <a style={{color:'#fff'}} onClick={handleClick} href={`/sareepage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>
              <div className='fullBox-cat' >
                <p className='fullCat-head' onClick={()=>categoryHead('/handbagpage')}>bag</p>
                <ul className='catUL'>
                  {handbagBrand.map((brand,index) => {
                   return (brand && 
                   <a style={{color:'#fff'}} onClick={handleClick} href={`/handbagpage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}            
                </ul>
              </div>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/chudidarpage')}>salwar kameez</p>
                <ul className='catUL'>
                  {chudidarBrand.map((brand,index) => {
                   return (brand && 
                    <a style={{color:'#fff'}} onClick={handleClick} href={`/chudidarpage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className='category-subCont'  onMouseEnter={() => handleMouseEnter('men')} onMouseLeave={() => handleMouseLeave('men')}>
          <button >men</button>
          <div className={`fullCat-container ${isHovered.men ? 'showLinks shoeImage' : '' }`} style={{color:'wheat'}}>
            <div className='fullCat-box'>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/suitpage')}>suit</p>
                <ul className='catUL'>
                {suitBrand.map((brand,index) => {
                   return (brand &&
                    <a style={{color:'#fff'}} onClick={handleClick} href={`/suitpage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/jeanspage')}>jeans</p>
                <ul className='catUL'>
                  {jeansBrand.map((brand,index) => {
                   return (brand && 
                    <a style={{color:'#fff'}} onClick={handleClick} href={`/jeanspage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/shoepage')}>shoe</p>
                <ul className='catUL'>
                  {shoeBrand.map((brand,index) => {
                   return (brand && 
                    <a style={{color:'#fff'}} onClick={handleClick} href={`/shoepage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}            
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='category-subCont'  onMouseEnter={() => handleMouseEnter('watch')} onMouseLeave={() => handleMouseLeave('watch')}>
          <button >watch</button>
          <div className={`fullCat-container ${isHovered.watch ? 'showLinks watchimage' : '' }`}>
            <div className='fullCat-box' style={{color:'wheat'}}>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/watchpage')} >watch</p>
                <ul className='catUL' >
                {watchBrand.map((brand,index) => {
                   return (brand && 
                    <a style={{color:'white'}} onClick={handleClick} href={`/watchpage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='category-subCont'  onMouseEnter={() => handleMouseEnter('mobile')} onMouseLeave={() => handleMouseLeave('mobile')}>
          <button >mobiles & laptops</button>
          <div className={`fullCat-container ${isHovered.mobile ? 'showLinks laptopImage' : '' }`}>
            <div className='fullCat-box'style={{color:'wheat'}}>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/phonepage')}>mobile</p>
                <ul className='catUL'>
                {mobileBrand.map((brand,index) => {
                   return (brand &&
                    <a style={{color:'white'}} onClick={handleClick} href={`/phonepage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/laptoppage')}>laptop</p>
                <ul className='catUL'>
                  {laptopBrand.map((brand,index) => {
                   return (brand && 
                    <a style={{color:'white'}} onClick={handleClick} href={`/laptoppage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='category-subCont'  onMouseEnter={() => handleMouseEnter('tv')} onMouseLeave={() => handleMouseLeave('tv')}>
          <button >appliances</button>
          <div className={`fullCat-container ${isHovered.tv ? 'showLinks tvImage' : '' }`}>
            <div className='fullCat-box' style={{color:'wheat'}}>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/tvpage')} >tv</p>
                <ul className='catUL'>
                {tvBrand.map((brand,index) => {
                   return (brand && 
                    <a style={{color:'#fff'}} onClick={handleClick} href={`/tvpage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/fridgepage')}>fridge</p>
                <ul className='catUL'>
                  {fridgeBrand.map((brand,index) => {
                   return (brand && 
                    <a onClick={handleClick} href={`/fridgepage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}            
                </ul>
              </div>
              <div className='fullBox-cat'>
                <p className='fullCat-head' onClick={()=>categoryHead('/acpage')}>ac</p>
                <ul className='catUL'>
                  {acBrand.map((brand,index) => {
                   return (brand && 
                    <a style={{color:'#fff'}} onClick={handleClick} href={`/acpage?brand=${encodeURIComponent(brand)}`} key={index}>{brand}</a> )
                  })}  
                </ul>
              </div>

            </div>
          </div>
        </div>
        
      </div>



      {/* <div className="search-bar">
        <button><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></button>
        <input className="s-bar" type="text" placeholder="Search Products" />
      </div> */}
      <div className="icons">
        <div className="icon cart-svg" onClick={reachToCart}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="black"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
          <p id='bagtitle'>Cart</p>
          <div><span id='cartCount' >{cartItems.length}</span></div></div>

        <div className="icon" onClick={reachToWishlist}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="black"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
          <p id='wishlisttitle'>Wishlist</p></div>

        <div className="icon profileIcon">
          <ul className='profileDropdown'>
            <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="black"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>
              {token ? <p id='userlength'>{user}</p>: <p id='profiletitle'>Profile</p>}
              </li>
            <ul className='listDropdown'>
              {token ? <div className='addProdNav'>{ showADDnew && <li><button className='addpro'  onClick={() => navigate('/post')}>Add new Product</button></li>}
              <li><button className='loginDropdown' onClick={logoutHandler}>Log out</button></li></div>
              : <li><button className='loginDropdown' onClick={() => navigate('/login')}>Login</button></li>}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  </header>}
  </>)
}

export default Navbar