# MCP Client Demo

This project demonstrates how to use the Model Context Protocol (MCP) client with environment variables.

## Setup

1. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Edit the `.env` file and fill in your actual values:

```
# MCP Client Configuration
NODE_PATH=/path/to/node
SERVER_PATH=/path/to/server/build/index.js

# BrowserBase Configuration
BROWSERBASE_API_KEY=<YOUR_BROWSERBASE_API_KEY>
BROWSERBASE_PROJECT_ID=<YOUR_BROWSERBASE_PROJECT_ID>

# OpenAI Configuration
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
```

3. Update the MCP settings file with your environment variables:

```bash
npm run update-mcp-settings
```

## Usage

After setting up the environment variables and updating the MCP settings, you can use the MCP client as usual:

```typescript
import { use_mcp_tool } from './mcp_client';

async function main() {
  const result = await use_mcp_tool({
    server_name: 'stagehand',
    tool_name: 'your_tool_name',
    arguments: {
      // Your tool arguments
    }
  });
  
  console.log(result);
}

main().catch(console.error);
```

## Environment Variables

- `NODE_PATH`: Path to the Node.js executable
- `SERVER_PATH`: Path to the MCP server JavaScript file
- `BROWSERBASE_API_KEY`: Your BrowserBase API key
- `BROWSERBASE_PROJECT_ID`: Your BrowserBase project ID
- `OPENAI_API_KEY`: Your OpenAI API key

## Scripts

- `npm run build`: Build the TypeScript files
- `npm run start`: Run the hello.js file
- `npm run dev`: Run the hello.ts file with ts-node
- `npm run update-mcp-settings`: Update the MCP settings file with environment variables
- `npm run test-env-mcp`: Test the MCP client with environment variables
