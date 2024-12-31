import React, { useEffect, useState } from 'react'
import '../stylesheets/postProduct.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'



const UpdateProduct = () => {
  const [brandName,setBrandName] = useState('');
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [img,setImg] = useState(null);
  const [preImage,setPreImage] = useState(null);
  const [label,setLabel] = useState('Select Image');

  const [disPercent,setDisPercent] = useState();
  const [preDisountPrice,setPreDiscountPrice ] = useState();
  // at uploading time
  const [colorFunction, setColorFunction] = useState({ backgroundColor: '', color: '' }); // blur form
  const [buttonClr,setButtonClr] = useState({});

  const [UploadProduct,setUploadProduct] = useState('Upload Product');

  const [isdisabled, setDisabled] = useState(false); // disable inputs

  const [err,setErr] = useState('');
  const [hasErr,setHasErr] = useState(false);

  const [itemColour,setItemColour] = useState(''); // product color 
  const [productCode,setProductCode] = useState(''); //product code
  const [description,setDiscription] = useState(''); //product details

  const [showCategory,setShowCategory] = useState(false);  //show options
  const [SelectedCategory,setSelectedCategory] = useState('Choose Category') //select one option name
  const [SelectedCategoryID,setSelectedCategoryID] = useState(''); //select one option 1d

  const svgRupee=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='bigRupee'>
  <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
const svgRupeeSmall=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='smallRupee'>
  <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
const svgHeart=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='heart'>
  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>  
const infoSvg = <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

const params = useParams();
useEffect(() => {
    axios.get(`https://website-api-nu.vercel.app/product/${params.id}`)
    .then((res=>{
        const product = res.data.product;
        setBrandName(product.brandName);
        setName(product.title);
        setPrice(product.price);
        setDisPercent(product.discount);
        setImg(product.photo);
        setPreImage(product.photo);
        setItemColour(product.colour);
        setDiscription(product.description);
        setProductCode(product.productCode);
        // const department = options.find(options => options.id === product.ctgry);
        // setSelectedCategory(department.name);
    }))
},[params.id])


  const options = [
    {name:'laptop', id:'66b7094e89c2a12074133b29'},
    {name:'mobile', id:'66dde0197a66622cc0734fee'},
    {name:'TV', id:'66e0ab462e6bda2ea8fee817'},
    {name:'AC', id:'66e0ab0a2e6bda2ea8fee815'},
    {name:'fridge', id:'66e0abb42e6bda2ea8fee819'},
    {name:'games', id:'66e0abe62e6bda2ea8fee81b'},
    {name:'chudidars', id:'66e0ac1e2e6bda2ea8fee81d'},
    {name:'saree', id:'66de8d5d74a2d32f040c29ba'},
    {name:`women's handbag`, id:'66e0ac4a2e6bda2ea8fee81f'},
    {name:`men's shoes`, id:'66e0ac832e6bda2ea8fee821'},
    {name:`men's suits`, id:'66e0acbc2e6bda2ea8fee823'},
    {name:`men's jeans`, id:'66e0ace82e6bda2ea8fee825'},
    {name:`watch`, id:'66e863d6e2140616a4dbd9ef'},]
    .sort((a,b)=>a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  function handleCategory (takeCategoryName) {
    const selectProductCategory = options.find(option=>option.name === takeCategoryName); //searches name from array as same to option name
    setSelectedCategory(selectProductCategory.name); //selects category name
    setSelectedCategoryID(selectProductCategory.id); //selects category id
    setShowCategory(false);
    document.querySelector('#select-btn-arrowDown').classList.remove('rotate-sel-cat');
  }
  // load for buttons
  const setButtonLoader = () => {
    setUploadProduct('Uploading...');
    
    setButtonClr({ backgroundColor: '#1e88e572',
    pointerEvents: 'none'});

    setColorFunction({
      backgroundColor: "rgba(128, 128, 128, 0.047)",
      color: 'rgba(0, 0, 0, 0.328)'
    })
  }
  const removeButtonLoader = () => {
    setUploadProduct(UploadProduct);
    setButtonClr({ backgroundColor: '',
      pointerEvents: ''});

    setColorFunction({
     backgroundColor: "",
     color: ''
    })
  }

useEffect(() => {
 if(price)
 {if (price && disPercent) {
  const decimal = disPercent / 100;
    const originalPrice  = price / (1 - decimal);
    setPreDiscountPrice (originalPrice.toFixed(0));
}else{
  setPreDiscountPrice(price);
}}
}, [price, disPercent]);

  const svg=<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
  const svg1=<svg id='svg1' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000"><path d="M564-120 290-404v-66h130q57 0 100-37t50-103H240v-60h325q-13-48-53.5-79T420-780H240v-60h480v60H566q23 20 39 51t23 59h92v60h-90q-8 91-67.5 145.5T420-410h-52l279 290h-83Z"/></svg>
  // image
  const applyImage = (e) => {
    if(e.target.files[0]){
      setLabel(e.target.files[0].name);
    }else{
      setLabel(label)}

    setImg(e.target.files[0]);
    URL.revokeObjectURL((e.target.files[0]));
    setPreImage(URL.createObjectURL(e.target.files[0]));
  }

  const navigate = useNavigate();

  const productform = new FormData();
  productform.append('brandName',brandName);
  productform.append('title',name);
  productform.append('photo',img);
  productform.append('price',price);
  productform.append('realprice',preDisountPrice);
    // Only append discount if it's available
    if (disPercent && disPercent > 0) {
      productform.append('discount', disPercent);
    }
  productform.append('description',description);
  productform.append('colour',itemColour);
  productform.append('productCode',productCode);
  productform.append('ctgry',SelectedCategoryID);

  // loader function

  //post item by submitting form
  const postProduct = (e) => {
    e.preventDefault();
    removeButtonLoader();
    setDisabled(false);
    setShowCategory(false);
    document.querySelector('#select-btn-arrowDown').classList.remove('rotate-sel-cat');


    setButtonLoader();
    setDisabled(true);
    setHasErr(false);    
    axios.put(`https://website-api-nu.vercel.app/product/${params.id}`,productform)
    .then(res=>
      {
        if( SelectedCategoryID === '66dde0197a66622cc0734fee'){navigate('/phonepage');}
        else if(SelectedCategoryID === '66b7094e89c2a12074133b29') {navigate('/laptoppage');}
        else if(SelectedCategoryID === '66e0ab462e6bda2ea8fee817') {navigate('/tvpage');}
        else if(SelectedCategoryID === '66e0ab0a2e6bda2ea8fee815') {navigate('/acpage');}
        else if(SelectedCategoryID === '66e0abb42e6bda2ea8fee819') {navigate('/fridgepage');}
        else if(SelectedCategoryID === '66e0abe62e6bda2ea8fee81b') {navigate('/gamepage');}
        else if(SelectedCategoryID === '66e0ac1e2e6bda2ea8fee81d') {navigate('/chudidarpage');}
        else if(SelectedCategoryID === '66de8d5d74a2d32f040c29ba') {navigate('/sareepage');}
        else if(SelectedCategoryID === '66e0ac4a2e6bda2ea8fee81f') {navigate('/handbagpage');}
        else if(SelectedCategoryID === '66e0ac832e6bda2ea8fee821') {navigate('/shoepage');}
        else if(SelectedCategoryID === '66e0acbc2e6bda2ea8fee823') {navigate('/suitpage');}
        else if(SelectedCategoryID === '66e0ace82e6bda2ea8fee825') {navigate('/jeanspage');}
        else if(SelectedCategoryID === '66e863d6e2140616a4dbd9ef') {navigate('/watchpage');}
        else{navigate('/category');}
      })
      .catch(err=>{
       setTimeout(() => {
        removeButtonLoader();
        setDisabled(false);
        setHasErr(true);
        setErr('Unable to upload product!');
       }, 3000);
      })
  }
  

  return (<>
  <div className='post-Container'>
    <form className='postProducts' onSubmit={postProduct} style={colorFunction}>    
    <h1>Create New Product</h1>
    <hr/>
    {hasErr && <p style={{color:"red" ,fontSize:'1.25rem',textAlign:'center',fontFamily:'monospace,arial'}}>{err}</p>}
    <div className='postItemContainer'>  
   <div className='postItem'>
   <h2>Product Details</h2>
   <div className='select-container'>
    <div className='select-btn' onClick={e=>{setShowCategory(!showCategory);
      document.querySelector('#select-btn-arrowDown').classList.toggle('rotate-sel-cat')}}>
      <p>{SelectedCategory}</p>
      <svg id='select-btn-arrowDown' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"/></svg>
    </div>
    {showCategory && (
      <div className='select-options'>
      {options.map((option)=>
      <div className='select-item' onClick={() => handleCategory(option.name,option.id)} key={option.id} value={option.name}>
        {option.name}</div>)}
      </div>
    )}
   </div>


    <input disabled={isdisabled}type='file' id='select-img' required onChange={applyImage}/>
    <div className='infosvgDiv'>
    <label htmlFor='select-img' id='select-img-btn' style={buttonClr}>{label}</label>
    <abbr title='Re-selecet image atleast once.'>{infoSvg}</abbr>
    </div>

    {/* <input placeholder='Enter Brand Name' disabled={isdisabled} type='text' onChange={(e) => {
      const inputValue = e.target.value;
  // Split into an array of words, sort alphabetically, then join back to a single string
  const sortedValue = inputValue
    .split(" ")
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .join(" ")
    .trim();
    // Set the original input value after sorting and trimming
  setBrandName(sortedValue);}}
  value={brandName}/> */}
  <input placeholder='Enter Brand Name' disabled={isdisabled} type='text' onChange={(e) => {
      setBrandName(e.target.value);
     }} // Directly update the brandName as the user types without sorting
  onBlur={() => {
    // When the user leaves the input, sort and trim the brand na
  const sortedValue = brandName
    .split(" ")
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .join(" ")
    .trim();
    // Set the original input value after sorting and trimming
  setBrandName(sortedValue);}}
  value={brandName}/>


    <input required disabled={isdisabled} type='text' placeholder='Product Name' onChange={e=>setName(e.target.value)} value={name}/>
    <div id='price-dis'>
      <input required disabled={isdisabled}type='text' placeholder='Final Price' onChange={e=>setPrice(e.target.value.trim())} value={price}/>
      <input disabled={isdisabled}type='number' placeholder='% Discount' id='disPercent' onChange={e=>setDisPercent(e.target.value)} value={disPercent}/>
    </div>
    <input type='text' placeholder='Product Colour' onChange={(e)=>setItemColour(e.target.value.trim())} disabled={isdisabled} value={itemColour}/>
    <input type='text' placeholder='Product Code' onChange={(e)=>setProductCode(e.target.value)} disabled={isdisabled} value={productCode}/>
    <textarea disabled={isdisabled} placeholder='Add Product Details' id='description-text' name='description-text' onChange={e=>setDiscription(e.target.value)}
      value={description}/>
   </div>
  

      <div className='mobileItem-container'>
    <div className='mobileItemImg-container'>
        <div className='mobileItemImg-box'><img className='Post-mobileItem-img' alt={name}
        src={preImage || '/default-image-path.jpg'}/></div>
    </div>
    <div className='mobileItemDetails-container'>
      <p style={{fontWeight:'700'}}>{brandName}</p>
      <p className='phoneItem-name'>{name}</p>
      <div className='mobileItemPriceDetail'>
        <div className='mobileItem-Price'>{svgRupee}<p id='mobleItem-realprice'>{Number(price).toLocaleString('en-IN')}</p></div>
        {disPercent && <div className='mobileItem-cancelPrice'>{svgRupeeSmall}
         <p id='mobleItem-cancelprice'>{Number(preDisountPrice).toLocaleString('en-In')}</p>
         <p id='mobileitem-discount'>({disPercent} % off)</p></div>}
      </div>
    </div>
  </div>

    </div>
    <button   id='uploadItem' type='submit' style={buttonClr}>{UploadProduct}</button> 
    </form>

    

    </div>
  </>)
}
export default UpdateProduct;