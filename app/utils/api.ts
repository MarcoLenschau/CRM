/**
 * Logs an action performed by a user to the server.
 *
 * @param userID - The unique identifier of the user performing the action.
 * @param action - The action performed by the user (e.g., "create", "update", "delete").
 * @param entity - The entity on which the action was performed (e.g., "customer", "order").
 * @param status - The status of the action (e.g., "success", "failure").
 * @param description - A detailed description of the action or its context.
 * @param error - A boolean indicating whether the action resulted in an error.
 * 
 * @returns A promise that resolves when the log entry has been sent to the server.
 */
export const logEvent = async (userID: string, action: string, entity: string, status: string, description: string, error: boolean) => {
  await fetch('/api/log', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ userID, action, entity, status, description, error })
   });
}