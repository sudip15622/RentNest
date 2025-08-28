import React from 'react'
import { getSession } from '../../lib/session';
import { redirect } from 'next/navigation';
import DashboardClient from './_components/DashboardClient';
import { getProfile } from '../../lib/actions';

const page = async() => {

    const session = await getSession();
    // console.log({session});
    if(!session || !session?.user) redirect(`/login?redirectTo=${encodeURIComponent("/dashboard")}`);
    // if(session.user.role !== "admin") redirect("/login");

    const user = await getProfile();
    
  return (
    <DashboardClient user={user} />
  )
}

export default page
