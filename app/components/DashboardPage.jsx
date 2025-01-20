import React from 'react'
import Main from './Main'
import Sidebar from './Sidebar'

export default function DashboardPage({children}) {
  return (
    <Main>
      <div  className='flex'>
        <Sidebar />
        <div>
          {children}
        </div>
      </div>
    </Main>
  )
}
