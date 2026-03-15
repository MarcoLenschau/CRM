/**
 * Adds authorization token to fetch headers from sessionStorage (client-side only).
 * 
 * @param headers - Existing headers object
 * @return Headers with Authorization bearer token if available
 * @category Authentication
 * @security Token retrieved from sessionStorage
 * @performance O(1) constant time
 * @author Marco Lenschau <contact@marco-lenschau.de>
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
 * Sends a log entry to the server for audit trail recording.
 * Automatically includes authentication token in request headers.
 *
 * @param userID - User identifier performing the action
 * @param action - Action type (create, update, delete, etc.)
 * @param entity - Entity type affected (customer, order, etc.)
 * @param status - Action result status (success or failure)
 * @param description - Detailed description of the action
 * @param error - Whether the action resulted in an error
 * @return Promise that resolves when log entry is sent
 * @throws {Error} If API request fails
 * @category Logging
 * @security Requires valid authentication token
 * @performance Network I/O, asynchronous non-blocking
 * @author Marco Lenschau <contact@marco-lenschau.de>
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
 * Dispatches a custom event to notify all listeners of activity changes.
 * Used to trigger real-time updates in the activity feed.
 * 
 * @return void
 * @category Events
 * @performance Realtime event dispatch
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const triggerActivityUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('activityUpdated'));
  }
};

/**
 * Server-side fetch wrapper that automatically includes authentication token from cookies.
 * 
 * @param url - Endpoint URL to fetch
 * @param options - Fetch request options (method, body, headers, etc.)
 * @return Response from the fetch request
 * @category API
 * @security Includes JWT token from cookies automatically
 * @performance Network I/O, asynchronous non-blocking
 * @author Marco Lenschau <contact@marco-lenschau.de>
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