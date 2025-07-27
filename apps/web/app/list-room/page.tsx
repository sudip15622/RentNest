import React from 'react'
import ListRoom from './_components/ListRoom'
import { getSession } from '../../lib/session'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "List Room | RentNest",
  description: "List your room in minutes, connect with verified tenants, and start earning passive income today.",
};

const page = async() => {

  const session = await getSession();

  return (
    <ListRoom session={session}/>
  )
}

export default page
