import { useState } from 'react'
import { DatasetSwitch } from './components/DatasetSwitch'
import { Header } from './components/Header'
import { Listing } from './components/Listing'
import { PageIntro } from './components/PageIntro'
import { ThemeToggle } from './components/ThemeToggle'
import { DATASETS } from './datasets'
import { useTheme } from './hooks/useTheme'
import type { DatasetId } from './types/dataset'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [datasetId, setDatasetId] = useState<DatasetId>(DATASETS[0].id)
  const dataset = DATASETS.find((candidate) => candidate.id === datasetId) ?? DATASETS[0]

  return (
    <>
      <Header actions={<ThemeToggle theme={theme} onToggle={toggleTheme} />} />
      <main className="mx-auto max-w-content px-4 pt-[calc(62px+3rem)] pb-16 sm:pt-[calc(62px+4rem)]">
        <PageIntro text={dataset.text}>
          <DatasetSwitch datasets={DATASETS} selectedId={dataset.id} onSelect={setDatasetId} />
        </PageIntro>
        <div className="mt-10">
          <Listing key={dataset.id} dataset={dataset} />
        </div>
      </main>
    </>
  )
}

export default App
