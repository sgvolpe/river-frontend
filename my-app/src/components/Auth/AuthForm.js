import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const userInputRef = useRef();
  const passwordInputRef = useRef();
  
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) =>{
    event.preventDefault();
    const enteredEmail = userInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // add validation

    if (isLogin){
      console.log('Logging...') // toDelete
      const base_url = 'https://river-331110.uc.r.appspot.com';
      // const base_url = 'http://127.0.0.1:8000';
      const url = base_url + '/api-token-auth/'
      const data = {username: enteredEmail, password: enteredPassword}; 
      console.log(url) // toDelete
      fetch(url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        }
      ).then(res => {
        if(res.ok){
            res.json().then(data => {              
              console.log(data.token)
              setToken(data.token)
            })
        } 
        else {
          res.json().then(data => alert(data.non_field_errors[0]));
        }
      
      }).catch(        
          function(e) {
            console.log(`Error: ${e}`);
        }
      );



    }else{
      // ...
 
    };

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='text' id='text' required ref={userInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
