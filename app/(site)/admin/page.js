"use client"

// import { addPool, addTeam, resetTourney, setupTestTourney } from "../../../utils/apiUtils"
import { redirect } from 'next/navigation'
import axios from "axios"
import { createPool, createTeam, confirm, createTestTourney } from '../../serverActions/adminActions'
import ClientAdminPage from './clientPage'


export default function AdminPage( {} ) {
  return (
    <ClientAdminPage createPool={createPool} createTeam={createTeam} confirm={confirm} createTestTourney={createTestTourney} />
  )
}