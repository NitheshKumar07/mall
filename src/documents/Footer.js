import React from 'react'

const Footer = () => {
  return (
    <footer>
    <div className='footer-sub'>
      <div className='footer-sec-1'>
        <p id='sec-1-head'>SHOP CATEGORIES</p>
        <a>GAMING ACCESSORIES</a>
        <a>MEN'S SHOES</a>
        <a>MEN'S JEANS</a>
        <a>MEN'S SUITS</a>
        <a>SAREE</a>
        <a>CHUDIDAR</a>
        <a>HANDBAGS</a>
        <a>MOBILE</a>
        <a>LAPTOP</a>
        <a>WATCH</a>
      </div>
      <div className='footer-sec-2'>
        <p>FOLLOW US  ON</p>
        <a target='blank'><img src={require('../assests/twtitterFooter.png')} /></a>
        <a target='blank'><img src={require('../assests/instaFooter.avif')} /></a>
      </div>
      <p className='copywright'>© ShoppersStop. 2024. All Rights Reserved.</p> {/* footer-sec-3 */}
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

  </footer>
  )
}

export default Footer