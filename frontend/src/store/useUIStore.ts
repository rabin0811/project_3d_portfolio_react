import { create } from 'zustand'

interface UIState {
  isLoading: boolean
  isMobileMenuOpen: boolean
  activeSection: string
  cursorVariant: 'default' | 'hover' | 'click'
  setLoading: (loading: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  setActiveSection: (section: string) => void
  setCursorVariant: (variant: 'default' | 'hover' | 'click') => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  isMobileMenuOpen: false,
  activeSection: 'hero',
  cursorVariant: 'default',
  setLoading: (loading) => set({ isLoading: loading }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}))
