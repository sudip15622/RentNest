import React from 'react'
import { getProfile } from '../../lib/actions'

const page = async() => {
  const res = await getProfile();
  return (
    <main>
      {JSON.stringify(res)}
    </main>
  )
}

export default page
