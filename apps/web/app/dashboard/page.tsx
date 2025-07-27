import React from 'react'
import { getSession } from '../../lib/session';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Landlord Dashboard | RentNest",
  description: "Visit your landlord dashboard, manage all of your listings, view inquires sent by renters and many more.",
};

const page = async() => {

    const session = await getSession();
    // console.log({session});
    if(!session || !session?.user) redirect(`/login?redirectTo=${encodeURIComponent("/dashboard")}`);
    // if(session.user.role !== "admin") redirect("/login");
    
  return (
    <main>This is dashboard</main>
  )
}

export default page
