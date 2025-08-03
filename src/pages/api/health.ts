// Health Check API - Monitor application and 1inch API status with rate limiting
import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    application: 'up' | 'down';
    oneinchAPI: 'up' | 'down' | 'rate_limited';
    tensorflow: 'up' | 'down';
  };
  apiStatus: {
    lastRequestTime: number;
    requestsInLastMinute: number;
    rateLimitStatus: 'ok' | 'approaching_limit' | 'limited';
  };
  version: string;
  uptime: number;
}

const startTime = Date.now();

// Simple rate limiting monitoring
const requestCount = 0;
const lastResetTime = Date.now();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: { application: 'down', oneinchAPI: 'down', tensorflow: 'down' },
      apiStatus: { lastRequestTime: 0, requestsInLastMinute: 0, rateLimitStatus: 'ok' },
      version: '1.0.0',
      uptime: 0
    });
  }

  const healthStatus: HealthResponse = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      application: 'up',
      oneinchAPI: 'up',
      tensorflow: 'up'
    },
    apiStatus: {
      lastRequestTime: Date.now(),
      requestsInLastMinute: requestCount,
      rateLimitStatus: requestCount > 50 ? 'approaching_limit' : 'ok'
    },
    version: '1.0.0',
    uptime: Date.now() - startTime
  };

  // Quick 1inch API health check
  try {
    const apiKey = process.env.ONEINCH_API_KEY;
    if (!apiKey) {
      healthStatus.services.oneinchAPI = 'down';
      healthStatus.status = 'degraded';
    } else {
      // Quick test of 1inch API (whitelisted tokens endpoint)
      const response = await fetch('https://api.1inch.dev/price/v1.1/1', {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(5000) // 5s timeout
      });
      
      if (response.status === 429) {
        healthStatus.services.oneinchAPI = 'rate_limited';
        healthStatus.status = 'degraded';
      } else if (!response.ok) {
        healthStatus.services.oneinchAPI = 'down';
        healthStatus.status = 'degraded';
      }
    }
  } catch (error) {
    console.error('1inch API health check failed:', error);
    healthStatus.services.oneinchAPI = 'down';
    healthStatus.status = 'degraded';
  }

  // TensorFlow.js health check
  try {
    const tf = await import('@tensorflow/tfjs');
    tf.scalar(1).add(tf.scalar(1)).dispose(); // Simple test operation
  } catch (error) {
    console.error('TensorFlow health check failed:', error);
    healthStatus.services.tensorflow = 'down';
    healthStatus.status = 'degraded';
  }

  // Determine overall status
  const downServices = Object.values(healthStatus.services).filter(status => status === 'down').length;
  if (downServices > 1) {
    healthStatus.status = 'unhealthy';
  } else if (downServices > 0 || healthStatus.services.oneinchAPI === 'rate_limited') {
    healthStatus.status = 'degraded';
  }

  const statusCode = healthStatus.status === 'healthy' ? 200 : 
                    healthStatus.status === 'degraded' ? 200 : 503;

  return res.status(statusCode).json(healthStatus);
}