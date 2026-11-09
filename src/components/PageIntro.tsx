import type { ReactNode } from 'react'
import { usersDataset } from '../datasets/users'
import type { DatasetText } from '../types/dataset'

interface PageIntroProps {
  text?: Pick<DatasetText, 'eyebrow' | 'title' | 'intro'>
  /** Extra content below the supporting text (e.g. the data source switch). */
  children?: ReactNode
}

/** Page intro: eyebrow, main title (<h1>) and supporting text. */
export function PageIntro({ text = usersDataset.text, children }: PageIntroProps) {
  return (
    <section aria-labelledby="page-title" className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary-dark uppercase dark:text-primary">
        {text.eyebrow}
      </p>
      <h1
        id="page-title"
        className="mt-3 text-3xl leading-[1.08] font-extrabold text-heading uppercase sm:text-5xl dark:text-white"
      >
        {text.title}
      </h1>
      <p className="mt-4 text-body dark:text-white/72">{text.intro}</p>
      {children}
    </section>
  )
}
