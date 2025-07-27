import React from 'react'
import { getProfile } from '../../lib/actions'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Landlord Profile | RentNest",
  description: "Visit your landlord profile, manage you personal information.",
};

const page = async() => {
  const res = await getProfile();
  return (
    <main className='page-content'>
      {JSON.stringify(res)}
    </main>
  )
}

export default page
