/**
 * FerrumEngine v2 — Autonomous Verification (Barrel Exports)
 *
 * The PASS/WARN/BLOCK verdict system for the autonomous verification loop.
 */

export { AutonomousVerifier } from './verifier';

export type {
  VerificationVerdict,
  VerificationRequirement,
  VerificationDiagnostic,
  VerificationResult,
  VerificationConfig,
  SuggestedFix,
} from './types';
