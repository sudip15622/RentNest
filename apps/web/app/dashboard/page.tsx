import React from 'react'
import { getSession } from '../../lib/session';
import { redirect } from 'next/navigation';

const page = async() => {

    const session = await getSession();
    console.log({session});
    if(!session || !session?.user) redirect("/login");
    
  return (
    <main>This is dashboard</main>
  )
}

export default page
