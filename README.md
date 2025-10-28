# InternConnect – AI Internship Finder

An AI-powered platform to connect students with their perfect internship opportunities.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## Project Structure

```
/internconnect
├── /app
│   ├── /components      # Reusable UI components
│   ├── /styles          # Animation variants and custom styles
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Home page
├── /public              # Static assets
├── /utils               # Utility functions (API client, helpers)
├── /hooks               # Custom React hooks
├── /data                # Data models and sample data
├── /context             # React Context providers
├── package.json
└── tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository or navigate to the project folder:

```bash
cd internconnect
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local .env.local
# Edit .env.local with your configuration
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Developer Notes

### Key Features to Implement

- [ ] User authentication (students & employers)
- [ ] AI-powered internship matching
- [ ] Advanced search and filters
- [ ] Application tracking system
- [ ] Profile management
- [ ] Real-time notifications
- [ ] Analytics dashboard

### Folder Guidelines

- **app/components**: Place all reusable UI components here
- **utils**: Add helper functions, API clients, and utilities
- **hooks**: Custom React hooks for shared logic
- **data**: Type definitions and mock/sample data
- **context**: Global state management with React Context

### Styling

- Use Tailwind utility classes for styling
- Custom colors defined in `tailwind.config.js`
- Animation variants in `app/styles/animations.ts`
- Primary brand color: Purple (#8b5cf6)

### API Integration

- Axios client configured in `utils/api.ts`
- Includes request/response interceptors
- Token-based authentication ready

### Toast Notifications

Use the custom hook for consistent notifications:

```tsx
import { useToast } from "@/hooks/useToast";

const { showSuccess, showError } = useToast();
showSuccess("Operation completed!");
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT
