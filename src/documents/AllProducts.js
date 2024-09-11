import React, { useEffect, useRef, useState } from 'react'
import '../stylesheets/homePage.css'
import {Link} from 'react-router-dom'

const AllProducts = () => {

const svg = <svg id='carousel-content-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
const svg1 = <svg id='carousel-content-svg1' fill='rgb(161, 159, 159)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
const [isShowShoe,setShowShoe] = useState(false);
const [isShowBag,setShowBag] = useState(false);

// side scroll bar for overlay {no.1}
  function menuBarScroll() {
    const sideBarChecked = document.getElementById('sideBar').checked;
    document.body.classList.toggle('no-scrollbar',sideBarChecked);
  }


// for image slider start........................................................................................ {no.2}
  const allImagesSlideRef = useRef(null); 
  let imageIndex = 0;
  let intervalid = null;
  useEffect (()=>{
    InitialSlide();
    return () => {
      clearInterval(intervalid)  // cleanup when unmounts
      // intervalid = null;
    }                      
  },[])

  function InitialSlide () {

    if(!allImagesSlideRef.current) return;

    const allImagesSlide = allImagesSlideRef.current.querySelectorAll('.imageSlide-image');

    // if(allImagesSlide.length === 0) return; --------till not nexesaary for unmounting when oprn other pages

    allImagesSlide.forEach((image,index) => {
      image.style.left = `${index * 100}%`;
    })

    if(allImagesSlide.length > 0){
      // intervalid = setInterval(nextSlide,2000);
    }
  }
  
  const slideImage = (index) => {
    const allImagesSlide = allImagesSlideRef.current.querySelectorAll('.imageSlide-image');

    // if(!allImagesSlide || allImagesSlide.length === 0) return; -------------------till not nexesaary for unmounting when oprn other pages

    if(index >= allImagesSlide.length){
      imageIndex = 0;    
    }
    else if(index < 0){
      imageIndex = allImagesSlide.length - 1;
    }

    allImagesSlide.forEach((image) => {
      image.style.transform = `translateX(-${imageIndex*100}%)`
    });
  }; 

  function prevSlide(){
    setTimeout(() => {
      clearInterval(intervalid);
    imageIndex --;
    slideImage(imageIndex);
    // restart time after 4sec
    setTimeout(() => {
      clearInterval(intervalid);
      InitialSlide();
    }, 4000);
    }, 10);
  }
  function nextSlide(){
 setTimeout(() => {
  clearInterval(intervalid);
  imageIndex ++;
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
  
    const prevCarousel = () =>{
     if(carouselContainer){
      const width = carouselContainer.clientWidth;
      console.log(width);
      carouselContainer.scrollLeft -= width;
     }
    }
    const nextCarousel = () =>{
  if(carouselContainer){
    const width = carouselContainer.clientWidth;
    carouselContainer.scrollLeft += width;
    console.log(width)
  }
    }
    const leftBtn = document.getElementById('left-btn'); 
    const rightBtn = document.getElementById('right-btn');

    if(leftBtn && rightBtn){
      leftBtn.addEventListener('click',prevCarousel);
      rightBtn.addEventListener('click',nextCarousel);
    }
    // cleanup
    return () => {
      if(leftBtn && rightBtn)
      {
        leftBtn.removeEventListener('click',prevCarousel);
        rightBtn.removeEventListener('click',nextCarousel);
    
      }
    }
  },[])

  // shoe toggle
   const ShowShoe = () =>{
     setShowShoe(!isShowShoe);
     document.querySelector('.shoe-bag-main-container').classList.toggle('show-shoe-bag-main-container');
     document.querySelector('#rotate-arrow').classList.toggle('rotate-arrow-toggle');
   }
// shoe slide
const shoeSlideContainer = document.querySelector('.shoe-car-box');
if(shoeSlideContainer){
  document.querySelector('.shoe-left-arrow').addEventListener('click', () => {
    const clientWidth = shoeSlideContainer.clientWidth;
    shoeSlideContainer.scrollLeft -=  (clientWidth-200);
    console.log(clientWidth)
  })
}
if(shoeSlideContainer){
document.querySelector('.shoe-right-arrow').addEventListener('click', () =>{
  const clientWidth = shoeSlideContainer.clientWidth;
  shoeSlideContainer.scrollLeft += (clientWidth-200);
  console.log(clientWidth)
})
}

// bag toggle
const ShowBags = () =>{
  setShowBag(!isShowBag);
  document.querySelector('.bag-main-container').classList.toggle('show-bag-main-container');
  document.querySelector('#rotateBag-arrow').classList.toggle('rotateBag-arrow-toggle');
}
// bags slide
const bagSlideContainer = document.querySelector('.bag-car-box');

if(bagSlideContainer){
document.querySelector('.bag-left-arrow').addEventListener('click', () => {
  const clientWidth = bagSlideContainer.clientWidth;
  bagSlideContainer.scrollLeft -=  (clientWidth-250);
  console.log(clientWidth)
})
}
if(bagSlideContainer){
document.querySelector('.bag-right-arrow').addEventListener('click', () =>{
const clientWidth = bagSlideContainer.clientWidth;
bagSlideContainer.scrollLeft += (clientWidth-250);
console.log(clientWidth)
})
}


  return (<>
   


<header>
        <div className="nav-bar">
            {/* <div className='image-logo'><a href=""><div className="logo"></div></a></div> */}
            <a href='' id='mall-logo'>Mall</a>
            
            <div className="category">
                <a href='#' className="cat2 cat-a">fashion</a>
                <a href="#" className="cat3 cat-a">mobiles & laptops</a>
                <a href="#" className="cat5 cat-a">gaming</a>
            </div>
            <div className="search-bar">
             <button><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></button>
             <input className="s-bar" type="text" placeholder="Search Products"/>
            </div>
            <div className="icons">
                <div className="icon cart-svg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="black"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
                <p>Bag</p>
                <div><span id='cartCount'>10</span></div></div>

                <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="black"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                <p>Whishlist</p></div>

                <div className="icon profileIcon">
                  <ul className='profileDropdown'>
                    <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="black"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                    <p>Profile</p></li>
                    <ul className='listDropdown'>
                      <li><button className='loginDropdown'>Log out</button></li>
                      {/* <li><button className='loginDropdown'>Login</button></li> */}
                    </ul>
                  </ul>
                </div> 
            </div>
        </div>
    </header>

{/* body container */}

<div className='hero-container'> {/*no css */}

  <div className='sideBarBody'>
     <input type='checkbox' id='sideBar' onChange={menuBarScroll}/>
     <label htmlFor='sideBar' id='screenOverlay'/>
     <label htmlFor='sideBar' id='bars'>
     <svg id='menuIcon' xmlns="http://www.w3.org/2000/svg" height='25px' viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
     <svg id='menuCancelIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height='22px'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
      </label>  

      <div className='menuBar' >
        <div className='cancel-content'>
          <div id='sidebar-profileContainer'>
          <svg xmlns="http://www.w3.org/2000/svg" width='30px' height='30px' viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
            <h1>hello, Nitesh</h1></div>
          <div className='categoryLists'>
          <h2>Shop by Category</h2>
          <ul>
          <li className='sidebar-cntnt womens-fashion'><a href='#'><div className='arrow-link'>Womens's Fashion<span id='arrowMark' className='arrowmark-womens' htmlFor='sideBar'>&#10095;</span></div></a>
           <ul className='womens-Sub-a' onMouseEnter={()=>{
            document.querySelector('.womens-fashion').style.backgroundColor='#e0e1dd';   {/*omMouseEnter & onMouseLeave.......stay baccgrounnd color grey and arrow size increase when hovered to sub categories...... */}
            document.querySelector('.arrowmark-womens').style.transform='scale(1.45)';
          }} onMouseLeave={()=>{
            document.querySelector('.womens-fashion').style.backgroundColor='transparent';
            document.querySelector('.arrowmark-womens').style.transform='scale(1)';
          }}>
            <li><a className='womans-sub-li' href='' style={{width:'auto'}}>Chudidar</a></li>
            <li><a className='womans-sub-li' href='' style={{width:'auto'}}>Saree</a></li>
            <li><a className='womans-sub-li' href='' style={{width:'auto'}}>Handbag</a></li>
           </ul></li>
          <li className='sidebar-cntnt womens-fashion mens-fashion'><a href='#'><div className='arrow-link'>Men's Fashion<span htmlFor='sideBar' className='arrowmark-mens' id='arrowMark'>&#10095;</span></div></a>
          <ul className='womens-Sub-a'  onMouseEnter={()=>{
            document.querySelector('.mens-fashion').style.backgroundColor='#e0e1dd';   {/*omMouseEnter & onMouseLeave.......stay baccgrounnd color grey and arrow size increase when hovered to sub categories...... */}
            document.querySelector('.arrowmark-mens').style.transform='scale(1.45)';
          }} onMouseLeave={()=>{
            document.querySelector('.mens-fashion').style.backgroundColor='transparent';
            document.querySelector('.arrowmark-mens').style.transform='scale(1)';
          }}>
            <li><a href='' style={{width:'auto'}}>Shoes</a></li>
            <li><a href='' style={{width:'auto'}}>Suits</a></li>
            <li><a href='' style={{width:'auto'}}>Jeans</a></li>
           </ul></li>
          <li className='sidebar-cntnt'><a href='#'><div className='arrow-link'>Mobiles, Computers<span id='arrowMark' htmlFor='sideBar'>&#10095;</span></div></a></li>
          <li className='sidebar-cntnt  womens-fashion tv-cont-class'><a href='#'><div className='arrow-link'>Appliances, Electronics<span className='arrowmark-tv' id='arrowMark' htmlFor='sideBar'>&#10095;</span></div></a>
          <ul className='womens-Sub-a'  onMouseEnter={()=>{
            document.querySelector('.tv-cont-class').style.backgroundColor='#e0e1dd';   {/*omMouseEnter & onMouseLeave.......stay baccgrounnd color grey and arrow size increase when hovered to sub categories...... */}
            document.querySelector('.arrowmark-tv').style.transform='scale(1.45)';
          }} onMouseLeave={()=>{
            document.querySelector('.tv-cont-class').style.backgroundColor='transparent';
            document.querySelector('.arrowmark-tv').style.transform='scale(1)';
          }}>
            <li><a href='' style={{width:'auto'}}>TV's</a></li>
            <li><a href='' style={{width:'auto'}}>AC's</a></li>
            <li><a href='' style={{width:'auto'}}>Fridge</a></li>
           </ul></li>
          <li className='sidebar-cntnt'><a href='#'><div className='arrow-link'>Gaming Accessories<span htmlFor='sideBar' id='arrowMark'>&#10095;</span></div></a></li>
          </ul>          
          </div>
          {/* <hr/> */}
          <button className='menubar-signout-btn'>Sign out</button>
        </div>
        </div>
      </div>
    
    <div className='mainBody'>
          
        <div className='slider'> {/*no css given*/}
          <div className='imageSlide' ref={allImagesSlideRef}>
            {/* <div className='img-box'> */}
            <a href='#'><img className='imageSlide-image img1' style={{backgroundColor:'lightgrey'}} src={require("../assests/shopping-banner.png")}/></a>
            {/* </div> */}
            <a href='#'><img className='imageSlide-image img2' src={require("../assests/banner-cart.jpg")}/></a>
            <a href='#'><img className='imageSlide-image img3' src={require("../assests/sweater-banner.jpeg")}/></a>
                                    
            <a href='#'><img className='imageSlide-image img2' src={require("../assests/desktop assests/tv banner.jpg")}/></a>
            <a href='#'><img className='imageSlide-image img3' src={require("../assests/sweater-banner.jpeg")}/></a>                                   
            <button className='slide-btn prevSlide' onClick={prevSlide} >&#10094;</button>
            <button className='slide-btn nextSlide' onClick={nextSlide} >&#10095;</button>
          </div>
        </div>
    </div>
</div>
{/*side slide and image slice ends */}

<div className='main-container'>

  <div className='carousel-container'>  {/* ............body-section-1 starts.................... */}
    <h2>Best Selling</h2>
    <button id='left-btn' >&#10094;</button>
    <button id='right-btn'>&#10095;</button>

    <div className='carousel-box'>
      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/dwll.png')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acer aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>

      {/* ....................cards/./.............................. */}
      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/Apple MacBook Air Laptop.jpg')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Apple MacBook Air Laptop</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/Dell Alienware m18 R1 Gaming Laptop.jpg')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Dell Alienware m18 R1 Gaming Laptop</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/Dell Inspiron 3520 Laptop.jpg')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Dell Inspiron 3520 Laptop</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/Acer Swift Go Intel Core i5 13th Gen.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Acer Swift Go Intel Core i5 13th Gen</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/ASUS Vivobook 15 Intel Core i3 12th Gen.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>ASUS Vivobook 15 Intel Core i3 12th Gen</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/CoreBook X Grey Laptop Intel Core i5 10th Gen.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>CoreBook X Grey Laptop Intel Core i5 10th Gen</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/Lenovo AMD Ryzen 3 Quad Core 7330U.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lenovo AMD Ryzen 3 Quad Core 7330U</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/MSI Commercial 14 H Pro Intel Core i7 13th Gen.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>MSI Commercial 14 H Pro Intel Core i7 13th Gen</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>      <div className='carousel-card'>
        <div className='carousel-image'>
          <span id='per-offer'>10% off</span>
          <div className='all-carousel-images-cont'><a href=''><img className='allcarouselImages' src={require('../assests/desktop assests/MSI Prestige 14 AI Evo Intel Core Ultra 7 1st Gen.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>MSI Prestige 14 AI Evo Intel Core Ultra 7 1st Gen</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      {/* ...................................carddddd............ */}
      
      

    </div>

  </div> {/* caraousel .....................................body-section-1 ends */}

{/* cards box ............................... body-section-2 starts ..............................................*/}
<div className='cards-box-container'>

  <div className='mobile-box-container'>
    <h3>Shop for Mobiles</h3>
  <div className='mob-box1'>
  <a href=''><div className='mob-img'>
    <img src={require('../assests/desktop assests/1plus card.jpg')}></img>
    <p>oneplus nord CE4 lite</p>
  </div></a>
  <a href=''><div className='mob-img'>
  <img src={require('../assests/desktop assests/samsung card.jpg')}></img>
    <p>samsung galaxy s24</p>
  </div></a>
  </div>
 <div className='mob-box2'>
 <a href=''><div className='mob-img'>
  <img src={require('../assests/desktop assests/lava card.jpg')}></img>
    <p> lava blaze 5g (curve display)</p>
  </div></a>
  <a href=''><div className='mob-img'>
  <img src={require('../assests/desktop assests/iqoo card.jpg')}></img>
    <p>iqoo 12 5g</p>
  </div></a>
 </div>
 <a href='' className='item-reach-link item-reach-link1'>See more</a>
  </div>

  <div className='tv-box-container'>
    <h3>Shop smart TV's, AC's and many more </h3>
    <div className='container-sub2'>
    <div className='tv-ac-container'>
      <div className='tv-img'>
        <a href=''><img id='tv-card-img' src={require("../assests/desktop assests/tv card.jpg")}/></a>
      </div>
      <div className='ac-img'>
        <a href=''><img id='ac-card-img' src={require('../assests/desktop assests/ac card.jpg')}/></a>
      </div>
    </div>
    <div className='fridge-img'>
      <a href=''><img id='fridge-card-img' src={require("../assests/desktop assests/fridge iage card.jpg")}/></a>
    </div>
    </div>
    <a href='' className='item-reach-link'>See more</a>
  </div>
  
  <div className='watch-gaming-box-container'>
  <h3>Gaming accessories</h3>
    <a href='' className='watch-gaming-img-a'><div className='watch-gaming-img'>
      <img src={require('../assests/desktop assests/gaming accessories card.jpg')}></img>  
    </div></a>
    <a href='' className='item-reach-link item-reach-link2'>Shop now</a>
  </div>

  <div className='watch-gaming-box-container'>
    <h3>Shop for Watches</h3>
    <a href=''><div className='watch-gaming-img'>
      <img src={require('../assests/desktop assests/watches card.jpg')}></img>  
    </div></a>
    <a href='' className='item-reach-link item-reach-link2'>Shop now</a>
  </div>


</div> {/*...........card box.......................section 2 ends.............................................. */}


{/* womens and mens shopping............. section 3 starts.................................... */}
<div className='mens-shopping-container'>
<h3>Women's shopping</h3>
  <div className='men-shopping-sub-container'>
   <div className='s-b-chudi-sub-container' id='bag-main1-container'>
   <h4>Bags</h4>
    <div className='saree-shoe-chudidar-img'>
      <a href=''><img src={require('../assests/desktop assests/bag-card.jpg')}></img></a>
    </div>
    <div className='rotate-btn-container'><button id='rotate-down-up-btn' onClick={ShowBags}>{isShowBag ? 'Show less' : 'Show more'}
      <div id='rotateBag-arrow'>&#10095;</div></button><p id='new-arrivals'>New Arrivals</p></div>
   </div>
   
   <div className='s-b-chudi-sub-container'>
   <h4>Chudidar's</h4>
   <div className='saree-shoe-chudidar-img '>      
    <a href=''><img src={require('../assests/desktop assests/chudidar-card.jpg')}></img></a>
    </div>
   <a href='' className='item-reach-link'>Shop now</a>
   </div>

   <div className='s-b-chudi-sub-container'>
   <h4>Saree</h4>
    <div className='saree-shoe-chudidar-img'>
      <a href=''><img src={require('../assests/desktop assests/saree-img-card.jpg')}></img></a>
    </div>    
   <a href='' className='item-reach-link'>Shop now</a>
   </div>
    
   <div className='s-b-chudi-sub-container' id='bag-main2-container'>
   <h4>Bags</h4>
    <div className='saree-shoe-chudidar-img'>
      <a href=''><img src={require('../assests/desktop assests/bag-card.jpg')}></img></a>
    </div>
    <div className='rotate-btn-container'><button id='rotate-down-up-btn' onClick={ShowBags}>{isShowBag ? 'Show less' : 'Show more'}
      <div id='rotateBag-arrow'>&#10095;</div></button></div>
   </div>

  </div>

  <div className='bag-main-container'><button className='bag-arrow bag-left-arrow' >&#10094;</button><button className='bag-arrow bag-right-arrow'>&#10095;</button> 
  <div className='bag-car-box'>
      <div className='bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/bag-card.jpg')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>lovis vitton</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
{/* crads....... */}
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Caprese Miranda Laptop Bag.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Caprese Miranda Laptop Bag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Caprese Trinity Laptop Bag.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Caprese Trinity Laptop Bag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Lavie Luxe Mono Marsh White Handbag.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Luxe Mono Marsh White Handbag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require(`../assests/desktop assests/Lavie Luxe White Medium Women's Dazzle Frame Satchel Bag.webp`)}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Luxe Dazzle Frame Satchel Bag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Lavie Shelly Dark Pink Satchel Bag.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Shelly Dark Pink Satchel Bag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Lavie Luxe Jorie Mint Medium Satchel Handbag.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Luxe Jorie Mint Medium Satchel Handbag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Lavie Luxe Label Black Small Satchel.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Luxe Label Black Small Satchel</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Lavie Luxe Mono Marsh  Choco Handbag.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Luxe Mono Marsh Choco Handbag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Lavie Luxe Stud Shelly Mint Medium Satchel.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Luxe Stud Shelly Mint Medium Satchel</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/Lavie Luxe Trapez Navy Satchel Handbag.webp')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Luxe Trapez Navy Satchel Handbag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
<div className=' bag-slide-card'>
        <div className='bag-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-bag-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require(`../assests/desktop assests/Lavie Luxe White Medium Women's Dazzle Frame Satchel Bag.webp`)}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>Lavie Luxe White Medium Women's Dazzle Frame Satchel Bag</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
{/* cards.............. */}

      </div> 
  </div>
  </div>







<div className='mens-shopping-container'>
<h3>Men's shopping</h3>
  <div className='men-shopping-sub-container'>
   <div className='s-b-chudi-sub-container' id='bag-main1-container'>
   <h4>Shoes</h4>
    <div className='saree-shoe-chudidar-img'>
      <a href=''><img src={require('../assests/desktop assests/shoe-card.webp')}></img></a>
    </div>
    <div className='rotate-btn-container'><button id='rotate-down-up-btn' onClick={ShowShoe}>
      {isShowShoe ? 'Show less' : 'Show more'}<div id='rotate-arrow'>&#10095;</div></button></div>
   </div>
   
   <div className='s-b-chudi-sub-container'>
   <h4>Suit's</h4>
   <div className='saree-shoe-chudidar-img '>      
    <a href=''><img src={require('../assests/desktop assests/suit-card.jpg')}></img></a>
    </div>
   <a href='' className='item-reach-link'>Shop now</a>
   </div>

   <div className='s-b-chudi-sub-container'>
   <h4>Jeans</h4>
    <div className='saree-shoe-chudidar-img'>
      <a href=''><img src={require('../assests/desktop assests/jeans-card.jpg')}></img></a>
    </div>    
   <a href='' className='item-reach-link'>Shop now</a>
   </div>

   <div className='s-b-chudi-sub-container' id='bag-main2-container'>
   <h4>Shoes</h4>
    <div className='saree-shoe-chudidar-img'>
      <a href=''><img src={require('../assests/desktop assests/shoe-card.webp')}></img></a>
    </div>
    <div className='rotate-btn-container'><button id='rotate-down-up-btn' onClick={ShowShoe}>
      {isShowShoe ? 'Show less' : 'Show more'}<div id='rotate-arrow'>&#10095;</div></button></div>
   </div>   
  </div>

  <div className='shoe-bag-main-container'><button className='shoe-arrow shoe-left-arrow' >&#10094;</button><button className='shoe-arrow shoe-right-arrow'>&#10095;</button> 
  <div className='shoe-car-box'>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoe-card.webp')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acer aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>

      {/* .sad..asd.as.d.as.d.asd.as.d.ad.a.d */}
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><a href=''><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card1.jpg')}></img></a></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acer aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card2.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card3.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card4.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card5.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card6.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card7.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card8.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card9.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card10.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>
      <div className=' shoe-slide-card'>
        <div className='shoe-slide-img'>
          <span id='per-offer'>10% off</span>
          <div className='all-shoe-slide-image-box'><img className='all-shoe-slide-Images' src={require('../assests/desktop assests/shoes images/card1.jpg')}></img></div>
          <button id='add-cart-btn'>Add to Cart</button>
        </div>
        <div className='carousel-content'>
        <p id='prod-name'>acre aspire 7</p>
        <div><p>{svg}<price>44545 <disprice>{svg1}50000</disprice></price></p></div>
      </div>
      </div>


   </div> 
  </div>
  </div>{/*........................... section 3 ends here....................................... */}




</div>


  </>)
}

export default AllProducts;