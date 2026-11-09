import { useState, useEffect, useCallback, useRef } from 'react'

interface UseImageCycleOptions {
  folder: string
  interval?: number
}

export function useImageCycle({ folder, interval = 4000 }: UseImageCycleOptions) {
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const indexRef = useRef(0)

  useEffect(() => {
    const loadImages = async () => {
      const modules = import.meta.glob<{ default: string }>('/public/images/profile/*.{png,jpg,jpeg,webp,svg}')
      const paths = Object.keys(modules)
      if (paths.length > 0) {
        const mapped = paths.map(p => p.replace('/public', ''))
        setImages(mapped)
        const randomIndex = Math.floor(Math.random() * mapped.length)
        indexRef.current = randomIndex
        setCurrentImage(mapped[randomIndex])
      }
      setIsLoading(false)
    }
    loadImages()
  }, [folder])

  const next = useCallback(() => {
    if (images.length === 0) return
    const nextIndex = (indexRef.current + 1) % images.length
    indexRef.current = nextIndex
    setCurrentImage(images[nextIndex])
  }, [images])

  const prev = useCallback(() => {
    if (images.length === 0) return
    const prevIndex = (indexRef.current - 1 + images.length) % images.length
    indexRef.current = prevIndex
    setCurrentImage(images[prevIndex])
  }, [images])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [images, interval, next])

  return { currentImage, images, isLoading, next, prev }
}
