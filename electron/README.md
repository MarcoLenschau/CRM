# CRM Desktop Application (Electron)

Desktop version of the CRM application built with Electron and Next.js.

## Installation

```bash
cd electron
npm install
```

## Development

```bash
npm run dev
```

## Build

### Linux (RPM, DEB)
```bash
npm run build:linux
```

### Windows
```bash
npm run build:windows
```

### macOS
```bash
npm run build:mac
```

### All Platforms
```bash
npm run build
```

## Structure

- `src/main.ts` - Main process
- `src/preload.ts` - Context bridge
- `dist/` - Compiled JavaScript files

## Requirements

The backend server must be running on `localhost:3000`:

```bash
# In root directory
npm run dev
```

Then start the desktop app in another terminal:

```bash
# In electron directory
npm run dev
```
