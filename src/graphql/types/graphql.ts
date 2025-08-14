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
  disableAutoReadout: MeasPoint;
  enableAutoReadout: MeasPoint;
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


export type MutationDisableAutoReadoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEnableAutoReadoutArgs = {
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
  readouts: ReadoutList;
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


export type QueryReadoutsArgs = {
  from?: InputMaybe<Scalars['DateTimeISO']['input']>;
  metricIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  to?: InputMaybe<Scalars['DateTimeISO']['input']>;
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

export type ReadoutList = {
  __typename?: 'ReadoutList';
  items: Array<Readout>;
  skip: Scalars['Float']['output'];
  totalCount: Scalars['Float']['output'];
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
  metricId: Scalars['Int']['output'];
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

export type AddMeasPointMutationVariables = Exact<{
  data: AddMeasPoint;
}>;


export type AddMeasPointMutation = { __typename?: 'Mutation', addMeasPoint: (
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailFragment': MeasPointDetailFragment } }
  ) };

export type AddMetricMutationVariables = Exact<{
  data: AddMetric;
  measPointId: Scalars['ID']['input'];
}>;


export type AddMetricMutation = { __typename?: 'Mutation', addMetric: (
    { __typename?: 'Metric' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailMetricFragment': MeasPointDetailMetricFragment } }
  ) };

export type AddReadoutMutationVariables = Exact<{
  data: AddReadout;
}>;


export type AddReadoutMutation = { __typename?: 'Mutation', addReadout: (
    { __typename?: 'Readout' }
    & { ' $fragmentRefs'?: { 'ReadoutListFragment': ReadoutListFragment } }
  ) };

export type DeleteMeasPointMutationVariables = Exact<{
  deleteMeasPointId: Scalars['ID']['input'];
  force?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type DeleteMeasPointMutation = { __typename?: 'Mutation', deleteMeasPoint: boolean };

export type DeleteMetricMutationVariables = Exact<{
  deleteMetricId: Scalars['ID']['input'];
  force: Scalars['Boolean']['input'];
}>;


export type DeleteMetricMutation = { __typename?: 'Mutation', deleteMetric: boolean };

export type DeleteReadoutMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteReadoutMutation = { __typename?: 'Mutation', deleteReadout: boolean };

export type MBusSlaveFragment = { __typename?: 'MBusSlave', manufacturer?: string | null, medium?: string | null, primaryAddress: number, serial?: string | null, status?: string | null, type?: string | null, records: Array<(
    { __typename?: 'MBusRecord' }
    & { ' $fragmentRefs'?: { 'MBusRecordFragment': MBusRecordFragment } }
  )> } & { ' $fragmentName'?: 'MBusSlaveFragment' };

export type MBusRecordFragment = { __typename?: 'MBusRecord', device?: number | null, function?: string | null, id: number, storageNumber?: number | null, tariff?: number | null, timestamp: any, unit?: string | null, value?: any | null } & { ' $fragmentName'?: 'MBusRecordFragment' };

export type SlavesQueryVariables = Exact<{
  primaryAddr: Scalars['Int']['input'];
}>;


export type SlavesQuery = { __typename?: 'Query', slaves: (
    { __typename?: 'MBusSlave' }
    & { ' $fragmentRefs'?: { 'MBusSlaveFragment': MBusSlaveFragment } }
  ) };

export type MeasPointDetailCorrectionFragment = { __typename?: 'Correction', id: string, value: any, oldMeterEndValue?: any | null, newMeterStartValue?: any | null, oldMeterHasPhysicalDisplay?: boolean | null, oldMeterMbusValueRecordId?: number | null, oldMeterMbusDecimalShift?: number | null, createdUTCTime: any, updatedUTCTime: any } & { ' $fragmentName'?: 'MeasPointDetailCorrectionFragment' };

export type MeasPointDetailServiceEventFragment = { __typename?: 'ServiceEvent', id: string, type: ServiceEventType, occuredUTCTime: any, oldMbusAddr?: number | null, oldMbusSerial?: string | null, oldMeterManufacturer?: string | null, oldMeterType?: string | null, comments?: string | null, createdUTCTime: any, updatedUTCTime: any, corrections: Array<(
    { __typename?: 'Correction' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailCorrectionFragment': MeasPointDetailCorrectionFragment } }
  )> } & { ' $fragmentName'?: 'MeasPointDetailServiceEventFragment' };

export type MeasPointDetailMetricFragment = { __typename?: 'Metric', id: string, type: MetricType, func: MetricFunc, hasPhysicalDisplay: boolean, mbusValueRecordId?: number | null, mbusDecimalShift?: number | null, createdUTCTime: any, updatedUTCTime: any } & { ' $fragmentName'?: 'MeasPointDetailMetricFragment' };

export type MeasPointDetailFragment = { __typename?: 'MeasPoint', id: string, name: string, roomNo: string, instDetails: string, notes: string, subject: MeasPointSubject, subjectSpec?: MeasPointSubjectSpecifier | null, mbusAddr?: number | null, mbusSerial?: string | null, meterManufacturer?: string | null, meterType?: string | null, autoReadoutEnabled: boolean, createdUTCTime: any, updatedUTCTime: any, metrics: Array<(
    { __typename?: 'Metric' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailMetricFragment': MeasPointDetailMetricFragment } }
  )>, serviceEvents: Array<(
    { __typename?: 'ServiceEvent' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailServiceEventFragment': MeasPointDetailServiceEventFragment } }
  )> } & { ' $fragmentName'?: 'MeasPointDetailFragment' };

export type MeasPointQueryVariables = Exact<{
  measPointId: Scalars['String']['input'];
}>;


export type MeasPointQuery = { __typename?: 'Query', measPoint: (
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailFragment': MeasPointDetailFragment } }
  ) };

export type ChangeMeterMutationVariables = Exact<{
  data: ChangeMeter;
  changeMeterId: Scalars['ID']['input'];
  force: Scalars['Boolean']['input'];
}>;


export type ChangeMeterMutation = { __typename?: 'Mutation', changeMeter: (
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailFragment': MeasPointDetailFragment } }
  ) };

export type DisableAutoReadoutMutationVariables = Exact<{
  disableAutoReadoutId: Scalars['ID']['input'];
}>;


export type DisableAutoReadoutMutation = { __typename?: 'Mutation', disableAutoReadout: (
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailFragment': MeasPointDetailFragment } }
  ) };

export type EnableAutoReadoutMutationVariables = Exact<{
  enableAutoReadoutId: Scalars['ID']['input'];
}>;


export type EnableAutoReadoutMutation = { __typename?: 'Mutation', enableAutoReadout: (
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailFragment': MeasPointDetailFragment } }
  ) };

export type MeasPointListMetricFragment = { __typename?: 'Metric', id: string, type: MetricType, func: MetricFunc, hasPhysicalDisplay: boolean, mbusValueRecordId?: number | null, mbusDecimalShift?: number | null, createdUTCTime: any, updatedUTCTime: any } & { ' $fragmentName'?: 'MeasPointListMetricFragment' };

export type MeasPointListServiceEventFragment = { __typename?: 'ServiceEvent', id: string, type: ServiceEventType, occuredUTCTime: any, oldMbusAddr?: number | null, oldMbusSerial?: string | null, oldMeterManufacturer?: string | null, oldMeterType?: string | null, comments?: string | null, createdUTCTime: any, updatedUTCTime: any } & { ' $fragmentName'?: 'MeasPointListServiceEventFragment' };

export type MeasPointListFragment = { __typename?: 'MeasPoint', id: string, name: string, roomNo: string, instDetails: string, notes: string, subject: MeasPointSubject, subjectSpec?: MeasPointSubjectSpecifier | null, mbusAddr?: number | null, mbusSerial?: string | null, meterManufacturer?: string | null, meterType?: string | null, autoReadoutEnabled: boolean, createdUTCTime: any, updatedUTCTime: any, metrics: Array<(
    { __typename?: 'Metric' }
    & { ' $fragmentRefs'?: { 'MeasPointListMetricFragment': MeasPointListMetricFragment } }
  )>, serviceEvents: Array<(
    { __typename?: 'ServiceEvent' }
    & { ' $fragmentRefs'?: { 'MeasPointListServiceEventFragment': MeasPointListServiceEventFragment } }
  )> } & { ' $fragmentName'?: 'MeasPointListFragment' };

export type MeasPointsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeasPointsQuery = { __typename?: 'Query', measPoints: Array<(
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointListFragment': MeasPointListFragment } }
  )> };

export type RevertMeterChangeMutationVariables = Exact<{
  serviceEventId: Scalars['ID']['input'];
  measPointId: Scalars['ID']['input'];
  force: Scalars['Boolean']['input'];
}>;


export type RevertMeterChangeMutation = { __typename?: 'Mutation', revertMeterChange: (
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailFragment': MeasPointDetailFragment } }
  ) };

export type ReadoutListFragment = { __typename?: 'Readout', id: string, type: ReadoutType, source: ReadoutSource, errCode?: MBusReadoutErrCode | null, errDetail?: string | null, meterUTCTimestamp?: any | null, createdUTCTime: any, metric: { __typename?: 'Metric', id: string } } & { ' $fragmentName'?: 'ReadoutListFragment' };

export type ReadoutsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  metricIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['DateTimeISO']['input']>;
  to?: InputMaybe<Scalars['DateTimeISO']['input']>;
}>;


export type ReadoutsQuery = { __typename?: 'Query', readouts: { __typename?: 'ReadoutList', totalCount: number, items: Array<(
      { __typename?: 'Readout' }
      & { ' $fragmentRefs'?: { 'ReadoutListFragment': ReadoutListFragment } }
    )> } };

export type SerieEntryFrgFragment = { __typename?: 'SerieEntry', metricId: number, value: any, timestampUTC: any } & { ' $fragmentName'?: 'SerieEntryFrgFragment' };

export type SerieFrgFragment = { __typename?: 'Serie', fromUTC: any, toUTC: any, issuedAtUTCtimestamp: any, sampling: SerieSampling, timeZone: any, entries: Array<(
    { __typename?: 'SerieEntry' }
    & { ' $fragmentRefs'?: { 'SerieEntryFrgFragment': SerieEntryFrgFragment } }
  )> } & { ' $fragmentName'?: 'SerieFrgFragment' };

export type SerieQueryVariables = Exact<{
  params: QuerySerie;
}>;


export type SerieQuery = { __typename?: 'Query', serie: (
    { __typename?: 'Serie' }
    & { ' $fragmentRefs'?: { 'SerieFrgFragment': SerieFrgFragment } }
  ) };

export type UpdateMeasPointMutationVariables = Exact<{
  data: UpdateMeasPoint;
  updateMeasPointId: Scalars['ID']['input'];
}>;


export type UpdateMeasPointMutation = { __typename?: 'Mutation', updateMeasPoint: (
    { __typename?: 'MeasPoint' }
    & { ' $fragmentRefs'?: { 'MeasPointDetailFragment': MeasPointDetailFragment } }
  ) };

export const MBusRecordFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MBusRecord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MBusRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"function"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"storageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"tariff"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<MBusRecordFragment, unknown>;
export const MBusSlaveFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MBusSlave"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MBusSlave"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MBusRecord"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serial"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MBusRecord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MBusRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"function"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"storageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"tariff"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<MBusSlaveFragment, unknown>;
export const MeasPointDetailMetricFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointDetailMetricFragment, unknown>;
export const MeasPointDetailCorrectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointDetailCorrectionFragment, unknown>;
export const MeasPointDetailServiceEventFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointDetailServiceEventFragment, unknown>;
export const MeasPointDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointDetailFragment, unknown>;
export const MeasPointListMetricFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointListMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointListMetricFragment, unknown>;
export const MeasPointListServiceEventFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointListServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointListServiceEventFragment, unknown>;
export const MeasPointListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointListMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointListServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointListMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointListServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointListFragment, unknown>;
export const ReadoutListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReadoutList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Readout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metric"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"errCode"}},{"kind":"Field","name":{"kind":"Name","value":"errDetail"}},{"kind":"Field","name":{"kind":"Name","value":"meterUTCTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}}]}}]} as unknown as DocumentNode<ReadoutListFragment, unknown>;
export const SerieEntryFrgFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SerieEntryFrg"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SerieEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metricId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestampUTC"}}]}}]} as unknown as DocumentNode<SerieEntryFrgFragment, unknown>;
export const SerieFrgFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SerieFrg"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Serie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromUTC"}},{"kind":"Field","name":{"kind":"Name","value":"toUTC"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAtUTCtimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"sampling"}},{"kind":"Field","name":{"kind":"Name","value":"timeZone"}},{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SerieEntryFrg"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SerieEntryFrg"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SerieEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metricId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestampUTC"}}]}}]} as unknown as DocumentNode<SerieFrgFragment, unknown>;
export const AddMeasPointDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMeasPoint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddMeasPoint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMeasPoint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<AddMeasPointMutation, AddMeasPointMutationVariables>;
export const AddMetricDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMetric"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddMetric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"measPointId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMetric"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"measPointId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"measPointId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<AddMetricMutation, AddMetricMutationVariables>;
export const AddReadoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddReadout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddReadout"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReadout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReadoutList"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReadoutList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Readout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metric"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"errCode"}},{"kind":"Field","name":{"kind":"Name","value":"errDetail"}},{"kind":"Field","name":{"kind":"Name","value":"meterUTCTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}}]}}]} as unknown as DocumentNode<AddReadoutMutation, AddReadoutMutationVariables>;
export const DeleteMeasPointDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMeasPoint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteMeasPointId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMeasPoint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteMeasPointId"}}},{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}]}]}}]} as unknown as DocumentNode<DeleteMeasPointMutation, DeleteMeasPointMutationVariables>;
export const DeleteMetricDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMetric"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteMetricId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMetric"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteMetricId"}}},{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}]}]}}]} as unknown as DocumentNode<DeleteMetricMutation, DeleteMetricMutationVariables>;
export const DeleteReadoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReadout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReadout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteReadoutMutation, DeleteReadoutMutationVariables>;
export const SlavesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Slaves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"primaryAddr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slaves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"primaryAddr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"primaryAddr"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MBusSlave"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MBusRecord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MBusRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"function"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"storageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"tariff"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MBusSlave"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MBusSlave"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MBusRecord"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serial"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<SlavesQuery, SlavesQueryVariables>;
export const MeasPointDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeasPoint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"measPointId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measPoint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"measPointId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointQuery, MeasPointQueryVariables>;
export const ChangeMeterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeMeter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeMeter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeMeterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeMeter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeMeterId"}}},{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<ChangeMeterMutation, ChangeMeterMutationVariables>;
export const DisableAutoReadoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisableAutoReadout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"disableAutoReadoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableAutoReadout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"disableAutoReadoutId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<DisableAutoReadoutMutation, DisableAutoReadoutMutationVariables>;
export const EnableAutoReadoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableAutoReadout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enableAutoReadoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableAutoReadout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enableAutoReadoutId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<EnableAutoReadoutMutation, EnableAutoReadoutMutationVariables>;
export const MeasPointsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeasPoints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measPoints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointList"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointListMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointListServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointListMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointListServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<MeasPointsQuery, MeasPointsQueryVariables>;
export const RevertMeterChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevertMeterChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceEventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"measPointId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revertMeterChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serviceEventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceEventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"measPointId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"measPointId"}}},{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<RevertMeterChangeMutation, RevertMeterChangeMutationVariables>;
export const ReadoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Readouts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"metricIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTimeISO"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTimeISO"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readouts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"metricIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"metricIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReadoutList"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReadoutList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Readout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metric"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"errCode"}},{"kind":"Field","name":{"kind":"Name","value":"errDetail"}},{"kind":"Field","name":{"kind":"Name","value":"meterUTCTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}}]}}]} as unknown as DocumentNode<ReadoutsQuery, ReadoutsQueryVariables>;
export const SerieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Serie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuerySerie"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SerieFrg"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SerieEntryFrg"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SerieEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metricId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestampUTC"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SerieFrg"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Serie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromUTC"}},{"kind":"Field","name":{"kind":"Name","value":"toUTC"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAtUTCtimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"sampling"}},{"kind":"Field","name":{"kind":"Name","value":"timeZone"}},{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SerieEntryFrg"}}]}}]}}]} as unknown as DocumentNode<SerieQuery, SerieQueryVariables>;
export const UpdateMeasPointDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMeasPoint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMeasPoint"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateMeasPointId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMeasPoint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateMeasPointId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailMetric"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Metric"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"func"}},{"kind":"Field","name":{"kind":"Name","value":"hasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"mbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"mbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailCorrection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Correction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterEndValue"}},{"kind":"Field","name":{"kind":"Name","value":"newMeterStartValue"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterHasPhysicalDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusValueRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterMbusDecimalShift"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"occuredUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"corrections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailCorrection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"oldMbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"oldMeterType"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeasPointDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MeasPoint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"instDetails"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"subjectSpec"}},{"kind":"Field","name":{"kind":"Name","value":"mbusAddr"}},{"kind":"Field","name":{"kind":"Name","value":"mbusSerial"}},{"kind":"Field","name":{"kind":"Name","value":"meterManufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"meterType"}},{"kind":"Field","name":{"kind":"Name","value":"autoReadoutEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailMetric"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeasPointDetailServiceEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdUTCTime"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUTCTime"}}]}}]} as unknown as DocumentNode<UpdateMeasPointMutation, UpdateMeasPointMutationVariables>;