
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Bell, User, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Header = ({ toggleSidebar }) => {

    const { user } = useAuth();
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header className='sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300'>

            <div className='flex items-center justify-between px-4 md:px-6 py-4'>

                {/* Mobile Menu */}
                <button
                    onClick={toggleSidebar}
                    className='lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition'
                    aria-label='Toggle Sidebar'
                >
                    <Menu size={20} />
                </button>

                <div className='flex-1'></div>

                <div className='flex items-center gap-4'>
                    <button
  onClick={toggleTheme}
  className='w-10 h-10 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-gray-50 transition'
>

  {darkMode ? (
    <Sun
      size={18}
      strokeWidth={2}
      className='text-yellow-500'
    />
  ) : (
    <Moon
      size={18}
      strokeWidth={2}
      className='text-gray-600'
    />
  )}

</button>

                    {/* Notification */}
                    <button className='relative w-10 h-10 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-gray-50 transition'>

                        <Bell
                            size={18}
                            strokeWidth={2}
                            className='text-gray-600'
                        />

                        <span className='absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500'></span>

                    </button>

                    {/* User Profile */}
                    <div className='flex items-center gap-3 pl-2'>

                        <div className='w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white'>

                            <User
                                size={18}
                                strokeWidth={2.5}
                            />

                        </div>

                        <div className='hidden sm:block'>

                            <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                                {user?.username || 'User'}
                            </p>

                            <p className='text-xs text-gray-500 dark:text-slate-400'>
                                {user?.email || 'user@example.com'}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </header>
    )
}

export default Header
