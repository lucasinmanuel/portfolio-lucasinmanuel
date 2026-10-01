import type { Project } from '../data/projects'

const tone: Record<Project['status'], string> = {
  'Em produção': 'border-emerald-400/35 bg-emerald-400/10 text-emerald-300',
  Ativo: 'border-data/35 bg-data/10 text-data',
  Entregue: 'border-line bg-raised text-muted',
}

export function StatusPill({ status }: { status: Project['status'] }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase ${tone[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
