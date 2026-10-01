import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { Cover } from './Cover'
import { StatusPill } from './StatusPill'

export function Library({ onOpen }: { onOpen: (slug: string) => void }) {
  const hero = projects.find((p) => p.featured) ?? projects[0]

  return (
    <div className="rise mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-[27px] leading-tight font-bold sm:text-[34px]">
          Sistemas que eu construí e mantive
        </h1>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          Quase tudo aqui é código fechado de cliente, então não tem repositório para abrir. O que
          tem é o que importa numa contratação: o problema de cada sistema, a arquitetura que
          resolveu e a decisão por trás dela.
        </p>
      </header>

      <HeroCard project={hero} onOpen={onOpen} />

      <h2 className="mt-12 mb-4 font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
        Todos os projetos
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

function HeroCard({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-line bg-panel">
      <Cover
        hue={project.hue}
        monogram={project.monogram}
        size="hero"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void/92 via-void/70 to-transparent" />
      <div className="relative flex flex-col justify-end p-6 sm:min-h-[310px] sm:p-9">
        <StatusPill status={project.status} />
        <h2 className="mt-3 max-w-[18ch] text-2xl leading-tight font-bold sm:text-[32px]">
          {project.title}
        </h2>
        <p className="mt-2 max-w-[52ch] text-[15px] text-muted">{project.subtitle}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpen(project.slug)}
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
          >
            Ver o caso
          </button>
          <span className="font-mono text-xs text-dim">
            {project.commits.toLocaleString('pt-BR')} commits · {project.period}
          </span>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <button
      onClick={() => onOpen(project.slug)}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel text-left transition-all hover:-translate-y-0.5 hover:border-accent/50"
    >
      <Cover
        hue={project.hue}
        monogram={project.monogram}
        className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-semibold">{project.title}</h3>
          <span className="shrink-0 font-mono text-[11px] text-dim">{project.period}</span>
        </div>
        <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{project.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[10px] text-muted"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-1 py-0.5 font-mono text-[10px] text-dim">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
