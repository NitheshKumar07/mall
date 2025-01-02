// https://website-api-nu.vercel.app
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react'
import '../stylesheets/homePage.css'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartProvider';
import SmallLoader from './SmallLoader';

const AllProducts = () => {
  const{ addToCart} = useCart();
  const [soloLaptopDetails,setSoloLaptopDetails] = useState(null);
  const [ShowMore,setShowMore] = useState(false);
  const [contentHeight,setContentHeight] = useState('65px');
  const [isOverflowing, setIsOverflowing] = useState(false); // To control whether "View More" is shown
  const [statuscartlabel, setstatuscartlabel] = useState(false);
  const [cartlabel,setcartlabel] = useState('ADD TO CART');
  const [cartMessage, setcartMessage] = useState('') //cart added message
  const [messageVisible, setmessageVisible] = useState(false);
  const [cartLoading, setcartLoading] = useState({});
  const [errorMessage, setErrorMessage] = useState(''); // Error message state  
  const [loading,setLoading] = useState(false);
  const [showADDnew, setshowADDnew] = useState(false);

  
  // const [mobile,setMobile] = useState([]);
  const [handbagLoad, sethandbagLoad] = useState([]);
  const [isShowBag, setShowBag] = useState(false);

  const [nikeShoes, setnikeShoes] = useState([]);
  const [adidasShoes, setadidasShoes] = useState([]);
  const [BB, setBB] = useState([])
  const [mz, setmz] = useState([])
  const [showLaptop, setShowlaptop] = useState([])
  const [showphone, setshowphone] = useState([])
  const [showphone2, setshowphone2] = useState([])
  // .............................................

  const svg = <svg id='carousel-content-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" /></svg>
  const svg1 = <svg id='carousel-content-svg1' fill='rgb(161, 159, 159)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" /></svg>
  const arrowLinkSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zM8.711 4.3l5.7 5.766L8.7 15.711l-1.4-1.422 4.289-4.242-4.3-4.347z"/>
    </svg>
  );

  const openBenarsiSaree = (brand) => {
    navigate(`../sareepage?brand=${encodeURIComponent(brand)}`);
  }
  const openKanchipuramSaree = (brand) => {
    navigate(`../sareepage?brand=${encodeURIComponent(brand)}`);
  }
  const openSequinsSaree = (brand) => {
    navigate(`../sareepage?brand=${encodeURIComponent(brand)}`);
  }


  useEffect(() => {
    setLoading(true);   
    axios.get('https://website-api-xq9y.onrender.com/product/category/66e0ac832e6bda2ea8fee821')
      .then(res => {
        setLoading(false);
        const nikeProducts = res.data.product.filter(item => item.brandName && item.brandName.toLowerCase() === 'nike').slice(-10);
        const adidasProducts = res.data.product.filter(item => item.brandName && item.brandName.toLowerCase() === 'adidas').slice(-5);
        setnikeShoes(nikeProducts);
        setadidasShoes(adidasProducts);
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage('Failed to load products');
      });
  }, []);

  // .......load blackberrys
  useEffect(() => {
    setLoading(true);   
    axios.get('https://website-api-nu.vercel.app/product/category/66e0acbc2e6bda2ea8fee823')
      .then(res => {
        setLoading(false);
        const bbsuits = res.data.product.filter(item => item.brandName && item.brandName.toLowerCase() === 'blackberrys').slice(-11);        
        setBB(bbsuits);
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage('Failed to load products');
      });
  }, []);

    // .......load MZ WALLACE
    useEffect(() => {
      setLoading(true);   
      axios.get('https://website-api-nu.vercel.app/product/category/66e0ac4a2e6bda2ea8fee81f')
        .then(res => {
          setLoading(false);
          const bbsuits = res.data.product.filter(item => item.brandName && item.brandName.toLowerCase() === 'mz wallace').slice(-11);        
          setmz(bbsuits);
        })
        .catch(err => {
          setLoading(false);
          setErrorMessage('Failed to load products');
        });
    }, []);

    
  // .......load laptops
  useEffect(() => {
    setLoading(true);   
    axios.get('https://website-api-nu.vercel.app/product/category/66b7094e89c2a12074133b29')
      .then(res => {
        setLoading(false);
        const bbsuits = res.data.product.slice(1,12);
        setShowlaptop(bbsuits);
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage('Failed to load products');
      });
  }, []);

    // .......load 4phone
    useEffect(() => {
      setLoading(true);   
      axios.get('https://website-api-nu.vercel.app/product/category/66dde0197a66622cc0734fee')
        .then(res => {
          setLoading(false);
          const bbsuits = res.data.product.slice(0,2);
          setshowphone(bbsuits);
          const bbsuits2 = res.data.product.slice(2,4);
          setshowphone2(bbsuits2);
        })
        .catch(err => {
          setLoading(false);
          setErrorMessage('Failed to load products');
        });
    }, []);


    const closeSidebarAdd = () => {
      const sidebar = document.getElementById("sideBar");
      navigate('/post');
      if (sidebar) {
        sidebar.checked = false; // Reset sidebar checkbox
      }
      document.body.classList.remove("no-scroll"); // Remove no-scroll class
    };

  // side scroll bar for overlay {no.1}
  const closeSidebar = () => {
    const sidebar = document.getElementById("sideBar");
    if (sidebar) {
      sidebar.checked = false; // Reset sidebar checkbox
    }
    document.body.classList.remove("no-scroll"); // Remove no-scroll class
  };
  
  const toggleScroll = (checked) => {
    if (checked) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);
  

  // for image slider start........................................................................................ {no.2}
  const allImagesSlideRef = useRef(null);
  let imageIndex = 0;
  let intervalid = null;
  useEffect(() => {
    InitialSlide();
    return () => {
      clearInterval(intervalid)  // cleanup when unmounts
      // intervalid = null;
    }
  }, [])

  function InitialSlide() {

    if (!allImagesSlideRef.current) return;

    const allImagesSlide = allImagesSlideRef.current.querySelectorAll('.imageSlide-image');

    // if(allImagesSlide.length === 0) return; --------till not nexesaary for unmounting when oprn other pages

    allImagesSlide.forEach((image, index) => {
      image.style.left = `${index * 100}%`;
    })

    if (allImagesSlide.length > 0) {
      // intervalid = setInterval(nextSlide,2000);
    }
  }

  const slideImage = (index) => {
    const allImagesSlide = allImagesSlideRef.current.querySelectorAll('.imageSlide-image');

    // if(!allImagesSlide || allImagesSlide.length === 0) return; -------------------till not nexesaary for unmounting when oprn other pages

    if (index >= allImagesSlide.length) {
      imageIndex = 0;
    }
    else if (index < 0) {
      imageIndex = allImagesSlide.length - 1;
    }

    allImagesSlide.forEach((image) => {
      image.style.transform = `translateX(-${imageIndex * 100}%)`
    });
  };

  function prevSlide() {
    setTimeout(() => {
      clearInterval(intervalid);
      imageIndex--;
      slideImage(imageIndex);
      // restart time after 4sec
      setTimeout(() => {
        clearInterval(intervalid);
        InitialSlide();
      }, 4000);
    }, 10);
  }
  function nextSlide() {
    setTimeout(() => {
      clearInterval(intervalid);
      imageIndex++;
      slideImage(imageIndex);
      // restart interval after 4sec
      setTimeout(() => {
        clearInterval(intervalid); //clear existing interval
        InitialSlide(); //starts new interval
      }, 4000);
    }, 10);
  } //image slider closes......{no.2}....................................................................................................

  useEffect(() => {
    const carouselContainer = document.querySelector('.carousel-box');

    const prevCarousel = () => {
      if (carouselContainer) {
        const width = carouselContainer.clientWidth;
        carouselContainer.scrollLeft -= width;
      }
    }
    const nextCarousel = () => {
      if (carouselContainer) {
        const width = carouselContainer.clientWidth;
        carouselContainer.scrollLeft += width;
      }
    }
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');

    if (leftBtn && rightBtn) {
      leftBtn.addEventListener('click', prevCarousel);
      rightBtn.addEventListener('click', nextCarousel);
    }
    // cleanup
    return () => {
      if (leftBtn && rightBtn) {
        leftBtn.removeEventListener('click', prevCarousel);
        rightBtn.removeEventListener('click', nextCarousel);

      }
    }
  }, [])

  // BLACKBERRYS
    // new bag slide
    const BBMoveContainer = document.querySelector('.homeBB-subcontainer');
    if (BBMoveContainer) {
      document.querySelector('.homeBBleftmove').addEventListener('click', () => {
        const clientWidth = BBMoveContainer.clientWidth;
        BBMoveContainer.scrollLeft -= (clientWidth - 200);
      })
    }
    if (BBMoveContainer) {
      document.querySelector('.homeBBrightmove').addEventListener('click', () => {
        const clientWidth = BBMoveContainer.clientWidth;
        BBMoveContainer.scrollLeft += (clientWidth - 200);
      })
    }

  // new bag slide
  const bagMoveContainer = document.querySelector('.homeBag-subcontainer');
  if (bagMoveContainer) {
    document.querySelector('.homeBagleftmove').addEventListener('click', () => {
      const clientWidth = bagMoveContainer.clientWidth;
      bagMoveContainer.scrollLeft -= (clientWidth - 200);
    })
  }
  if (bagMoveContainer) {
    document.querySelector('.homeBagrightmove').addEventListener('click', () => {
      const clientWidth = bagMoveContainer.clientWidth;
      bagMoveContainer.scrollLeft += (clientWidth - 200);
    })
  }

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



const navigate = useNavigate();

// navigate to each page
const navigatePageTV = () => {
  navigate('/tvpage');
}
const navigatePageAC = () => {
  navigate('/acpage');
}
const navigatePageFridge = () => {
  navigate('/fridgepage');
}
const navigatePageGame = () => {
  navigate('/gamepage');
}
const navigatePageWatch = () => {
  navigate('/watchpage');
}
const navigatePagePhone = () => {
  navigate('/phonepage');
}
const navigatePageBag = () => {
  navigate('/handbagpage');
}
const navigatePageChudidar = () => {
  navigate('/chudidarpage');
}
const navigatePageSaree = () => {
  navigate('/sareepage');
}
const navigatePageShoe = () => {
  navigate('/shoepage');
}
const navigatePageSuit = () => {
  navigate('/suitpage');
}
const navigatePageJeans = () => {
  navigate('/jeanspage');
}
const navigateGamingPage = () => {
  navigate('/gamepage');
}
const navigateLaptopPage = () => {
  navigate('/laptoppage');
}

// reach solo item
const openSoloLaptop = (id) =>{
  window.open('/sololaptop/'+id,'_blank');
}

const navigateSoloLaptop = (id) =>{
  window.open('/solophone/'+id,'_blank');
}

const navigateSoloBag = (id) =>{
  window.open('/solohandbag/'+id,'_blank');
}
const navigateSoloShoe = (id) => {
  window.open('/soloshoe/'+id,'_blank');
}
const navigateSoloSuit = (id) => {
  window.open('/solosuit/'+id,'_blank');
}


// cart
const handleAddtoCart = (productDetails) => {
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
  addToCart(product);

  setcartMessage('Successfully added to cart!');
  setstatuscartlabel(true);
    
  setTimeout(() => {
  setmessageVisible(true);
  setstatuscartlabel(false);
  }, 300);
  
  setTimeout(() => {
    setmessageVisible(false);
  }, 2000);
  
  setTimeout(() => {
    setcartMessage('');
      }, 2500);
}

// // shoe cart
// const shoehandleAddtoCart = (productDetails,index) => {
//   const product = {
//     brandName: productDetails.brandName,
//     _id: productDetails._id,
//     title: productDetails.title,
//     price: productDetails.price,
//     realprice: productDetails.realprice,
//     discount: productDetails.discount,
//     size: productDetails.size,
//     photo: productDetails.photo,
//     ctgry: productDetails.ctgry
//   };
//   addToCart(product);

//   setcartMessage('Successfully added to cart!');
//   setstatuscartlabel(true);

//   setcartLoading(prev => ({...prev, [index] : true}));

//   setTimeout(() => {
//   setmessageVisible(true);
//   setstatuscartlabel(false);
//   }, 300);
  
//   setTimeout(() => {
//     setmessageVisible(false);
//     setcartLoading(prev => ({...prev, [index] : false}));
//   }, 1500);
  
//   setTimeout(() => {
//     setcartMessage('');
//   }, 1800);
// }

const token = localStorage.getItem('token');
const user = localStorage.getItem('username')

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT
  
      // Perform validation only if `decoded` has the expected structure
      if (decoded?.email === 'iamniteshadmin@gmail.com'  && user === 'aryan') {
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

const slideHover = (event, route) => {

  if(event.currentTarget.classList.contains('activeImg')){
    navigate(route);
  } else {
    // Remove 'activeImg' from all slides
    document.querySelectorAll('.slider-images').forEach(slide => {
      slide.classList.remove('activeImg');
    });
    // Add 'activeImg' to the clicked slide
    event.currentTarget.classList.add('activeImg');
  }
}

const navigateLaptopPageHome = () => {
  // Uncheck the sidebar
  closeSidebar();
  // Navigate to the Laptop page
  navigate("/laptoppage");
};
const navigateGamingPageHome = () => {
  closeSidebar();
  navigate("/gamepage");
};



  return (<>
    {cartMessage && <div className={`cart-msg ${messageVisible ? 'cart-msg-move' : ''}`}>{cartMessage}</div>}

    <div className='hero-container'> {/* no css */}
      <div className='sideBarBody'>
        <input type='checkbox' id='sideBar' onChange={(e) => toggleScroll(e.target.checked)} />
        <label htmlFor='sideBar' id='screenOverlay' />
        <label htmlFor='sideBar' id='bars'>
          <svg id='menuIcon' xmlns="http://www.w3.org/2000/svg" height='25px' viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
          <svg id='menuCancelIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height='22px'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        </label>

        <div className='menuBar' >
          <div className='cancel-content'>
            <div id='sidebar-profileContainer'>
              <svg xmlns="http://www.w3.org/2000/svg" width='30px' height='30px' viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" /></svg>
              <h1>hello {token &&  <span>{user}</span>}</h1></div>
            <div className='categoryLists'>
              <h2>Shop by Category</h2>
              <ul>
                <li className='sidebar-cntnt womens-fashion'><a className='a' ><div className='arrow-link'>Women Fashion<span id='arrowMark' className='arrowmark-womens' htmlFor='sideBar'>&#10095;</span></div></a>
                  <ul className='womens-Sub-a'>
                    <li><Link onClick={() => closeSidebar()} className='womans-sub-li a' to='/chudidarpage'>Salwar Kameez</Link></li>
                    <li><Link onClick={() => closeSidebar()} className='womans-sub-li a' to='/sareepage'>Saree</Link></li>
                    <li><Link onClick={() => closeSidebar()} className='womans-sub-li a' to='/handbagpage'>Bags</Link></li>
                  </ul></li>
                <li className='sidebar-cntnt womens-fashion mens-fashion'><a className='a'><div className='arrow-link'>Men Fashion<span htmlFor='sideBar' className='arrowmark-mens' id='arrowMark'>&#10095;</span></div></a>
                  <ul className='womens-Sub-a'>
                    <li><Link className='a' onClick={() => closeSidebar()} to='/shoepage' >Shoes</Link></li>
                    <li><Link className='a' onClick={() => closeSidebar()} to='/suitpage' >Suits</Link></li>
                    <li><Link className='a' onClick={() => closeSidebar()} to='/jeanspage'>Jeans</Link></li>
                  </ul></li>
                {/* <li className='sidebar-cntnt'><a onClick={(() => navigateLaptopPageHome())} className='a'><div className='arrow-link'>Laptop<span id='arrowMark' htmlFor='sideBar'>&#10095;</span></div></a></li> */}

                {/* .// */}
                <li className='sidebar-cntnt womens-fashion mens-fashion'><a className='a'><div className='arrow-link'>Mobile, Laptop<span htmlFor='sideBar' className='arrowmark-mens' id='arrowMark'>&#10095;</span></div></a>
                  <ul className='womens-Sub-a'>
                    <li><Link className='a' onClick={() => closeSidebar()} to='/phonepage' >Mobile</Link></li>
                    <li><Link className='a' onClick={() => closeSidebar()} to='/laptoppage' >Laptop</Link></li>
                  </ul></li>
                {/* .... */}


                <li className='sidebar-cntnt  womens-fashion tv-cont-class'><a className='a'><div className='arrow-link'>Appliances, Electronics<span className='arrowmark-tv' id='arrowMark' htmlFor='sideBar'>&#10095;</span></div></a>
                  <ul className='womens-Sub-a'>
                    <li ><Link className='a' onClick={() => closeSidebar()}  to='/tvpage' >TV</Link></li>
                    <li><Link className='a'  onClick={() => closeSidebar()} to='/acpage' >AC</Link></li>
                    <li><Link className='a'  onClick={() => closeSidebar()} to='/fridgepage' >Fridge</Link></li>
                  </ul></li>
                <li className='sidebar-cntnt'><a
                 onClick={(() => navigateGamingPageHome())} 
                 className='a'><div className='arrow-link'>Gaming Accessories<span htmlFor='sideBar' id='arrowMark'>&#10095;</span></div></a></li>
              </ul>
            </div>
            {showADDnew && <p className='sideAdd'onClick={() => closeSidebarAdd()}>Add new product</p>}
            { token ? <button className='menubar-signout-btn' onClick={logoutHandler}>Sign out</button> :
            <button className='menubar-signout-btn'  onClick={() => navigate('/login')}>Sign in</button>}
          </div>
        </div>
      </div>

    <div className='main-container'>
      <div className='mainBody'>
        <div className='slider'> {/*no css given*/}
          <div className='imageSlide' ref={allImagesSlideRef}>
            <img className='imageSlide-image' src={require("../assests/ACwallpaper.avif")} />
            <img className='imageSlide-image' style={{ backgroundColor: 'lightgrey' }} src={require("../assests/shopping-banner.png")} />
            <img className='imageSlide-image' src={require("../assests/FRIDGEwallpaper2.jpg")} />

            <button className='slide-btn prevSlide' onClick={prevSlide} >&#10094;</button>
            <button className='slide-btn nextSlide' onClick={nextSlide} >&#10095;</button>
          </div>
        </div>
      </div>


      {/* ............................................................................. */}
      <div className='carousel-container'>  {/* ............body-section-1 starts.................... */}
        <h2>Laptop</h2>
        <button id='left-btn' >&#10094;</button>
        <button id='right-btn'>&#10095;</button>

        <div className='carousel-box'>

        {showLaptop.map((eachmobile) => {
          return(
            <div className='carousel-card'>
            <div className='carousel-image'>
              {eachmobile.discount && <span id='per-offer'>{eachmobile.discount}% off</span>}
              <div className='all-carousel-images-cont'  onClick={()=>openSoloLaptop(eachmobile._id)}><a><img className='allcarouselImages' src={eachmobile.photo}></img></a></div>
              {/* <button id='add-cart-btn' onClick={()=>handleAddtoCart(eachmobile)}>Add to Cart</button> */}
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(eachmobile)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
            </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(eachmobile._id)}>{eachmobile.title}</p>
              <div><p>{svg}<price>{eachmobile.price && Number(eachmobile.price).toLocaleString('en-IN')} 
              {eachmobile.discount && (
                <disprice>{svg1}{Number(eachmobile.realprice).toLocaleString('en-IN')}</disprice>)}</price></p></div>
            </div>
          </div>
          )
        })}

          </div>
          </div>
       {/* caraousel .....................................body-section-1 ends */}

 {/* cards box ............................... body-section-2 starts ..............................................*/}
 {/* <img className='imgBanner' src={require("../assests/TV_BANNER.jpg")} /> */}
{/* 
      <div className='cards-box-container'>
      <div className='mobile-box-container'>
  <h3>Shop for Mobiles</h3>
  <div>
  <div style={{display:'flex'}}>
  {showphone.map((eachmobile) => (
    <div className='mob-box1' key={eachmobile._id}>
      <a onClick={() => navigateSoloLaptop(eachmobile._id)}>
        <div className='mob-img'>
          <img src={eachmobile.photo} alt={eachmobile.title}></img>
          <p>{eachmobile.title}</p>
        </div>
      </a>
    </div>
  ))}
  </div>
  <div style={{display:'flex'}}>
    {showphone2.map((eachmobile) => (
    <div className='mob-box1' key={eachmobile._id}>
      <a onClick={() => navigateSoloLaptop(eachmobile._id)}>
        <div className='mob-img'>
          <img src={eachmobile.photo} alt={eachmobile.title}></img>
          <p>{eachmobile.title}</p>
        </div>
      </a>
    </div>
  ))}
  </div>
  </div>
  <a
    onClick={() => navigatePagePhone()}
    className='item-reach-link item-reach-link1'
  >
    See more
  </a>
</div>


<div className='tv-box-container'>
          <h3>Shop smart TV's, AC's and many more </h3>
          <div className='container-sub2'>
            <div className='tv-ac-container'>
              <div className='tv-img'>
                <a onClick={()=>navigatePageTV()}><img id='tv-card-img' src={require("../assests/desktop assests/tv card.jpg")} /></a>
              </div>
              <div className='ac-img'>
                <a onClick={()=>navigatePageAC()}><img id='ac-card-img' src={require('../assests/desktop assests/ac card.jpg')} /></a>
              </div>
            </div>
            <div className='fridge-img'>
              <a onClick={()=>navigatePageFridge()}><img id='fridge-card-img' src={require("../assests/desktop assests/fridge iage card.jpg")} /></a>
            </div>
          </div>
          <a onClick={()=>navigatePageFridge()} className='item-reach-link'>See more</a>
</div>

        <div className='watch-gaming-box-container'>
          <h3>Gaming accessories</h3>
          <a onClick={()=>navigatePageGame()} className='watch-gaming-img-a'><div className='watch-gaming-img'>
            <img src={require('../assests/desktop assests/gaming accessories card.jpg')}></img>
          </div></a>
          <a onClick={()=>navigatePageGame()} className='item-reach-link item-reach-link2'>Shop now</a>
        </div>

        <div className='watch-gaming-box-container'>
          <h3>Shop for Watches</h3>
          <a onClick={()=>navigatePageWatch()}><div className='watch-gaming-img'>
            <img src={require('../assests/desktop assests/watches card.jpg')}></img>
          </div></a>
          <a  onClick={()=>navigatePageWatch()} className='item-reach-link item-reach-link2'>Shop now</a>
        </div>

      </div>  */}
      {/* ...........card box.......................section 2 ends.............................................. */}



       <div className='slider-container' style={{userSelect:'none', backgroundColor:'#edede9'}}>
        <div className='slder-subContainer'>
        <div className='slider-images'  onClick={(event)=>slideHover(event,'/phonepage')}>
            <img src={require('../assests/mobileShortBanner.jpg')} style={{objectFit:'cover', objectPosition:'right'}}/>
            <h4>mobile</h4>
          </div>
          <div className='slider-images' onClick={(event)=>slideHover(event,'/gamepage')}>
            <img src={require('../assests/gamebanner7.webp')}  style={{objectFit:'cover', objectPosition:'center'}}/>
            <h4>gaming</h4>
          </div>
          <div className='slider-images' onClick={(event)=>slideHover(event,'/watchpage')}>
            <img src={require('../assests/watchbanner1.jpg')}/>
            <h4>watch</h4>
          </div>
          <div className='slider-images activeImg' onClick={(event)=>slideHover(event,'/acpage')}>
            <img src={require('../assests/acbanner3.png')} style={{objectFit:'cover', objectPosition:'center'}}/>
            <h4 style={{marginLeft:'1pc'}}>ac</h4>
          </div>
          <div className='slider-images' onClick={(event)=>slideHover(event,'/tvpage')}>
            <img src={require('../assests/tvbanner3.jpg')} style={{objectFit:'cover', objectPosition:'right'}}/>
            <h4 style={{marginLeft:'1pc'}}>tv</h4>
          </div>
          <div className='slider-images' onClick={(event)=>slideHover(event,'/fridgepage')}>
            <img src={require('../assests/FRIDGEwallpaper.webp')} style={{objectFit:'cover', objectPosition:'right'}}/>
            <h4>fridge</h4>
          </div>
          <div className='slider-images'onClick={(event)=>slideHover(event,'/laptoppage')}>
            <img src={require('../assests/laptopShorttBanner.jpg')} style={{objectFit:'cover', objectPosition:'center'}}/>
            <h4>laptop</h4>
          </div>
        </div>
       </div>


      {/* womens and mens shopping............. section 3 starts.................................... */}
      {/* <img className='imgBanner' src={require("../assests/LADYSUITwallpaper.jpg")} /> */}

      <div className='womensfashionContainer'>
        <div className='womensfashionsubContainer'>
          <div className='womensfashionsubContainerIMG imgIcr'><img style={{transform:'scale(1.12,1.05'}} src={require('../assests/newwallpapers/newchudidar5edit.jpg')}/></div>
          <div className='womensfashionLink'>
            <div className='linktitle'>
              <h3>Timeless Weave Legacy</h3><p>explore the rich tapestry of tradition, draping suit in hierloom elegance</p>
              </div>
            <div className='btnarrow-move' onClick={()=>navigatePageChudidar()}>
            <div className='arrowLinkSVG'>{arrowLinkSVG}</div>
            <button >SHOP NOW</button>
            </div>
            </div>
        </div>

        <div className='womensfashionsubContainer'>
          <div className='womensfashionLink'>
            <div className='linktitle' style={{marginLeft:'10%'}}>
              <h3>Ignite Your Imagination</h3><p>revel in the unmatched glamour of our uniquely designed handbag collection</p>
              </div>
            <div className='btnarrow-move' style={{marginLeft:'10%'}} onClick={()=>navigatePageBag()}>
            <div className='arrowLinkSVG'>{arrowLinkSVG}</div>
            <button>SHOP NOW</button>
            </div>
            </div>
            <div className='womensfashionsubContainerIMG imgIcr'><img src={require('../assests/newwallpapers/newbag8edit.jpg')}/></div>
        </div>

        <div className='womensfashionsubContainer'>
          <div className='womensfashionsubContainerIMG sareeFlow'><img src={require('../assests/newwallpapers/newsaree3edit.jpg')}/></div>
          <div className='womensfashionLink'>
            <div className='linktitle'>
              <h3>Exquisite Sartorial Weaves</h3><p>explore deloghtfull & luxurious sarees in refreshing hues</p>
              </div>
            <div className='btnarrow-move' onClick={()=>navigatePageSaree()}>
            <div className='arrowLinkSVG'>{arrowLinkSVG}</div>
            <button >SHOP NOW</button>
            </div>
            </div>
        </div>

      </div>

      <div className='manysareeContainer'>
        <div className='image-container1' onClick={()=>openBenarsiSaree('benarasi saree')}>
       <img className='manysaree1' src={require('../assests/benarsisaree.webp')}/>
       <p>benarsi saree</p>
       </div>

      <div className='manysareeSub'>
      <div className='image-container' onClick={() => openKanchipuramSaree('embroidered')}>
      <img src={require('../assests/designersaree.webp')} />
      <p>embroidered saree</p>
    </div>
    <div className='image-container' onClick={() => openKanchipuramSaree('kanchipuram saree')}>
      <img src={require('../assests/kancipuransaree.webp')} />
      <p>kanchipuram saree</p>
    </div>
    <div className='image-container'  onClick={() => openSequinsSaree('sequins')}>
      <img src={require('../assests/sequinssaree.webp')} />
      <p>sequins saree</p>
    </div>
    <div className='image-container' onClick={() => openSequinsSaree('designer saree')}>
      <img src={require('../assests/redsaree.webp')} />
      <p>designer saree</p>
    </div>
      </div>
      </div>

      {/* ........................................... */}
      <h4 id='h4handbag'>MZ WALLACE</h4>
      <div className='handbagbannerContainer'>
      <img className='bagbanner imgforMAX' src={require('../assests/handbagbackground2.jpg') }/>
      <img className='bagbanner imgforMid' src={require('../assests/handbagbackground5.jpg') }/>
      <img className='bagbanner imgforMINI' src={require('../assests/handbagbackground6.jpg') }/>
      <div className='homeBagmoveContainer'>
        <div className='homeBagmove'>
        <button className='homeBagleftmove' >&#10094;</button>
        <button className='homeBagrightmove' >&#10095;</button>
        </div>
        
        <div className='homeBag-subcontainer'>
            {mz.map((eachmobile) => {
              return(
                <div className='homesingleBagmovebox' key={eachmobile._id} onClick={()=>navigateSoloBag(eachmobile._id)}>
                <div className='bagmoveImgMain-container'>
                <img src={eachmobile.photo} alt={eachmobile.title} img/>
                </div>
              <div className='shoemoveTitleMain-container'>
                <p className='moveShoeTitle mzWallaceColor'>{eachmobile.title}</p>
                <div className='shoemovepriceMain-contaner'>
                  <div className='shoeMovePrice mzWallaceColor'><div className='shoeMovePriceSvg'>{svg}</div><p>{Number(eachmobile.price).toLocaleString('en-IN')}</p></div>
                  <div className='shoeMovePrice shewMoveCancel'><p>{eachmobile.discount && <div>{svg1}{Number(eachmobile.realprice).toLocaleString('en-IN')}</div>}</p></div>
                </div>
              </div>
            </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* ............................................. */}

      <img className='imgBanner' src={require("../assests/SUITwallpaper.webp")} />

      <div className='womensfashionContainer'>
   <div className='womensfashionsubContainer'>
          <div className='womensfashionsubContainerIMG imgIcrShoe'><img style={{transform:'scale(.7, .8'}} src={require('../assests/newwallpapers/newshoeedit.jpg')}/></div>
          <div className='womensfashionLink LEFTmARGIN'>
            <div className='linktitle'>
              <h3>Ignite Your Elegance</h3><p>Elegance is good taste, plus a dash of daring.</p>
              </div>
            <div className='btnarrow-move' onClick={()=>navigatePageShoe()}>
            <div className='arrowLinkSVG'>{arrowLinkSVG}</div>
            <button >SHOP NOW</button>
            </div>
            </div>
        </div>

        <div className='womensfashionsubContainer' style={{marginBottom:'5pc', marginTop:'-2pc'}}>
          <div className='womensfashionLink'>
            <div className='linktitle' style={{marginLeft:'10%'}}>
              <h3>Exquisite Treasures</h3><p>a curated collection of jeans blending timeless beauty with modern sophistication</p>
              </div>
            <div className='btnarrow-move' style={{marginLeft:'10%'}} onClick={()=>navigatePageJeans()}>
            <div className='arrowLinkSVG'>{arrowLinkSVG}</div>
            <button >SHOP NOW</button>
            </div>
            </div>
            <div className='womensfashionsubContainerIMG moveIMG'></div>
        </div>

        <div className='womensfashionsubContainer'>
          <div className='womensfashionsubContainerIMG imgIcr'><img src={require('../assests/newwallpapers/newsuit3edit.jpg')} style={{transform:'scaleX(-1)'}}/></div>
          <div className='womensfashionLink'>
            <div className='linktitle'>
              <h3>Elegant Noir</h3><p>timeless elegance awaits in occssional suit collection. discover your perfect fit today</p>
              </div>
            <div className='btnarrow-move' onClick={()=>navigatePageSuit()}>
            <div className='arrowLinkSVG'>{arrowLinkSVG}</div>
            <button >SHOP NOW</button>
            </div>
            </div>
        </div>
      </div>
{/* ..................................................................... */}
     <h4 id='h4suit'>BLACKBERRYS</h4>
      <div className='BBbannerContainer'>
      <img className='BBbanner' src={require('../assests/suitBanner.jpg') }/>
      <div className='homeBagmoveContainer'>
        <div className='homeBagmove'>
        <button className='homeBBleftmove' >&#10094;</button>
        <button className='homeBBrightmove' >&#10095;</button>
        </div>
        
        <div className='homeBB-subcontainer'>
            {BB.map((eachmobile) => {
              return(
                <div className='homesingleBagmovebox' key={eachmobile._id} onClick={()=>navigateSoloSuit(eachmobile._id)}>
                <div className='bagmoveImgMain-container'>
                <img src={eachmobile.photo} alt={eachmobile.title} img/>
                </div>
              <div className='shoemoveTitleMain-container'>
                <p className='moveShoeTitle' style={{color:'white'}}>{eachmobile.title}</p>
                <div className='shoemovepriceMain-contaner'>
                  <div className='shoeMovePrice' style={{color:'white',fill:'white'}}><div>{svg}</div><p>{Number(eachmobile.price).toLocaleString('en-IN')}</p></div>
                  <div className='shoeMovePrice shewMoveCancel' style={{color:'white',fill:'white'}}><p>{eachmobile.discount && <div>{svg1}{Number(eachmobile.realprice).toLocaleString('en-IN')}</div>}</p></div>
                </div>
              </div>
            </div>
              )
            })}
          </div>  
        </div>
      </div>

      <div className='homeShoemoveContainer'>
        <p id='nikeColl'>The Nike Collection</p>
        <div className='homeShoetmove'>
        <button className='homeShoeleftmove' >&#10094;</button>
        <button className='homeShoerightmove' >&#10095;</button>
        </div>
        
        <div className='homeShoe-subcontainer'>
            {nikeShoes.map((eachmobile) => {
              return(
                <div className='homesingleShoemovebox' key={eachmobile._id} onClick={()=>navigateSoloShoe(eachmobile._id)}>
                <div className='shoemoveImgMain-container'>
                <img src={eachmobile.photo} alt={eachmobile.title} img/>
                </div>
              <div className='shoemoveTitleMain-container'>
                <p className='moveShoeTitle' style={{color:'black'}} >{eachmobile.title}</p>
                <div className='shoemovepriceMain-contaner'>
                  <div className='shoeMovePrice'><div style={{fill:'#333'}} >{svg}</div><p style={{color:'black'}} >{Number(eachmobile.price).toLocaleString('en-IN')}</p></div>
                  <div className='shoeMovePrice shewMoveCancel'><p>{eachmobile.discount && <div>{svg1}{Number(eachmobile.realprice).toLocaleString('en-IN')}</div>}</p></div>
                </div>
              </div>
            </div>
              )
            })}
          </div>  
      </div>
      {/* <img src={require('../assests/freeshippingwallpaper.webp')} alt='freeshipping' style={{width:'100%'}}/> */}

    </div>

    {/* ................................................footer.................................... */}
   
</div>

  </>)
}

export default AllProducts;