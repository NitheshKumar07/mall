import React, { useEffect, useRef, useState } from 'react'
import '../stylesheets/homePage.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
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

  const svg = <svg id='carousel-content-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" /></svg>
  const svg1 = <svg id='carousel-content-svg1' fill='rgb(161, 159, 159)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" /></svg>
  const [mobile,setMobile] = useState([]);
  const [isShowShoe, setShowShoe] = useState(false);
  const [isShowBag, setShowBag] = useState(false);
  const [laptop1,setlaptop1] = useState([]);
  const [laptop2,setlaptop2] = useState([]);
  const [laptop3,setlaptop3] = useState([]);
  const [laptop4,setlaptop4] = useState([]);
  const [laptop5,setlaptop5] = useState([]);
  const [laptop6,setlaptop6] = useState([]);
  const [laptop7,setlaptop7] = useState([]);
  const [laptop8,setlaptop8] = useState([]);
  const [laptop9,setlaptop9] = useState([]);
  const [laptop10,setlaptop10] = useState([]);
  const [phone1,setPhone1] = useState([]);
  const [phone2,setPhone2] = useState([]);
  const [phone3,setPhone3] = useState([]);
  const [phone4,setPhone4] = useState([]);
  const [bag1,setBag1] = useState([]);
  const [bag2,setBag2] = useState([]);
  const [bag3,setBag3] = useState([]);
  const [bag4,setBag4] = useState([]);
  const [bag5,setBag5] = useState([]);
  const [bag6,setBag6] = useState([]);
  const [bag7,setBag7] = useState([]);
  const [bag8,setBag8] = useState([]);
  const [bag9,setBag9] = useState([]);
  const [bag10,setBag10] = useState([]);
  const [bag11,setBag11] = useState([]);

  useEffect(() => {
    // setLoading(true);
    
    axios.get('http://localhost:3000/product/category/66e0ac832e6bda2ea8fee821')
      .then(res => {
        // setLoading(false);
        const products = res.data.product.slice(-11); // Limit to 6 items (or use 10)
        setMobile(products);
      })
      .catch(err => {
        // setLoading(false);
        console.log(err);
        // setErrorMessage('Failed to load products');
      });
  }, []);



  // side scroll bar for overlay {no.1}
  function menuBarScroll() {
    const sideBarChecked = document.getElementById('sideBar').checked;
    if(sideBarChecked){
      document.body.classList.add('no-scrollbar',);
    }else{
    document.body.classList.remove('no-scrollbar');}
  }


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
        console.log(width);
        carouselContainer.scrollLeft -= width;
      }
    }
    const nextCarousel = () => {
      if (carouselContainer) {
        const width = carouselContainer.clientWidth;
        carouselContainer.scrollLeft += width;
        console.log(width)
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

  // shoe toggle
  const ShowShoe = () => {
    setShowShoe(!isShowShoe);
    document.querySelector('.shoe-bag-main-container').classList.toggle('show-shoe-bag-main-container');
    document.querySelector('#rotate-arrow').classList.toggle('rotate-arrow-toggle');
  }
  // shoe slide
  const shoeSlideContainer = document.querySelector('.shoe-car-box');
  if (shoeSlideContainer) {
    document.querySelector('.shoe-left-arrow').addEventListener('click', () => {
      const clientWidth = shoeSlideContainer.clientWidth;
      shoeSlideContainer.scrollLeft -= (clientWidth - 200);
      console.log(clientWidth)
    })
  }
  if (shoeSlideContainer) {
    document.querySelector('.shoe-right-arrow').addEventListener('click', () => {
      const clientWidth = shoeSlideContainer.clientWidth;
      shoeSlideContainer.scrollLeft += (clientWidth - 200);
      console.log(clientWidth)
    })
  }

  // bag toggle
  const ShowBags = () => {
    setShowBag(!isShowBag);
    document.querySelector('.bag-main-container').classList.toggle('show-bag-main-container');
    document.querySelector('#rotateBag-arrow').classList.toggle('rotateBag-arrow-toggle');
  }
  // bags slide
  const bagSlideContainer = document.querySelector('.bag-car-box');

  if (bagSlideContainer) {
    document.querySelector('.bag-left-arrow').addEventListener('click', () => {
      const clientWidth = bagSlideContainer.clientWidth;
      bagSlideContainer.scrollLeft -= (clientWidth - 250);
      console.log(clientWidth)
    })
  }
  if (bagSlideContainer) {
    document.querySelector('.bag-right-arrow').addEventListener('click', () => {
      const clientWidth = bagSlideContainer.clientWidth;
      bagSlideContainer.scrollLeft += (clientWidth - 250);
      console.log(clientWidth)
    })
  }

useEffect(() => {
  axios.get(`http://www.localhost:3000/product/66f8662877ba2f38dc4ceaf3`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop1(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f8720eaab85b2108c9c017`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop2(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f874e0aab85b2108c9c023`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop3(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f877a0aab85b2108c9c028`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop4(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f87895aab85b2108c9c02c`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop5(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f87b54aab85b2108c9c033`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop6(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f87c97aab85b2108c9c037`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop7(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f87ff1aab85b2108c9c05e`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop8(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f882faaab85b2108c9c065`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop9(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f88611aab85b2108c9c077`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop10(res.data.product);
  })
  .catch(err => console.log(err));

  axios.get(`http://www.localhost:3000/product/66f87c97aab85b2108c9c037`)
  .then((res)=>{
    console.log(res.data.product);
    setlaptop7(res.data.product);
  })
  .catch(err => console.log(err));
  
// ..........................4 mobiles.............................................
axios.get(`http://www.localhost:3000/product/66e7185fe8915705e00c8762`)
.then((res)=>{
  console.log(res.data.product);
  setPhone1(res.data.product);
})
.catch(err => console.log(err));

axios.get(`http://www.localhost:3000/product/66fd8b814e6f0e3634a2b7bc`)
.then((res)=>{
  console.log(res.data.product);
  setPhone2(res.data.product);
})
.catch(err => console.log(err));

axios.get(`http://www.localhost:3000/product/66f9049a98fcbe38c858f652`)
.then((res)=>{
  console.log(res.data.product);
  setPhone3(res.data.product);
})
.catch(err => console.log(err));

axios.get(`http://www.localhost:3000/product/66f9080398fcbe38c858f674`)
.then((res)=>{
  console.log(res.data.product);
  setPhone4(res.data.product);
})
.catch(err => console.log(err));

// .........................handbags 11................
axios.get(`http://www.localhost:3000/product/66fa103a2b58b83bdc4b4318`)
.then((res)=>{
  console.log(res.data.product);
  setBag1(res.data.product);
})
.catch(err => console.log(err));

axios.get(`http://www.localhost:3000/product/66f11cfe4e64081538c6bb4b`)
.then((res)=>{
  console.log(res.data.product);
  setBag2(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66e9414ed379c52c4494703d`)
.then((res)=>{
  console.log(res.data.product);
  setBag3(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66e9428fd379c52c44947045`)
.then((res)=>{
  console.log(res.data.product);
  setBag4(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66f9fdea2b58b83bdc4b419b`)
.then((res)=>{
  console.log(res.data.product);
  setBag5(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66f9fe852b58b83bdc4b419e`)
.then((res)=>{
  console.log(res.data.product);
  setBag6(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66fa00502b58b83bdc4b41a4`)
.then((res)=>{
  console.log(res.data.product);
  setBag7(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66fa05452b58b83bdc4b41ab`)
.then((res)=>{
  console.log(res.data.product);
  setBag8(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66f9ff742b58b83bdc4b41a1`)
.then((res)=>{
  console.log(res.data.product);
  setBag9(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66fa0ee52b58b83bdc4b42f9`)
.then((res)=>{
  console.log(res.data.product);
  setBag10(res.data.product);
})
.catch(err => console.log(err));
axios.get(`http://www.localhost:3000/product/66fa103a2b58b83bdc4b4318`)
.then((res)=>{
  console.log(res.data.product);
  setBag11(res.data.product);
})
.catch(err => console.log(err));

},[])
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
  // const element = document.querySelector('.hero-container');
  // element.style.opacity = .5;
  // document.querySelector('.bag-car-box').classList.add('pointerEvents');
    
  setTimeout(() => {
  setmessageVisible(true);
  setstatuscartlabel(false);
  }, 300);
  
  setTimeout(() => {
    setmessageVisible(false);
  }, 2000);
  
  setTimeout(() => {
    setcartMessage('');
    // element.style.opacity = 1;
    // document.querySelector('.bag-car-box').classList.remove('pointerEvents');
      }, 2500);
}

// shoe cart
const shoehandleAddtoCart = (productDetails,index) => {
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

  setcartLoading(prev => ({...prev, [index] : true}));
  // const buttons = document.querySelectorAll('#add-cart-btn');
  // buttons.forEach(button => {
  //   button.style.pointerEvents = ' none';
  // });

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
    // buttons.forEach(button => {
    //   button.style.pointerEvents = 'all';
    // });
  }, 1800);
}

  return (<>
    {cartMessage && <div className={`cart-msg ${messageVisible ? 'cart-msg-move' : ''}`}>{cartMessage}</div>}


    <div className='hero-container'> {/* no css */}
      <div className='sideBarBody'>
        <input type='checkbox' id='sideBar' onChange={menuBarScroll} />
        <label htmlFor='sideBar' id='screenOverlay' />
        <label htmlFor='sideBar' id='bars'>
          <svg id='menuIcon' xmlns="http://www.w3.org/2000/svg" height='25px' viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
          <svg id='menuCancelIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height='22px'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        </label>

        <div className='menuBar' >
          <div className='cancel-content'>
            <div id='sidebar-profileContainer'>
              <svg xmlns="http://www.w3.org/2000/svg" width='30px' height='30px' viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" /></svg>
              <h1>hello, Nitesh</h1></div>
            <div className='categoryLists'>
              <h2>Shop by Category</h2>
              <ul>
                <li className='sidebar-cntnt womens-fashion'><a className='a' ><div className='arrow-link'>Womens's Fashion<span id='arrowMark' className='arrowmark-womens' htmlFor='sideBar'>&#10095;</span></div></a>
                  <ul className='womens-Sub-a' onMouseEnter={() => {
                    document.querySelector('.womens-fashion').style.backgroundColor = '#e0e1dd'; {/*omMouseEnter & onMouseLeave.......stay baccgrounnd color grey and arrow size increase when hovered to sub categories...... */ }
                    document.querySelector('.arrowmark-womens').style.transform = 'scale(1.45)';
                  }} onMouseLeave={() => {
                    document.querySelector('.womens-fashion').style.backgroundColor = 'transparent';
                    document.querySelector('.arrowmark-womens').style.transform = 'scale(1)';
                  }}>
                    <li><Link className='womans-sub-li a' to='/chudidarpage' style={{ width: 'auto' }}>Chudidar</Link></li>
                    <li><Link className='womans-sub-li a' to='/sareepage' style={{ width: 'auto' }}>Saree</Link></li>
                    <li><Link className='womans-sub-li a' to='/handbagpage' style={{ width: 'auto' }}>Handbag</Link></li>
                  </ul></li>
                <li className='sidebar-cntnt womens-fashion mens-fashion'><a className='a'><div className='arrow-link'>Men's Fashion<span htmlFor='sideBar' className='arrowmark-mens' id='arrowMark'>&#10095;</span></div></a>
                  <ul className='womens-Sub-a' onMouseEnter={() => {
                    document.querySelector('.mens-fashion').style.backgroundColor = '#e0e1dd'; {/*omMouseEnter & onMouseLeave.......stay baccgrounnd color grey and arrow size increase when hovered to sub categories...... */ }
                    document.querySelector('.arrowmark-mens').style.transform = 'scale(1.45)';
                  }} onMouseLeave={() => {
                    document.querySelector('.mens-fashion').style.backgroundColor = 'transparent';
                    document.querySelector('.arrowmark-mens').style.transform = 'scale(1)';
                  }}>
                    <li><Link className='a' to='/shoepage' style={{ width: 'auto' }}>Shoes</Link></li>
                    <li><Link className='a' to='/suitpage' style={{ width: 'auto' }}>Suits</Link></li>
                    <li><Link className='a' to='/jeanspage' style={{ width: 'auto' }}>Jeans</Link></li>
                  </ul></li>
                <li className='sidebar-cntnt'><a onClick={(() => navigateLaptopPage())} className='a'><div className='arrow-link'>Laptops<span id='arrowMark' htmlFor='sideBar'>&#10095;</span></div></a></li>
                <li className='sidebar-cntnt  womens-fashion tv-cont-class'><a className='a'><div className='arrow-link'>Appliances, Electronics<span className='arrowmark-tv' id='arrowMark' htmlFor='sideBar'>&#10095;</span></div></a>
                  <ul className='womens-Sub-a' onMouseEnter={() => {
                    document.querySelector('.tv-cont-class').style.backgroundColor = '#e0e1dd'; {/*omMouseEnter & onMouseLeave.......stay baccgrounnd color grey and arrow size increase when hovered to sub categories...... */ }
                    document.querySelector('.arrowmark-tv').style.transform = 'scale(1.45)';
                  }} onMouseLeave={() => {
                    document.querySelector('.tv-cont-class').style.backgroundColor = 'transparent';
                    document.querySelector('.arrowmark-tv').style.transform = 'scale(1)';
                  }}>
                    <li ><Link className='a' to='/tvpage' style={{ width: 'auto' }}>TV</Link></li>
                    <li><Link className='a' to='/acpage' style={{ width: 'auto' }}>AC</Link></li>
                    <li><Link className='a' to='/fridgepage' style={{ width: 'auto' }}>Fridge</Link></li>
                  </ul></li>
                <li className='sidebar-cntnt'><a onClick={(() => navigateGamingPage())} className='a'><div className='arrow-link'>Gaming Accessories<span htmlFor='sideBar' id='arrowMark'>&#10095;</span></div></a></li>
              </ul>
            </div>
            {/* <hr/> */}
            <button className='menubar-signout-btn'>Sign out</button>
          </div>
        </div>
      </div>

    <div className='main-container'>
      <div className='mainBody'>

        <div className='slider'> {/*no css given*/}
          <div className='imageSlide' ref={allImagesSlideRef}>
            {/* <div className='img-box'> */}
            <a href='#'><img className='imageSlide-image img1' style={{ backgroundColor: 'lightgrey' }} src={require("../assests/shopping-banner.png")} /></a>
            {/* </div> */}
            <a href='#'><img className='imageSlide-image img2' src={require("../assests/banner-cart.jpg")} /></a>
            <a href='#'><img className='imageSlide-image img3' src={require("../assests/sweater-banner.jpeg")} /></a>

            <a href='#'><img className='imageSlide-image img2' src={require("../assests/desktop assests/tv banner.jpg")} /></a>
            <button className='slide-btn prevSlide' onClick={prevSlide} >&#10094;</button>
            <button className='slide-btn nextSlide' onClick={nextSlide} >&#10095;</button>
          </div>
        </div>
      </div>

      <div className='carousel-container'>  {/* ............body-section-1 starts.................... */}
        <h2>Best Selling</h2>
        <button id='left-btn' >&#10094;</button>
        <button id='right-btn'>&#10095;</button>

        <div className='carousel-box'>
          <div className='carousel-card'>
            <div className='carousel-image'>
              {laptop1.discount && <span id='per-offer'>{laptop1.discount}% off</span>}
              <div className='all-carousel-images-cont'  onClick={()=>openSoloLaptop(laptop1._id)}><a><img className='allcarouselImages' src={laptop1.photo}></img></a></div>
              {/* <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop1)}>Add to Cart</button> */}
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop1)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
            </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop1._id)}>{laptop1.title}</p>
              <div><p>{svg}<price>{laptop1.price && Number(laptop1.price).toLocaleString('en-IN')} 
              {laptop1.discount && (
                <disprice>{svg1}{Number(laptop1.realprice).toLocaleString('en-IN')}</disprice>)}</price></p></div>
            </div>
          </div>
          {/* ..............................2nd................. */}
          <div className='carousel-card' >
            <div className='carousel-image'>
              {laptop2.discount && <span id='per-offer'>{laptop2.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop2._id)}><a ><img className='allcarouselImages' src={laptop2.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop2)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
            </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop2._id)}>{laptop2.title}</p>
              <div><p>{svg}<price>{laptop2.price && Number(laptop2.price).toLocaleString('en-IN')} 
              {laptop2.discount && (
                <disprice>{svg1}{Number(laptop2.realprice).toLocaleString('en-IN')}</disprice>)}</price></p></div>
            </div>
          </div>
          <div className='carousel-card'>
            <div className='carousel-image'>
              {laptop3.discount && <span id='per-offer'>{laptop3.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop3._id)}><a><img className='allcarouselImages' src={laptop3.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop3)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
            </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop3._id)}>{laptop3.title}</p>
              <div><p>{svg}<price>{laptop3.price && Number(laptop3.price).toLocaleString('en-IN')}
                {laptop3.discount && (
                  <disprice>{svg1}{Number(laptop3.realprice).toLocaleString('en-IN')}</disprice>)}</price></p></div>
            </div>
          </div>
                    <div className='carousel-card'>
            <div className='carousel-image'>
              {laptop4.discount && <span id='per-offer'>{laptop4.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop4._id)}><a><img className='allcarouselImages' src={laptop4.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop4)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
            </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop4._id)}>{laptop4.title}</p>
              <div><p>{svg}<price>{laptop4.price && Number(laptop4.price).toLocaleString('en-IN')} {laptop4.discount && 
                (<disprice>{svg1}{Number(laptop4.realprice).toLocaleString('en-IN')}</disprice>)}</price></p></div>
            </div>
          </div>
          <div className='carousel-card'>
            <div className='carousel-image'>
              {laptop5.discount && <span id='per-offer'>{laptop5.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop5._id)}><a><img className='allcarouselImages' src={laptop5.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop5)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
            </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop5._id)}>{laptop5.title}</p>
              <div><p>{svg}<price>{laptop5.price && Number(laptop5.price).toLocaleString('en-IN')} {laptop5.discount && (
                <disprice>{svg1}{Number(laptop5.realprice).toLocaleString('en-IN')}</disprice>)}</price></p></div>
            </div>
          </div>          <div className='carousel-card'>
            <div className='carousel-image'>
              {laptop6.discount && <span id='per-offer'>{laptop6.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop6._id)}><a ><img className='allcarouselImages' src={laptop6.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop6)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
            </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop6._id)}>{laptop6.title}</p>
              <div><p>{svg}<price>{laptop6.price && Number(laptop6.price).toLocaleString('en-IN')} {laptop6.discount && (
                <disprice>{svg1}{Number(laptop6.realprice).toLocaleString('en-IN')}</disprice>)}</price></p></div>
            </div>
          </div>          <div className='carousel-card'>
            <div className='carousel-image'>
              {laptop7.discount && <span id='per-offer'>{laptop7.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop7._id)}><a><img className='allcarouselImages' src={laptop7.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop7)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
            </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop7._id)}>{laptop7.title}</p>
              <div><p>{svg}<price>{laptop7.price && Number(laptop7.price).toLocaleString('en-IN')} {laptop7.discount && (
                <disprice>{svg1}{Number(laptop7.realprice).toLocaleString('en-IN')}</disprice>)}</price></p></div>
            </div>
          </div>
          <div className='carousel-card'>
            <div className='carousel-image'>
            {laptop8.discount && <span id='per-offer'>{laptop8.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop8._id)}><a><img className='allcarouselImages'
               src={laptop8.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop8)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
              </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop8._id)}>{laptop8.title}</p>
              <div><p>{svg}<price>{laptop8.price && Number(laptop8.price).toLocaleString('en-IN')} {laptop7.discount && (
                <disprice>{svg1}{Number(laptop8.realprice).toLocaleString('en-IN')} </disprice>)}</price></p></div>
            </div>
          </div> 
          <div className='carousel-card'>
            <div className='carousel-image'>
            {laptop9.discount && <span id='per-offer'>{laptop9.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop9._id)}><a><img className='allcarouselImages'
               src={laptop9.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop9)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
              </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop9._id)}>{laptop9.title}</p>
              <div><p>{svg}<price>{laptop9.price && Number(laptop9.price).toLocaleString('en-IN')} {laptop9.discount && (
                <disprice>{svg1}{Number(laptop9.realprice).toLocaleString('en-IN')} </disprice>)}</price></p></div>
            </div>
          </div>
          <div className='carousel-card'>
            <div className='carousel-image'>
            {laptop10.discount && <span id='per-offer'>{laptop10.discount}% off</span>}
              <div className='all-carousel-images-cont' onClick={()=>openSoloLaptop(laptop10._id)}><a><img className='allcarouselImages'
               src={laptop10.photo}></img></a></div>
              <button id='add-cart-btn' onClick={()=>handleAddtoCart(laptop10)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
              </div>
            <div className='carousel-content'>
              <p id='prod-name' onClick={()=>openSoloLaptop(laptop10._id)}>{laptop10.title}</p>
              <div><p>{svg}<price>{laptop10.discount &&  Number(laptop10.price).toLocaleString('en-IN')} {laptop10.discount && (
                <disprice>{svg1}{Number(laptop10.realprice).toLocaleString('en-IN')} </disprice>)}</price></p></div>
            </div>
          </div>
        </div>

      </div> {/* caraousel .....................................body-section-1 ends */}

      {/* cards box ............................... body-section-2 starts ..............................................*/}
      <div className='cards-box-container'>

        <div className='mobile-box-container'>
          <h3>Shop for Mobiles</h3>
          <div className='mob-box1'>
            <a onClick={()=>navigateSoloLaptop(phone1._id)}><div className='mob-img'>
              <img src={phone1.photo}></img>
              <p>{phone1.title}</p>
            </div></a>
            <a onClick={()=>navigateSoloLaptop(phone2._id)}><div className='mob-img'>
              <img src={phone2.photo}></img>
              <p>update 1st phone {phone2.title}</p>
            </div></a>
          </div>
          <div className='mob-box2'>
            <a onClick={()=>navigateSoloLaptop(phone3._id)}><div className='mob-img'>
              <img src={phone3.photo}></img>
              <p>{phone3.title}</p>
            </div></a>
            <a onClick={()=>navigateSoloLaptop(phone4._id)}><div className='mob-img'>
              <img src={phone4.photo}></img>
              <p>{phone4.title}</p>
            </div></a>
          </div>
          <a onClick={()=>navigatePagePhone()}className='item-reach-link item-reach-link1'>See more</a>
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

      </div> 
      {/* ...........card box.......................section 2 ends.............................................. */}


      {/* womens and mens shopping............. section 3 starts.................................... */}
      <div className='mens-shopping-container' id='mens-womens-shopping'>
        <h3>Women's fashion</h3>
        <div className='men-shopping-sub-container'>
          <div className='s-b-chudi-sub-container' id='bag-main1-container'>
            <h4>Handbags</h4>
            <div className='saree-shoe-chudidar-img'>
              <a onClick={()=>navigatePageBag()}><img src={require('../assests/desktop assests/bag-card.jpg')}></img></a>
            </div>
            <div className='rotate-btn-container'><button id='rotate-down-up-btn' onClick={ShowBags}>{isShowBag ? 'Show less' : 'Show more'}
              <div id='rotateBag-arrow'>&#10095;</div></button><p id='new-arrivals'>New Arrivals</p></div>
          </div>

          <div className='s-b-chudi-sub-container'>
            <h4>Chudidar's</h4>
            <div className='saree-shoe-chudidar-img '>
              <a onClick={()=>navigatePageChudidar()}><img src={require('../assests/desktop assests/chudidar-card.jpg')}></img></a>
            </div>
            <a onClick={()=>navigatePageChudidar()}className='item-reach-link'>Shop now</a>
          </div>

          <div className='s-b-chudi-sub-container'>
            <h4>Saree</h4>
            <div className='saree-shoe-chudidar-img'>
              <a onClick={()=>navigatePageSaree()}><img src={require('../assests/desktop assests/saree-img-card.jpg')}></img></a>
            </div>
            <a onClick={()=>navigatePageSaree()} className='item-reach-link'>Shop now</a>
          </div>

          <div className='s-b-chudi-sub-container' id='bag-main2-container'>
            <h4>Handbags</h4>
            <div className='saree-shoe-chudidar-img' onClick={()=>navigatePageBag()}>
              <a ><img src={require('../assests/desktop assests/bag-card.jpg')}></img></a>
            </div>
            <div className='rotate-btn-container'><button id='rotate-down-up-btn' onClick={ShowBags}>{isShowBag ? 'Show less' : 'Show more'}
              <div id='rotateBag-arrow'>&#10095;</div></button></div>
          </div>

        </div>

        <div className='bag-main-container'><button className='bag-arrow bag-left-arrow' >&#10094;
        </button><button className='bag-arrow bag-right-arrow'>&#10095;</button>
          <div className='bag-car-box'>
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag1.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag1._id)}>
                <img className='all-shoe-slide-Images' src={bag1.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag1)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag1._id)}>{bag1.title}</p>
                <div><p>{svg}<price>{bag1.price} {bag1.discount && <disprice>{svg1}{bag1.realprice}</disprice>}</price></p></div>
              </div>
            </div>

            {/* ............................ */}
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag2.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag2._id)}>
                <img className='all-shoe-slide-Images' src={bag2.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag2)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag2._id)}>{bag2.title}</p>
                <div><p>{svg}<price>{bag2.price} {bag2.discount && <disprice>{svg1}{bag2.realprice}</disprice>}</price></p></div>
              </div>
            </div>
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag3.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag3._id)}>
                <img className='all-shoe-slide-Images' src={bag3.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag3)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag3._id)}>{bag3.title}</p>
                <div><p>{svg}<price>{bag3.price} {bag3.discount && <disprice>{svg1}{bag3.realprice}</disprice>}</price></p></div>
              </div>
            </div>
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag4.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag4._id)}>
                <img className='all-shoe-slide-Images' src={bag4.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag4)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag4._id)}>{bag4.title}</p>
                <div><p>{svg}<price>{bag4.price} {bag4.discount && <disprice>{svg1}{bag4.realprice}</disprice>}</price></p></div>
              </div>
            </div>
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag5.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag5._id)}>
                <img className='all-shoe-slide-Images' src={bag5.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag5)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag5._id)}>{bag5.title}</p>
                <div><p>{svg}<price>{bag5.price} {bag5.discount && <disprice>{svg1}{bag5.realprice}</disprice>}</price></p></div>
              </div>
            </div>
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag6.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag6._id)}>
                <img className='all-shoe-slide-Images' src={bag6.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag6)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag6._id)}>{bag6.title}</p>
                <div><p>{svg}<price>{bag6.price} {bag6.discount && <disprice>{svg1}{bag6.realprice}</disprice>}</price></p></div>
              </div>
            </div>
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag7.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag7._id)}>
                <img className='all-shoe-slide-Images' src={bag7.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag7)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag7._id)}>{bag7.title}</p>
                <div><p>{svg}<price>{bag7.price} {bag7.discount && <disprice>{svg1}{bag7.realprice}</disprice>}</price></p></div>
              </div>
            </div>
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag8.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag8._id)}>
                <img className='all-shoe-slide-Images' src={bag8.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag8)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag8._id)}>{bag8.title}</p>
                <div><p>{svg}<price>{bag8.price} {bag8.discount && <disprice>{svg1}{bag8.realprice}</disprice>}</price></p></div>
              </div>
            </div>
            <div className='bag-slide-card'>
              <div className='bag-slide-img'>
                {bag9.discount && <span id='per-offer'>10% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloBag(bag9._id)}>
                <img className='all-shoe-slide-Images' src={bag9.photo}></img></a></div>
                <button id='add-cart-btn' onClick={()=>handleAddtoCart(bag9)}> {statuscartlabel ? (<SmallLoader/>):(<>{cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloBag(bag9._id)}>{bag9.title}</p>
                <div><p>{svg}<price>{bag9.price} {bag9.discount && <disprice>{svg1}{bag9.realprice}</disprice>}</price></p></div>
              </div>
            </div>
            {/* crads....... */}
          </div>
        </div>
      </div>

      <div className='mens-shopping-container'>
        <h3>Men's fashion</h3>
        <div className='men-shopping-sub-container'>
          <div className='s-b-chudi-sub-container' id='bag-main1-container'>
            <h4>Shoes</h4>
            <div className='saree-shoe-chudidar-img'>
              <a onClick={() => navigatePageShoe()}><img src={require('../assests/desktop assests/shoe-card.webp')}></img></a>
            </div>
            <div className='rotate-btn-container'><button id='rotate-down-up-btn' onClick={ShowShoe}>
              {isShowShoe ? 'Show less' : 'Show more'}<div id='rotate-arrow'>&#10095;</div></button></div>
          </div>

          <div className='s-b-chudi-sub-container'>
            <h4>Suit's</h4>
            <div className='saree-shoe-chudidar-img '>
              <a onClick={() => navigatePageSuit()}><img src={require('../assests/desktop assests/suit-card.jpg')}></img></a>
            </div>
            <a onClick={() => navigatePageSuit()} className='item-reach-link'>Shop now</a>
          </div>

          <div className='s-b-chudi-sub-container'>
            <h4>Jeans</h4>
            <div className='saree-shoe-chudidar-img'>
              <a onClick={() => navigatePageJeans()}><img src={require('../assests/desktop assests/jeans-card.jpg')}></img></a>
            </div>
            <a onClick={() => navigatePageJeans()} className='item-reach-link'>Shop now</a>
          </div>

          <div className='s-b-chudi-sub-container' id='bag-main2-container'>
            <h4>Shoes</h4>
            <div className='saree-shoe-chudidar-img'>
              <a onClick={() => navigatePageShoe()}><img src={require('../assests/desktop assests/shoe-card.webp')}></img></a>
            </div>
            <div className='rotate-btn-container'><button id='rotate-down-up-btn' onClick={ShowShoe}>
              {isShowShoe ? 'Show less' : 'Show more'}<div id='rotate-arrow'>&#10095;</div></button></div>
          </div>
        </div>

        <div className='shoe-bag-main-container'><button className='shoe-arrow shoe-left-arrow'  >&#10094;
          </button><button className='shoe-arrow shoe-right-arrow' >&#10095;</button>
        
        <div className='shoe-car-box'>
            {mobile.map((eachmobile,index) => {
              return(
                <div className='bag-slide-card'id='shoeSlide' key={eachmobile._id}>
              <div className='bag-slide-img'>
                {eachmobile.discount && <span id='per-offer'>{eachmobile.discount}% off</span>}
                <div className='all-bag-slide-image-box'>
                <a onClick={()=>navigateSoloShoe(eachmobile._id)}>
                <img className='all-shoe-slide-Images' src={eachmobile.photo} alt={eachmobile.title} img/></a></div>
                <button id='add-cart-btn' onClick={()=>shoehandleAddtoCart(eachmobile,index)}>{statuscartlabel & cartLoading[index] ? (<SmallLoader/>):(<> {cartlabel}</>)}</button>
                </div>
              <div className='carousel-content'>
                <p id='prod-name' onClick={()=>navigateSoloShoe(eachmobile._id)}>{eachmobile.title}</p>
                <div><p>{svg}<price>{eachmobile.price} {eachmobile.discount && <disprice>{svg1}{eachmobile.realprice}</disprice>}</price></p></div>
              </div>
            </div>
              )
            })}
   </div>  
        </div>
      </div>{/*........................... section 3 ends here....................................... */}

    </div>

    {/* ................................................footer.................................... */}
   
</div>


  </>)
}

export default AllProducts;