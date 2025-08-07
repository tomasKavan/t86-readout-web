/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Big decimal scalar representation */
  Big: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones */
  TimeZone: { input: any; output: any; }
};

export type AddMeasPoint = {
  autoReadoutEnabled?: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
  instDetails?: InputMaybe<Scalars['String']['input']>;
  mbusAddr?: InputMaybe<Scalars['Int']['input']>;
  mbusSerial?: InputMaybe<Scalars['String']['input']>;
  meterManufacturer?: InputMaybe<Scalars['String']['input']>;
  meterType?: InputMaybe<Scalars['String']['input']>;
  metrics?: InputMaybe<Array<AddMetric>>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  roomNo: Scalars['String']['input'];
  subject: MeasPointSubject;
  subjectSpec?: InputMaybe<MeasPointSubjectSpecifier>;
};

export type AddMetric = {
  func: MetricFunc;
  hasPhysicalDisplay?: Scalars['Boolean']['input'];
  mbusDecimalShift?: InputMaybe<Scalars['Int']['input']>;
  mbusValueRecordId?: InputMaybe<Scalars['Int']['input']>;
  type: MetricType;
};

export type AddReadout = {
  metricId: Scalars['ID']['input'];
  timestampUTC: Scalars['DateTimeISO']['input'];
  value: Scalars['Big']['input'];
};

export type AddReadoutError = {
  errCode: MBusReadoutErrCode;
  errDetail: Scalars['String']['input'];
  metricId: Scalars['ID']['input'];
  timestampUTC: Scalars['DateTimeISO']['input'];
};

export type ChangeMeter = {
  comments?: InputMaybe<Scalars['String']['input']>;
  corrections?: Array<ChangeMeterCorrection>;
  mbusAddr?: InputMaybe<Scalars['Int']['input']>;
  mbusSerial?: InputMaybe<Scalars['String']['input']>;
  meterManufacturer?: InputMaybe<Scalars['String']['input']>;
  meterType?: InputMaybe<Scalars['String']['input']>;
  occuredUTCTime: Scalars['DateTimeISO']['input'];
};

export type ChangeMeterCorrection = {
  hasPhysicalDisplay?: InputMaybe<Scalars['Boolean']['input']>;
  mbusDecimalShift?: InputMaybe<Scalars['Int']['input']>;
  mbusValueRecordId?: InputMaybe<Scalars['Int']['input']>;
  metricId: Scalars['Float']['input'];
  newMeterStartValue?: InputMaybe<Scalars['Big']['input']>;
  oldMeterEndValue?: InputMaybe<Scalars['Big']['input']>;
  value?: InputMaybe<Scalars['Big']['input']>;
};

export type Correction = {
  __typename?: 'Correction';
  createdUTCTime: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  metric: Metric;
  newMeterStartValue?: Maybe<Scalars['Big']['output']>;
  oldMeterEndValue?: Maybe<Scalars['Big']['output']>;
  oldMeterHasPhysicalDisplay?: Maybe<Scalars['Boolean']['output']>;
  oldMeterMbusDecimalShift?: Maybe<Scalars['Int']['output']>;
  oldMeterMbusValueRecordId?: Maybe<Scalars['Int']['output']>;
  serviceEvent: ServiceEvent;
  updatedUTCTime: Scalars['DateTimeISO']['output'];
  value: Scalars['Big']['output'];
};

/** Error codes of automatic readout from M-Bus */
export enum MBusReadoutErrCode {
  EMbusConnection = 'E_MBUS_CONNECTION',
  EMbusSerialMismatch = 'E_MBUS_SERIAL_MISMATCH',
  EMbusSlaveRead = 'E_MBUS_SLAVE_READ'
}

export type MBusRecord = {
  __typename?: 'MBusRecord';
  device?: Maybe<Scalars['Int']['output']>;
  function?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  storageNumber?: Maybe<Scalars['Int']['output']>;
  tariff?: Maybe<Scalars['Int']['output']>;
  timestamp: Scalars['DateTimeISO']['output'];
  unit?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Big']['output']>;
};

export type MBusSlave = {
  __typename?: 'MBusSlave';
  manufacturer?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  primaryAddress: Scalars['Int']['output'];
  records: Array<MBusRecord>;
  serial?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type MeasPoint = {
  __typename?: 'MeasPoint';
  autoReadoutEnabled: Scalars['Boolean']['output'];
  createdUTCTime: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  instDetails: Scalars['String']['output'];
  mbusAddr?: Maybe<Scalars['Int']['output']>;
  mbusSerial?: Maybe<Scalars['String']['output']>;
  meterManufacturer?: Maybe<Scalars['String']['output']>;
  meterType?: Maybe<Scalars['String']['output']>;
  metrics: Array<Metric>;
  name: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  roomNo: Scalars['String']['output'];
  serviceEvents: Array<ServiceEvent>;
  subject: MeasPointSubject;
  subjectSpec?: Maybe<MeasPointSubjectSpecifier>;
  updatedUTCTime: Scalars['DateTimeISO']['output'];
};

/** Subject of measurements observed by meter on measurement point */
export enum MeasPointSubject {
  Cleaning = 'CLEANING',
  Electricity = 'ELECTRICITY',
  Environment = 'ENVIRONMENT',
  GasFuel = 'GAS_FUEL',
  Heat = 'HEAT',
  Water = 'WATER'
}

/** Close specificationon of MeasPoint Subject. Can be null */
export enum MeasPointSubjectSpecifier {
  Cold = 'COLD',
  Hot = 'HOT'
}

export type Metric = {
  __typename?: 'Metric';
  corrections: Array<Correction>;
  createdUTCTime: Scalars['DateTimeISO']['output'];
  func: MetricFunc;
  hasPhysicalDisplay: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  mbusDecimalShift?: Maybe<Scalars['Int']['output']>;
  mbusValueRecordId?: Maybe<Scalars['Int']['output']>;
  measPoint: MeasPoint;
  readouts: Array<Readout>;
  type: MetricType;
  updatedUTCTime: Scalars['DateTimeISO']['output'];
};

/** Type of function related to metric. Describes if observed values are instantenious, summary or something else. */
export enum MetricFunc {
  Inst = 'INST',
  Sum = 'SUM'
}

/** Recurent event observed/measured by metric. Like consumption or time elapsed. */
export enum MetricType {
  Consumption = 'CONSUMPTION',
  TimeElapsed = 'TIME_ELAPSED'
}

export type Mutation = {
  __typename?: 'Mutation';
  addMeasPoint: MeasPoint;
  addMetric: Metric;
  addReadout: Readout;
  addReadoutError: Readout;
  addReadouts: Array<Readout>;
  changeMeter: MeasPoint;
  deleteMeasPoint: Scalars['Boolean']['output'];
  deleteMetric: Scalars['Boolean']['output'];
  deleteReadout: Scalars['Boolean']['output'];
  disableMetricAutoReadout: MeasPoint;
  enableMetricAutoReadout: MeasPoint;
  executeReadout: Scheduler;
  revertMeterChange: MeasPoint;
  updateMeasPoint: MeasPoint;
};


export type MutationAddMeasPointArgs = {
  data: AddMeasPoint;
};


export type MutationAddMetricArgs = {
  data: AddMetric;
  measPointId: Scalars['ID']['input'];
};


export type MutationAddReadoutArgs = {
  data: AddReadout;
};


export type MutationAddReadoutErrorArgs = {
  data: AddReadoutError;
};


export type MutationAddReadoutsArgs = {
  data: Array<AddReadout>;
};


export type MutationChangeMeterArgs = {
  data: ChangeMeter;
  force?: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};


export type MutationDeleteMeasPointArgs = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationDeleteMetricArgs = {
  force: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};


export type MutationDeleteReadoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisableMetricAutoReadoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEnableMetricAutoReadoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationExecuteReadoutArgs = {
  waitForResults: Scalars['Boolean']['input'];
};


export type MutationRevertMeterChangeArgs = {
  force?: Scalars['Boolean']['input'];
  measPointId: Scalars['ID']['input'];
  serviceEventId: Scalars['ID']['input'];
};


export type MutationUpdateMeasPointArgs = {
  data: UpdateMeasPoint;
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  measPoint: MeasPoint;
  measPoints: Array<MeasPoint>;
  metric: Metric;
  metrics: Array<Metric>;
  scheduler: Scheduler;
  serie: Serie;
  slaves: MBusSlave;
};


export type QueryMeasPointArgs = {
  id: Scalars['String']['input'];
};


export type QueryMetricArgs = {
  id: Scalars['ID']['input'];
  readingsFromUTC?: InputMaybe<Scalars['DateTimeISO']['input']>;
  readingsToUTC?: InputMaybe<Scalars['DateTimeISO']['input']>;
};


export type QueryMetricsArgs = {
  measPointIds?: InputMaybe<Array<Scalars['String']['input']>>;
  readingsFromUTC?: InputMaybe<Scalars['DateTimeISO']['input']>;
  readingsToUTC?: InputMaybe<Scalars['DateTimeISO']['input']>;
  subjects?: InputMaybe<Array<MeasPointSubject>>;
};


export type QuerySerieArgs = {
  params: QuerySerie;
};


export type QuerySlavesArgs = {
  primaryAddr: Scalars['Int']['input'];
};

export type QuerySerie = {
  fromUTC: Scalars['DateTimeISO']['input'];
  metricIds?: Array<Scalars['ID']['input']>;
  sampling?: SerieSampling;
  timeZone?: InputMaybe<Scalars['TimeZone']['input']>;
  toUTC: Scalars['DateTimeISO']['input'];
};

export type Readout = {
  __typename?: 'Readout';
  createdUTCTime: Scalars['DateTimeISO']['output'];
  errCode?: Maybe<MBusReadoutErrCode>;
  errDetail?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meterUTCTimestamp?: Maybe<Scalars['DateTimeISO']['output']>;
  metric: Metric;
  source: ReadoutSource;
  type: ReadoutType;
  updatedUTCTime: Scalars['DateTimeISO']['output'];
  value: Scalars['Big']['output'];
};

/** Source of Readout entry. Could be an automatic readout from mbus or manual entry from user. */
export enum ReadoutSource {
  Manual = 'MANUAL',
  Mbus = 'MBUS'
}

/** Readout entry type. Shows if it's a classic row with values or errored row. */
export enum ReadoutType {
  Error = 'ERROR',
  Readout = 'READOUT'
}

export type Scheduler = {
  __typename?: 'Scheduler';
  isReadoutRunning: Scalars['Boolean']['output'];
  lastDurationMs?: Maybe<Scalars['Int']['output']>;
  lastReadoutUTCTime?: Maybe<Scalars['DateTimeISO']['output']>;
  nextReadoutUTCTime?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type Serie = {
  __typename?: 'Serie';
  entries: Array<SerieEntry>;
  fromUTC: Scalars['DateTimeISO']['output'];
  issuedAtUTCtimestamp: Scalars['DateTimeISO']['output'];
  metrics: Array<Metric>;
  sampling: SerieSampling;
  timeZone: Scalars['TimeZone']['output'];
  toUTC: Scalars['DateTimeISO']['output'];
};

export type SerieEntry = {
  __typename?: 'SerieEntry';
  metric: Metric;
  timestampUTC: Scalars['DateTimeISO']['output'];
  value: Scalars['Big']['output'];
};

/** Sampling interval of data serie. Q - 15 minutes, H - 60 minutes, D - day, M - month, Y - year */
export enum SerieSampling {
  D = 'D',
  H = 'H',
  M = 'M',
  Q = 'Q',
  Y = 'Y'
}

export type ServiceEvent = {
  __typename?: 'ServiceEvent';
  comments?: Maybe<Scalars['String']['output']>;
  corrections: Array<Correction>;
  createdUTCTime: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  measPoint: MeasPoint;
  occuredUTCTime: Scalars['DateTimeISO']['output'];
  oldMbusAddr?: Maybe<Scalars['Int']['output']>;
  oldMbusSerial?: Maybe<Scalars['String']['output']>;
  oldMeterManufacturer?: Maybe<Scalars['String']['output']>;
  oldMeterType?: Maybe<Scalars['String']['output']>;
  type: ServiceEventType;
  updatedUTCTime: Scalars['DateTimeISO']['output'];
};

/** Type of occured service event. At the moment only meter replacement event is supported. */
export enum ServiceEventType {
  MeterReplacement = 'METER_REPLACEMENT'
}

export type UpdateMeasPoint = {
  id?: InputMaybe<Scalars['ID']['input']>;
  instDetails?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  roomNo?: InputMaybe<Scalars['String']['input']>;
};

export type MetricMplFragment = { __typename?: 'Metric', id: string, type: MetricType, func: MetricFunc, hasPhysicalDisplay: boolean, mbusValueRecordId?: number | null, mbusDecimalShift?: number | null, createdUTCTime: any, updatedUTCTime: any } & { ' $fragmentName'?: 'MetricMplFragment' };

export type ServiceEventMplFragment = { __typename?: 'ServiceEvent', id: string, type: ServiceEventType, occuredUTCTime: any, oldMbusAddr?: number | null, oldMbusSerial?: string | null, oldMeterManufacturer?: string | null, oldMeterType?: string | null, comments?: string | null, createdUTCTime: any, updatedUTCTime: any } & { ' $fragmentName'?: 'ServiceEventMplFragment' };

export type MeasPointMplFragment = { __typename?: 'MeasPoint', id: string, name: string, roomNo: string, instDetails: string, notes: string, subject: MeasPointSubject, subjectSpec?: MeasPointSubjectSpecifier | null, mbusAddr?: number | null, mbusSerial?: string | null, meterManufacturer?: string | null, meterType?: string | null, autoReadoutEnabled: boolean, createdUTCTime: any, updatedUTCTime: any, metrics: Array<(
    { __typename?: 'Metric' }
    & { ' $fragmentRefs'?: { 'MetricMplFragment': MetricMplFragment } }
  )>, serviceEvents: Array<(
    { __typename?: 'ServiceEvent' }
    & { ' $fragmentRefs'?: { 'ServiceEventMplFragment': ServiceEventMplFragment } }
  )> } & { ' $fragmentName'?: 'MeasPointMplFragment' };

export type MeasPointsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeasPointsQuery = { __typename?: 'Query', measPoints: Array<(
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointMplFragment': MeasPointMplFragment } }
  )> };

export const MetricMplFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MetricMpl"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MetricMplFragment, unknown>;
export const ServiceEventMplFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceEventMpl"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<ServiceEventMplFragment, unknown>;
export const MeasPointMplFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointMpl"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MetricMpl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceEventMpl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MetricMpl"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceEventMpl"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointMplFragment, unknown>;
export const MeasPointsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeasPoints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measPoints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointMpl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MetricMpl"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ServiceEventMpl"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointMpl"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MetricMpl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceEventMpl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointsQuery, MeasPointsQueryVariables>;