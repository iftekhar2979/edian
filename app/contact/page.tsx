import AboutUs from '@/components/about/Aboutus'
import CompanyInfo from '@/components/company/CompanyInfo'
import ContactForm from '@/components/contact/ContactUs'
import React from 'react'

function page() {
  return (
    <section className='mt-8 '>
      {/* <AboutUs/> */}
      <CompanyInfo/>
        <ContactForm/>
    </section>
  )
}

export default page