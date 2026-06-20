
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

import {
    LayoutDashboard,
    FileText,
    User,
    LogOut,
    BrainCircuit,
    BookOpen,
    ClipboardList,
    X
} from 'lucide-react'

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {

    const { logout } = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
        { to: '/documents', icon: FileText, text: 'Documents' },
        { to: '/flashcards', icon: BookOpen, text: 'Flashcards' },
        { to: '/quizzes', icon: ClipboardList, text: 'Quizzes' },
        { to: '/profile', icon: User, text: 'Profile' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible'
                    }`}
                onClick={toggleSidebar}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside className={` fixed md:static top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col shrink-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 `} >

                {/* Logo */}
                <div className='flex items-center justify-between h-20 px-6 border-b border-gray-200'>

                    <div
                        onClick={() => navigate('/')}
                        className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all duration-300'
                    >

                        <div className='w-10 h-10 rounded-xl bg-[#00d492] flex items-center justify-center text-white shadow-sm'>

                            <BrainCircuit
                                size={22}
                                strokeWidth={2.5}
                            />

                        </div>

                        <div>

                            <h1 className='text-base font-bold text-gray-900 dark:text-white '>
                                AI Learning
                            </h1>

                            <p className='text-xs text-gray-500 dark:text-slate-400'>
                                Assistant
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={toggleSidebar}
                        className='md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition'
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Navigation */}
                <nav className='flex-1 px-3 py-4 space-y-1'>

                    {navLinks.map((link) => {

                        const Icon = link.icon;

                        return (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => {
                                    if (window.innerWidth < 768) {
                                        toggleSidebar();
                                    }
                                }}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                        ? 'bg-[#00d492] text-white shadow-md'
                                        : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#00d492]'
                                    }`
                                }
                            >

                                <Icon
                                    size={20}
                                    strokeWidth={2.2}
                                />

                                <span>
                                    {link.text}
                                </span>

                            </NavLink>
                        );
                    })}

                </nav>

                {/* Logout */}
                <div className='p-4 border-t border-gray-200'>

                    <button
                        onClick={handleLogout}
                        className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 font-medium'
                    >

                        <LogOut
                            size={20}
                            strokeWidth={2.2}
                        />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>
        </>
    )
}

export default Sidebar

