import { profile, projects } from '../data/projects'

export function Profile() {
  const totalCommits = projects.reduce((sum, p) => sum + p.commits, 0)

  return (
    <div className="rise mx-auto w-full max-w-[860px] px-4 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-wrap items-center gap-5">
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-[#4c2fd6] font-mono text-xl font-bold text-white">
          LS
        </div>
        <div>
          <h1 className="text-2xl font-bold sm:text-[28px]">{profile.name}</h1>
          <p className="mt-1 text-[15px] text-muted">
            {profile.title} · {profile.location}
          </p>
        </div>
      </div>

      <div className="mt-9 space-y-4">
        {profile.bio.map((p) => (
          <p key={p} className="text-[15px] leading-relaxed text-ink/85">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        <Stat label="Projetos em produção" value={String(projects.length)} />
        <Stat label="Commits nestes repos" value={totalCommits.toLocaleString('pt-BR')} />
        <Stat label="Fuso" value="UTC−3" />
      </div>

      <h2 className="mt-14 mb-5 font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
        Ferramentas
      </h2>
      <dl className="space-y-5">
        {profile.skills.map((group) => (
          <div key={group.group} className="sm:flex sm:gap-6">
            <dt className="shrink-0 pt-1 font-mono text-[11px] tracking-wide text-dim uppercase sm:w-28">
              {group.group}
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5 sm:mt-0">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-14 rounded-xl border border-line bg-panel p-6">
        <h2 className="text-[15px] font-semibold">Contato</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          Disponível para posições backend. Posso abrir arquitetura e decisões em entrevista.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            github.com/{profile.handle}
          </a>
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-panel px-5 py-4">
      <p className="font-mono text-xl font-medium text-ink">{value}</p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-dim uppercase">{label}</p>
    </div>
  )
}
