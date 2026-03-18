# Troubleshooting

Common issues and solutions.

## Common Issues

### "Failed to connect to MongoDB"
Ensure MongoDB is running and `MONGODB_URI` is correct.

### "Invalid or expired token"
- Clear cookies and re-login
- Check `JWT_SECRET` consistency
- Tokens expire after 24 hours

### "Email already exists"
Use a unique email address for registration.

### "Not authorized to perform this action"
- Ensure user has admin privileges for admin routes
- Verify JWT token validity

### "Events not showing in calendar"
- Check database contains events
- Check browser console and API tokens
- Try a hard refresh

### "Styling looks broken"
- Rebuild Tailwind: `npm run build`
- Clear Next.js cache: `rm -rf .next && npm run build`

## Debug Mode
- Add `console.log` in API routes or components to inspect values
- Check server logs and browser console

## Performance Tips
- Add DB indexes on frequently queried fields
- Use lazy loading and code splitting
- Optimize images and caching