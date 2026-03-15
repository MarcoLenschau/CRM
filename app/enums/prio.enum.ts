/**
 * Priority level enumeration for events and tasks.
 * Defines three priority levels: HIGH (urgent), MEDIUM (important), LOW (standard).
 *
 * @enum {string}
 * @category Enumerations
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export enum Prio {
  /** Urgent priority requiring immediate attention */
  HIGH = "HIGH",
  /** Important priority requiring attention soon */
  MEDIUM = "MEDIUM",
  /** Standard priority for normal workflow */
  LOW = "LOW",
}
