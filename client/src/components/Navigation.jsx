import React, { useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'
import { RxFileText, RxHome, RxReader, RxExit } from 'react-icons/rx'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import HomePage from '../pages/HomePage'

function Navigation() {
  const [open, setOpen] = useState(true)
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const showOptions = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  const menus = [
    { name: 'Home', link: '/', icon: RxHome },
    { name: 'Tramite', link: '/', icon: RxReader },
    { name: 'Tesis', link: '/', icon: RxReader },
    { name: 'Portafolio', link: '/', icon: RxFileText },
  ]


  return (
    <>
      <section className='flex gap-6'>
        <header>
          {/* Cabecera */}
          <div className='fixed h-16 flex w-full'>
            <div className='flex justify-center items-center w-16 bg-[#AC1734]'>
              <HiMenuAlt3 size={36} className='cursor-pointer text-white' onClick={() => setOpen(!open)} />
            </div>
            <div className='bg-white shadow-lg flex-grow flex items-center p-2 justify-between pr-10 relative'>
              <span className='font-semibold text-xl text-zinc-800 hidden md:block'>TRAMITE DE TESIS</span>
              <span></span>
              <div className='flex items-center gap-x-1'>
                <FaUserCircle size={36} className='cursor-pointer text-zinc-500' onClick={showOptions} />
                <BsFillCaretDownFill size={20} className='cursor-pointer text-[#AC1734]' onClick={showOptions} />
              </div>

              {mostrarOpciones && (
                <div
                  className='absolute top-16 right-2 mr-2 mt-2 w-fit bg-white border border-gray-300 rounded-lg shadow-lg duration-500 translate-x-3 select-none'>
                  <ul>
                    <li className='px-4 py-2 hover:bg-[#F8BB1F] cursor-pointer border-b-2 border-zinc-100'>JUANITO MARCO MAMANI MAMANI</li>

                    <li className='px-4 py-2 hover:bg-[#F8BB1F] cursor-pointer flex gap-x-3 items-center' oncl>
                      <RxExit size={20} className='cursor-pointer text-[#AC1734]' onClick={showOptions} />
                      Cerrar Sesión
                    </li>
                  </ul>
                </div>
              )}

            </div>
          </div>
          {/* Barra lateral */}
          <div className={`fixed mt-16 bg-[#AC1734] min-h-screen ${open ? `md:w-72` : `md:w-16`} duration-500 text-gray-100 px-3.5 opacity-0 md:opacity-100 ${open ? `opacity-100 w-16` : ``} ${open ? `w-16` : `w-16`} select-none`}>
            <div className='mt-6 flex flex-col gap-4 relative'>
              {menus?.map((menu, i) => (
                <Link to={menu?.link} key={i} className='group flex gap-3.5 font-medium items-center text-base p-2 hover:bg-[#D70100] rounded-lg'>
                  <div>{React.createElement(menu?.icon, { size: 20 })}</div>
                  <h2 className={`duration-500 whitespace-pre ${!open && `opacity-0 translate-x-28 overflow-hidden`} hidden md:block`}>{menu?.name}</h2>
                  <h2 className={`${open && `md:hidden`} absolute left-48 bg-[#F8BB1F] font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >{menu?.name}</h2>
                </Link>
              ))}
            </div>
          </div>
        </header>
        <main className={`${open ? `md:ml-72` : `md:ml-16`} ${open ? `ml-16` : `ml-0`} mt-20 duration-500 mr-3`}>
          <HomePage />
        </main>
      </section>
    </>
  )
}

export default Navigation