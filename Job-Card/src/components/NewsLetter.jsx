import React from 'react'
import { FaEnvelope, FaEnvelopeOpenText, FaRocket } from "react-icons/fa6"

const NewsLetter = () => {
  return (
    <div>
        <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
            <FaEnvelopeOpenText className="text-orange-600" />
            Let's Talk Careers!
        </h3>
        <p className='text-primary/75 text-base mb-4'>Reach out today to explore exciting career opportunities tailored to your skills and ambitions!</p>
        <div className='w-fill space-y-4'>
            <input type="email" name="email" id="email" placeholder="yourname@email.com" className="w-full block py-2 pl-3 border focus:outline-none"/>
            <input type="Submit" value={"Subscribe"} className="w-full block py-2 pl-3 border focus:outline-none bg-orange-600 rounded-sm text-white cursor-pointer font-semibold"  />

        </div>

        </div>
        <div className="mt-20">
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
            <FaRocket className="text-orange-600" />
            Quick Career Opportunities!!
        </h3>
        <p className='text-primary/75 text-base mb-4'>"Explore fast-track career opportunities tailored to your skills and goals!"</p>
        <div className='w-fill space-y-4'>
         <input type="Submit" value={"Upload Your Resume"} className="w-full block py-2 pl-3 border focus:outline-none bg-orange-600 rounded-sm text-white cursor-pointer font-semibold"  />

        </div>

        </div>



    </div>
  )
}

export default NewsLetter