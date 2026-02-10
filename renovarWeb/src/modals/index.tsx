import { AddictionInterventionModal } from '@/modals/addiction-intervention'
import { BreatheBackgroundModal } from '@/modals/breathe-background'
import { AddicationEducationModal } from './addiction-education'

export const modalMap = {
  'addiction-intervention': AddictionInterventionModal,
  'breathe-background': BreatheBackgroundModal,
  'addiction-education': AddicationEducationModal,
} as const
