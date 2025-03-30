// Company Qualification Assessment
export interface QualificationAssessment {
  company: string;
  assessment: string;
  timestamp: string;
  score?: number;
  reasons?: string[];
  recommendedAction?: string;
}

// MCP Connection Status
export interface ConnectionStatus {
  service: string;
  status: 'connected' | 'disconnected' | 'error';
  connectionId?: string;
  error?: string;
  timestamp: string;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// OpenAI Assessment Request
export interface AssessmentRequest {
  companyName: string;
  industry?: string;
  size?: string;
  revenue?: string;
  description?: string;
  website?: string;
  foundedYear?: number;
  location?: string;
}

// OpenAI Assessment Result
export interface AssessmentResult {
  qualification: {
    score: number;
    reasons: string[];
    summary: string;
    recommendedAction: string;
  };
} 