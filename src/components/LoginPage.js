import React, {useState} from 'react';

import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  import { Link, useNavigate } from "react-router-dom";


  function LoginPage(props){

    const { setUser } = props
    const [clicked, setClicked] = useState(false)
    const [ username, setUsername] = useState("")
    const [ password, setPassword] = useState("")
    const [justifyActive, setJustifyActive] = useState('tab1');;
    const navigate = useNavigate();

    // https://mdbootstrap.com/docs/react/extended/login-form/#!
    function submitUser(e) {
        e.preventDefault();
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
          .then((r) => r.json())
          .then((user) => {
            localStorage.uid = user.uid;
            setUsername("");
            setPassword("");
            if (localStorage.uid !== "undefined" && localStorage.uid) {
              fetch("http://localhost:3000/profile", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  Authenticate: localStorage.uid,
                },
              })
                .then((r) => r.json())
                .then((userInfo) => setUser(userInfo));
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
      }

      function changeClick(){
        setClicked(!clicked)
      }


  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

    return(
        <div>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

<MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
  <MDBTabsItem>
    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
      Login
    </MDBTabsLink>
  </MDBTabsItem>
  <MDBTabsItem>
    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
      Register
    </MDBTabsLink>
  </MDBTabsItem>
</MDBTabs>

<MDBTabsContent>

  <MDBTabsPane show={justifyActive === 'tab1'}>

    <div className="text-center mb-3">
      <p>Sign in:</p>

      {/* <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='facebook-f' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='twitter' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='google' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='github' size="sm"/>
        </MDBBtn>
      </div> */}

      {/* <p className="text-center mt-3">or:</p> */}
    </div>
      <form  onSubmit={submitUser}>
    <MDBInput wrapperClass='mb-4' label='Username' id='form1'
    value={username}
            onChange= {e => setUsername(e.target.value)}/>

    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type={ clicked ?'text' : 'password' }
    value={password}
    onChange= {e => setPassword(e.target.value)}/>
  <input type="checkbox" onClick={changeClick}/>
  <label> Show Password</label>


    <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
    </form>
  </MDBTabsPane>

  <MDBTabsPane show={justifyActive === 'tab2'}>

    <div className="text-center mb-3">
      <p>Sign up:</p>
    </div> 

      <form>
    <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
    <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'/>
    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
    <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>
    </form>

    <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>

  </MDBTabsPane>

</MDBTabsContent>

</MDBContainer>
        </div>
    )
  }

  export default LoginPage;
