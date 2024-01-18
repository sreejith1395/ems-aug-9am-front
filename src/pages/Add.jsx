import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser } from '../services/AllApi';
import { useContext } from 'react';
import { registerContext } from './Contextshare';
import { useNavigate } from 'react-router-dom';

function Add() {

  const{registerData,setregisterData}=useContext(registerContext)
  const navigate=useNavigate()

  const[showspin,setshowspin]=useState(true)
  // to hold normal user input 
  const[normalInputs,setNormalUserInput]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  // to hold status

  const[status,setStatus]=useState("")
  const[profile,setProfile]=useState("")

  const[preview,setPreview]=useState("")


  // define normaluser input function

  const getandsetuserNormalImputs=(e)=>{
    const{name,value}=e.target 
    setNormalUserInput({...normalInputs,[name]:value})
  }

  // to handle file 
  
 const handlefile=(e)=>{
  // console.log(e.target.files[0]);
  setProfile(e.target.files[0])
 }


  // console.log(normalInputs);
  // console.log(status);
  // console.log(profile);






  useEffect(() => {

    if(profile){
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(() => {
      setshowspin(false)
    }, 2000);
   
  }, [profile])
  
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },

  ];


  // define submit function 

  const handleSubmit=async(e)=>{

    e.preventDefault()

    const{fname,lname,email,mobile,gender,location}=normalInputs

   if(!fname||!lname||!email||!mobile||!gender||!status||!profile||!location) {

      alert('please fill the form completly')
   }
   else{
      //  alert('form filled completely')

      const data=new FormData()

      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("profile",profile)
      data.append("location",location)


      const headers={
        "content-type":"multipart/form-data"
      }


      // api call 

     const response=await addUser(data,headers)

      console.log(response);

      if(response.status==200){

        setNormalUserInput({...normalInputs,
        
          fname:"",
          lname:"",
          email:"",
          mobile:"",
          gender:"",
          location:""
          
        
        
        })

        setStatus("")
        setProfile("")
        setregisterData(response.data)
        navigate('/')

      }
      else{
        alert('request failed')
      }

   }





  }


  return (
    <>
   { 
   
     showspin?
     <LoadingSpinner/>:
   
      <div className='container mt-3'>

        <h1 className='text-center fw-bolder'>Add New Employee Details</h1>

        <div className='mt-3 shadow border rounded p-2'>

          <div className='text-center'>

            <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={preview?preview:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png "} alt="no image" />


          </div>

          <Form className='mt-4'>
            <Row>
              {/* first name */}
              <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputfname" label="First Name">
                <Form.Control type="text" name='fname' placeholder="First Name" onChange={e=>getandsetuserNormalImputs(e)} value={normalInputs.value} />
              </FloatingLabel>

              {/* last name */}
              <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputlname" label="Last Name">
                <Form.Control type="text" name='lname' placeholder="Last Name" onChange={e=>getandsetuserNormalImputs(e)}  value={normalInputs.value} />
              </FloatingLabel>

              {/* email  */}

              <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
                <Form.Control type="email" name='email' placeholder="Email" onChange={e=>getandsetuserNormalImputs(e)} value={normalInputs.value} />
              </FloatingLabel>

              {/* mobile */}

              <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile">
                <Form.Control type="text" name='mobile' onChange={e=>getandsetuserNormalImputs(e)} placeholder="Mobile" value={normalInputs.value} />
              </FloatingLabel>

              {/* gender */}

              <Form.Group className='mb-3 col-lg-6'>

                <Form.Label>Select Gender</Form.Label>
                <Form.Check type={"radio"} name='gender' value={"Male"} label={"Male"} onChange={e=>getandsetuserNormalImputs(e)} />
                <Form.Check type={"radio"} name='gender' value={"FeMale"} label={"FeMale"} onChange={e=>getandsetuserNormalImputs(e)}/>

              </Form.Group>

              {/* status */}
              <Form.Group className='mb-3 col-lg-6'>

                <Form.Label>Select Employee Status</Form.Label>

                <Select onChange={e=>setStatus(e.value)} options={options} />

              </Form.Group>

              {/* file upload */}

              <Form.Group className='mb-3 col-lg-6'>

                <Form.Label>Choose a profile Picture</Form.Label>

                <Form.Control type="file" onChange={e=>handlefile(e)} name="profile"/>

              </Form.Group>

              {/* location */}

              <FloatingLabel className='mb-3 col-lg-6 mt-3' controlId="floatingInputemail" label="Location">
                <Form.Control type="text" name='location' placeholder="Location" onChange={e=>getandsetuserNormalImputs(e)}  value={normalInputs.value}/>
              </FloatingLabel>

              <Button onClick={e=>handleSubmit(e)} type='submit' variant='primary'>Submit</Button>

            </Row>

           
          </Form>



        </div>

      </div>
      
      }

    </>
  )
}

export default Add