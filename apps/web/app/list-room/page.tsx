import React from 'react'
import ListRoom from './_components/ListRoom'
import { getSession } from '../../lib/session'

const page = async() => {

  const session = await getSession();

  return (
    <ListRoom session={session}/>
  )
}

export default page
