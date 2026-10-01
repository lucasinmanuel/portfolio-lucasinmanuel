import type { Project } from '../data/projects'
import { Cover } from './Cover'
import { StatusPill } from './StatusPill'

export function ProjectDetail({
  project,
  onBack,
}: {
  project: Project
  onBack: () => void
}) {
  return (
    <article key={project.slug} className="rise mx-auto w-full max-w-[1180px] pb-20">
      <section className="relative overflow-hidden sm:rounded-b-2xl">
        <Cover
          hue={project.hue}
          monogram={project.monogram}
          size="hero"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-void via-void/65 to-void/25" />
        <div className="relative px-4 pt-6 pb-8 sm:px-10 sm:pt-8 sm:pb-10">
          <button
            onClick={onBack}
            className="mb-7 inline-flex items-center gap-2 rounded-lg border border-line bg-void/50 px-3 py-1.5 text-[13px] text-muted backdrop-blur transition-colors hover:border-accent/50 hover:text-ink"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
              <path d="M10.5 2.5 5 8l5.5 5.5-1.4 1.4L2.2 8 9.1 1.1z" />
            </svg>
            Biblioteca
          </button>
          <StatusPill status={project.status} />
          <h1 className="mt-3 max-w-[22ch] text-[28px] leading-tight font-bold sm:text-[40px]">
            {project.title}
          </h1>
          <p className="mt-2 max-w-[60ch] text-[15px] text-muted sm:text-base">
            {project.subtitle}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-4">
        <Stat label="Commits meus" value={project.commits.toLocaleString('pt-BR')} note={project.share} />
        <Stat label="Período" value={project.period} />
        <Stat label="Cliente" value={project.client} />
        <Stat label="Papel" value={project.role} />
      </div>

      <div className="grid gap-12 px-4 pt-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
        <div className="min-w-0">
          <p className="text-[17px] leading-relaxed text-ink/90">{project.summary}</p>

          {project.embed && (
            <section className="mt-10">
              <h2 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
                O produto
              </h2>
              <div className="w-full max-w-[504px] overflow-hidden rounded-xl border border-line bg-panel">
                <iframe
                  src={project.embed.src}
                  height={project.embed.height}
                  title={`${project.title} — ${project.embed.caption}`}
                  loading="lazy"
                  allowFullScreen
                  className="block w-full"
                />
              </div>
              <p className="mt-2.5 text-[12.5px] text-dim">{project.embed.caption}</p>
            </section>
          )}

          <h2 className="mt-12 mb-5 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
            <TrophyIcon />
            Problemas resolvidos
          </h2>
          <ul className="space-y-3">
            {project.achievements.map((a, i) => (
              <li
                key={a.title}
                className="rounded-xl border border-line bg-panel p-5 transition-colors hover:border-line/80"
              >
                <div className="flex gap-4">
                  <span
                    className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md font-mono text-[11px] font-bold"
                    style={{
                      background: `hsl(${project.hue} 60% 50% / 0.14)`,
                      color: `hsl(${project.hue} 80% 74%)`,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold">{a.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{a.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 mb-5 font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
            Arquitetura
          </h2>
          <ul className="space-y-3">
            {project.architecture.map((line) => (
              <li key={line} className="flex gap-3.5 text-[14px] leading-relaxed text-muted">
                <span
                  className="mt-[0.5em] size-1.5 shrink-0 rounded-full"
                  style={{ background: `hsl(${project.hue} 70% 60%)` }}
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <h2 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
            Stack
          </h2>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {s}
              </li>
            ))}
          </ul>
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex items-center gap-2.5 rounded-lg border border-line bg-panel px-4 py-3 text-[13px] text-muted transition-colors hover:border-accent/50 hover:text-ink"
            >
              <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              Ver o código no GitHub
            </a>
          ) : (
            <p className="mt-7 rounded-lg border border-line bg-panel p-4 text-[12.5px] leading-relaxed text-dim">
              Repositório privado. Posso apresentar a arquitetura e as decisões em entrevista,
              dentro do que o contrato permite.
            </p>
          )}
        </aside>
      </div>
    </article>
  )
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="bg-void px-4 py-4 sm:px-6 sm:py-5">
      <p className="font-mono text-[10px] tracking-[0.14em] text-dim uppercase">{label}</p>
      <p className="mt-1.5 font-mono text-[15px] font-medium text-ink sm:text-lg">{value}</p>
      {note && <p className="mt-1 text-[11px] text-dim">{note}</p>}
    </div>
  )
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 text-accent" fill="currentColor" aria-hidden="true">
      <path d="M4 1h8v1h2.5a.5.5 0 0 1 .5.5V4a3 3 0 0 1-2.76 2.99A4.5 4.5 0 0 1 9 9.42V12h2v2H5v-2h2V9.42A4.5 4.5 0 0 1 4.26 6.99 3 3 0 0 1 1.5 4V2.5a.5.5 0 0 1 .5-.5H4zm0 2H2.5v1A1.5 1.5 0 0 0 4 5.5zm8 0v2.5A1.5 1.5 0 0 0 13.5 4V3z" />
    </svg>
  )
}
