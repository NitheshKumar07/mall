import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import '../stylesheets/soloLaptop.css'
import { useCart } from './CartProvider'
import SmallLoader from './SmallLoader'

// .............................................................................................

const SoloShoe = () => {
  const{ addToCart} = useCart();

  const [mobile,setMobile] = useState([]);


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
    
    const shoeSizes = ['7', '8', '9', '10', '11'];

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
  

    const collapsedHeight = parseInt('65px');
    useEffect(() => {
      // Dynamically calculate the full height of the content when "Show More" is clicked
      if(contentRef.current){      
        const fullHeight = contentRef.current.scrollHeight;
        setIsOverflowing(fullHeight > collapsedHeight);
        setContentHeight(ShowMore ? fullHeight+'px' : collapsedHeight);
      }
    },[ShowMore,soloLaptopDetails])

    const svg = <svg id='carousel-content-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" /></svg>
    const svg1 = <svg id='carousel-content-svg1' fill='rgb(161, 159, 159)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" /></svg>
  
    const CART = <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.95491 6.43502C3.15547 6.2555 3.41519 6.15625 3.68435 6.15625L16.3156 6.15625C16.5847 6.15625 16.8444 6.2555 17.045 6.43502C17.2456 6.61453 17.3729 6.8617 17.4026 7.12922L18.5137 17.1292C18.5307 17.2821 18.5153 17.4368 18.4684 17.5834C18.4215 17.7299 18.3442 17.8648 18.2416 17.9794C18.1391 18.0941 18.0134 18.1858 17.873 18.2485C17.7326 18.3113 17.5805 18.3438 17.4267 18.3438H2.57324C2.41942 18.3438 2.26732 18.3113 2.12689 18.2485C1.98646 18.1858 1.86085 18.0941 1.75826 17.9794C1.65567 17.8648 1.57841 17.7299 1.53153 17.5834C1.48465 17.4368 1.46919 17.2821 1.48618 17.1292L2.59729 7.12922C2.62702 6.86169 2.75434 6.61453 2.95491 6.43502ZM3.68435 7.09375C3.6459 7.09375 3.6088 7.10793 3.58015 7.13357C3.55149 7.15922 3.53331 7.19453 3.52906 7.23274L2.41795 17.2327C2.41552 17.2546 2.41773 17.2767 2.42443 17.2976C2.43112 17.3186 2.44216 17.3378 2.45682 17.3542C2.47147 17.3706 2.48942 17.3837 2.50948 17.3926C2.52954 17.4016 2.55127 17.4062 2.57324 17.4062H17.4267C17.4486 17.4062 17.4704 17.4016 17.4904 17.3926C17.5105 17.3837 17.5284 17.3706 17.5431 17.3542C17.5577 17.3378 17.5688 17.3186 17.5755 17.2976C17.5822 17.2767 17.5844 17.2546 17.582 17.2327L16.4708 7.23274C16.4666 7.19453 16.4484 7.15922 16.4198 7.13357C16.3911 7.10793 16.354 7.09375 16.3156 7.09375L3.68435 7.09375Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10 3.1355C9.29552 3.1355 8.61989 3.41535 8.12175 3.9135C7.6236 4.41164 7.34375 5.08727 7.34375 5.79175L7.34375 8.29175C7.34375 8.55063 7.13388 8.7605 6.875 8.7605C6.61612 8.7605 6.40625 8.55063 6.40625 8.29175L6.40625 5.79175C6.40625 4.83863 6.78488 3.92454 7.45884 3.25058C8.13279 2.57662 9.04688 2.198 10 2.198C10.9531 2.198 11.8672 2.57662 12.5412 3.25058C13.2151 3.92454 13.5938 4.83863 13.5938 5.79175V8.29175C13.5938 8.55063 13.3839 8.7605 13.125 8.7605C12.8661 8.7605 12.6562 8.55063 12.6562 8.29175V5.79175C12.6562 5.08727 12.3764 4.41164 11.8783 3.9135C11.3801 3.41535 10.7045 3.1355 10 3.1355Z" fill="white"/>
    </svg>

    const lightwgt = <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clip-rule="evenodd" d="M11.3254 18.0952L10.1155 12.471L14.6739 11.9697C14.8399 12.5268 14.9558 12.9249 15.0572 13.2729L15.0572 13.2729L15.0572 13.273C15.2453 13.9187 15.3832 14.3921 15.6975 15.3896C16.2182 17.0419 17.3888 18.3997 18.8024 19.2984L19.0429 19.4514C20.2016 20.1889 21.6017 21.0801 22.9805 21.7745C24.4198 22.4992 26.0009 23.0988 27.3322 22.9524C29.1829 22.7489 29.7537 23.2028 29.878 23.3842C29.994 23.5536 29.9107 23.7243 29.8467 23.7662C29.8459 23.7662 29.8122 23.7828 29.7248 23.8087C29.6308 23.8366 29.5055 23.8664 29.3487 23.8969C29.0353 23.9579 28.6355 24.0142 28.1857 24.065C27.2881 24.1663 26.2391 24.2404 25.383 24.2903C24.3628 24.3498 23.3309 24.259 22.2475 24.1466C22.0483 24.126 21.8527 24.1087 21.6602 24.0947C21.576 24.3329 21.4617 24.5593 21.3202 24.7685C21.4933 25.0244 21.6255 25.306 21.712 25.6032C21.8372 25.6135 21.9641 25.6253 22.0928 25.6386C23.1758 25.7509 24.3162 25.855 25.4702 25.7878C26.3359 25.7373 27.4163 25.6613 28.3539 25.5555C28.8216 25.5027 29.2659 25.4412 29.6353 25.3693C29.967 25.3048 30.3527 25.2124 30.6171 25.0534C31.3951 24.5854 31.7381 23.4454 31.1155 22.5365C30.4994 21.6371 29.1588 21.2425 27.1682 21.4614C26.3146 21.5553 25.086 21.1552 23.6552 20.4347C22.3467 19.7758 21.0065 18.923 19.8353 18.1777L19.6072 18.0325C18.4415 17.2915 17.5261 16.2016 17.1281 14.9388C16.8179 13.9544 16.6865 13.503 16.5024 12.8706L16.5024 12.8704C16.3896 12.4833 16.2572 12.0283 16.0519 11.3418C15.8801 10.7671 15.3206 10.3895 14.7176 10.4558L9.67621 11.0103C8.93978 11.0913 8.435 11.7914 8.59081 12.5157L9.85897 18.4107C9.97855 18.9665 9.87236 19.5803 9.59452 20.1792C9.0675 21.3151 8.63876 22.7576 8.87564 24.0507C8.99813 24.7193 9.30117 25.3566 9.86041 25.8644C9.94859 25.9444 10.0418 26.0201 10.14 26.0913C10.1574 25.9415 10.1862 25.7928 10.2263 25.6467C10.3123 25.3334 10.449 25.0369 10.6304 24.7685C10.449 24.5002 10.3123 24.2036 10.2263 23.8904C10.1222 23.5111 10.0944 23.1149 10.1445 22.7248C10.1947 22.3346 10.3218 21.9584 10.5185 21.6177C10.5908 21.4926 10.6719 21.3731 10.7611 21.2603C10.8211 21.1099 10.886 20.9596 10.9552 20.8105C11.3292 20.0044 11.5316 19.0535 11.3254 18.0952Z" fill="#222222"/>
    <path d="M16.6982 23.4863C17.1094 22.8291 17.6355 22.1107 18.1074 21.8385C18.2749 21.739 18.4604 21.6737 18.6533 21.6465C18.8462 21.6193 19.0426 21.6306 19.231 21.6799C19.4195 21.7291 19.5963 21.8153 19.7512 21.9334C19.9061 22.0515 20.0361 22.1992 20.1335 22.3679C20.2309 22.5366 20.2938 22.7229 20.3187 22.9161C20.3435 23.1093 20.3297 23.3055 20.2782 23.4934C20.2266 23.6812 20.1383 23.857 20.0182 24.0104C19.8982 24.1639 19.749 24.2919 19.5791 24.3873C19.1072 24.66 18.2224 24.7552 17.4474 24.7837" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.4474 24.7534C18.2224 24.781 19.1072 24.8771 19.5791 25.1499C19.749 25.2452 19.8982 25.3733 20.0182 25.5267C20.1383 25.6802 20.2266 25.8559 20.2782 26.0437C20.3297 26.2316 20.3435 26.4278 20.3187 26.621C20.2938 26.8142 20.2309 27.0006 20.1335 27.1692C20.0361 27.3379 19.9061 27.4856 19.7512 27.6037C19.5963 27.7218 19.4195 27.808 19.231 27.8572C19.0426 27.9065 18.8462 27.9178 18.6533 27.8906C18.4604 27.8634 18.2749 27.7981 18.1074 27.6987C17.6355 27.4264 17.1094 26.708 16.6982 26.0508" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.7258 26.0357C17.0891 26.7205 17.4483 27.535 17.4483 28.08C17.4483 28.4703 17.2932 28.8446 17.0172 29.1206C16.7412 29.3966 16.3669 29.5517 15.9766 29.5517C15.5863 29.5517 15.2119 29.3966 14.9359 29.1206C14.6599 28.8446 14.5049 28.4703 14.5049 28.08C14.5049 27.535 14.8641 26.7205 15.2274 26.0357" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.2535 26.0509C14.8424 26.7081 14.3162 27.4265 13.8444 27.6988C13.6769 27.7982 13.4913 27.8635 13.2984 27.8907C13.1056 27.9179 12.9092 27.9066 12.7207 27.8573C12.5323 27.8081 12.3554 27.7219 12.2005 27.6038C12.0456 27.4857 11.9157 27.338 11.8183 27.1694C11.7209 27.0007 11.6579 26.8143 11.6331 26.6211C11.6083 26.4279 11.622 26.2317 11.6736 26.0438C11.7252 25.856 11.8135 25.6803 11.9335 25.5268C12.0535 25.3734 12.2028 25.2453 12.3727 25.15C12.8445 24.8772 13.7294 24.782 14.5043 24.7535" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5043 24.7837C13.7294 24.7561 12.8445 24.66 12.3727 24.3872C12.2028 24.2919 12.0535 24.1638 11.9335 24.0104C11.8135 23.8569 11.7252 23.6812 11.6736 23.4934C11.622 23.3055 11.6083 23.1093 11.6331 22.9161C11.6579 22.7229 11.7209 22.5365 11.8183 22.3678C11.9157 22.1992 12.0456 22.0515 12.2005 21.9334C12.3554 21.8153 12.5323 21.7291 12.7207 21.6799C12.9092 21.6306 13.1056 21.6193 13.2984 21.6465C13.4913 21.6737 13.6769 21.739 13.8444 21.8384C14.3162 22.1107 14.8424 22.8291 15.2535 23.4863" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.2274 23.5016C14.8641 22.8168 14.5049 22.0023 14.5049 21.4573C14.5049 21.067 14.6599 20.6926 14.9359 20.4166C15.2119 20.1406 15.5863 19.9856 15.9766 19.9856C16.3669 19.9856 16.7412 20.1406 17.0172 20.4166C17.2932 20.6926 17.4483 21.067 17.4483 21.4573C17.4483 22.0023 17.0891 22.8168 16.7258 23.5016" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.9766 26.2404C16.7894 26.2404 17.4483 25.5815 17.4483 24.7687C17.4483 23.9559 16.7894 23.297 15.9766 23.297C15.1638 23.297 14.5049 23.9559 14.5049 24.7687C14.5049 25.5815 15.1638 26.2404 15.9766 26.2404Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#222222"/>
    </svg> 
    const sole = <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.4645 12.836L12.0997 10.1774C12.0595 9.88456 12.2807 9.62099 12.576 9.60974L17.111 9.43707C17.3601 9.42758 17.5782 9.60447 17.6229 9.84965C17.734 10.458 17.814 10.8709 17.881 11.1729C18.1356 12.3207 19.0241 13.2212 19.9334 13.9664C21.9714 15.6367 25.0255 18.3018 27.112 18.3018C30.6085 18.3018 30.382 20.2603 29.5743 20.6433C29.1397 20.8495 27.4755 20.8337 26.031 20.7752C24.4928 20.7129 23.0014 20.2841 21.4956 19.964C20.0118 19.6485 18.861 19.7446 17.488 20.0552C15.9872 20.3947 14.4127 20.7982 12.9573 20.2988C10.3413 19.4012 10.9014 16.9445 11.95 15.1033C12.3438 14.412 12.5727 13.6243 12.4645 12.836Z" stroke="#222222" stroke-width="1.5"/>
    <path fillRule="evenodd" clip-rule="evenodd" d="M13.0494 23.8751C13.9569 23.6416 14.6268 23.2874 15.3574 22.9012C15.6088 22.7683 15.8675 22.6316 16.1455 22.4947C17.2498 21.9508 18.4899 21.5148 20.3706 21.6441C21.7367 21.738 23.4024 22.3427 24.7791 22.872C24.982 22.9501 25.1786 23.0265 25.3686 23.1004L25.3692 23.1006C25.8466 23.2862 26.282 23.4555 26.6695 23.5924C27.2441 23.7954 27.5764 23.8745 27.716 23.8745C27.7258 23.8745 27.7355 23.8747 27.7452 23.8751H28.2362C29.1724 23.8751 30.0349 23.3667 30.4883 22.5476C30.6889 22.1852 31.1453 22.054 31.5077 22.2546C31.8701 22.4552 32.0013 22.9116 31.8007 23.274C31.083 24.5705 29.718 25.3751 28.2362 25.3751H12.4438C11.1292 25.3751 9.91068 24.6868 9.23208 23.5609L9.07359 23.298C8.85976 22.9432 8.97401 22.4823 9.32877 22.2684C9.68352 22.0546 10.1444 22.1689 10.3583 22.5236L10.5168 22.7866C10.9239 23.4621 11.6551 23.8751 12.4438 23.8751H13.0494ZM23.1744 23.8751C22.1176 23.4986 21.094 23.1974 20.2678 23.1406C18.7216 23.0343 17.7478 23.3776 16.8082 23.8403C16.785 23.8518 16.7617 23.8634 16.7383 23.8751H23.1744Z" fill="#222222"/>
    <path d="M13.4307 30.5795V27.0795M13.4307 27.0795L11.9307 28.5795M13.4307 27.0795L14.9307 28.5795" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.4307 30.5795V27.0795M20.4307 27.0795L18.9307 28.5795M20.4307 27.0795L21.9307 28.5795" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.4307 30.5795V27.0795M27.4307 27.0795L25.9307 28.5795M27.4307 27.0795L28.9307 28.5795" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.541 15.8136C14.541 15.8136 14.041 16.8136 14.7412 17.0863" stroke="#222222" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="0.930664" y="0.5" width="39" height="39" rx="19.5" stroke="#222222"/>
    </svg>
    const skid = <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#222222"/>
    <path d="M13.0936 23.1242C9.96475 26.4084 10.5519 28.7757 11.4623 29.9827C11.595 30.1586 11.7582 30.3107 11.944 30.4292C14.2361 31.8918 17.1505 29.7362 17.8215 28.4816C22.0157 22.0946 25.152 21.9926 27.18 18.2861C29.6397 13.435 29.8064 10.9126 28.2597 9.61894C28.1128 9.49607 27.9446 9.39856 27.7681 9.32426C24.0873 7.77496 19.7955 11.7295 18.5243 14.5028C17.2227 17.3423 15.0929 21.0256 13.0936 23.1242Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5689 9.78842C22.1717 9.67093 21.7545 9.89769 21.637 10.2949C21.5195 10.6921 21.7463 11.1093 22.1435 11.2268C22.6389 11.3734 23.0555 11.5308 23.4118 11.6966C23.114 11.9147 22.8198 12.1647 22.5387 12.4365C21.9263 12.1001 21.2271 11.7985 20.4068 11.5477C20.0107 11.4266 19.5914 11.6496 19.4703 12.0457C19.3492 12.4418 19.5721 12.8611 19.9682 12.9822C20.5541 13.1613 21.0661 13.3683 21.523 13.5972C21.2981 13.9031 21.0982 14.2175 20.9325 14.5309C20.8803 14.6296 20.8285 14.7255 20.777 14.819C20.2328 14.4953 19.6296 14.2014 18.9531 13.957C18.5635 13.8162 18.1336 14.0179 17.9928 14.4075C17.8521 14.797 18.0538 15.2269 18.4433 15.3677C19.0166 15.5749 19.5302 15.8237 19.9982 16.101C19.787 16.4173 19.576 16.7123 19.3607 17.0047C18.8438 16.6247 18.2915 16.3113 17.6918 16.1415C17.2932 16.0286 16.8787 16.2602 16.7658 16.6587C16.6529 17.0572 16.8845 17.4718 17.283 17.5847C17.6762 17.6961 18.0607 17.9097 18.4647 18.2076C18.2409 18.5125 18.0082 18.8376 17.7657 19.1958C17.3569 18.8816 16.9177 18.6065 16.4354 18.4159C16.0501 18.2637 15.6145 18.4527 15.4623 18.8379C15.3101 19.2232 15.499 19.6588 15.8843 19.811C16.6275 20.1046 17.2723 20.7094 18.1087 21.5175L18.1497 21.5571C18.9418 22.3225 19.873 23.2223 21.1032 23.8674C21.47 24.0598 21.9233 23.9183 22.1157 23.5515C22.3081 23.1847 22.1666 22.7313 21.7998 22.539C21.4352 22.3478 21.1001 22.1286 20.7829 21.89C21.047 21.4801 21.2782 21.1802 21.4913 20.9453C21.9929 21.3748 22.5354 21.7898 23.1272 22.1434C23.4828 22.3559 23.9433 22.2399 24.1557 21.8843C24.3682 21.5288 24.2522 21.0683 23.8966 20.8558C23.4611 20.5955 23.0556 20.2965 22.6663 19.9743C22.94 19.7781 23.2532 19.545 23.5907 19.2451C24.0263 19.6817 24.4806 20.106 24.9761 20.4478C25.3171 20.683 25.7842 20.5973 26.0194 20.2563C26.2545 19.9153 26.1688 19.4483 25.8278 19.2131C25.4343 18.9417 25.0458 18.5817 24.6109 18.1437C24.6092 18.1421 24.6075 18.1404 24.6058 18.1387C24.8861 17.7763 25.1777 17.3604 25.461 16.9208C25.8389 17.3006 26.2452 17.6845 26.7046 18.0529C27.0278 18.3121 27.4998 18.2603 27.759 17.9371C28.0181 17.614 27.9663 17.142 27.6432 16.8828C27.1391 16.4785 26.6973 16.0445 26.2529 15.5861C26.2972 15.5047 26.3406 15.4234 26.383 15.3424C26.494 15.1304 26.6005 14.9168 26.6999 14.7045C27.0573 15.0373 27.4857 15.3655 28.0295 15.6634C28.3927 15.8625 28.8486 15.7293 29.0476 15.3661C29.2466 15.0028 29.1135 14.547 28.7503 14.3479C28.0814 13.9815 27.6688 13.5915 27.2827 13.1495C27.3549 12.8618 27.402 12.5662 27.3944 12.2875C27.3862 11.987 27.3102 11.5979 27.01 11.2992C26.5065 10.7981 25.8514 10.7128 25.2646 10.8182C25.181 10.8332 25.0973 10.8522 25.0137 10.8748C24.4037 10.4713 23.6265 10.1012 22.5689 9.78842ZM24.7849 12.5902C24.9933 12.7788 25.1719 12.9714 25.3397 13.1653C25.4254 13.2644 25.5111 13.368 25.5987 13.4752C25.4794 13.7773 25.3287 14.1076 25.1539 14.4529C25.0268 14.3267 24.8972 14.201 24.7648 14.0771C24.4743 13.8053 24.167 13.5388 23.8327 13.2825C24.0329 13.1057 24.2382 12.9443 24.4432 12.804C24.5613 12.7231 24.6755 12.6519 24.7849 12.5902ZM22.8057 14.3866C22.5934 14.6651 22.407 14.9513 22.2585 15.232C22.1775 15.3852 22.0973 15.5324 22.0177 15.6744C22.4474 16.0127 22.8355 16.3629 23.194 16.7086C23.3127 16.823 23.4301 16.939 23.5457 17.0549C23.8166 16.692 24.1062 16.2659 24.3878 15.8113C24.1761 15.594 23.9637 15.3818 23.7399 15.1724C23.449 14.9001 23.1426 14.6366 22.8057 14.3866ZM22.5413 18.1719C22.4159 18.0456 22.2873 17.918 22.1528 17.7884C21.8611 17.5071 21.5551 17.2292 21.2267 16.9624C20.9859 17.3218 20.7475 17.6524 20.508 17.9762C20.625 18.0853 20.7403 18.1948 20.8543 18.3035C20.956 18.4006 21.0572 18.4979 21.1582 18.5949L21.1588 18.5955L21.1588 18.5955C21.2804 18.7123 21.4017 18.8288 21.5232 18.9445C21.5908 18.896 21.6565 18.8494 21.7215 18.8035L21.7215 18.8035C21.9869 18.6159 22.2386 18.4379 22.5413 18.1719ZM20.3849 19.9324C20.2956 19.8469 20.2077 19.7623 20.1211 19.679L20.1209 19.6788C20.0182 19.58 19.9175 19.483 19.8184 19.3885C19.7467 19.32 19.676 19.2529 19.6064 19.1875C19.3785 19.4995 19.1451 19.829 18.9002 20.1969C18.9705 20.2644 19.0401 20.3316 19.1092 20.3983L19.1509 20.4387C19.313 20.5952 19.474 20.7507 19.6362 20.9037C19.9012 20.5077 20.1472 20.1938 20.3849 19.9324ZM13.249 22.8736C12.8507 22.7599 12.4356 22.9905 12.3218 23.3888C12.2081 23.7871 12.4387 24.2022 12.837 24.316C13.31 24.4511 13.6345 24.562 13.8713 24.662C13.6317 24.8766 13.4073 25.1343 13.2286 25.4181C13.2243 25.4249 13.2201 25.4317 13.2159 25.4385C13.2048 25.4421 13.1937 25.446 13.1827 25.4501C13.0162 25.5126 12.752 25.5078 12.3144 25.4501C12.2742 25.4448 12.2314 25.4389 12.1869 25.4328L12.1869 25.4328C12.0274 25.4109 11.8457 25.386 11.6834 25.3736C11.4832 25.3583 11.1994 25.3501 10.9269 25.44C10.5335 25.5699 10.3199 25.994 10.4497 26.3873C10.5789 26.7788 10.9996 26.9922 11.3913 26.8663L11.3906 26.8667C11.3906 26.8668 11.392 26.8667 11.3948 26.8665C11.409 26.8653 11.46 26.8609 11.5692 26.8693C11.6824 26.8779 11.8013 26.8942 11.9498 26.9145C12.002 26.9216 12.0578 26.9292 12.1184 26.9372C12.3177 26.9635 12.5756 26.9961 12.8548 26.9951C12.8872 27.1781 12.9488 27.3567 13.0422 27.5258C12.8133 27.8403 12.57 28.2051 12.3627 28.518L12.2786 28.6448C12.1562 28.8298 12.0473 28.9943 11.9565 29.1269C11.9009 29.208 11.8574 29.2694 11.8255 29.3119C11.8154 29.3253 11.8081 29.3347 11.8033 29.3407C11.5239 29.6147 11.5012 30.0623 11.7596 30.3637C12.0291 30.6782 12.5026 30.7147 12.8171 30.4451C12.9103 30.3653 12.9887 30.2609 13.0249 30.2127C13.0765 30.1441 13.1344 30.0616 13.1941 29.9744C13.2922 29.8312 13.4093 29.6542 13.532 29.4689L13.5322 29.4687L13.6129 29.3468C13.8271 29.0237 14.0479 28.6941 14.2417 28.4265C14.4384 28.4683 14.6386 28.4753 14.8347 28.4526C14.9463 28.4398 15.0554 28.4176 15.1615 28.3879C15.1669 28.3988 15.1723 28.4096 15.1777 28.4204C15.2261 28.5175 15.2719 28.6096 15.324 28.7213C15.4916 29.0804 15.5885 29.3727 15.5885 29.6313C15.5885 30.0456 15.9243 30.3813 16.3385 30.3813C16.7527 30.3813 17.0885 30.0456 17.0885 29.6313C17.0885 29.0292 16.8703 28.4877 16.6833 28.087C16.6281 27.9687 16.5616 27.8345 16.5037 27.7179C16.4801 27.6704 16.458 27.6258 16.4387 27.5864C16.5904 27.4273 16.7258 27.2535 16.8387 27.0717C16.8892 27.1154 16.9419 27.1602 16.9963 27.205C17.3145 27.4672 17.7736 27.8049 18.2865 27.9463C18.6858 28.0564 19.0987 27.8219 19.2088 27.4226C19.3189 27.0233 19.0844 26.6103 18.6851 26.5002C18.4964 26.4482 18.2433 26.2889 17.9502 26.0473C17.8125 25.9339 17.6844 25.8183 17.5626 25.7081L17.5438 25.6912C17.4398 25.5971 17.3146 25.4838 17.2093 25.4061C16.5142 24.8928 16.1876 24.5756 15.8983 24.2946L15.8983 24.2946C15.7631 24.1633 15.636 24.0399 15.4833 23.908C14.9794 23.4732 14.4445 23.2151 13.249 22.8736ZM15.6585 26.0973C15.4368 25.9137 15.2523 25.749 15.0968 25.6048C15.0551 25.6322 15.0099 25.6648 14.962 25.7031C14.785 25.8446 14.6177 26.0272 14.498 26.2173C14.3751 26.4124 14.3301 26.5705 14.3277 26.6731C14.3259 26.7471 14.342 26.8094 14.4268 26.8881C14.4981 26.9545 14.5642 26.9739 14.6628 26.9625C14.7858 26.9483 14.9591 26.88 15.1482 26.7354C15.3338 26.5936 15.4925 26.41 15.5932 26.2319C15.6219 26.1811 15.643 26.1362 15.6585 26.0973Z" fill="#222222"/>
    </svg>
    const watsapp = <svg xmlns="http://www.w3.org/2000/svg" fill=' #25d366' viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
    

    const params = useParams();

    useEffect(()=>{
        axios.get(`https://website-api-nu.vercel.app/product/${params.id}`)
        .then((res=>{
            setSoloLaptopDetails(res.data.product);
        }))
    },[params.id])
    
    const currentURL = window.location.href;
    const shareMessage = soloLaptopDetails
    && `Checkout this product:\n${soloLaptopDetails.title}\nPrice: ₹${Number(soloLaptopDetails.price).toLocaleString('en-IN')} ${soloLaptopDetails.discount ? `(${soloLaptopDetails.discount}% OFF)` : ''}\n\n${currentURL}`
    const watsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;

  // load 11 products
  useEffect(() => {
    // setLoading(true);
    
    axios.get('https://website-api-nu.vercel.app/product/category/66e0ac832e6bda2ea8fee821')
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


    const toggleShowMore = () => {
      setShowMore(!ShowMore);
    }


    const navigate = useNavigate();
    // buy
    const buyNow = () => {
      const selectedSize = document.querySelector('input[name="ShoeSize"]:checked')?.value; 
      const token = localStorage.getItem('token');
      if(!token){
        navigate('/login');
        return;
      }else {
        if(!selectedSize){
          alert('please select size');
          return;
        }
      const product = {
        brandName: soloLaptopDetails.brandName,
        _id: soloLaptopDetails._id,
        title: soloLaptopDetails.title,
        price: soloLaptopDetails.price,
        realprice: soloLaptopDetails.realprice,
        discount: soloLaptopDetails.discount,
        size: selectedSize,
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
  const selectedSize = document.querySelector('input[name="ShoeSize"]:checked')?.value; 
  if(!selectedSize){
    alert('please select size');
    return;
  }
  const product = {
    brandName: soloLaptopDetails.brandName,
    _id: soloLaptopDetails._id,
    title: soloLaptopDetails.title,
    price: soloLaptopDetails.price,
    realprice: soloLaptopDetails.realprice,
    discount: soloLaptopDetails.discount,
    size: selectedSize,
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
    window.open('/soloshoe/'+id,'_blank');
  }

  const handleShare = (url) => {
    // securely open in new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (<>
  {cartMessage && <div className={`cart-msg ${messageVisible ? 'cart-msg-move' : ''}`}>{cartMessage}</div>}

  {soloLaptopDetails ? 
  <>
  <div className='soloLaptop-Container allmargin'>
    
  <div className='soloShoeImg-Container'>
      <div className='soloShoeImg-box'>
          <img id='soloShoe-img' alt={soloLaptopDetails.title} src={soloLaptopDetails.photo}/>
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
    <div className='sizeChart'>
        <p>Select Size:</p>
     <div className="shoe-sizes-container">
     {shoeSizes.map((size) => (
            <div key={size}>
                <input type="radio" value={size} name="ShoeSize" id={`size${size}`} />
                <label htmlFor={`size${size}`}>{size}</label>
            </div>
        ))}
     </div>
    </div>
  </div>

  <div className='two-btns'>
    <button id='soloItem-cart-btn' onClick={handleAddtoCart}> {statuscartlabel ? (<SmallLoader/>):(<>{CART} {cartlabel}</>)}</button>
    <button id='soloItem-buy-btn' onClick={buyNow}>{ statusbuylabel ? <SmallLoader/> : 'BUY NOW'}</button>
    </div>

    <div className='svgsContainer'>
    <div className='Solosvg1'>
    <div className='solotruckdiv'><img src={require('../assests/icons8-return-24.png')}/></div>
    <p>7 Days Return</p>
    </div>
    <div className='Solosvg1'>
      <div className='solotruckdiv'><img src={require('../assests/icons8-truck-48.png')}/></div>
      <p>Free Shipping Across India</p>
    </div>
    <div className='Solosvg1'>
      <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#333"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg>
      <p>Pay on Delivery Available</p>
    </div>      
  </div>

  
<div className='lghtCont'>
<div className='lghtwgt'><div>{lightwgt}</div><p>Light & breathable for your feet</p></div>
<div className='lghtwgt'><div>{sole}</div><p>Chunky sole to absorb step impact</p></div>
<div className='lghtwgt'><div>{skid}</div><p>Anti-skid properties for firm grip</p></div>
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

export default SoloShoe;