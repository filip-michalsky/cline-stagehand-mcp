import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Path to the MCP settings file
const mcpSettingsPath = path.resolve(
  process.env.HOME || '',
  'Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json'
);

// Read the current MCP settings
let mcpSettings: any;
try {
  const mcpSettingsContent = fs.readFileSync(mcpSettingsPath, 'utf8');
  mcpSettings = JSON.parse(mcpSettingsContent);
} catch (error) {
  console.error('Error reading MCP settings file:', error);
  process.exit(1);
}

// Update the MCP settings with environment variables
if (mcpSettings.mcpServers && mcpSettings.mcpServers.stagehand) {
  mcpSettings.mcpServers.stagehand.args = [process.env.SERVER_PATH || ''];
  mcpSettings.mcpServers.stagehand.env = {
    BROWSERBASE_API_KEY: process.env.BROWSERBASE_API_KEY || '',
    BROWSERBASE_PROJECT_ID: process.env.BROWSERBASE_PROJECT_ID || '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || ''
  };
}

// Write the updated MCP settings back to the file
try {
  fs.writeFileSync(mcpSettingsPath, JSON.stringify(mcpSettings, null, 2), 'utf8');
  console.log('MCP settings updated successfully!');
} catch (error) {
  console.error('Error writing MCP settings file:', error);
  process.exit(1);
}
