/* Type Definitions */

export interface Object {
  id: string;
  created_at: Date;
  updated_at?: Date;
  parent_id?: string;
  // Type of the object determine the type of the metadata
  type: ObjectType;
  // Metadata of the object derived from the type
  metadata: ObjectMetadata;
  // Properties of the object
  properties: Properties;
  // Indexing Status of the object
  status: ObjectStatus;
  // Label of the object, optional.
  label?: string;
}

// Type of the object determine the type of the metadata
export enum ObjectType {
  OBJECT_TYPE_UNSPECIFIED,
  OBJECT_TYPE_COLLECTION,
  OBJECT_TYPE_TEXT,
  OBJECT_TYPE_HTML,
}

export type ObjectMetadata =
  | { collection: CollectionObjectMetadata }
  | { text: TextObjectMetadata }
  | { html: HtmlObjectMetadata };

export type CollectionObjectMetadata = {};

export type TextObjectMetadata = {
  text: string;
};

export type HtmlObjectMetadata = {
  html?: string;
  title?: string;
  url?: string;
};

export type Properties = {
  properties: { [key: string]: Property };
};

export type Property =
  | { text: string }
  | { number: number }
  | {
      text_array: {
        values: string[];
      };
    }
  | {
      number_array: {
        values: number[];
      };
    };

export enum ObjectStatus {
  OBJECT_STATUS_UNSPECIFIED,
  OBJECT_STATUS_QUEUED,
  OBJECT_STATUS_INDEXING,
  OBJECT_STATUS_READY,
  OBJECT_STATUS_ERROR,
}

// Object Endpoints Types
export type UpsertObjectRequest = {
  existing_id?: string;
  parent_id?: string;
  object_type?: ObjectType;
  metadata?: ObjectMetadata;
  properties?: Properties;
  label?: string;
};

export type UpsertObjectResponse = {
  object: Object;
};

export type ListObjectsRequest = {
  parent_id?: string;
  limit?: number;
  cursor?: string;
};

export type ListObjectsResponse = {
  objects: Object[];
  next_cursor?: string;
};

export type DeleteObjectRequest = {
  id: string;
};

export type DeleteObjectResponse = {};

// Operation Endpoints Types

export type SearchRequest = {
  query: string;
  roots?: string[];
  session_id?: string;
  filter?: Filter;
  limit?: number;
};

export type SearchResponse = {
  search_id: string;
  matches: Match[];
  objects: {
    [object_id: string]: Object;
  };
};

export type Match = {
  match_id: string;
  object_id: string;
  content: string;
  score: number;
};

export type Filter = {
  conditions: Condition[];
};

export type FeedbackRequest = {
  search_id: string;
  clicked_match_id: string;
};

export type FeedbackResponse = {};

export type Condition =
  | { property: KeyedProperty }
  | { range: Range }
  | { and: Filter }
  | { or: Filter }
  | { not: Filter };

export type KeyedProperty = {
  key: string;
  property: Property;
};

export type Range = {
  key: string;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};
