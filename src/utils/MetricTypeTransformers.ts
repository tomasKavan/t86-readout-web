import { MeasPointSubject, MetricFunc, MetricType } from "../graphql/types/graphql"

const types: Record<MetricType, string> = {
  [MetricType.Consumption] : 'Spotřeba',
  [MetricType.TimeElapsed] : 'Uplynulý čas'
}

export function getTypeLabel(type: MetricType): string {
  return types[type]
}

const functions: Record<MetricFunc, string> = {
  [MetricFunc.Inst] : 'Okamžitá hodnota',
  [MetricFunc.Sum] : 'Souhrnně'
}

export function getFunctionLabel(func: MetricFunc): string {
  return functions[func]
}

export type Unit = {
  id: string
  name: string,
  abbr: string,
  richAbbr: string
}

const unknownUnit: Unit = {
  id: 'unknown',
  name: 'Neznámá',
  abbr: 'n/a',
  richAbbr: 'n/a'
}

const units: Unit[] = [{
  id: 'kilowatthour',
  name: 'kilowatthodina',
  abbr: 'kWh',
  richAbbr: 'kWh'
}, {
  id: 'cubicmeter',
  name: 'Metr krychlový',
  abbr: 'm3',
  richAbbr: 'm<sup>3</sup>'
}, {
  id: 'second',
  name: 'Sekunda',
  abbr: 's',
  richAbbr: 's'
}, {
  id: 'liter',
  name: 'Litr',
  abbr: 'l',
  richAbbr: 'l'
}]

type MetricMap = Partial<Record<MetricType, Unit | undefined>>
type TypeDescriptor = Record<MeasPointSubject, MetricMap>

const typeDescriptor: TypeDescriptor = {
  [MeasPointSubject.Electricity] : {
    [MetricType.Consumption] : units.find(u => u.id === 'kilowatthour'),
  },
  [MeasPointSubject.Water] : {
    [MetricType.Consumption] : units.find(u => u.id === 'liter'),
  },
  [MeasPointSubject.GasFuel] : {
    [MetricType.Consumption] : units.find(u => u.id === 'cubicmeter'),
  },
  [MeasPointSubject.Heat] : {
    [MetricType.Consumption] : units.find(u => u.id === 'kilowatthour'),
  },
  [MeasPointSubject.Cleaning] : {
    [MetricType.TimeElapsed] : units.find(u => u.id === 'second'),
  },
  [MeasPointSubject.Environment] : {},
} as const

export function getUnit(subject: MeasPointSubject, type: MetricType): Unit {
  return typeDescriptor[subject][type] ?? unknownUnit
}