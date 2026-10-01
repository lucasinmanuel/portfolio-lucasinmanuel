import { projects, profile } from '../data/projects'
import type { Project } from '../data/projects'
import { Cover } from './Cover'

type SidebarProps = {
  view: 'library' | 'profile' | 'project'
  activeSlug: string | null
  onNavigate: (view: 'library' | 'profile') => void
  onOpen: (slug: string) => void
}

const statusColor: Record<Project['status'], string> = {
  'Em produção': 'bg-emerald-400',
  Ativo: 'bg-data',
  Entregue: 'bg-dim',
}

export function Sidebar({ view, activeSlug, onNavigate, onOpen }: SidebarProps) {
  return (
    <aside className="flex w-[264px] shrink-0 flex-col border-r border-line bg-panel max-lg:hidden">
      <div className="flex items-center gap-3 border-b border-line-soft px-5 py-5">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent to-[#4c2fd6] font-mono text-sm font-bold text-white">
          LS
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Lucas Emanuel</p>
          <p className="truncate text-xs text-dim">{profile.title}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 p-3">
        <NavItem
          label="Biblioteca"
          icon={<GridIcon />}
          active={view === 'library' || view === 'project'}
          onClick={() => onNavigate('library')}
        />
        <NavItem
          label="Perfil"
          icon={<UserIcon />}
          active={view === 'profile'}
          onClick={() => onNavigate('profile')}
        />
      </nav>

      <div className="flex min-h-0 flex-1 flex-col">
        <p className="px-5 pt-3 pb-2 font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
          Projetos · {projects.length}
        </p>
        <ul className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
          {projects.map((p) => {
            const selected = activeSlug === p.slug
            return (
              <li key={p.slug}>
                <button
                  onClick={() => onOpen(p.slug)}
                  aria-current={selected ? 'true' : undefined}
                  className={`group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors ${
                    selected ? 'bg-raised' : 'hover:bg-raised/60'
                  }`}
                >
                  <Cover
                    hue={p.hue}
                    monogram={p.monogram}
                    size="thumb"
                    className="size-8 shrink-0 rounded-md"
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[13px] ${selected ? 'text-ink' : 'text-muted group-hover:text-ink'}`}
                    >
                      {p.title}
                    </span>
                  </span>
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${statusColor[p.status]}`}
                    title={p.status}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="border-t border-line-soft p-3">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-[13px] text-muted transition-colors hover:bg-raised hover:text-ink"
        >
          <GithubIcon />
          github.com/{profile.handle}
        </a>
      </div>
    </aside>
  )
}

function NavItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active ? 'bg-accent/12 text-accent-soft' : 'text-muted hover:bg-raised hover:text-ink'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14.5c0-3 2.7-4.5 6-4.5s6 1.5 6 4.5z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  )
}
