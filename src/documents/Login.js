import { Link, useNavigate } from 'react-router-dom'
import '../stylesheets/signupLogin.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Login  () {

  const [email,setEmail] = useState('');
  const [psd,setPsd] = useState();
  const [isshowpsd,setShowpsd] = useState('');
  const [isdisabled, setDisabled] = useState(false); // disable inputs
  const [colorFunction, setColorFunction] = useState({ backgroundColor: '', color: '' }); // blur form

  const [buttonClr,setButtonClr] = useState({}); //blur signup button

  const [hasFetchError,setHasfetchError] = useState(false);
  const [printfetchError,setfetchError] = useState('');


  useEffect(()=>{
    document.body.classList.add('loginbody','flexbody');
  return () =>{
   document.body.classList.remove('loginbody','flexbody')} 
  },[])
  // password showing
  const showpsd = () =>{
    setShowpsd(!isshowpsd);
  }

  // form disabling style
  const formDisableStyle = () => {
    setColorFunction({
      backgroundColor: "rgba(128, 128, 128, 0.047)",
      color: 'rgba(0, 0, 0, 0.328)'
    })
  }
  // removing form diabling style
  const NotformDisableStyle = () => {
    setColorFunction({
      backgroundColor: "",
      color: ''
    })
  }
  // signupbutton blur
  const signupButtonLoad = () => {
    setButtonClr({ backgroundColor: '#1e88e572',
      pointerEvents: 'none'})
  }
  // remove signupbutton blur
  const RemovesignupButtonLoad = () => {
    setButtonClr({ backgroundColor: '',
      pointerEvents: ''})
  }
  // pointerNone and blur while loading 
 const pointerNoneBlur = () => {
  document.querySelector('#streching').classList.add('blurLink');
  document.querySelector('#eye').classList.add('pointerNoneLoading');
  document.querySelector('.formanime').classList.add('formanimeLoading');
 }
//  removing pointerNone and blur after loading
const NotpointerNoneBlur = () => {
  document.querySelector('#streching').classList.remove('blurLink');
  document.querySelector('#eye').classList.remove('pointerNoneLoading');
  document.querySelector('.formanime').classList.remove('formanimeLoading');
 }


 let navigate = useNavigate();

//  login handler
  const loginHandler = (event) => {
    event.preventDefault();
    setHasfetchError(false); // not to print error message
    setfetchError('');
  // cancelling all effects of loading and disabling after getting success signup
    setDisabled(false);
    NotformDisableStyle();
    RemovesignupButtonLoad();
    NotpointerNoneBlur();
  

      setDisabled(true);
      formDisableStyle();
      signupButtonLoad();
      pointerNoneBlur();
    // for posting
    const formData = new FormData();
    formData.append('userName', email);
    formData.append('password', psd);
      axios.post("http://www.localhost:3000/user/login",formData)
      .then(res => {
        setTimeout(() => {
          console.log('res:',res);
        console.log('logged in');
        navigate('/');
        }, 3000);
      }) 
      .catch(err => {
        setTimeout(() => {
        setDisabled(false);
        NotformDisableStyle();
        RemovesignupButtonLoad();
        NotpointerNoneBlur();
        console.log(err);
        setHasfetchError(true);
        setfetchError(err.response.data.msg);
        }, 5000);
      })
    


  }

    return (<div className="loginComponent">
      {hasFetchError && <p id='printErrSignup' style={{textAlign:"center",fontSize:'1.2em'}}>{printfetchError}</p>}
      <div className='formanime' />

     <form className='form' onSubmit={loginHandler} style={colorFunction}>
     
    <h1>Login <b>Mall</b></h1>
      <div className='signupContent'> 
      <div id='float'>
        <input id='email'  disabled={isdisabled} autoFocus  type="text" placeholder='' onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor='email'>Username</label>
        </div>
        <div id='float'>
        <input id='conf-psd'  placeholder='' disabled={isdisabled}
        type={isshowpsd ? 'text' : 'password'} onChange={(e)=>setPsd(e.target.value)} />
        <label htmlFor='conf-psd'>Enter Password</label>
        <p onClick={showpsd} id='eye'>{isshowpsd ? 'Hide' : 'Show'}</p>
        </div>
        <button type='submit' style={buttonClr}>Login</button>
        <hr/>
        <div id='text'><p id='loginSignupInfo'>Don't have an account? <Link to='/signup' id='streching'>Sign up</Link></p></div>
      </div>
      </form>
   
    </div>)
}