import { FuzzyDecision } from '../types';

// Membership helper functions
function trimf(x: number, [a, b, c]: [number, number, number]): number {
  if (x <= a || x >= c) return 0;
  if (x === b) return 1;
  if (x > a && x < b) return (x - a) / (b - a);
  return (c - x) / (c - b);
}

function trapmf(x: number, [a, b, c, d]: [number, number, number, number]): number {
  if (x <= a || x >= d) return 0;
  if (x >= b && x <= c) return 1;
  if (x > a && x < b) return (x - a) / (b - a);
  return (d - x) / (d - c);
}

export interface FuzzyRuleTrace {
  ruleIndex: number;
  condition: string;
  outputTerm: 'Sangat Rendah' | 'Rendah' | 'Sedang' | 'Tinggi';
  weight: number;
}

export function evaluateFuzzyIrrigation(
  soilMoisture: number,
  temperature: number,
  rainProbability: number
): { decision: FuzzyDecision; traces: FuzzyRuleTrace[] } {
  // 1. Fuzzification - Kelembapan Tanah
  const soilDry = trapmf(soilMoisture, [0, 0, 35, 50]);
  const soilMedium = trimf(soilMoisture, [40, 60, 75]);
  const soilWet = trapmf(soilMoisture, [65, 80, 100, 100]);

  // Fuzzification - Suhu
  const tempCold = trapmf(temperature, [15, 18, 22, 26]);
  const tempNormal = trimf(temperature, [24, 29, 34]);
  const tempHot = trapmf(temperature, [32, 36, 45, 50]);

  // Fuzzification - Probabilitas Hujan
  const rainLow = trapmf(rainProbability, [0, 0, 25, 40]);
  const rainMedium = trimf(rainProbability, [30, 50, 70]);
  const rainHigh = trapmf(rainProbability, [60, 75, 100, 100]);

  // Output singleton/centroid centers:
  // Sangat Rendah: 15%
  // Rendah: 35%
  // Sedang: 60%
  // Tinggi: 85%
  const outputCenters = {
    'Sangat Rendah': 15,
    'Rendah': 35,
    'Sedang': 60,
    'Tinggi': 85
  };

  const traces: FuzzyRuleTrace[] = [];

  // Helper to add rule
  const addRule = (
    ruleIndex: number,
    condName: string,
    soilDegree: number,
    tempDegree: number,
    rainDegree: number,
    outputTerm: 'Sangat Rendah' | 'Rendah' | 'Sedang' | 'Tinggi'
  ) => {
    // Mamdani min inference
    const weight = Math.min(soilDegree, tempDegree, rainDegree);
    if (weight > 0.01) {
      traces.push({
        ruleIndex,
        condition: condName,
        outputTerm,
        weight
      });
    }
  };

  // Rule Base (27 combinations mapped to Water Need)
  let ruleIdx = 1;
  // Soil Dry
  addRule(ruleIdx++, 'Tanah Kering & Dingin & Hujan Rendah', soilDry, tempCold, rainLow, 'Sedang');
  addRule(ruleIdx++, 'Tanah Kering & Dingin & Hujan Sedang', soilDry, tempCold, rainMedium, 'Rendah');
  addRule(ruleIdx++, 'Tanah Kering & Dingin & Hujan Tinggi', soilDry, tempCold, rainHigh, 'Sangat Rendah');

  addRule(ruleIdx++, 'Tanah Kering & Normal & Hujan Rendah', soilDry, tempNormal, rainLow, 'Tinggi');
  addRule(ruleIdx++, 'Tanah Kering & Normal & Hujan Sedang', soilDry, tempNormal, rainMedium, 'Sedang');
  addRule(ruleIdx++, 'Tanah Kering & Normal & Hujan Tinggi', soilDry, tempNormal, rainHigh, 'Rendah');

  addRule(ruleIdx++, 'Tanah Kering & Panas & Hujan Rendah', soilDry, tempHot, rainLow, 'Tinggi');
  addRule(ruleIdx++, 'Tanah Kering & Panas & Hujan Sedang', soilDry, tempHot, rainMedium, 'Sedang');
  addRule(ruleIdx++, 'Tanah Kering & Panas & Hujan Tinggi', soilDry, tempHot, rainHigh, 'Rendah');

  // Soil Medium
  addRule(ruleIdx++, 'Tanah Sedang & Dingin & Hujan Rendah', soilMedium, tempCold, rainLow, 'Rendah');
  addRule(ruleIdx++, 'Tanah Sedang & Dingin & Hujan Sedang', soilMedium, tempCold, rainMedium, 'Sangat Rendah');
  addRule(ruleIdx++, 'Tanah Sedang & Dingin & Hujan Tinggi', soilMedium, tempCold, rainHigh, 'Sangat Rendah');

  addRule(ruleIdx++, 'Tanah Sedang & Normal & Hujan Rendah', soilMedium, tempNormal, rainLow, 'Sedang');
  addRule(ruleIdx++, 'Tanah Sedang & Normal & Hujan Sedang', soilMedium, tempNormal, rainMedium, 'Rendah');
  addRule(ruleIdx++, 'Tanah Sedang & Normal & Hujan Tinggi', soilMedium, tempNormal, rainHigh, 'Sangat Rendah');

  addRule(ruleIdx++, 'Tanah Sedang & Panas & Hujan Rendah', soilMedium, tempHot, rainLow, 'Sedang');
  addRule(ruleIdx++, 'Tanah Sedang & Panas & Hujan Sedang', soilMedium, tempHot, rainMedium, 'Rendah');
  addRule(ruleIdx++, 'Tanah Sedang & Panas & Hujan Tinggi', soilMedium, tempHot, rainHigh, 'Sangat Rendah');

  // Soil Wet
  addRule(ruleIdx++, 'Tanah Basah & Dingin & Hujan Rendah', soilWet, tempCold, rainLow, 'Sangat Rendah');
  addRule(ruleIdx++, 'Tanah Basah & Dingin & Hujan Sedang', soilWet, tempCold, rainMedium, 'Sangat Rendah');
  addRule(ruleIdx++, 'Tanah Basah & Dingin & Hujan Tinggi', soilWet, tempCold, rainHigh, 'Sangat Rendah');

  addRule(ruleIdx++, 'Tanah Basah & Normal & Hujan Rendah', soilWet, tempNormal, rainLow, 'Sangat Rendah');
  addRule(ruleIdx++, 'Tanah Basah & Normal & Hujan Sedang', soilWet, tempNormal, rainMedium, 'Sangat Rendah');
  addRule(ruleIdx++, 'Tanah Basah & Normal & Hujan Tinggi', soilWet, tempNormal, rainHigh, 'Sangat Rendah');

  addRule(ruleIdx++, 'Tanah Basah & Panas & Hujan Rendah', soilWet, tempHot, rainLow, 'Sangat Rendah');
  addRule(ruleIdx++, 'Tanah Basah & Panas & Hujan Sedang', soilWet, tempHot, rainMedium, 'Sangat Rendah');
  addRule(ruleIdx++, 'Tanah Basah & Panas & Hujan Tinggi', soilWet, tempHot, rainHigh, 'Sangat Rendah');

  // Defuzzification using Weighted Average / Centroid approximation
  let numerator = 0;
  let denominator = 0;

  for (const trace of traces) {
    const center = outputCenters[trace.outputTerm];
    numerator += trace.weight * center;
    denominator += trace.weight;
  }

  // Fallback if no rules fired
  let waterNeed = denominator > 0 ? numerator / denominator : 35;
  waterNeed = Math.round(waterNeed);

  // Determine categorical decision and duration
  let decision: FuzzyDecision['decision'] = 'Tidak Menyiram';
  let durationMinutes = 0;

  if (waterNeed < 25) {
    decision = 'Tidak Menyiram';
    durationMinutes = 0;
  } else if (waterNeed <= 40) {
    if (rainProbability >= 60) {
      decision = 'Penyiraman Ditunda';
    } else {
      decision = 'Penyiraman Ringan';
      durationMinutes = 2;
    }
  } else if (waterNeed <= 65) {
    if (rainProbability >= 75) {
      decision = 'Penyiraman Ditunda';
    } else {
      decision = 'Penyiraman Sedang';
      durationMinutes = 5;
    }
  } else {
    decision = 'Penyiraman Tinggi';
    durationMinutes = 8;
  }

  // Generate clear user-facing reasons
  const reasons: string[] = [];
  if (soilMoisture >= 60) {
    reasons.push(`Kelembapan tanah cukup (${soilMoisture}%)`);
  } else if (soilMoisture <= 40) {
    reasons.push(`Kelembapan tanah rendah (${soilMoisture}%), perlu air`);
  } else {
    reasons.push(`Kelembapan tanah sedang (${soilMoisture}%)`);
  }

  if (temperature >= 33) {
    reasons.push(`Suhu udara tergolong panas (${temperature}°C)`);
  } else if (temperature <= 24) {
    reasons.push(`Suhu udara sejuk (${temperature}°C)`);
  } else {
    reasons.push(`Suhu udara normal (${temperature}°C)`);
  }

  if (rainProbability >= 60) {
    reasons.push(`Probabilitas hujan tinggi (${rainProbability}%), hemat air irigasi`);
  } else if (rainProbability <= 30) {
    reasons.push(`Probabilitas hujan rendah (${rainProbability}%)`);
  } else {
    reasons.push(`Probabilitas hujan sedang (${rainProbability}%)`);
  }

  return {
    decision: {
      water_need: waterNeed,
      decision,
      duration_minutes: durationMinutes,
      reasons,
      memberships: {
        soil: { dry: Number(soilDry.toFixed(2)), medium: Number(soilMedium.toFixed(2)), wet: Number(soilWet.toFixed(2)) },
        temp: { cold: Number(tempCold.toFixed(2)), normal: Number(tempNormal.toFixed(2)), hot: Number(tempHot.toFixed(2)) },
        rain: { low: Number(rainLow.toFixed(2)), medium: Number(rainMedium.toFixed(2)), high: Number(rainHigh.toFixed(2)) }
      }
    },
    traces: traces.sort((a, b) => b.weight - a.weight)
  };
}
