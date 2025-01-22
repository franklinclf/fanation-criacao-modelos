import Image from 'next/image'

export default function Footer({opacity}) {
  return (
    <footer className="mt-5 w-full flex items-center justify-center">
        <div className={`flex items-center justify-center gap-1 opacity-${opacity}`}>
          <span className="font-bold text-grey">Desenvolvido pela</span>  
          <Image className='w-[92]' src="/seubone-full-logo.svg" alt="Logo da Seu Boné" width={0} height={0} priority={true}/>
        </div>
    </footer>
  )
}
