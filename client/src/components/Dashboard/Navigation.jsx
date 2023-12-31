import React, { useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'
import { RxExit } from 'react-icons/rx'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { menus } from './MenuList'

function Navigation() {
  const [open, setOpen] = useState(false)
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const { user, logout } = useAuth()

  const showOptions = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  return (
    <>
      <section className='flex gap-6 z-50'>
        <header className='select-none'>
          {/* Cabecera */}
          <div className='fixed h-16 flex w-full'>
            <div className='flex justify-center items-center w-16 bg-[#AC1734]'>
              <HiMenuAlt3 size={36} className='cursor-pointer text-white' onClick={() => setOpen(!open)} />
            </div>
            <div className='bg-white shadow-lg flex-grow flex items-center p-2 justify-between pr-10 relative'>
              <span className='font-semibold text-2xl ml-5 text-zinc-800 hidden md:block font-serif'>TRAMITE TESIS</span>
              <span></span>
              <div className='flex items-center gap-x-1'>
                <FaUserCircle size={36} className='cursor-pointer text-zinc-500' onClick={showOptions} />
                <BsFillCaretDownFill size={20} className='cursor-pointer text-[#AC1734]' onClick={showOptions} />
              </div>

              {mostrarOpciones && (
                <div
                  className='absolute top-16 right-2 mr-2 mt-2 w-fit bg-white border border-gray-300 rounded-lg shadow-lg duration-500 translate-x-3 select-none'>
                  <ul>
                    <li className='px-4 py-2 hover:bg-[#F8BB1F] cursor-pointer border-b-2 border-zinc-100 uppercase'>{user?.nombre} {user?.apellidos}</li>

                    <li
                      onClick={logout}
                      className='px-4 py-2 hover:bg-[#F8BB1F] cursor-pointer flex gap-x-3 items-center'>
                      <RxExit size={20} className='cursor-pointer text-[#AC1734]' />
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

              {menus?.map((menu, i) => {
                const isMenuVisible = menu?.permission && user?.permisos[`${menu?.permission}`]
                if (isMenuVisible || !menu?.permission) {
                  return (
                    <Link
                      to={menu?.link}
                      key={i}
                      className={` ${menu?.margin && 'mt-5'}  group flex gap-3.5 font-medium items-center text-base p-2 hover:bg-[#D70100] rounded-lg`}>
                      <div>{React.createElement(menu?.icon, { size: 20 })}</div>
                      <h2 className={`duration-500 whitespace-pre ${!open && `opacity-0 translate-x-28 overflow-hidden`} hidden md:block`}>{menu?.name}</h2>
                      <h2 className={`${open && `md:hidden`} absolute left-48 bg-[#F8BB1F] font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >{menu?.name}</h2>
                    </Link>
                  );
                } else {
                  return null;
                }
              })}

            </div>
          </div>
        </header>
        <main className={`${open ? `md:ml-72` : `md:ml-16`} ${open ? `ml-14 sm:ml-16` : `-ml-2 sm:ml-0`} mt-20 pt-2 duration-500 mr-4 sm:mr-6 w-full mb-3 overflow-auto`}>
          <Outlet />
        </main>
      </section >
    </>
  )
}

export default Navigation