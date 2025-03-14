import { use_mcp_tool } from './mcp_client';

async function main() {
  try {
    console.log('Testing MCP client with environment variables...');
    
    // Call the stagehand_navigate tool
    const result = await use_mcp_tool({
      server_name: 'stagehand',
      tool_name: 'stagehand_navigate',
      arguments: {
        url: 'https://google.com'
      }
    });
    
    console.log('MCP tool result:', JSON.stringify(result, null, 2));
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Error testing MCP client:', error);
  }
}

main().catch(console.error);
