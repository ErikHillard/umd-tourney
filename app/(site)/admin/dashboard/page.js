import { createPoolAction, createTeamAction, confirm, createTestTourney } from '../../../serverActions/adminActions'
import ClientAdminPage from './clientPage'


export default function AdminPage( {} ) {
  return (
    <ClientAdminPage createPool={createPoolAction} createTeam={createTeamAction} confirm={confirm} createTestTourney={createTestTourney} />
  )
}