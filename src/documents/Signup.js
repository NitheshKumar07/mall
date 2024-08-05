import { Link } from 'react-router-dom'
import '../stylesheets/signupLogin.css'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';


export function Signup  () {
  // set datas by the user 
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [ph,setPh] = useState();
  const [psd,setPsd] = useState();
  const [cnfPsd,setCnfPsd] = useState();
  const [isWarningPsd,printWarningPsd] =useState('');
  const [isWarningPhone,printWarningPhone] = useState('');
  const [isWarnCondition,setWarnCondition] =useState(false);
  const [isshowpsd,setShowpsd] = useState('');

  useEffect(()=>{
    document.body.classList.add('signupBody','flexbody')
  return () =>{
   document.body.classList.remove('signupBody','flexbody')} 
  },[])


  let navigate = useNavigate();
  
  const signUpHandler = (event) => {
    event.preventDefault();

    const triggerShake = (shakeClass) => {
      shakeClass.classList.remove('shake');
      shakeClass.style.border = '2px solid red';
      setTimeout(() => {
        shakeClass.classList.add('shake');
      }, 10);
    }
  

    // removing border and warning message when phone number and psd are correct
    setWarnCondition(false);
    printWarningPsd('');
    printWarningPhone('');
    document.querySelector('#phone-number').style.border='none';
    document.querySelector('#phone-number').classList.remove('shake');
    document.querySelector('#conf-psd').style.border='none';
    document.querySelector('#conf-psd').classList.remove('shake');


//  if phone number and psd doesn't meet the criteria
    if (!Number(ph) || ph==='') {
      setWarnCondition(true);
      console.log('invalid phone number');
      let phInput = document.querySelector('#phone-number');
      triggerShake(phInput);
      printWarningPhone('invalid phone number');
    }else if ((ph.toString()).length !== 10)
      {
        setWarnCondition(true);
        console.log('invalid phone number');
        let phInput = document.querySelector('#phone-number');
        triggerShake(phInput);
        printWarningPhone('invalid phone number');
      }
       if (psd !== cnfPsd){
      setWarnCondition(true);
      let cnfPsdInput = document.querySelector('#conf-psd');
      triggerShake(cnfPsdInput);
      printWarningPsd('password mis-matching');
    }
    // when all criteria matches 
    if(Number(ph) && ph.toString().length === 10 && psd === cnfPsd)
    {
      console.log('signed up');
      navigate('/login');
    }
     
      
    // function modeChange ()  {
    //   console.log('mode')
    //   document.body.style.backgroundColor='black';
    // }

    }
    const showpsd = () => {
        setShowpsd(prevState => !prevState);
    }


    return (<div className='signupComponent'>

      {/* <button onClick={modeChange}>dark mode</button> */}
      
    <form className='form' onSubmit={signUpHandler}>
    <h2>welcome to <b>Mall</b></h2>
    <h4>create your account</h4>
      <div className='signupContent'>
        <div id='float'>
        <input id='full-name' required type='text' placeholder='' onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor='full-name'>Full name</label>
        </div>
        <div id='float'>
        <input id='email' required type="email" placeholder='' onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor='email'>Email</label>
        </div>
        <div id='float'>
        <input id='phone-number' type='tel' required placeholder='' onChange={(e)=>setPh(e.target.value)}/>
        <label htmlFor='phone-number'>Phone number</label>
        {isWarnCondition && <p id='warningPara'>{isWarningPhone}</p>}
        </div>
        <div id='float' >
        <input id='psd' type='password' required placeholder=''onChange={(e)=>setPsd(e.target.value)}/>
        <label htmlFor='psd'>New Password</label>
        </div>
        <div id='float'>
        <input id='conf-psd' required placeholder=''
        type={isshowpsd ? 'text' : 'password'} onChange={(e)=>setCnfPsd(e.target.value)} />
        <label htmlFor='conf-psd'>Confirm Password</label>
        <p onClick={showpsd} id='eye'>{isshowpsd ? 'Hide' : 'Show'}</p>
        {isWarnCondition && <p id='warningPara'>{isWarningPsd}</p>}
        </div>
        <button type='submit'>Create Account</button>
        <hr/>
        <div id='text'><p id='loginSignupInfo'>Already have an account? <Link to='/login' id='streching'>Login</Link></p></div>
      </div>
      </form>
   
    </div>)
}