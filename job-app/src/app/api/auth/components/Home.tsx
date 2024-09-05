import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div className='w-[80%] mx-auto mt-2 text-[#0F172A]'>
    <div className='flex justify-between'>
        <div className="text-xl font-semibold">A<span className='text-orange-400'>ki</span>l</div>
      <nav >
        <div className="flex gap-3">
        <Link className="text-xl font-semibold" href='/api/auth/signin'>login</Link>
        <Link className="text-xl font-semibold" href='/api/auth/signup'>signup</Link>
        </div>
      </nav>
      </div>
    <div className='text-center'>
        <h1 className='mt-[15%] capitalize font-bold text-5xl text-center block'>job listing application</h1>
        <p className='text-center w-[40%] mx-auto pt-2 text-xl mb-6'> Explore a wide range of job opportunities tailored to your skills and interests. </p>
        <Link className="text-xl font-semibold bg-[#334155] text-white p-2 rounded-lg m-2" href='/api/auth/signup'>Get started</Link>
      </div>

      </div>
    
  )
}

export default HomePage
