import { useEffect, useRef, useCallback, useState } from 'react'

interface Line {
  text: string
  type: 'input' | 'output' | 'code' | 'success' | 'error' | 'info'
  delay?: number
}

const SECTIONS = ['hero', 'about', 'education', 'skills', 'tech-stack', 'certifications', 'projects', 'gallery', 'contact']

const SCRIPTS: Line[][] = [
  // Initial boot sequence
  [
    { text: '', type: 'info', delay: 200 },
    { text: '> Initializing development environment...', type: 'info', delay: 300 },
    { text: '> Loading kernel modules...', type: 'info', delay: 400 },
    { text: '> Starting dev server on port 5173', type: 'success', delay: 500 },
    { text: '', type: 'info', delay: 100 },
  ],
  // Git status loop
  [
    { text: '$ git status', type: 'input' },
    { text: 'On branch main', type: 'output' },
    { text: 'Your branch is up to date with origin/main', type: 'output' },
    { text: '', type: 'info', delay: 50 },
    { text: 'Changes not staged for commit:', type: 'output' },
    { text: '  modified: src/components/sections/Hero.tsx', type: 'code' },
    { text: '  modified: src/styles/globals.css', type: 'code' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Build sequence
  [
    { text: '$ npm run build', type: 'input' },
    { text: '> 3d@0.0.0 build', type: 'output' },
    { text: '> tsc -b && vite build', type: 'output' },
    { text: '✓ TypeScript check passed', type: 'success', delay: 300 },
    { text: '✓ Built in 1.2s', type: 'success', delay: 200 },
    { text: '', type: 'info', delay: 50 },
  ],
  // Dev server
  [
    { text: '$ npm run dev', type: 'input' },
    { text: 'VITE v6.0.0 ready in 320ms', type: 'output' },
    { text: 'Local: http://localhost:5173/', type: 'success' },
    { text: 'Network: use --host to expose', type: 'output' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Code editing
  [
    { text: '$ nvim src/components/sections/About.tsx', type: 'input' },
    { text: '', type: 'info', delay: 100 },
    { text: "  function About() {", type: 'code' },
    { text: "    return (", type: 'code' },
    { text: "      <section id='about'>", type: 'code' },
    { text: "        <h2>About Me</h2>", type: 'code' },
    { text: "      </section>", type: 'code' },
    { text: "    )", type: 'code' },
    { text: "  }", type: 'code' },
    { text: '', type: 'info', delay: 50 },
    { text: '✓ File saved', type: 'success', delay: 200 },
    { text: '', type: 'info', delay: 50 },
  ],
  // Testing
  [
    { text: '$ npm test', type: 'input' },
    { text: 'PASS src/components/sections/About.test.tsx', type: 'success' },
    { text: 'PASS src/components/sections/Hero.test.tsx', type: 'success' },
    { text: 'Tests: 24 passed, 24 total', type: 'success', delay: 300 },
    { text: '', type: 'info', delay: 50 },
  ],
  // Git commit
  [
    { text: '$ git add .', type: 'input' },
    { text: '$ git commit -m "feat: add terminal background"', type: 'input' },
    { text: '[main a1b2c3d] feat: add terminal background', type: 'output' },
    { text: ' 12 files changed, 345 insertions(+)', type: 'code' },
    { text: ' create mode 100644 src/components/ui/TerminalBackground.tsx', type: 'code' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Git push
  [
    { text: '$ git push origin main', type: 'input' },
    { text: 'Enumerating objects: 48, done.', type: 'output' },
    { text: 'Counting objects: 100% (48/48), done.', type: 'output' },
    { text: 'Writing objects: 100% (28/28), 12.5 KiB, done.', type: 'output' },
    { text: '✓ main -> main', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Deploy
  [
    { text: '$ npm run deploy', type: 'input' },
    { text: '> Building for production...', type: 'output' },
    { text: '✓ Files built successfully', type: 'success' },
    { text: '> Deploying to GitHub Pages...', type: 'info' },
    { text: '✓ Deployed successfully!', type: 'success', delay: 400 },
    { text: 'https://rabin0811.github.io', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Docker
  [
    { text: '$ docker compose up -d', type: 'input' },
    { text: 'Container frontend Created', type: 'output' },
    { text: 'Container backend  Created', type: 'output' },
    { text: 'Container database Created', type: 'output' },
    { text: '✓ All containers running', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Database migration
  [
    { text: '$ dotnet ef migrations add InitialCreate', type: 'input' },
    { text: 'Build started...', type: 'output' },
    { text: 'Build succeeded.', type: 'success' },
    { text: 'Done. To undo this migration, use dotnet ef migrations remove', type: 'output' },
    { text: '', type: 'info', delay: 50 },
  ],
  // curl test
  [
    { text: '$ curl -X GET https://api.github.com/users/rabin0811/repos', type: 'input' },
    { text: '[', type: 'output' },
    { text: '  { "name": "3d-portfolio", "stars": 3 },', type: 'code' },
    { text: '  { "name": "ecommerce", "stars": 5 },', type: 'code' },
    { text: '  { "name": "task-manager", "stars": 2 }', type: 'code' },
    { text: ']', type: 'output' },
    { text: '', type: 'info', delay: 50 },
  ],
  // SSH
  [
    { text: '$ ssh rabin@dev-server', type: 'input' },
    { text: 'Welcome to Ubuntu 24.04 LTS', type: 'output' },
    { text: 'Last login: from 192.168.1.100', type: 'output' },
    { text: 'rabin@dev-server:~$ ', type: 'input' },
    { text: '', type: 'info', delay: 50 },
  ],
  // LS
  [
    { text: '$ ls -la', type: 'input' },
    { text: 'drwxr-xr-x  rabin  staff  1.2K  Jul 24  portfolio/', type: 'code' },
    { text: '-rw-r--r--  rabin  staff   253  Jun 24  .gitignore', type: 'code' },
    { text: '-rw-r--r--  rabin  staff  1.2K  Jun 24  README.md', type: 'code' },
    { text: 'drwxr-xr-x  rabin  staff  224B  Jul 13  src/', type: 'code' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Viewing a component
  [
    { text: '$ bat src/components/sections/Hero.tsx', type: 'input' },
    { text: '', type: 'info', delay: 80 },
    { text: "  import { Canvas } from '@react-three/fiber'", type: 'code' },
    { text: "  import { HeroScene } from '@/components/three/HeroScene'", type: 'code' },
    { text: "  import { ProfileImage } from '@/components/profile/ProfileImage'", type: 'code' },
    { text: '', type: 'info', delay: 50 },
    { text: "  export function Hero() {", type: 'code' },
    { text: "    return (", type: 'code' },
    { text: "      <section id='hero'>", type: 'code' },
    { text: "        <Canvas>...</Canvas>", type: 'code' },
    { text: "      </section>", type: 'code' },
    { text: "    )", type: 'code' },
    { text: "  }", type: 'code' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Section navigation commands (these trigger scrolls)
  [
    { text: '$ cd projects && ls', type: 'input' },
    { text: 'E-Commerce Platform/', type: 'code' },
    { text: 'Task Management App/', type: 'code' },
    { text: 'Portfolio Website/', type: 'code' },
    { text: 'Network Monitor/', type: 'code' },
    { text: '', type: 'info', delay: 50 },
  ],
  // NPM install
  [
    { text: '$ npm install three @react-three/fiber', type: 'input' },
    { text: 'added 124 packages in 4.3s', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Lint
  [
    { text: '$ npm run lint', type: 'input' },
    { text: '✓ No lint errors found', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // TypeScript check
  [
    { text: '$ npx tsc --noEmit', type: 'input' },
    { text: '✓ TypeScript compilation complete', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Preview
  [
    { text: '$ npm run preview', type: 'input' },
    { text: 'Local: http://localhost:4173/', type: 'success' },
    { text: 'Network: http://192.168.1.100:4173/', type: 'output' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Hot reload
  [
    { text: '✎ File change detected: src/components/sections/Skills.tsx', type: 'info', delay: 200 },
    { text: '🔄 Hot Module Replacement triggered', type: 'info', delay: 200 },
    { text: '✓ Updated in 47ms', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Tailwind
  [
    { text: '$ tailwindcss -i ./src/styles/globals.css -o ./dist/output.css', type: 'input' },
    { text: '✓ Tailwind CSS compiled successfully', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Routing
  [
    { text: '$ curl http://localhost:5173/', type: 'input' },
    { text: '200 OK', type: 'success' },
    { text: 'Content-Type: text/html', type: 'output' },
    { text: '', type: 'info', delay: 50 },
  ],
  // 3D scene rebuild
  [
    { text: '⚡ Rebuilding Three.js scene...', type: 'info', delay: 300 },
    { text: '✓ Scene graph optimized', type: 'success', delay: 200 },
    { text: '✓ Shaders compiled', type: 'success', delay: 200 },
    { text: '✓ Render pipeline initialized', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
  // Performance
  [
    { text: '> Lighthouse Report:', type: 'info' },
    { text: '  Performance:  96', type: 'success' },
    { text: '  Accessibility: 100', type: 'success' },
    { text: '  SEO:          100', type: 'success' },
    { text: '', type: 'info', delay: 50 },
  ],
]

const COLORS: Record<string, string> = {
  input: '#00E5FF',
  output: '#A0A0A0',
  code: '#7B61FF',
  success: '#22C55E',
  error: '#FF4444',
  info: '#FFD700',
}

// Pre-calculate total scripts length for random access
const TOTAL_COMMANDS = SCRIPTS.reduce((sum, script) => sum + script.length, 0)

const NAV_COMMANDS: [RegExp, number][] = [
  [/cd hero|open hero|goto hero/i, 0],
  [/cd about|open about|goto about/i, 1],
  [/cd education|open education|goto education/i, 2],
  [/cd skills|open skills|goto skills/i, 3],
  [/cd tech|open tech-stack|goto tech/i, 4],
  [/cd cert|open certifications|goto cert/i, 5],
  [/cd projects|open projects|goto projects/i, 6],
  [/cd contact|open contact|goto contact/i, 8],
]

export function TerminalBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentLineRef = useRef<HTMLDivElement>(null)
  const currentScriptRef = useRef(0)
  const currentLineIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const linesRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const pauseTimerRef = useRef<number | null>(null)

  const [displayLines, setDisplayLines] = useState<Array<{ text: string; type: string; id: number }>>([])
  const [currentTyping, setCurrentTyping] = useState('')
  const idCounterRef = useRef(0)
  const lineIdRef = useRef(0)

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const advanceLine = useCallback(() => {
    const script = SCRIPTS[currentScriptRef.current]
    const lineData = script[currentLineIndexRef.current]

    // Reset typing
    charIndexRef.current = 0

    // If this line has a visual delay, pause before showing
    if (lineData.delay) {
      isPausedRef.current = true
      pauseTimerRef.current = window.setTimeout(() => {
        isPausedRef.current = false
        startTypingLine()
      }, lineData.delay)
    } else {
      startTypingLine()
    }
  }, [])

  const startTypingLine = useCallback(() => {
    const script = SCRIPTS[currentScriptRef.current]
    const lineData = script[currentLineIndexRef.current]

    // If empty line, just add it immediately
    if (lineData.text === '') {
      setDisplayLines(prev => [
        ...prev,
        { text: '', type: lineData.type, id: idCounterRef.current++ },
      ])

      moveToNextLine()
      return
    }

    // Start typing character by character
    if (lineData.type === 'input' || lineData.type === 'code') {
      charIndexRef.current = 0
      // Input lines and code get typed
      const typingInterval = setInterval(() => {
        if (charIndexRef.current < lineData.text.length) {
          setCurrentTyping(lineData.text.slice(0, charIndexRef.current + 1))
          charIndexRef.current++
        } else {
          clearInterval(typingInterval)
          // Line complete, add to display
          setDisplayLines(prev => [
            ...prev,
            { text: lineData.text, type: lineData.type, id: idCounterRef.current++ },
          ])
          setCurrentTyping('')
          moveToNextLine()
        }
      }, 15 + Math.random() * 20)
    } else {
      // Output lines appear instantly
      setDisplayLines(prev => [
        ...prev,
        { text: lineData.text, type: lineData.type, id: idCounterRef.current++ },
      ])
      moveToNextLine()
    }
  }, [])

  const checkNavCommands = useCallback((text: string) => {
    for (const [pattern, sectionIndex] of NAV_COMMANDS) {
      if (pattern.test(text) && sectionIndex < SECTIONS.length) {
        scrollToSection(SECTIONS[sectionIndex])
        return true
      }
    }
    return false
  }, [scrollToSection])

  const moveToNextLine = useCallback(() => {
    const script = SCRIPTS[currentScriptRef.current]
    currentLineIndexRef.current++

    if (currentLineIndexRef.current >= script.length) {
      // Move to next script
      currentScriptRef.current = (currentScriptRef.current + 1) % SCRIPTS.length
      currentLineIndexRef.current = 0
    }

    // Small delay before next line
    pauseTimerRef.current = window.setTimeout(() => {
      advanceLine()
    }, 150 + Math.random() * 200)
  }, [advanceLine])

  // Start everything
  useEffect(() => {
    const initialLines: Array<{ text: string; type: string; id: number }> = []
    for (let i = 0; i < 8; i++) {
      initialLines.push({ text: '', type: 'info', id: idCounterRef.current++ })
    }
    initialLines.push({ text: '> Terminal ready. Initializing...', type: 'info', id: idCounterRef.current++ })
    setDisplayLines(initialLines)

    setTimeout(() => {
      advanceLine()
    }, 500)

    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [advanceLine])

  // Auto-scroll
  useEffect(() => {
    if (linesRef.current) {
      linesRef.current.scrollTop = linesRef.current.scrollHeight
    }
  }, [displayLines, currentTyping])

  // Check for nav commands
  useEffect(() => {
    if (displayLines.length > 0) {
      const lastLine = displayLines[displayLines.length - 1]
      if (lastLine.type === 'input') {
        checkNavCommands(lastLine.text)
      }
    }
  }, [displayLines, checkNavCommands])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        background: '#050505',
        fontFamily: "'JetBrains Mono', 'Cascadia Code', monospace",
        fontSize: '13px',
        lineHeight: '1.6',
      }}
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 229, 255, 0.3) 1px, rgba(0, 229, 255, 0.3) 2px)',
          zIndex: 2,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1,
        }}
      />

      {/* Terminal lines */}
      <div
        ref={linesRef}
        className="absolute inset-0 overflow-y-auto p-6 pb-32"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        <div className="min-h-full flex flex-col justify-end">
          {displayLines.map((line) => (
            <div
              key={line.id}
              className="leading-relaxed whitespace-pre-wrap"
              style={{
                color: COLORS[line.type] || '#A0A0A0',
                opacity: line.type === 'input' ? 1 : 0.7,
                minHeight: line.text === '' ? '0.5rem' : 'auto',
              }}
            >
              {line.type === 'input' && (
                <span style={{ color: '#22C55E', opacity: 0.8 }}>❯ </span>
              )}
              {line.text}
            </div>
          ))}

          {/* Current typing line */}
          {currentTyping && (
            <div className="leading-relaxed whitespace-pre-wrap" style={{ color: COLORS.input }}>
              <span style={{ color: '#22C55E', opacity: 0.8 }}>❯ </span>
              {currentTyping}
              <span
                className="inline-block w-[6px] h-[14px] ml-[2px] align-middle"
                style={{
                  backgroundColor: '#00E5FF',
                  animation: 'terminalBlink 1s step-end infinite',
                  opacity: 0.8,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes terminalBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
