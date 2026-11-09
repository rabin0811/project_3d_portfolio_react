import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { Home } from '@/pages/Home'
import { CV } from '@/pages/CV'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout><Home /></RootLayout>} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </BrowserRouter>
  )
}
