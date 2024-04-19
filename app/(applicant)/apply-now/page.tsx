import { ApplicantForm } from '@/action/action'
import { Input } from 'postcss'
import React from 'react'

export default function ApplyNow() {
  return (
    <form action={ApplicantForm} className='flex flex-col w-1/2 bg-red-400 gap-10 text-black mx-auto'>
      <label htmlFor="html">Email</label>
      <input 
        type = 'text'
        name='first_name'
      /> 

      <label htmlFor="html">Email</label>
      <input 
        type = 'text'
        name='last_name'
      /> 

      <label htmlFor="html">Email</label>
      <input 
        type = 'text'
        name='email'
      /> 

      <label htmlFor="html">Number</label>
      <input 
        type = 'number'
        name='contact_number'
      /> 

      <label htmlFor="html">Email</label>
      <input 
        type = 'text'
        name='resume_url'
      /> 


      <select name="communication" className="bg-orange-300 p-1.5">
        <option value="email">email</option>
        <option value="phone_number">phone_number</option>
      </select>

      <select name="positionType" className="bg-orange-300 p-1.5">
        <option value="teaching">teaching</option>
        <option value="non_teaching">non_teaching</option>
      </select>

      <button>submit</button>
      
    </form>
  )
}
