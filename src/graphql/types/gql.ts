/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment MBusSlave on MBusSlave {\n  manufacturer\n  medium\n  primaryAddress\n  records {\n    ...MBusRecord\n  }\n  serial\n  status\n  type\n}\n\nfragment MBusRecord on MBusRecord {\n  device\n  function\n  id\n  storageNumber\n  tariff\n  timestamp\n  unit\n  value\n}\n\nquery Slaves($primaryAddr: Int!) {\n  slaves(primaryAddr: $primaryAddr) {\n    ...MBusSlave\n  }\n}": typeof types.MBusSlaveFragmentDoc,
    "fragment MetricMpl on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment ServiceEventMpl on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointMpl on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MetricMpl\n  }\n  serviceEvents {\n    ...ServiceEventMpl\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointMpl\n  }\n}": typeof types.MetricMplFragmentDoc,
    "fragment SerieEntryFrg on SerieEntry {\n  metricId\n  value\n  timestampUTC\n}\n\nfragment SerieFrg on Serie {\n  fromUTC\n  toUTC\n  issuedAtUTCtimestamp\n  sampling\n  timeZone\n  entries {\n    ...SerieEntryFrg\n  }\n}\n\nquery Serie($params: QuerySerie!) {\n  serie(params: $params) {\n    ...SerieFrg\n  }\n}": typeof types.SerieEntryFrgFragmentDoc,
};
const documents: Documents = {
    "fragment MBusSlave on MBusSlave {\n  manufacturer\n  medium\n  primaryAddress\n  records {\n    ...MBusRecord\n  }\n  serial\n  status\n  type\n}\n\nfragment MBusRecord on MBusRecord {\n  device\n  function\n  id\n  storageNumber\n  tariff\n  timestamp\n  unit\n  value\n}\n\nquery Slaves($primaryAddr: Int!) {\n  slaves(primaryAddr: $primaryAddr) {\n    ...MBusSlave\n  }\n}": types.MBusSlaveFragmentDoc,
    "fragment MetricMpl on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment ServiceEventMpl on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointMpl on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MetricMpl\n  }\n  serviceEvents {\n    ...ServiceEventMpl\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointMpl\n  }\n}": types.MetricMplFragmentDoc,
    "fragment SerieEntryFrg on SerieEntry {\n  metricId\n  value\n  timestampUTC\n}\n\nfragment SerieFrg on Serie {\n  fromUTC\n  toUTC\n  issuedAtUTCtimestamp\n  sampling\n  timeZone\n  entries {\n    ...SerieEntryFrg\n  }\n}\n\nquery Serie($params: QuerySerie!) {\n  serie(params: $params) {\n    ...SerieFrg\n  }\n}": types.SerieEntryFrgFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MBusSlave on MBusSlave {\n  manufacturer\n  medium\n  primaryAddress\n  records {\n    ...MBusRecord\n  }\n  serial\n  status\n  type\n}\n\nfragment MBusRecord on MBusRecord {\n  device\n  function\n  id\n  storageNumber\n  tariff\n  timestamp\n  unit\n  value\n}\n\nquery Slaves($primaryAddr: Int!) {\n  slaves(primaryAddr: $primaryAddr) {\n    ...MBusSlave\n  }\n}"): (typeof documents)["fragment MBusSlave on MBusSlave {\n  manufacturer\n  medium\n  primaryAddress\n  records {\n    ...MBusRecord\n  }\n  serial\n  status\n  type\n}\n\nfragment MBusRecord on MBusRecord {\n  device\n  function\n  id\n  storageNumber\n  tariff\n  timestamp\n  unit\n  value\n}\n\nquery Slaves($primaryAddr: Int!) {\n  slaves(primaryAddr: $primaryAddr) {\n    ...MBusSlave\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MetricMpl on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment ServiceEventMpl on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointMpl on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MetricMpl\n  }\n  serviceEvents {\n    ...ServiceEventMpl\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointMpl\n  }\n}"): (typeof documents)["fragment MetricMpl on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment ServiceEventMpl on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointMpl on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MetricMpl\n  }\n  serviceEvents {\n    ...ServiceEventMpl\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointMpl\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SerieEntryFrg on SerieEntry {\n  metricId\n  value\n  timestampUTC\n}\n\nfragment SerieFrg on Serie {\n  fromUTC\n  toUTC\n  issuedAtUTCtimestamp\n  sampling\n  timeZone\n  entries {\n    ...SerieEntryFrg\n  }\n}\n\nquery Serie($params: QuerySerie!) {\n  serie(params: $params) {\n    ...SerieFrg\n  }\n}"): (typeof documents)["fragment SerieEntryFrg on SerieEntry {\n  metricId\n  value\n  timestampUTC\n}\n\nfragment SerieFrg on Serie {\n  fromUTC\n  toUTC\n  issuedAtUTCtimestamp\n  sampling\n  timeZone\n  entries {\n    ...SerieEntryFrg\n  }\n}\n\nquery Serie($params: QuerySerie!) {\n  serie(params: $params) {\n    ...SerieFrg\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;