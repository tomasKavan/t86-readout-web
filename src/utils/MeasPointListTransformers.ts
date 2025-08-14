import { type MeasPointListFragment, MeasPointSubject, MeasPointSubjectSpecifier } from '../graphql/types/graphql'

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

function getGroup(mp: MeasPointListFragment): { icon: string, name: string } | undefined {
  const prSubj = groupPresets[mp.subject]
  if (prSubj) {
    if (mp.subjectSpec) {
      return (prSubj as any)[mp.subjectSpec]
    }
  }
  return prSubj as { icon: string, name: string } | undefined
}

export type Opt = {
  id: string,
  subject: MeasPointSubject,
  spec?: MeasPointSubjectSpecifier,
  name: string,
  icon: string
}

export function useMeasPointListGrouping() {
  const groupIcon = (mp: MeasPointListFragment): string => {
    return getGroup(mp)?.icon ?? ''
  }

  const groupLabel = (mp: MeasPointListFragment): string => {
    return getGroup(mp)?.name ?? ''
  }

  const buildOpt = (subj: MeasPointSubject, spec?: MeasPointSubjectSpecifier): Opt | undefined => {
    const prSubj = groupPresets[subj]
    if (prSubj) {
      if (spec) {
        const prSpec = (prSubj as any)[spec]
        if (!prSpec) return 
        return {
          id: `${subj}:${spec}`,
          subject: subj,
          spec: spec,
          name: (prSpec as any).name,
          icon: (prSpec as any).icon
        }
      } else {
        if (!(prSubj as any).name) return
        return {
          id: subj,
          subject: subj,
          spec: spec,
          name: (prSubj as any).name,
          icon: (prSubj as any).icon
        }
      }
    }
    return
  }

  const optList = (): Opt[] => {
    return [
      buildOpt(MeasPointSubject.Electricity) as Opt,
      buildOpt(MeasPointSubject.Water, MeasPointSubjectSpecifier.Hot) as Opt,
      buildOpt(MeasPointSubject.Water, MeasPointSubjectSpecifier.Cold) as Opt,
      buildOpt(MeasPointSubject.Heat) as Opt,
      buildOpt(MeasPointSubject.GasFuel) as Opt,
      buildOpt(MeasPointSubject.Environment) as Opt,
      buildOpt(MeasPointSubject.Cleaning) as Opt,
    ]
  }

  return {
    groupIcon,
    groupLabel,
    optList
  }

}