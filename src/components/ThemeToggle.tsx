'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  showText?: boolean
  iconSize?: 'sm' | 'md' | 'lg'
}

export default function ThemeToggle({ 
  showText = false, 
  iconSize = 'sm' 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure we only render on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Size classes mapping
  const sizeClasses = {
    sm: 'p-1.5 text-base',
    md: 'p-2 text-lg',
    lg: 'p-3 text-xl'
  }

  // Don't render anything during SSR
  if (!mounted) {
    return (
      <div 
        className={`inline-block ${sizeClasses[iconSize]}`}
        aria-hidden="true"
      />
    )
  }

  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`
        inline-flex items-center justify-center
        rounded-lg transition-all duration-200
        bg-gray-100 hover:bg-gray-200
        dark:bg-gray-800 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-gray-400
        dark:focus:ring-gray-600 focus:ring-offset-2
        ${sizeClasses[iconSize]}
      `}
    >
      <span className="flex items-center gap-1.5">
        {theme === 'dark' ? (
          <>
            <span>☀️</span>
            {showText && <span className="sr-only sm:not-sr-only">Light</span>}
          </>
        ) : (
          <>
            <span>🌙</span>
            {showText && <span className="sr-only sm:not-sr-only">Dark</span>}
          </>
        )}
      </span>
    </button>
  )
}