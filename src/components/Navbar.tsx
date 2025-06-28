'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { useAboutMe } from '../hooks/useAboutMe'

export default function Navbar() {
  const pathname = usePathname()
  const { aboutMe } = useAboutMe(1)

  // Check if current route matches the link
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-bg z-50">
      <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
        {aboutMe?.name}
      </Link>
      
      <div className="flex items-center gap-6">
        <Link 
          href="/" 
          className={`transition-colors ${isActive('/') ? 
            'text-blue-600 dark:text-blue-400 font-medium' : 
            'hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          Home
        </Link>
        {/* <Link 
          href="/about" 
          className={`transition-colors ${isActive('/about') ? 
            'text-blue-600 dark:text-blue-400 font-medium' : 
            'hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          About
        </Link> */}
        <Link 
          href="/projects" 
          className={`transition-colors ${isActive('/projects') ? 
            'text-blue-600 dark:text-blue-400 font-medium' : 
            'hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          Projects
        </Link>
        <Link 
          href="/contact" 
          className={`transition-colors ${isActive('/contact') ? 
            'text-blue-600 dark:text-blue-400 font-medium' : 
            'hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          Contact
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}