import React from 'react'
import { useLocation } from 'react-router';

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;

  const svgTwitter = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg>;
  const svgInsta = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
  const svgFace = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
  return (
    <>
    {path !== '/login' && path !== '/signup' &&
    (
    <footer>
    <div className='footer-sub'>
      <div className='footer-sec-1'>
        <p id='sec-1-head'>SHOP CATEGORIES</p>
        <a href='/gamepage'>GAMING ACCESSORIES</a>
        <a href='/chudidarpage'>SALWAR KAMEEZ</a>
        <a href='/handbagpage'>HANDBAGS</a>
        <a href='/sareepage'>SAREE</a>
        <a href='/shoepage'>MEN'S SHOE</a>
        <a href='/jeanspage'>MEN'S JEANS</a>
        <a href='/suitpage'>MEN SUITS</a>
        <a href='/phonepage'>MOBILE</a>
        <a href='/laptoppage'>LAPTOP</a>
        <a href='/watchpage'>WATCH</a>
      </div>
      <div className='footer-sec-2'>
        <p id='foll'>FOLLOW US  ON</p>
        <a target='blank' className='footImg footTwitt'>{svgTwitter}</a>
        <a target='blank' className='footImg footInsta'>{svgInsta}</a>
        <a target='blank' className='footImg footFace' href='https://www.facebook.com/profile.php?id=61562910386322&mibextid=ZbWKwL'>{svgFace}</a>
      </div>
    </div>

    <div className='footer-sec-4'>
      <h4>Fashion Footwear</h4>
      <p>Good shoes take you to good places, and the right pair can definitely get you through many muddy situations.
        Shop from an exhaustive collection of casual, formal and sports shoes for men. Loafers, oxfords, boots, brogues and sneakers can carry you wherever you roam whether it’s at work or play.
        Running shoes for men from Altlife, Adidas, Skechers, Reebok and more will always keep you at the top of your footwear game.</p>

      <h4>Stylish Fashion Accessories for Men and Women</h4>
      <p>Offering the best fashion accessories for men and women to add that stylish finishing touch to your outfits. Complement your smart workwear with analogue, digital and smartwatches,
        coordinate's to your clothing are small but significant details that will definitely help you command attention.
        Do a truly fierce airport look with handbags and mobile accessories to match. As for fashion jewellery, opt for your personal preference whether you like minimalistic jewellery or statement pieces that sparkle and shine.</p>

      <h4>Men’s Clothing and Accessories</h4>
      <p>Give your wardrobe a makeover with men’s apparel and accessories that’ll take you from the boardroom to an ocassion.
        Brands that you should definitely check out are BLACKBERRY, PAUL SMITH and may more for Suits that retails smart men’s clothing like formal. Check out Alt Life for cool casuals jeans that will keep you looking confident and feeling comfortable.
        Whether it’s casual or an ocassion you’ll find something for you that’s versatile and reliable to complete your look.</p>

      <h4>Trendy Women’s Clothing and Accessories</h4>
      <p> destination for online shopping for women that offers the latest fashion picks from the best brands.
        whether it is women’s ethnic wear like Chudidars from exclusive brands like Haute Curry and Fratini. Celebrate in festive wear with gorgeous sparkly Sarees fro top designers and brands.
        To enhance your style further, choose from the massive collection of handbags and other fashion accessories that are sure to become part of your go-to collection for all occasions.
        Work out for maximum burn with activewear in ultra-supportive styles and soft moisture-wicking fabrics.</p>
    </div>
    <p className='copywright'>© Mall. 2024. All Rights Reserved.</p> {/* footer-sec-3 */}

  </footer>)
    }
    </>
  )
}

export default Footer