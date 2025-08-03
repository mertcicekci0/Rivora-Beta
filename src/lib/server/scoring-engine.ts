// Scoring System with TensorFlow.js
// This module calculates DeFi Risk Score and DeFi Health Score using TensorFlow.js

import * as tf from '@tensorflow/tfjs';

// ========================================
// SCORING WEIGHTS CONFIGURATION
// ========================================
const RISK_SCORE_WEIGHTS = {
  walletAge: 0.25,        // 25% - Older wallets are more trustworthy
  transactionFrequency: 0.20, // 20% - Regular activity shows experience
  secureSwapUsage: 0.20,  // 20% - Using Fusion+ and secure protocols
  tokenTrustworthiness: 0.35, // 35% - Interacting with trusted tokens
} as const;

const HEALTH_SCORE_WEIGHTS = {
  tokenDiversity: 0.30,   // 30% - Diversified portfolio is healthier
  portfolioConcentration: 0.25, // 25% - Less concentration is better
  tokenAgeAverage: 0.15,  // 15% - Mature tokens are more stable
  volatilityExposure: 0.20, // 20% - Lower volatility is healthier
  gasEfficiency: 0.10,    // 10% - Efficient gas usage
} as const;

// ========================================
// DEFI RISK SCORE CALCULATION
// ========================================
export function calculateDeFiRiskScore(metrics: {
  walletAgeScore: number;
  transactionFrequencyScore: number;
  secureSwapUsageScore: number;
  tokenTrustworthinessScore: number;
}): number {
  // Convert metrics to TensorFlow tensors
  const walletAgeTensor = tf.scalar(metrics.walletAgeScore);
  const transactionFreqTensor = tf.scalar(metrics.transactionFrequencyScore);
  const secureSwapTensor = tf.scalar(metrics.secureSwapUsageScore);
  const tokenTrustTensor = tf.scalar(metrics.tokenTrustworthinessScore);

  // Create weight tensors
  const walletAgeWeight = tf.scalar(RISK_SCORE_WEIGHTS.walletAge);
  const transactionFreqWeight = tf.scalar(RISK_SCORE_WEIGHTS.transactionFrequency);
  const secureSwapWeight = tf.scalar(RISK_SCORE_WEIGHTS.secureSwapUsage);
  const tokenTrustWeight = tf.scalar(RISK_SCORE_WEIGHTS.tokenTrustworthiness);

  // Calculate weighted components
  const weightedWalletAge = tf.mul(walletAgeTensor, walletAgeWeight);
  const weightedTransactionFreq = tf.mul(transactionFreqTensor, transactionFreqWeight);
  const weightedSecureSwap = tf.mul(secureSwapTensor, secureSwapWeight);
  const weightedTokenTrust = tf.mul(tokenTrustTensor, tokenTrustWeight);

  // Sum all weighted components
  const finalScore = tf.addN([
    weightedWalletAge,
    weightedTransactionFreq,
    weightedSecureSwap,
    weightedTokenTrust
  ]);

  // Extract the numerical value
  const score = finalScore.dataSync()[0];

  // Clean up tensors to prevent memory leaks
  walletAgeTensor.dispose();
  transactionFreqTensor.dispose();
  secureSwapTensor.dispose();
  tokenTrustTensor.dispose();
  walletAgeWeight.dispose();
  transactionFreqWeight.dispose();
  secureSwapWeight.dispose();
  tokenTrustWeight.dispose();
  weightedWalletAge.dispose();
  weightedTransactionFreq.dispose();
  weightedSecureSwap.dispose();
  weightedTokenTrust.dispose();
  finalScore.dispose();

  // Return score clamped between 0-100
  return Math.max(0, Math.min(100, score));
}

// ========================================
// DEFI HEALTH SCORE CALCULATION
// ========================================
export function calculateDeFiHealthScore(metrics: {
  tokenDiversityScore: number;
  portfolioConcentrationScore: number;
  tokenAgeAverageScore: number;
  volatilityExposureScore: number;
  gasEfficiencyScore: number;
}): number {
  // Convert metrics to TensorFlow tensors
  const tokenDiversityTensor = tf.scalar(metrics.tokenDiversityScore);
  const concentrationTensor = tf.scalar(metrics.portfolioConcentrationScore);
  const tokenAgeTensor = tf.scalar(metrics.tokenAgeAverageScore);
  const volatilityTensor = tf.scalar(metrics.volatilityExposureScore);
  const gasEfficiencyTensor = tf.scalar(metrics.gasEfficiencyScore);

  // Create weight tensors
  const diversityWeight = tf.scalar(HEALTH_SCORE_WEIGHTS.tokenDiversity);
  const concentrationWeight = tf.scalar(HEALTH_SCORE_WEIGHTS.portfolioConcentration);
  const tokenAgeWeight = tf.scalar(HEALTH_SCORE_WEIGHTS.tokenAgeAverage);
  const volatilityWeight = tf.scalar(HEALTH_SCORE_WEIGHTS.volatilityExposure);
  const gasWeight = tf.scalar(HEALTH_SCORE_WEIGHTS.gasEfficiency);

  // Calculate weighted components
  const weightedDiversity = tf.mul(tokenDiversityTensor, diversityWeight);
  const weightedConcentration = tf.mul(concentrationTensor, concentrationWeight);
  const weightedTokenAge = tf.mul(tokenAgeTensor, tokenAgeWeight);
  const weightedVolatility = tf.mul(volatilityTensor, volatilityWeight);
  const weightedGasEfficiency = tf.mul(gasEfficiencyTensor, gasWeight);

  // Sum all weighted components
  const finalScore = tf.addN([
    weightedDiversity,
    weightedConcentration,
    weightedTokenAge,
    weightedVolatility,
    weightedGasEfficiency
  ]);

  // Extract the numerical value
  const score = finalScore.dataSync()[0];

  // Clean up tensors to prevent memory leaks
  tokenDiversityTensor.dispose();
  concentrationTensor.dispose();
  tokenAgeTensor.dispose();
  volatilityTensor.dispose();
  gasEfficiencyTensor.dispose();
  diversityWeight.dispose();
  concentrationWeight.dispose();
  tokenAgeWeight.dispose();
  volatilityWeight.dispose();
  gasWeight.dispose();
  weightedDiversity.dispose();
  weightedConcentration.dispose();
  weightedTokenAge.dispose();
  weightedVolatility.dispose();
  weightedGasEfficiency.dispose();
  finalScore.dispose();

  // Return score clamped between 0-100
  return Math.max(0, Math.min(100, score));
}

// ========================================
// USER TYPE CLASSIFICATION
// ========================================
export type UserType = 'Trader' | 'Explorer' | 'Optimizer' | 'Passive';

export function classifyUserType(behaviorMetrics: {
  swapFrequency: number;        // Swaps per month
  limitOrderUsage: number;      // Percentage of orders that are limit orders
  transactionTiming: 'peak' | 'off-peak' | 'mixed'; // When user transacts
  newTokenInteraction: number;  // Percentage of interactions with new/unknown tokens
  gasOptimization: number;      // How often user waits for lower gas prices
}): UserType {
  const { swapFrequency, limitOrderUsage, transactionTiming, newTokenInteraction, gasOptimization } = behaviorMetrics;

  // Trader: High frequency swaps, focuses on price optimization
  if (swapFrequency > 20 && transactionTiming === 'peak') {
    return 'Trader';
  }

  // Explorer: High interaction with new tokens, experimental behavior
  if (newTokenInteraction > 40) {
    return 'Explorer';
  }

  // Optimizer: Uses limit orders, waits for low gas, off-peak transactions
  if (limitOrderUsage > 30 || gasOptimization > 60 || transactionTiming === 'off-peak') {
    return 'Optimizer';
  }

  // Passive: Low activity, holds assets without frequent transactions
  if (swapFrequency < 5) {
    return 'Passive';
  }

  // Default fallback
  return 'Trader';
}
