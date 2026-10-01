import { useEffect, useState } from 'react'
import { projects } from './data/projects'
import { Sidebar } from './components/Sidebar'
import { Library } from './components/Library'
import { ProjectDetail } from './components/ProjectDetail'
import { Profile } from './components/Profile'

type Route =
  | { view: 'library' }
  | { view: 'profile' }
  | { view: 'project'; slug: string }

/** Hash routing keeps deep links working on any static host, with no server rules. */
function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '')
  if (hash === 'perfil') return { view: 'profile' }
  const match = hash.match(/^p\/(.+)$/)
  if (match && projects.some((p) => p.slug === match[1])) {
    return { view: 'project', slug: match[1] }
  }
  return { view: 'library' }
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const go = (hash: string) => {
    window.location.hash = hash
  }

  const project = route.view === 'project' ? projects.find((p) => p.slug === route.slug) : undefined

  return (
    <div className="flex min-h-screen">
      <Sidebar
        view={route.view}
        activeSlug={route.view === 'project' ? route.slug : null}
        onNavigate={(v) => go(v === 'profile' ? '/perfil' : '/')}
        onOpen={(slug) => go(`/p/${slug}`)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileBar route={route} onGo={go} />
        <main className="min-w-0 flex-1">
          {route.view === 'library' && <Library onOpen={(slug) => go(`/p/${slug}`)} />}
          {route.view === 'profile' && <Profile />}
          {project && <ProjectDetail project={project} onBack={() => go('/')} />}
        </main>
      </div>
    </div>
  )
}

function MobileBar({ route, onGo }: { route: Route; onGo: (hash: string) => void }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-void/85 px-4 py-3 backdrop-blur lg:hidden">
      <button
        onClick={() => onGo('/')}
        className="flex items-center gap-2.5 text-[13px] font-semibold"
      >
        <span className="grid size-7 place-items-center rounded-md bg-linear-to-br from-accent to-[#4c2fd6] font-mono text-[10px] font-bold text-white">
          LS
        </span>
        Lucas Emanuel
      </button>
      <nav className="flex gap-1">
        <button
          onClick={() => onGo('/')}
          className={`rounded-md px-3 py-1.5 text-[13px] transition-colors ${
            route.view === 'profile' ? 'text-muted' : 'bg-raised text-ink'
          }`}
        >
          Biblioteca
        </button>
        <button
          onClick={() => onGo('/perfil')}
          className={`rounded-md px-3 py-1.5 text-[13px] transition-colors ${
            route.view === 'profile' ? 'bg-raised text-ink' : 'text-muted'
          }`}
        >
          Perfil
        </button>
      </nav>
    </header>
  )
}
