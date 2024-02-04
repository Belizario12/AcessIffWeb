export interface MetadataResponse {
  message: string;
  metadata: {
    data: any[];
  }
}

export interface MetadataRequest {
  message: string;
  metadata?: {
    data: any[];
  }
}
