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
    "mutation AddMeasPoint($data: AddMeasPoint!) {\n  addMeasPoint(data: $data) {\n    ...MeasPointDetail\n  }\n}": typeof types.AddMeasPointDocument,
    "mutation AddMetric($data: AddMetric!, $measPointId: ID!) {\n  addMetric(data: $data, measPointId: $measPointId) {\n    ...MeasPointDetailMetric\n  }\n}": typeof types.AddMetricDocument,
    "mutation AddReadout($data: AddReadout!) {\n  addReadout(data: $data) {\n    ...ReadoutList\n  }\n}": typeof types.AddReadoutDocument,
    "mutation DeleteMeasPoint($deleteMeasPointId: ID!, $force: Boolean) {\n  deleteMeasPoint(id: $deleteMeasPointId, force: $force)\n}": typeof types.DeleteMeasPointDocument,
    "mutation DeleteMetric($deleteMetricId: ID!, $force: Boolean!) {\n  deleteMetric(id: $deleteMetricId, force: $force)\n}": typeof types.DeleteMetricDocument,
    "mutation DeleteReadout($id: ID!) {\n  deleteReadout(id: $id)\n}": typeof types.DeleteReadoutDocument,
    "fragment MBusSlave on MBusSlave {\n  manufacturer\n  medium\n  primaryAddress\n  records {\n    ...MBusRecord\n  }\n  serial\n  status\n  type\n}\n\nfragment MBusRecord on MBusRecord {\n  device\n  function\n  id\n  storageNumber\n  tariff\n  timestamp\n  unit\n  value\n}\n\nquery Slaves($primaryAddr: Int!) {\n  slaves(primaryAddr: $primaryAddr) {\n    ...MBusSlave\n  }\n}": typeof types.MBusSlaveFragmentDoc,
    "fragment MeasPointDetailCorrection on Correction {\n  id\n  metric {\n    id\n    type\n  }\n  value\n  oldMeterEndValue\n  newMeterStartValue\n  oldMeterHasPhysicalDisplay\n  oldMeterMbusValueRecordId\n  oldMeterMbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetailServiceEvent on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  corrections {\n    ...MeasPointDetailCorrection\n  }\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetailMetric on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetail on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MeasPointDetailMetric\n  }\n  serviceEvents {\n    ...MeasPointDetailServiceEvent\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoint($measPointId: String!) {\n  measPoint(id: $measPointId) {\n    ...MeasPointDetail\n  }\n}": typeof types.MeasPointDetailCorrectionFragmentDoc,
    "mutation ChangeMeter($data: ChangeMeter!, $changeMeterId: ID!, $force: Boolean!) {\n  changeMeter(data: $data, id: $changeMeterId, force: $force) {\n    ...MeasPointDetail\n  }\n}": typeof types.ChangeMeterDocument,
    "mutation DisableAutoReadout($disableAutoReadoutId: ID!) {\n  disableAutoReadout(id: $disableAutoReadoutId) {\n    ...MeasPointDetail\n  }\n}": typeof types.DisableAutoReadoutDocument,
    "mutation EnableAutoReadout($enableAutoReadoutId: ID!) {\n  enableAutoReadout(id: $enableAutoReadoutId) {\n    ...MeasPointDetail\n  }\n}": typeof types.EnableAutoReadoutDocument,
    "fragment MeasPointListMetric on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointListServiceEvent on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointList on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MeasPointListMetric\n  }\n  serviceEvents {\n    ...MeasPointListServiceEvent\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointList\n  }\n}": typeof types.MeasPointListMetricFragmentDoc,
    "mutation RevertMeterChange($serviceEventId: ID!, $measPointId: ID!, $force: Boolean!) {\n  revertMeterChange(\n    serviceEventId: $serviceEventId\n    measPointId: $measPointId\n    force: $force\n  ) {\n    ...MeasPointDetail\n  }\n}": typeof types.RevertMeterChangeDocument,
    "fragment ReadoutList on Readout {\n  id\n  metric {\n    id\n    type\n  }\n  type\n  source\n  value\n  errCode\n  errDetail\n  meterUTCTimestamp\n  createdUTCTime\n}\n\nquery Readouts($take: Int!, $skip: Int!, $metricIds: [ID!], $from: DateTimeISO, $to: DateTimeISO) {\n  readouts(take: $take, skip: $skip, metricIds: $metricIds, from: $from, to: $to) {\n    totalCount\n    items {\n      ...ReadoutList\n    }\n  }\n}": typeof types.ReadoutListFragmentDoc,
    "fragment SerieEntryFrg on SerieEntry {\n  metricId\n  value\n  timestampUTC\n}\n\nfragment SerieFrg on Serie {\n  fromUTC\n  toUTC\n  issuedAtUTCtimestamp\n  sampling\n  timeZone\n  entries {\n    ...SerieEntryFrg\n  }\n}\n\nquery Serie($params: QuerySerie!) {\n  serie(params: $params) {\n    ...SerieFrg\n  }\n}": typeof types.SerieEntryFrgFragmentDoc,
    "mutation UpdateMeasPoint($data: UpdateMeasPoint!, $updateMeasPointId: ID!) {\n  updateMeasPoint(data: $data, id: $updateMeasPointId) {\n    ...MeasPointDetail\n  }\n}": typeof types.UpdateMeasPointDocument,
};
const documents: Documents = {
    "mutation AddMeasPoint($data: AddMeasPoint!) {\n  addMeasPoint(data: $data) {\n    ...MeasPointDetail\n  }\n}": types.AddMeasPointDocument,
    "mutation AddMetric($data: AddMetric!, $measPointId: ID!) {\n  addMetric(data: $data, measPointId: $measPointId) {\n    ...MeasPointDetailMetric\n  }\n}": types.AddMetricDocument,
    "mutation AddReadout($data: AddReadout!) {\n  addReadout(data: $data) {\n    ...ReadoutList\n  }\n}": types.AddReadoutDocument,
    "mutation DeleteMeasPoint($deleteMeasPointId: ID!, $force: Boolean) {\n  deleteMeasPoint(id: $deleteMeasPointId, force: $force)\n}": types.DeleteMeasPointDocument,
    "mutation DeleteMetric($deleteMetricId: ID!, $force: Boolean!) {\n  deleteMetric(id: $deleteMetricId, force: $force)\n}": types.DeleteMetricDocument,
    "mutation DeleteReadout($id: ID!) {\n  deleteReadout(id: $id)\n}": types.DeleteReadoutDocument,
    "fragment MBusSlave on MBusSlave {\n  manufacturer\n  medium\n  primaryAddress\n  records {\n    ...MBusRecord\n  }\n  serial\n  status\n  type\n}\n\nfragment MBusRecord on MBusRecord {\n  device\n  function\n  id\n  storageNumber\n  tariff\n  timestamp\n  unit\n  value\n}\n\nquery Slaves($primaryAddr: Int!) {\n  slaves(primaryAddr: $primaryAddr) {\n    ...MBusSlave\n  }\n}": types.MBusSlaveFragmentDoc,
    "fragment MeasPointDetailCorrection on Correction {\n  id\n  metric {\n    id\n    type\n  }\n  value\n  oldMeterEndValue\n  newMeterStartValue\n  oldMeterHasPhysicalDisplay\n  oldMeterMbusValueRecordId\n  oldMeterMbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetailServiceEvent on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  corrections {\n    ...MeasPointDetailCorrection\n  }\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetailMetric on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetail on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MeasPointDetailMetric\n  }\n  serviceEvents {\n    ...MeasPointDetailServiceEvent\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoint($measPointId: String!) {\n  measPoint(id: $measPointId) {\n    ...MeasPointDetail\n  }\n}": types.MeasPointDetailCorrectionFragmentDoc,
    "mutation ChangeMeter($data: ChangeMeter!, $changeMeterId: ID!, $force: Boolean!) {\n  changeMeter(data: $data, id: $changeMeterId, force: $force) {\n    ...MeasPointDetail\n  }\n}": types.ChangeMeterDocument,
    "mutation DisableAutoReadout($disableAutoReadoutId: ID!) {\n  disableAutoReadout(id: $disableAutoReadoutId) {\n    ...MeasPointDetail\n  }\n}": types.DisableAutoReadoutDocument,
    "mutation EnableAutoReadout($enableAutoReadoutId: ID!) {\n  enableAutoReadout(id: $enableAutoReadoutId) {\n    ...MeasPointDetail\n  }\n}": types.EnableAutoReadoutDocument,
    "fragment MeasPointListMetric on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointListServiceEvent on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointList on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MeasPointListMetric\n  }\n  serviceEvents {\n    ...MeasPointListServiceEvent\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointList\n  }\n}": types.MeasPointListMetricFragmentDoc,
    "mutation RevertMeterChange($serviceEventId: ID!, $measPointId: ID!, $force: Boolean!) {\n  revertMeterChange(\n    serviceEventId: $serviceEventId\n    measPointId: $measPointId\n    force: $force\n  ) {\n    ...MeasPointDetail\n  }\n}": types.RevertMeterChangeDocument,
    "fragment ReadoutList on Readout {\n  id\n  metric {\n    id\n    type\n  }\n  type\n  source\n  value\n  errCode\n  errDetail\n  meterUTCTimestamp\n  createdUTCTime\n}\n\nquery Readouts($take: Int!, $skip: Int!, $metricIds: [ID!], $from: DateTimeISO, $to: DateTimeISO) {\n  readouts(take: $take, skip: $skip, metricIds: $metricIds, from: $from, to: $to) {\n    totalCount\n    items {\n      ...ReadoutList\n    }\n  }\n}": types.ReadoutListFragmentDoc,
    "fragment SerieEntryFrg on SerieEntry {\n  metricId\n  value\n  timestampUTC\n}\n\nfragment SerieFrg on Serie {\n  fromUTC\n  toUTC\n  issuedAtUTCtimestamp\n  sampling\n  timeZone\n  entries {\n    ...SerieEntryFrg\n  }\n}\n\nquery Serie($params: QuerySerie!) {\n  serie(params: $params) {\n    ...SerieFrg\n  }\n}": types.SerieEntryFrgFragmentDoc,
    "mutation UpdateMeasPoint($data: UpdateMeasPoint!, $updateMeasPointId: ID!) {\n  updateMeasPoint(data: $data, id: $updateMeasPointId) {\n    ...MeasPointDetail\n  }\n}": types.UpdateMeasPointDocument,
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
export function graphql(source: "mutation AddMeasPoint($data: AddMeasPoint!) {\n  addMeasPoint(data: $data) {\n    ...MeasPointDetail\n  }\n}"): (typeof documents)["mutation AddMeasPoint($data: AddMeasPoint!) {\n  addMeasPoint(data: $data) {\n    ...MeasPointDetail\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddMetric($data: AddMetric!, $measPointId: ID!) {\n  addMetric(data: $data, measPointId: $measPointId) {\n    ...MeasPointDetailMetric\n  }\n}"): (typeof documents)["mutation AddMetric($data: AddMetric!, $measPointId: ID!) {\n  addMetric(data: $data, measPointId: $measPointId) {\n    ...MeasPointDetailMetric\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddReadout($data: AddReadout!) {\n  addReadout(data: $data) {\n    ...ReadoutList\n  }\n}"): (typeof documents)["mutation AddReadout($data: AddReadout!) {\n  addReadout(data: $data) {\n    ...ReadoutList\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteMeasPoint($deleteMeasPointId: ID!, $force: Boolean) {\n  deleteMeasPoint(id: $deleteMeasPointId, force: $force)\n}"): (typeof documents)["mutation DeleteMeasPoint($deleteMeasPointId: ID!, $force: Boolean) {\n  deleteMeasPoint(id: $deleteMeasPointId, force: $force)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteMetric($deleteMetricId: ID!, $force: Boolean!) {\n  deleteMetric(id: $deleteMetricId, force: $force)\n}"): (typeof documents)["mutation DeleteMetric($deleteMetricId: ID!, $force: Boolean!) {\n  deleteMetric(id: $deleteMetricId, force: $force)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteReadout($id: ID!) {\n  deleteReadout(id: $id)\n}"): (typeof documents)["mutation DeleteReadout($id: ID!) {\n  deleteReadout(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MBusSlave on MBusSlave {\n  manufacturer\n  medium\n  primaryAddress\n  records {\n    ...MBusRecord\n  }\n  serial\n  status\n  type\n}\n\nfragment MBusRecord on MBusRecord {\n  device\n  function\n  id\n  storageNumber\n  tariff\n  timestamp\n  unit\n  value\n}\n\nquery Slaves($primaryAddr: Int!) {\n  slaves(primaryAddr: $primaryAddr) {\n    ...MBusSlave\n  }\n}"): (typeof documents)["fragment MBusSlave on MBusSlave {\n  manufacturer\n  medium\n  primaryAddress\n  records {\n    ...MBusRecord\n  }\n  serial\n  status\n  type\n}\n\nfragment MBusRecord on MBusRecord {\n  device\n  function\n  id\n  storageNumber\n  tariff\n  timestamp\n  unit\n  value\n}\n\nquery Slaves($primaryAddr: Int!) {\n  slaves(primaryAddr: $primaryAddr) {\n    ...MBusSlave\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MeasPointDetailCorrection on Correction {\n  id\n  metric {\n    id\n    type\n  }\n  value\n  oldMeterEndValue\n  newMeterStartValue\n  oldMeterHasPhysicalDisplay\n  oldMeterMbusValueRecordId\n  oldMeterMbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetailServiceEvent on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  corrections {\n    ...MeasPointDetailCorrection\n  }\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetailMetric on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetail on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MeasPointDetailMetric\n  }\n  serviceEvents {\n    ...MeasPointDetailServiceEvent\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoint($measPointId: String!) {\n  measPoint(id: $measPointId) {\n    ...MeasPointDetail\n  }\n}"): (typeof documents)["fragment MeasPointDetailCorrection on Correction {\n  id\n  metric {\n    id\n    type\n  }\n  value\n  oldMeterEndValue\n  newMeterStartValue\n  oldMeterHasPhysicalDisplay\n  oldMeterMbusValueRecordId\n  oldMeterMbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetailServiceEvent on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  corrections {\n    ...MeasPointDetailCorrection\n  }\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetailMetric on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointDetail on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MeasPointDetailMetric\n  }\n  serviceEvents {\n    ...MeasPointDetailServiceEvent\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoint($measPointId: String!) {\n  measPoint(id: $measPointId) {\n    ...MeasPointDetail\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeMeter($data: ChangeMeter!, $changeMeterId: ID!, $force: Boolean!) {\n  changeMeter(data: $data, id: $changeMeterId, force: $force) {\n    ...MeasPointDetail\n  }\n}"): (typeof documents)["mutation ChangeMeter($data: ChangeMeter!, $changeMeterId: ID!, $force: Boolean!) {\n  changeMeter(data: $data, id: $changeMeterId, force: $force) {\n    ...MeasPointDetail\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DisableAutoReadout($disableAutoReadoutId: ID!) {\n  disableAutoReadout(id: $disableAutoReadoutId) {\n    ...MeasPointDetail\n  }\n}"): (typeof documents)["mutation DisableAutoReadout($disableAutoReadoutId: ID!) {\n  disableAutoReadout(id: $disableAutoReadoutId) {\n    ...MeasPointDetail\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation EnableAutoReadout($enableAutoReadoutId: ID!) {\n  enableAutoReadout(id: $enableAutoReadoutId) {\n    ...MeasPointDetail\n  }\n}"): (typeof documents)["mutation EnableAutoReadout($enableAutoReadoutId: ID!) {\n  enableAutoReadout(id: $enableAutoReadoutId) {\n    ...MeasPointDetail\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MeasPointListMetric on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointListServiceEvent on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointList on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MeasPointListMetric\n  }\n  serviceEvents {\n    ...MeasPointListServiceEvent\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointList\n  }\n}"): (typeof documents)["fragment MeasPointListMetric on Metric {\n  id\n  type\n  func\n  hasPhysicalDisplay\n  mbusValueRecordId\n  mbusDecimalShift\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointListServiceEvent on ServiceEvent {\n  id\n  type\n  occuredUTCTime\n  oldMbusAddr\n  oldMbusSerial\n  oldMeterManufacturer\n  oldMeterType\n  comments\n  createdUTCTime\n  updatedUTCTime\n}\n\nfragment MeasPointList on MeasPoint {\n  id\n  name\n  roomNo\n  instDetails\n  notes\n  subject\n  subjectSpec\n  mbusAddr\n  mbusSerial\n  meterManufacturer\n  meterType\n  autoReadoutEnabled\n  metrics {\n    ...MeasPointListMetric\n  }\n  serviceEvents {\n    ...MeasPointListServiceEvent\n  }\n  createdUTCTime\n  updatedUTCTime\n}\n\nquery MeasPoints {\n  measPoints {\n    ...MeasPointList\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RevertMeterChange($serviceEventId: ID!, $measPointId: ID!, $force: Boolean!) {\n  revertMeterChange(\n    serviceEventId: $serviceEventId\n    measPointId: $measPointId\n    force: $force\n  ) {\n    ...MeasPointDetail\n  }\n}"): (typeof documents)["mutation RevertMeterChange($serviceEventId: ID!, $measPointId: ID!, $force: Boolean!) {\n  revertMeterChange(\n    serviceEventId: $serviceEventId\n    measPointId: $measPointId\n    force: $force\n  ) {\n    ...MeasPointDetail\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ReadoutList on Readout {\n  id\n  metric {\n    id\n    type\n  }\n  type\n  source\n  value\n  errCode\n  errDetail\n  meterUTCTimestamp\n  createdUTCTime\n}\n\nquery Readouts($take: Int!, $skip: Int!, $metricIds: [ID!], $from: DateTimeISO, $to: DateTimeISO) {\n  readouts(take: $take, skip: $skip, metricIds: $metricIds, from: $from, to: $to) {\n    totalCount\n    items {\n      ...ReadoutList\n    }\n  }\n}"): (typeof documents)["fragment ReadoutList on Readout {\n  id\n  metric {\n    id\n    type\n  }\n  type\n  source\n  value\n  errCode\n  errDetail\n  meterUTCTimestamp\n  createdUTCTime\n}\n\nquery Readouts($take: Int!, $skip: Int!, $metricIds: [ID!], $from: DateTimeISO, $to: DateTimeISO) {\n  readouts(take: $take, skip: $skip, metricIds: $metricIds, from: $from, to: $to) {\n    totalCount\n    items {\n      ...ReadoutList\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SerieEntryFrg on SerieEntry {\n  metricId\n  value\n  timestampUTC\n}\n\nfragment SerieFrg on Serie {\n  fromUTC\n  toUTC\n  issuedAtUTCtimestamp\n  sampling\n  timeZone\n  entries {\n    ...SerieEntryFrg\n  }\n}\n\nquery Serie($params: QuerySerie!) {\n  serie(params: $params) {\n    ...SerieFrg\n  }\n}"): (typeof documents)["fragment SerieEntryFrg on SerieEntry {\n  metricId\n  value\n  timestampUTC\n}\n\nfragment SerieFrg on Serie {\n  fromUTC\n  toUTC\n  issuedAtUTCtimestamp\n  sampling\n  timeZone\n  entries {\n    ...SerieEntryFrg\n  }\n}\n\nquery Serie($params: QuerySerie!) {\n  serie(params: $params) {\n    ...SerieFrg\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateMeasPoint($data: UpdateMeasPoint!, $updateMeasPointId: ID!) {\n  updateMeasPoint(data: $data, id: $updateMeasPointId) {\n    ...MeasPointDetail\n  }\n}"): (typeof documents)["mutation UpdateMeasPoint($data: UpdateMeasPoint!, $updateMeasPointId: ID!) {\n  updateMeasPoint(data: $data, id: $updateMeasPointId) {\n    ...MeasPointDetail\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;