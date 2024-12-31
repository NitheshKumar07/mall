import { Link } from 'react-router-dom'
import '../stylesheets/signupLogin.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Login } from './Login';

export function Signup() {
  // set datas by the user 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ph, setPh] = useState();
  const [psd, setPsd] = useState();
  const [cnfPsd, setCnfPsd] = useState();

  const [isWarningPsd, printWarningPsd] = useState(''); // warning for password wrong
  const [isWarningPhone, printWarningPhone] = useState(''); // warning for phone number wrong
  const [isWarnCondition, setWarnCondition] = useState(false); //when occurs warning
  const [isshowpsd, setShowpsd] = useState(''); //eye to see password

  const [isdisabled, setDisabled] = useState(false); // disable inputs
  const [colorFunction, setColorFunction] = useState({ backgroundColor: '', color: '' }); // blur form

  const [buttonClr,setButtonClr] = useState({}); //blur signup button

  const [hasFetchError,setHasfetchError] = useState(false);
  const [printfetchError,setfetchError] = useState('');

  useEffect(() => {
    document.body.classList.add('signupBody', 'flexbody')
    return () => {
      document.body.classList.remove('signupBody', 'flexbody')
    }
  }, [])

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

  // shaking
  const triggerShake = (shakeClass) => {
    shakeClass.classList.remove('shake');
    shakeClass.style.border = '2px solid red';
    setTimeout(() => {
      shakeClass.classList.add('shake');
    }, 10);
  }
  // show password
  const showpsd = () => {
    setShowpsd(!isshowpsd);
  }

  let navigate = useNavigate();


  //  signup click
  const signUpHandler = (event) => {
    event.preventDefault();
    setHasfetchError(false); // not to print error message
    setfetchError('')

// cancelling all effects of loading and disabling after getting success signup
    setDisabled(false);
    NotformDisableStyle();
    RemovesignupButtonLoad();
    NotpointerNoneBlur();

    // removing border and warning message when phone number and psd are correct
    setWarnCondition(false);
    printWarningPsd('');
    printWarningPhone('');
    document.querySelector('#phone-number').style.border = 'none';
    document.querySelector('#phone-number').classList.remove('shake');
    document.querySelector('#conf-psd').style.border = 'none';
    document.querySelector('#conf-psd').classList.remove('shake');


    //  if phone number and psd doesn't meet the criteria
    if (!Number(ph)) {
      setWarnCondition(true);
      let phInput = document.querySelector('#phone-number');
      triggerShake(phInput);
      printWarningPhone('invalid phone number');
    } else if ((ph.toString()).length !== 10) {
      setWarnCondition(true);
      let phInput = document.querySelector('#phone-number');
      triggerShake(phInput);
      printWarningPhone('invalid phone number');
    }
    if (psd !== cnfPsd) {
      setWarnCondition(true);
      let cnfPsdInput = document.querySelector('#conf-psd');
      triggerShake(cnfPsdInput);
      printWarningPsd('password mis-matching');
    }
    // for posting
    const formData = new FormData();
    formData.append('userName', name);
    formData.append('email', email);
    formData.append('phone', ph);
    formData.append('password', psd);
    // when all criteria matches 
    if (Number(ph) && ph.toString().length === 10 && psd === cnfPsd) {
      // setHasfetchError(true);
      setDisabled(true);
      formDisableStyle();
      signupButtonLoad();
      pointerNoneBlur();
      axios.post('https://website-api-nu.vercel.app/user/signup',formData)
      .then(res => {
        setTimeout(() => {
        navigate('/login');
        }, 2000);
      })
      .catch(err => {
        setTimeout(() => {
          setDisabled(false);
        NotformDisableStyle();
        RemovesignupButtonLoad();
        NotpointerNoneBlur();
        setHasfetchError(true);
        setfetchError('Signup Failed! please check your internet connection.');
        }, 5000);
      })
    }
  }
 
const goMain = () => {
  navigate('/');
}

  return (<>

  <div className='signupComponent'>
  <div className='formanime' />
    
    <form className='form' onSubmit={signUpHandler} style={colorFunction}>
    {hasFetchError && <p id='printErrSignup'>{printfetchError}</p>}
      <h2>welcome to <b onClick={()=>goMain()} id='malllo'>Mall</b></h2>
      <h4>create your account</h4>
      <div className='signupContent'>
        <div id='float'>
          <input  id='full-name'  autoFocus
            type='text' placeholder='' onChange={(e) => setName(e.target.value.trim())} disabled={isdisabled}/>
          <label htmlFor='full-name'>Full name</label>
        </div>
        <div id='float'>
          <input  id='email'  type="email"
            placeholder='' onChange={(e) => setEmail(e.target.value.trim())} disabled={isdisabled} />
          <label htmlFor='email'>Email</label>
        </div>
        <div id='float'>
          <input  id='phone-number' type='tel'
             placeholder='' onChange={(e) => setPh(e.target.value)} disabled={isdisabled} />
          <label htmlFor='phone-number'>Phone number</label>
          {isWarnCondition && <p id='warningPara'>{isWarningPhone}</p>}
        </div>
        <div id='float' >
          <input  id='psd' type='password' 
            placeholder='' onChange={(e) => setPsd(e.target.value)} disabled={isdisabled} />
          <label htmlFor='psd'>New Password</label>
        </div>
        <div id='float'>
          <input  id='conf-psd'  placeholder=''
            type={isshowpsd ? 'text' : 'password'} onChange={(e) => setCnfPsd(e.target.value)} disabled={isdisabled} />
          <label htmlFor='conf-psd'>Confirm Password</label>
          <p disabled={isdisabled} onClick={showpsd} id='eye'>{isshowpsd ? 'Hide' : 'Show'}</p>
          {isWarnCondition && <p id='warningPara'>{isWarningPsd}</p>}
        </div>
        <button type='submit' style={buttonClr} disabled={isdisabled} id='createAccount-btn'>Create Account</button>      
        <hr />
        <div id='text'><p id='loginSignupInfo'>Already have an account? <Link to='/login' id='streching'>Login</Link></p></div>
      </div>

    </form>
    

  </div>
  </>)
}