# Rigen Finance

A decentralized leveraged yield farming protocol built on Aptos blockchain.

## Features

- Leveraged Yield Farming
- Lending & Borrowing
- Cross-chain Bridge
- Position Management
- Real-time APY/APR Tracking

## Tech Stack

- **Frontend Framework:** Next.js 15.x (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Blockchain:** Aptos
- **Wallet Integration:** Aptos Wallet Adapter
- **UI Components:** Radix UI
- **Data Fetching:** TanStack Query
- **Charts:** Recharts

## Prerequisites

- Node.js 20.x or later
- PNPM package manager
- Aptos compatible wallet (Petra, Martian, etc.)

## Environment Setup

You copy the `.env.example` file to `.env` the values.

```
cp .env.example .env
```

Fill in the values in the `.env` file.

```env
NEXT_PUBLIC_SUPPLY_BORROW_MANAGER_ACCOUNT_ADDRESS=0xba481cd218c2aa9454b7746731f6f976e58767b363458513c7447f76673565f1
NEXT_PUBLIC_AAVE_TOKENS_MANAGER_ACCOUNT_ADDRESS=0xba481cd218c2aa9454b7746731f6f976e58767b363458513c7447f76673565f1
NEXT_PUBLIC_POOL_MANAGER_ACCOUNT_ADDRESS=0xba481cd218c2aa9454b7746731f6f976e58767b363458513c7447f76673565f1
NEXT_PUBLIC_APTOS_NETWORK=testnet
```

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run development server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   │   ├── features/          # Feature-specific components
│   │   └── shared/            # Reusable components
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Root page
│   │   └── error.tsx          # Error handling
│   │
│   ├── clients/               # API clients & blockchain interactions
│   │   ├── configs/          # Configuration files
│   │   ├── services/         # Service layer
│   │   ├── types/           # TypeScript types
│   │   └── wrappers/        # Wrapper classes
│   └── providers/            # React context providers
├── public/                   # Static assets
└── config files             # Configuration files
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Aptos Labs](https://aptoslabs.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
