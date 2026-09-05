/**
 * FerrumEngine v2 — Doctor Module (Barrel Exports)
 *
 * The Doctor is a comprehensive health check and automated remediation system.
 * It diagnoses project issues, suggests fixes categorized by risk level,
 * and can auto-apply safe fixes.
 *
 * Usage:
 *   import { runDoctor } from '@/engine/doctor';
 *   const diagnosis = runDoctor('/path/to/project', { fix: true, dryRun: true });
 */

// Types
export type {
  DoctorDiagnosis,
  DoctorFixSuggestion,
  DoctorConfig,
  RemediationResult,
  FixRiskLevel,
  HealthGrade,
} from './types';

// Constants
export { DEFAULT_DOCTOR_CONFIG } from './types';

// Functions
export { generateFixSuggestions } from './suggest';
export { applyFixes } from './remediate';
export { runDoctor } from './runner';
