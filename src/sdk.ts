import {
  ListObjectsRequest,
  ListObjectsResponse,
  DeleteObjectRequest,
  DeleteObjectResponse,
  UpsertObjectResponse,
  UpsertObjectRequest,
  SearchRequest,
  SearchResponse,
} from './types';
const fetch = require('node-fetch');

export class OperandV4 {
  private apiKey: string;
  private endpoint: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.endpoint = 'https://engine.operand.ai/index.v1.IndexService';
  }

  async listObjects(req: ListObjectsRequest): Promise<ListObjectsResponse> {
    let url = `${this.endpoint}/ListObjects`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.apiKey}`,
      },
      body: JSON.stringify(req),
    });

    return (await response.json()) as ListObjectsResponse;
  }

  async upsertObject(req: UpsertObjectRequest): Promise<UpsertObjectResponse> {
    const response = await fetch(`${this.endpoint}/UpsertObject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.apiKey}`,
      },
      body: JSON.stringify(req),
    });
    return (await response.json()) as UpsertObjectResponse;
  }

  async deleteObject(req: DeleteObjectRequest): Promise<DeleteObjectResponse> {
    const response = await fetch(`${this.endpoint}/DeleteObject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.apiKey}`,
      },
      body: JSON.stringify(req),
    });
    return (await response.json()) as DeleteObjectResponse;
  }

  async search(req: SearchRequest): Promise<SearchResponse> {
    const response = await fetch(`${this.endpoint}/Search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.apiKey}`,
      },
      body: JSON.stringify(req),
    });
    return (await response.json()) as SearchResponse;
  }
}
