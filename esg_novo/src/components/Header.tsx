'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSearch, FaBell } from "react-icons/fa"
import { TbMessageCircle2Filled } from "react-icons/tb"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Header() {

  const [user, setUser] = useState({ NOME: '', IMG: '' });
  const [showMenu, setshowMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let value = localStorage.getItem('ESG:user');
    if (value) {
      setUser(JSON.parse(value));
    }
  }, []);

  const logout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("ESG:token");
    localStorage.removeItem("ESG:user");
    localStorage.removeItem('ESG:userinfo');
    router.push('/login');
  }

  return (
    <header className='w-full bg-white flex justify-between py-2 px-4 items-center shadow-md'>
      <Link href='/' className='font-bold text-sky-900 text-lg'>Meio Ambiente</Link>
      <div className='flex bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full'>
        <input type='text' className='bg-zinc-100 focus-visible:outline-none' />
        <FaSearch />
      </div>
      <div className='flex gap-5 items-center text-gray-600'>
        <div className='flex gap-3'>
          <button className='bg-zinc-200 p-2 rounded-full hover:bg-zinc-400'>
            <TbMessageCircle2Filled />
          </button >
          <button className='bg-zinc-200 p-2 rounded-full hover:bg-zinc-400'>
            <FaBell />
          </button>
        </div>

        <div className='relative' onMouseLeave={() => setshowMenu(false)}>
          <button className='flex gap-2 items-center' onClick={() => setshowMenu(!showMenu)}>
            <Image src={
              user.IMG.length > 0
                ? user.IMG
                : 'https://img.freepik.com/free-icons/user_318-159711.jpg'
            }
              alt='imagem do perfil'
              className='w-8 h-8 rounded-full'
              width="10"
              height="10"
              unoptimized
            />
            <span className='font-bold'>{user.NOME}</span>
          </button>
          {showMenu && (
            <div className='absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-[-8px]'>
              <Link href="/editprofile" className='border-b'>Editar Perfil</Link>
              <Link href="" onClick={(e) => logout(e)}>Logout</Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );

}

export default Header;