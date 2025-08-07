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
    "fragment MetricMpl on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment ServiceEventMpl on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointMpl on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MetricMpl\n  }\n  serviceEvents {\n    ...ServiceEventMpl\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointMpl\n  }\n}": typeof types.MetricMplFragmentDoc,
};
const documents: Documents = {
    "fragment MetricMpl on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment ServiceEventMpl on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointMpl on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MetricMpl\n  }\n  serviceEvents {\n    ...ServiceEventMpl\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointMpl\n  }\n}": types.MetricMplFragmentDoc,
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
export function graphql(source: "fragment MetricMpl on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment ServiceEventMpl on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointMpl on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MetricMpl\n  }\n  serviceEvents {\n    ...ServiceEventMpl\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointMpl\n  }\n}"): (typeof documents)["fragment MetricMpl on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment ServiceEventMpl on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointMpl on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MetricMpl\n  }\n  serviceEvents {\n    ...ServiceEventMpl\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointMpl\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;