'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { useEffect, useState } from 'react';

const DEFAULT_THEME_PROPS = {
  attribute: 'class',
  defaultTheme: 'system',
  enableSystem: true,
  disableTransitionOnChange: true,
  storageKey: 'theme-preference',
} as const

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-bg text-fg">{children}</div>;
  }

  return (
    <NextThemesProvider
      {...DEFAULT_THEME_PROPS}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}