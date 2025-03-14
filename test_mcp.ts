/**
 * Test file for MCP client
 */
import { use_mcp_tool } from './mcp_client';

async function testMcpTool() {
  try {
    console.log('Testing MCP tool...');
    
    // Call the stagehand_navigate tool
    const result = await use_mcp_tool({
      server_name: 'stagehand',
      tool_name: 'stagehand_navigate',
      arguments: {
        url: 'https://google.com'
      }
    });
    
    console.log('MCP tool result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error testing MCP tool:', error);
  }
}

// Run the test
testMcpTool();
