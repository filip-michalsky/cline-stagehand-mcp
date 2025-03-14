import { use_mcp_tool } from './mcp_client';

async function main() {
  try {
    console.log('Testing MCP client with environment variables...');
    
    // Step 1: Navigate to Google.com
    console.log('Step 1: Navigating to Google.com...');
    let result = await use_mcp_tool({
      server_name: 'stagehand',
      tool_name: 'stagehand_navigate',
      arguments: {
        url: 'https://google.com'
      }
    });
    console.log('Navigation result:', JSON.stringify(result, null, 2));
    
    // Step 2: Wait for the page to load and then search for "OpenAI"
    console.log('Step 2: Searching for "OpenAI"...');
    // Wait a moment for the page to fully load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Use stagehand_act to type "OpenAI" in the search box
    result = await use_mcp_tool({
      server_name: 'stagehand',
      tool_name: 'stagehand_act',
      arguments: {
        action: 'Type "OpenAI" into the search box'
      }
    });
    console.log('Type result:', JSON.stringify(result, null, 2));
    
    // Use stagehand_act to submit the search
    result = await use_mcp_tool({
      server_name: 'stagehand',
      tool_name: 'stagehand_act',
      arguments: {
        action: 'Click the Google Search button'
      }
    });
    console.log('Submit result:', JSON.stringify(result, null, 2));
    
    // Step 3: Wait for search results and observe the first result
    console.log('Step 3: Observing the first search result...');
    // Wait for search results to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Take a screenshot to see the current state
    result = await use_mcp_tool({
      server_name: 'stagehand',
      tool_name: 'screenshot',
      arguments: {
        fullPage: false
      }
    });
    console.log('Screenshot taken');
    
    // Use stagehand_observe to get the first search result
    result = await use_mcp_tool({
      server_name: 'stagehand',
      tool_name: 'stagehand_observe',
      arguments: {
        instruction: 'Find the first search result for OpenAI and observe its title and description'
      }
    });
    console.log('First search result:', JSON.stringify(result, null, 2));
    
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Error testing MCP client:', error);
  }
}

main().catch(console.error);
