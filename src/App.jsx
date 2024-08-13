import { useState,useCallback,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setpassword] = useState("")
  const [NumAllowed,setNumAllowed] = useState(false)
  const [length, setlength] = useState(10)
  const [charAllowed, setcharAllowed] = useState(false)
   
  const passwordgenerator =useCallback(()=>{
    let char=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(NumAllowed) str+="0123456789"
        if(charAllowed) str+="!@#$%^&*()_+~`|}{[]:;?><,./-="
         for (let i = 0; i < length; i++) {
          const num= Math.floor(Math.random() * str.length)+1;
                   char += str.charAt(num); 
         }
         setpassword(char)

  },[NumAllowed,length,charAllowed])
  useEffect(()=>{
    passwordgenerator()
  },[passwordgenerator,length,charAllowed,NumAllowed])

  return (
    <>
   
     <div className='text-2xl  my-8 bg-gray-800  w-full mx-auto max-w-3xl px-3 py-4 rounded-lg '><h1 className='text-white text-center'>Password generator</h1>
     <div className='flex overflow-hidden px-2 py-2'>
      <input type="text"
       placeholder='password'
        value={password}
        
       readOnly
       className='bg-white   w-full rounded-s-lg  py-2 px-2 m-0  outline-none ' />
        <button onClick={()=>{window.navigator.clipboard.writeText(password)
         document.getElementById("clipboard").innerHTML="copied to clipboard"
          ;}} className='bg-blue-400 m-0 px-2  rounded-e-lg'>copy</button>
     </div>
     <div className='flex gap-3'>
      <input type="range"
           value={length}
           min={0}
           max={50}
         onChange={(e)=>setlength(e.target.value)}   
       name="length" id="" className='cursor-pointer text-xl'/><label htmlFor="length" className='text-orange-500 text-xl'>Length:{length}</label>
        <input type="checkbox" 
         value={charAllowed}
            onChange={(e)=>setcharAllowed(e.target.checked)}
                 name="charAllowed" id="" className='orange-400' /> <label htmlFor="charAllowed" className='text-orange-500 text-xl'>Characters</label>
                 <input type="checkbox" 
                 value={NumAllowed}
                  onChange={(e)=> setNumAllowed(e.target.checked)}
                 name="NumAllowed" id="" /> <label htmlFor="NumAllowed" className='text-orange-500 text-xl'>Numbers</label>
     </div>
    </div>
    <div id="clipboard" className='text-center  text-white'></div>
        
    </>
  )
}

export default App
