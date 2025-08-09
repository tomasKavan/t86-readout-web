import { type MeasPointMplFragment, MeasPointSubject, MeasPointSubjectSpecifier } from '../graphql/types/graphql'

const groupPresets = {
  [MeasPointSubject.Electricity]: {
    icon: 'bolt',
    name: 'Elektřina'
  },
  [MeasPointSubject.Water]: {
    [MeasPointSubjectSpecifier.Hot]: {
      icon: 'wave-pulse',
      name: 'Teplá voda'
    },
    [MeasPointSubjectSpecifier.Cold]: {
      icon: 'wave-pulse',
      name: 'Studená voda'
    }
  }, 
  [MeasPointSubject.Heat]: {
    icon: 'sun',
    name: 'Teplo'
  },
  [MeasPointSubject.GasFuel]: {
    icon: 'sun',
    name: 'Plyn'
  },
  [MeasPointSubject.Environment]: {
    icon: 'sparkles',
    name: 'Prostředí'
  },
  [MeasPointSubject.Cleaning]: {
    icon: 'wrench',
    name: 'Úklid'
  }
} as const

function getGroup(mp: MeasPointMplFragment): { icon: string, name: string } | undefined {
  const prSubj = groupPresets[mp.subject]
  if (prSubj) {
    if (mp.subjectSpec) {
      return (prSubj as any)[mp.subjectSpec]
    }
  }
  return prSubj as { icon: string, name: string } | undefined
}

export function useMeasPointListGrouping() {
  const groupIcon = (mp: MeasPointMplFragment): string => {
    return getGroup(mp)?.icon ?? ''
  }

  const groupLabel = (mp: MeasPointMplFragment): string => {
    return getGroup(mp)?.name ?? ''
  }

  return {
    groupIcon,
    groupLabel
  }

}