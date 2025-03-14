/**
 * MCP client utility functions
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Type definitions for MCP tool parameters
export interface McpToolParams {
  server_name: string;
  tool_name: string;
  arguments: Record<string, any>;
}

// Cache for MCP clients to avoid creating multiple clients for the same server
const clientCache = new Map<string, Client>();

/**
 * Get or create an MCP client for a specific server
 */
async function getMcpClient(serverName: string): Promise<Client> {
  // Check if we already have a client for this server
  if (clientCache.has(serverName)) {
    return clientCache.get(serverName)!;
  }

  // Create a new client for this server
  const client = new Client({
    name: 'mcp-client',
    version: '1.0.0'
  });
  
  // Create a transport for the client
  // For this example, we're using the StdioClientTransport
  // which spawns a child process to communicate with the MCP server
  const transport = new StdioClientTransport({
    command: process.env.NODE_PATH || 'node',
    args: [process.env.SERVER_PATH || ''],
    env: {
      BROWSERBASE_API_KEY: process.env.BROWSERBASE_API_KEY || '',
      BROWSERBASE_PROJECT_ID: process.env.BROWSERBASE_PROJECT_ID || '',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || ''
    }
  });

  // Connect the client to the transport
  await client.connect(transport);
  
  // Cache the client for future use
  clientCache.set(serverName, client);
  
  return client;
}

/**
 * Utility function to use an MCP tool
 * This function communicates with the MCP server to execute the tool
 */
export async function use_mcp_tool(params: McpToolParams): Promise<CallToolResult> {
  console.log('MCP tool call:', JSON.stringify(params, null, 2));
  
  try {
    // Get the MCP client for this server
    const client = await getMcpClient(params.server_name);
    
    // Get the available tools from the server
    const { tools } = await client.listTools();
    
    // Check if the requested tool exists
    const tool = tools.find(t => t.name === params.tool_name);
    if (!tool) {
      throw new Error(`Tool not found: ${params.tool_name}`);
    }
    
    // Call the tool with the provided arguments
    const result = await client.callTool({
      name: params.tool_name,
      arguments: params.arguments
    });
    
    // Ensure the result matches the CallToolResult type
    if (!result.content) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result)
          }
        ],
        isError: false
      };
    }
    
    return result as CallToolResult;
  } catch (error) {
    console.error('Error calling MCP tool:', error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }
      ],
      isError: true
    };
  }
}
