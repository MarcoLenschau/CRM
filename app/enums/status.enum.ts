/**
 * Log status enumeration for audit trail entries.
 * Indicates the result status of logged operations.
 *
 * @enum {string}
 * @category Enumerations
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export enum LogStatus {
  /** Operation completed successfully */
  SUCCESS = "SUCCESS",
  /** Operation encountered an error and failed */
  FAILED = "FAILED",
  /** Operation completed with warnings */
  WARNING = "WARNING",
}

/**
 * Customer status enumeration for customer account states.
 * Defines lifecycle stages for customer accounts.
 *
 * @enum {string}
 * @category Enumerations
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export enum CustomerStatus {
  /** Customer account is active and in use */
  ACTIVE = "active",
  /** Customer account is inactive or on hold */
  INACTIVE = "inactive",
  /** Customer account is pending verification or activation */
  PENDING = "pending",
}
