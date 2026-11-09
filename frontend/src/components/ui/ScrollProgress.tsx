import { useState, useEffect } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(Math.min(window.scrollY / total, 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: 'left',
          background: 'linear-gradient(90deg, #00E5FF, #7B61FF, #FF6B9D)',
        }}
      />
      <div
        className="fixed top-0 left-0 w-full h-[4px] z-[99] opacity-30 blur-sm"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: 'left',
          background: 'linear-gradient(90deg, #00E5FF, #7B61FF, #FF6B9D)',
        }}
      />
    </>
  )
}
