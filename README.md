# Pokemon Explorer

A modern, responsive web application for exploring Pokémon using the PokéAPI. Built with React, Vite, and TypeScript.

## Features

- 📱 Fully responsive design for mobile, tablet, and desktop
- 🔍 Real-time search functionality
- 🏷️ Filter Pokémon by type
- 📄 Pagination for efficient data loading
- ⭐ Favorite Pokémon system with local storage persistence
- 🔎 Detailed view modal for each Pokémon
- 🎨 Modern UI with Pokémon-themed styling

## Technologies Used

- **React + Vite**: For fast development and optimal production builds
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive and utility-first styling
- **Shadcn/UI**: For pre-built, accessible UI components
- **Tanstack Query**: For efficient data fetching and caching
- **PokéAPI**: As the data source for Pokémon information
- **Lucide React**: For high-quality icons
- **Local Storage**: For persisting user favorites

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Bansal0527/pokemon-explorer.git
cd pokemon-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080/`

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── lib/             # Utility functions and configurations
├── types/           # TypeScript type definitions
└── assets/          # Static assets
```

## Key Implementation Details

### Data Fetching
- Uses Tanstack Query for efficient data fetching and caching
- Implements pagination to manage large datasets
- Handles loading and error states gracefully

### State Management
- Uses React's built-in state management with useState and useContext
- Implements local storage for persisting user favorites
- Manages filter and search states efficiently

### UI/UX Considerations
- Implements responsive design using Tailwind CSS
- Uses Shadcn/UI components for consistent styling
- Provides loading states and error handling for better user experience

## Challenges and Solutions

1. **API Rate Limiting**
   - Challenge: PokéAPI has rate limits
   - Solution: Implemented caching with Tanstack Query to reduce API calls

2. **Performance with Large Lists**
   - Challenge: Rendering large lists of Pokémon efficiently
   - Solution: Implemented pagination and virtualization

3. **Type Filtering Performance**
   - Challenge: Filtering large datasets efficiently
   - Solution: Optimized filter logic and implemented debouncing for search

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful UI components
- The Pokémon Company for the inspiration
