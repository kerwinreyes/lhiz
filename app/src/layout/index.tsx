import { Outlet, Link} from 'react-router-dom'
import '../App.css'
import { useState } from 'react'

const Header = () => {
    const [ showNav, setShowNme] = useState<boolean>(false)
    const linkClassName = "relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-luxe-nude after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left text-sm font-light md:bg-transparent md:text-white md:hover:text-white text-black "
    return (
        <>
        <nav className='absolute w-full z-20'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto p-4'>
                <div className='text-xl cursor-pointer'>E L I Z A</div>
                <button data-collapse-toggle="navbar-default" onClick={() => setShowNme(!showNav)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={`${showNav ? '' : 'hidden'} w-full md:w-auto md:block md:w-auto"`} id="navbar-default">
                    <ul className="flex flex-col p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0  ">
                        <li>
                            <Link to="/" className={linkClassName}>H O M E</Link>
                        </li>
                        <li>
                            <Link to="/services" className={linkClassName}>S E R V I C E S</Link>
                        </li>
                        <li>
                            <Link to="/appointment" className={linkClassName}>A P P O I N T M E N T</Link>
                        </li>
                        <li>
                            <Link to="/about" className={linkClassName}>A B O U T</Link>
                        </li>
                        <li>
                            <Link to="/blog" className={linkClassName}>B L O G</Link>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:block"></div>
            </div>
        </nav>
        <Outlet />
        </>
    )
}

export default Header