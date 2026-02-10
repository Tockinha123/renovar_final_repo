type StepProps = {
  position: number
  text: string
  videoId: string
}

interface IDocumentsListItemProps {
  title: string
  steps: StepProps[]
}

export type { IDocumentsListItemProps, StepProps }
