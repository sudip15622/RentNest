import React from 'react'
import Signup from './_components/Signup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become a Landlord | RentNest',
  description: 'Join thousands of successful landlords on RentNest. List your property, connect with quality tenants, and maximize your rental income.',
}

const page = () => {
  return (
    <><Signup /></>
  )
}

export default page
