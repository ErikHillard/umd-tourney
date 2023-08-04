import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { getCurrentUser } from '../../actions/get'
import { createPoolAction, createTeamAction, confirm, createTestTourney } from '../../serverActions/adminActions'
import ClientAdminPage from './clientPage'


export default function AdminPage( {} ) {
  return (
    <ClientAdminPage createPool={createPoolAction} createTeam={createTeamAction} confirm={confirm} createTestTourney={createTestTourney} />
  )
}