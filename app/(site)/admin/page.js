// import { addPool, addTeam, resetTourney, setupTestTourney } from "../../../utils/apiUtils"
import { redirect } from 'next/navigation'
import axios from "axios"
import { createPoolAction, createTeamAction, confirm, createTestTourney } from '../../serverActions/adminActions'
import ClientAdminPage from './clientPage'


export default function AdminPage( {} ) {
  return (
    <ClientAdminPage createPool={createPoolAction} createTeam={createTeamAction} confirm={confirm} createTestTourney={createTestTourney} />
  )
}