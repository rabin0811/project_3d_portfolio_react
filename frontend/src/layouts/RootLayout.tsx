import { type ReactNode } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { BackToTop } from '@/components/ui/BackToTop'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { TerminalBackground } from '@/components/ui/TerminalBackground'
import { FloatingAvatar } from '@/components/three/FloatingAvatar'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <LoadingScreen />
      <TerminalBackground />
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <FloatingAvatar />
      <main className="relative z-10">
        <div className="terminal-blur min-h-screen">
          {children}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
