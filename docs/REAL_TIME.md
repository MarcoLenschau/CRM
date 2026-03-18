# Real-Time Updates

The application implements a simple real-time update system for UI synchronization.

## Event-Driven Architecture

When data changes (create, update, delete), the application dispatches a custom event:

```typescript
window.dispatchEvent(new Event('eventsUpdated'));
```

## Event Listeners

Components listen for the `eventsUpdated` event and refetch data:

```typescript
useEffect(() => {
  const handleEventsUpdated = () => {
    fetchEvents();
  };
  window.addEventListener('eventsUpdated', handleEventsUpdated);
  return () => window.removeEventListener('eventsUpdated', handleEventsUpdated);
}, []);
```

## Component Updates

These components automatically update when events change:
- EventStats component (statistics)
- Calendar component (calendar view)
- AllEventsTemplate (event list)
- Dashboard (overview)