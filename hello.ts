/**
 * A simple Hello World program in TypeScript that demonstrates using the Stagehand MCP server
 */

import { use_mcp_tool } from './mcp_client';

// Function that prints a greeting message
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

// Function to navigate to a URL using Stagehand
async function navigateToUrl(url: string): Promise<void> {
  try {
    console.log(`Navigating to ${url}...`);
    
    // Use the Stagehand MCP server to navigate to the URL
    const result = await use_mcp_tool({
      server_name: 'stagehand',
      tool_name: 'stagehand_navigate',
      arguments: { url }
    });
    
    console.log('Navigation result:', result);
  } catch (error) {
    console.error('Error navigating:', error);
  }
}

// Call the greeting function
greet("World");

// Navigate to Google
navigateToUrl('https://google.com');

// Export functions for potential reuse
export { greet, navigateToUrl };
