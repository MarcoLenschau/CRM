/**
 * Helper function to add Authorization token to fetch headers if available in sessionStorage
 * 
 * Only for client-side code, as sessionStorage is not available on the server
 * 
 * @param headers - Existing headers object
 * @returns Headers object with Authorization token if available
 */
export const getAuthHeaders = (headers: HeadersInit = {}): HeadersInit => {
  const headersObj = { ...headers };
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      return {
        ...headersObj,
        'Authorization': `Bearer ${token}`
      };
    }
  }
  return headersObj;
};

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
     headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
     body: JSON.stringify({ userID, action, entity, status, description, error })
   });
  triggerActivityUpdate();
};

/**
 * Triggers an activity update event to refresh the activity feed in real-time
 */
export const triggerActivityUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('activityUpdated'));
  }
};

/**
 * Helper function for server-side fetch requests with authentication token from cookies
 * 
 * @param url - The URL to fetch
 * @param options - Fetch options (method, body, etc.)
 * @returns Response from the fetch
 */
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const headers: HeadersInit = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
};