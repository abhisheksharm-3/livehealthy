# LiveHealthy Frontend

AI-powered health assessment tool with instant, personalized insights.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Fonts**: Outfit (body) + Playfair Display (headings)

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero section with feature highlights |
| `/analyse` | Analyse | 16-field health questionnaire with AI prediction |
| `/stats` | Statistics | Global health statistics overview |
| `/about` | About | Project mission and privacy information |

## Project Structure

```
src/
├── components/
│   ├── analyse/      # Form and result display
│   ├── layout/       # Navbar, Footer
│   └── ui/           # Shadcn components
├── pages/            # Route components
├── constants/        # Form options, routes, mappings
├── schemas/          # Zod validation schemas
├── services/         # API layer
└── types/            # TypeScript interfaces
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment Variables

```env
VITE_BACKEND_BASE_URL=http://localhost:5000
```
