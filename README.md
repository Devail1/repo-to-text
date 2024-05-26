# Repo to Text

Repo to Text is a Next.js web application that allows users to input a GitHub repository URL and select files to include using a tree-like structure. The app currently works only with public repositories.

## Features

- Input a GitHub repository URL
- Display files in a tree-like structure
- Select individual files or entire folders

## Prerequisites

- Node.js (v14.x or later)
- npm or yarn package manager
- GitHub Personal Access Token

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/repo-to-text.git
cd repo-to-text
```

### Install dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### Set up environment variables

Create a `.env.local` file in the root of your project and add your GitHub Personal Access Token:

```env
NEXT_PUBLIC_GITHUB_API_TOKEN=your_github_personal_access_token
```

### Run the development server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## License

This project is licensed under the MIT License.
