import React from 'react'
import { getProfile } from '../../lib/actions'
import ToastExample from './_components/ToastExample';

const page = async() => {
  const res = await getProfile();
  return (
    <main className='page-content'>
      {JSON.stringify(res)}
      <div>
        <ToastExample />
      </div>
    </main>
  )
}

export default page
