import { Link } from 'react-router-dom'
import '../stylesheets/signupLogin.css'
import { useEffect, useState } from 'react';

export function Login  () {

  const [email,setEmail] = useState('');
  const [psd,setPsd] = useState();
  const [isshowpsd,setShowpsd] = useState('');

  useEffect(()=>{
    document.body.classList.add('loginbody','flexbody')
  return () =>{
   document.body.classList.remove('loginbody','flexbody')} 
  },[])
  // password showing
  const showpsd = () =>{
    setShowpsd(prevState => !prevState);
  }

  // function mode () {
  //     document.body.classList.add('mode');
  //   document.querySelector('.loginComponent').classList.add('mode');

  // }

    return (<div className="loginComponent">
     <form className='form' >
    <h1>Login <b>Mall</b></h1>
      <div className='signupContent'> 
      <div id='float'>
        <input id='email' required type="email" placeholder='' onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor='email'>Email</label>
        </div>
        <div id='float'>
        <input id='conf-psd' required placeholder=''
        type={isshowpsd ? 'text' : 'password'} onChange={(e)=>setPsd(e.target.value)} />
        <label htmlFor='conf-psd'>Enter Password</label>
        <p onClick={showpsd} id='eye'>{isshowpsd ? 'Hide' : 'Show'}</p>
        </div>
        <button type='submit'>Login</button>
        <hr/>
        <div id='text'><p id='loginSignupInfo'>Don't have an account? <Link to='/signup' id='streching'>Sign up</Link></p></div>
      </div>
      </form>
      {/* <button onClick={mode}>dark mode</button> */}
   
    </div>)
}