import React from 'react'
import Login from './_components/Login'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landlord Login | RentNest',
  description: 'Sign in to your RentNest landlord account to manage your property listings and connect with potential tenants.',
}

const page = () => {
  return (
    <><Login /></>
  )
}

export default page
