# Australian Vehicle Fleet Dashboard

A fully functional Next.js prototype for a geospatial dashboard analyzing Australian vehicle fleet data. Features an interactive map, comprehensive filtering, data visualization, and a beautiful light/dark theme toggle.

## ✨ Features

- **🗺️ Interactive Australian Postcode Map**: Visualize vehicle distribution across Australian postcodes with clickable markers and dynamic circles
- **🔍 Multi-dimensional Filters**: Filter by postcode, make, model, segment, subsegment, fuel type, and age group
- **📊 Year-over-Year Comparison**: Compare fleet data across multiple years (2019-2024)
- **📈 Data Visualization**: Beautiful charts and statistics showing fleet composition
- **🌓 Light/Dark Theme**: Fully functional theme toggle with smooth transitions
- **📱 Responsive Design**: Optimized for desktop and tablet browsers
- **⚡ Performance Optimized**: Client-side data processing with no bottlenecks
- **🎨 Modern UI**: Beautiful, clean interface with smooth animations and hover effects

## 🚀 Technology Stack

- **Next.js 14** (App Router with TypeScript)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Leaflet** for interactive map visualization
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Context API** for theme management

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
fleet-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── Filters.tsx         # Multi-dimensional filter component
│   ├── MapView.tsx         # Interactive map component
│   ├── MapViewWrapper.tsx  # Map wrapper for SSR compatibility
│   ├── StatsCards.tsx      # Statistics cards with trends
│   ├── Charts.tsx          # Chart visualizations (bar & pie)
│   ├── YearComparison.tsx  # Year-over-year comparison
│   └── ThemeToggle.tsx     # Light/dark theme toggle button
├── contexts/
│   └── ThemeContext.tsx    # Theme context and provider
├── data/
│   ├── postcodes.json      # Australian postcode data with coordinates
│   ├── makes.json          # Vehicle makes
│   ├── models.json         # Vehicle models
│   ├── segments.json       # Vehicle segments and subsegments
│   ├── fuelTypes.json      # Fuel types
│   ├── ageGroups.json      # Age groups
│   ├── fleetData2019.json # 2019 fleet data
│   ├── fleetData2020.json # 2020 fleet data
│   ├── fleetData2021.json # 2021 fleet data
│   ├── fleetData2022.json # 2022 fleet data
│   ├── fleetData2023.json # 2023 fleet data
│   └── fleetData2024.json # 2024 fleet data
└── lib/
    ├── types.ts            # TypeScript type definitions
    └── utils.ts            # Utility functions for filtering and aggregation
```

## 📊 Data

All data is stored in JSON format and loaded client-side. The prototype includes:

- **20+ Australian postcodes** with latitude/longitude coordinates
- **20 vehicle makes** (Toyota, Ford, Holden, etc.)
- **Multiple models** per make
- **4 vehicle segments** with subsegments (Passenger, Commercial, etc.)
- **7 fuel types** (Petrol, Diesel, Electric, Hybrid, etc.)
- **6 age groups** (0-2 years, 3-5 years, etc.)
- **Fleet data for 2019-2024** with realistic growth patterns

## 🎯 Features in Detail

### Interactive Map
- Click on postcodes to filter data
- Hover over markers to see vehicle counts
- Visual representation of vehicle density with dynamic circle sizes
- Australia-focused view with optimal zoom level

### Filters
- Multi-select dropdowns for all filter categories
- Real-time filtering with instant updates
- Year selection (2019-2024) with visual indicators
- Click outside to close dropdowns
- Selected count badges

### Statistics Cards
- Total vehicle count
- Top make, segment, and fuel type
- Year-over-year percentage changes with trend indicators
- Beautiful gradient effects and hover animations

### Data Visualizations
- **Top 10 Makes** - Horizontal bar chart
- **Segment Distribution** - Pie chart with color coding
- **Fuel Type Distribution** - Pie chart
- **Age Group Distribution** - Bar chart sorted by age

### Year Comparison
- Side-by-side comparison of current and previous year
- Percentage changes for all categories (makes, segments, fuel types, age groups)
- Visual indicators (trending up/down icons) for increases/decreases
- Scrollable list for easy navigation

### Theme Toggle
- Smooth transitions between light and dark modes
- Theme preference saved to localStorage
- System preference detection on first load
- All components fully support both themes
- Charts adapt colors for dark mode

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, professional interface with rounded corners and shadows
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Glass Effect**: Frosted glass header with backdrop blur
- **Custom Scrollbars**: Styled scrollbars matching the theme
- **Responsive Grid**: 12-column grid system for optimal layout
- **Sticky Sidebar**: Filters remain visible while scrolling
- **No Flickering**: Proper SSR handling prevents layout shifts

## 🔧 Technical Details

- **Client-Side Only**: No backend required, all data processing happens in the browser
- **Performance Optimized**: Uses React hooks (useMemo, useCallback) for efficient rendering
- **Type Safe**: Full TypeScript coverage
- **SSR Compatible**: Dynamic imports for map and theme components
- **Accessible**: Proper ARIA labels and semantic HTML

## 📝 Notes

- This is a **prototype** with dummy data for demonstration purposes
- All data is client-side only (no API calls or backend required)
- Optimized for performance with React hooks and memoization
- Fully responsive design
- White-label ready (easy to customize branding and colors)
- Production-ready code structure

## 🚀 Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

Simply run `npm run build` and deploy the `.next` folder.

## 📄 License

This is a prototype project for demonstration purposes.

## 👤 Author

Created as a prototype for showcasing Australian vehicle fleet analytics capabilities.

---

**Built with ❤️ using Next.js and TypeScript**
