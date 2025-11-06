# Troubleshooting ERR_TIMED_OUT on Vercel

## Issue: Site shows "ERR_TIMED_OUT" after deployment

This error means your app is not responding. Here's how to fix it:

## Step 1: Check Build Logs

1. Go to Vercel Dashboard → Your Project
2. Click on the **latest deployment**
3. Click on **"Build Logs"** section
4. Look for any **errors** or **warnings**

### Common Build Errors:
- ❌ Build failed
- ❌ TypeScript errors
- ❌ Missing dependencies
- ❌ Import errors

## Step 2: Check Runtime Logs

1. Go to **Deployments** tab
2. Click on your deployment
3. Scroll down to **"Runtime Logs"**
4. Click **"View Runtime Logs"**
5. Look for **errors** when the app starts

### Common Runtime Errors:
- ❌ `Cannot find module`
- ❌ `TypeError: Cannot read property`
- ❌ `ReferenceError: window is not defined`
- ❌ App crashes on startup

## Step 3: Verify Build Success

1. Check if build status is **"Ready"** (green checkmark)
2. If build shows **"Error"** or **"Failed"**, fix those errors first
3. Build must complete successfully before the app can run

## Step 4: Check Next.js Configuration

Make sure `next.config.js` is correct:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
}

module.exports = nextConfig
```

## Step 5: Common Fixes

### Fix 1: Remove vercel.json (if causing issues)

If you have a `vercel.json` file, try removing it or simplifying it:

```json
{
  "framework": "nextjs"
}
```

### Fix 2: Check for Client-Side Only Code

Make sure all browser-only code (like `window`, `localStorage`) is:
- Inside `useEffect` hooks
- Wrapped in `typeof window !== 'undefined'` checks
- Using dynamic imports with `ssr: false`

### Fix 3: Verify All Imports

Make sure all JSON data files exist:
- ✅ `data/postcodes.json`
- ✅ `data/makes.json`
- ✅ `data/models.json`
- ✅ `data/segments.json`
- ✅ `data/fuelTypes.json`
- ✅ `data/ageGroups.json`
- ✅ `data/fleetData2019.json` through `fleetData2024.json`

### Fix 4: Check Package.json

Make sure all dependencies are listed:

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "recharts": "^2.12.0",
    "lucide-react": "^0.344.0"
  }
}
```

## Step 6: Test Locally First

Before deploying, test locally:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` and make sure it works locally.

## Step 7: Redeploy

After fixing issues:

1. Commit and push your changes
2. Or manually redeploy in Vercel Dashboard
3. Wait for build to complete
4. Check if the site loads

## Step 8: Check Deployment Settings

1. Go to **Settings** → **General**
2. Make sure **"Framework Preset"** is set to **"Next.js"**
3. Make sure **"Build Command"** is `npm run build`
4. Make sure **"Output Directory"** is empty (Next.js handles this)
5. Make sure **"Install Command"** is `npm install`

## Still Not Working?

1. **Check Vercel Status**: Visit https://vercel-status.com
2. **Check Build Logs**: Look for specific error messages
3. **Try a Fresh Deployment**: Delete and redeploy
4. **Contact Vercel Support**: If nothing works, contact Vercel support

## Quick Checklist:

- ✅ Build completes successfully
- ✅ No errors in build logs
- ✅ No errors in runtime logs
- ✅ All dependencies installed
- ✅ All JSON files exist
- ✅ Next.js config is correct
- ✅ App works locally (`npm run build && npm start`)
- ✅ Deployment status is "Ready"

