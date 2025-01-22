import React from 'react'
import DashboardPage from '../components/DashboardPage';
import Image from 'next/image';
import Footer from '../components/Footer';


export default function DashboardHomePage() {
  return (
    <DashboardPage>
      <div className='w-full overflow-y-auto flex flex-col justify-end align-middle items-center mt-20 px-5'>
        <p className='text-2xl text-center'>Dê vida às suas ideias com o <span className='text-light-purple'>Fanation</span>!</p>
        <Image className="w-5/6 sm:w-2/5" src="/design-team.svg" alt="Design Team" width={0} height={0} priority={true} />
        <p className='w-2/3 md:w-1/2 text-center'>Use o menu lateral para acessas as funcionalidades da dashboard de criação de modelos.</p>
      </div>
      <div>
      <Footer opacity={20}/>
      </div>
    </DashboardPage>
  )
}
