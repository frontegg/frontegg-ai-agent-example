import { logger } from '../utils/logger';
import { mcpClient } from './mcp';

// Interface for company data from HubSpot
export interface CompanyData {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  revenue?: string;
  description?: string;
  website?: string;
  createdate: string;
  primaryContact?: {
    id: string;
    email: string;
    name: string;
  };
  [key: string]: any;
}

// Interface for contact data from HubSpot
export interface ContactData {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  jobtitle?: string;
  phone?: string;
  createdate: string;
  [key: string]: any;
}

// Interface for deal data from HubSpot
export interface DealData {
  id: string;
  name: string;
  amount?: string;
  stage?: string;
  closedate?: string;
  createdate?: string;
  [key: string]: any;
}

/**
 * Get recent signups (companies) from HubSpot
 * @param limit Optional number of signups to retrieve (default: 1)
 */
export async function getRecentSignups(limit: number = 1): Promise<CompanyData[]> {
  try {
    logger.info(`Getting recent signups from HubSpot (limit: ${limit})`);
    
    // Use hubspot_get_active_companies tool
    logger.debug(`Executing HubSpot tool 'hubspot_get_active_companies' with limit ${limit}`);
    const response = await mcpClient.executeTool('hubspot', 'hubspot_get_active_companies', {
      limit: limit
    });
    
    logger.debug(`HubSpot raw response: ${JSON.stringify(response)}`);
    
    // Parse the response
    let result;
    if (typeof response === 'string') {
      logger.debug('Response is a string, attempting to parse as JSON');
      try {
        result = JSON.parse(response);
      } catch (parseError) {
        logger.error(`Error parsing response as JSON: ${(parseError as Error).message}`);
        logger.debug(`Raw response content: ${response}`);
        throw new Error('Failed to parse HubSpot response');
      }
    } else if (response && response.content && Array.isArray(response.content)) {
      logger.debug('Response has content array, extracting text content');
      const textContent = response.content
        .filter((item: any) => item && item.type === 'text' && item.text)
        .map((item: any) => item.text)
        .join('');
      
      if (textContent) {
        try {
          result = JSON.parse(textContent);
          logger.debug(`Parsed content: ${JSON.stringify(result)}`);
        } catch (parseError) {
          logger.error(`Error parsing text content as JSON: ${(parseError as Error).message}`);
          logger.debug(`Raw text content: ${textContent}`);
          throw new Error('Failed to parse HubSpot text content');
        }
      } else {
        logger.warn('No text content found in response');
        result = response;
      }
    } else {
      logger.debug('Using response as-is');
      result = response;
    }
    
    logger.debug(`Processed result: ${JSON.stringify(result)}`);
    
    // Check if we have companies in the result
    if (!result) {
      logger.error(`No result found: ${JSON.stringify(result)}`);
      throw new Error('Failed to get companies from HubSpot');
    }
    
    // The result is an array of companies directly
    let companies: CompanyData[] = [];
    
    if (Array.isArray(result)) {
      logger.debug(`Result is an array with ${result.length} items`);
      companies = result.map((company: any) => ({
        id: company.id,
        name: company.properties.name || 'Unknown',
        industry: company.properties.industry || '',
        size: company.properties.numberofemployees || '',
        revenue: company.properties.annualrevenue || '',
        description: company.properties.description || '',
        website: company.properties.website || '',
        createdate: company.properties.createdate || ''
      }));
    } else if (result.companies && Array.isArray(result.companies)) {
      // Fallback for old format
      logger.debug('Result has companies property');
      companies = result.companies.map((company: any) => ({
        id: company.id,
        name: company.properties.name || 'Unknown',
        industry: company.properties.industry || '',
        size: company.properties.numberofemployees || '',
        revenue: company.properties.annualrevenue || '',
        description: company.properties.description || '',
        website: company.properties.website || '',
        createdate: company.properties.createdate || ''
      }));
    } else {
      logger.error(`Unexpected result format: ${JSON.stringify(result)}`);
      throw new Error('Unexpected result format from HubSpot');
    }
    
    logger.info(`Retrieved ${companies.length} recent signups from HubSpot`);
    return companies;
  } catch (error) {
    logger.error(`Error getting recent signups: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Process a specific signup by ID
 */
export async function processNewSignup(signupId: string): Promise<CompanyData> {
  try {
    logger.info(`Processing signup ${signupId}`);
    
    // Note: Based on the server code, there isn't a specific endpoint to get a company by ID
    // We'll try to get recent companies and find the one with matching ID
    const allCompanies = await getRecentSignups(100);
    const company = allCompanies.find(c => c.id === signupId);
    
    if (!company) {
      throw new Error(`Company with ID ${signupId} not found`);
    }
    
    // Try to get associated contacts if possible
    try {
      const associatedContacts = await getAssociatedContacts(signupId);
      if (associatedContacts.length > 0) {
        // Add first contact's info to company data
        const primaryContact = associatedContacts[0];
        company.primaryContact = {
          id: primaryContact.id,
          email: primaryContact.email,
          name: `${primaryContact.firstname || ''} ${primaryContact.lastname || ''}`.trim()
        };
      }
    } catch (contactError) {
      logger.warn(`Could not retrieve associated contacts: ${(contactError as Error).message}`);
    }
    
    logger.info(`Processed signup ${signupId}`);
    return company;
  } catch (error) {
    logger.error(`Error processing signup ${signupId}: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Get contacts associated with a company
 */
export async function getAssociatedContacts(companyId: string): Promise<ContactData[]> {
  try {
    logger.info(`Getting contacts associated with company ${companyId}`);
    
    // Note: Based on the server code, there isn't a specific endpoint to get associated contacts
    // We can try to get active contacts and filter them (not ideal)
    const response = await mcpClient.executeTool('hubspot', 'hubspot_get_active_contacts', {
      limit: 100
    });
    
    logger.debug(`HubSpot contacts response: ${JSON.stringify(response)}`);
    
    // Parse the response
    let result;
    if (typeof response === 'string') {
      try {
        result = JSON.parse(response);
      } catch (parseError) {
        logger.error(`Error parsing contacts response as JSON: ${(parseError as Error).message}`);
        throw new Error('Failed to parse HubSpot contacts response');
      }
    } else {
      result = response;
    }
    
    logger.debug(`Processed contacts result: ${JSON.stringify(result)}`);
    
    // Check for valid response
    if (!result) {
      throw new Error(`Failed to get contacts for company ${companyId}`);
    }
    
    let contacts: ContactData[] = [];
    
    // The result might be an array of contacts directly
    if (Array.isArray(result)) {
      // Filter contacts by company if possible
      contacts = result
        .filter((contact: any) => {
          // Try to find contacts associated with this company
          // This filtering might not be accurate depending on the data structure
          return contact.associations?.companies?.includes(companyId) || 
                 contact.properties?.company_id === companyId ||
                 false;
        })
        .map((contact: any) => ({
          id: contact.id,
          email: contact.properties.email || '',
          firstname: contact.properties.firstname || '',
          lastname: contact.properties.lastname || '',
          jobtitle: contact.properties.jobtitle || '',
          phone: contact.properties.phone || '',
          createdate: contact.properties.createdate || ''
        }));
    } else if (result.contacts && Array.isArray(result.contacts)) {
      // Handle legacy format
      contacts = result.contacts
        .filter((contact: any) => {
          return contact.associations?.companies?.includes(companyId) || 
                 contact.properties?.company_id === companyId ||
                 false;
        })
        .map((contact: any) => ({
          id: contact.id,
          email: contact.properties.email || '',
          firstname: contact.properties.firstname || '',
          lastname: contact.properties.lastname || '',
          jobtitle: contact.properties.jobtitle || '',
          phone: contact.properties.phone || '',
          createdate: contact.properties.createdate || ''
        }));
    } else {
      logger.warn(`Unexpected contacts result format: ${JSON.stringify(result)}`);
      // Return empty array if format is unrecognized
      contacts = [];
    }
    
    logger.info(`Retrieved ${contacts.length} contacts that might be associated with company ${companyId}`);
    return contacts;
  } catch (error) {
    logger.error(`Error getting contacts for company ${companyId}: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Create a deal for a company in HubSpot
 */
export async function createDeal(companyId: string, dealName: string, amount?: number, stage?: string): Promise<DealData> {
  try {
    logger.info(`Creating deal for company ${companyId}`);
    
    // Note: Based on the server code, there isn't a create_hubspot_deal tool
    // We would need to implement this in the server, but for now, we'll just log and throw an error
    logger.error(`Cannot create deal: Tool not available in server`);
    throw new Error('Creating deals is not supported by the HubSpot MCP server');
    
    // Placeholder return that never gets reached
    return {
      id: '',
      name: dealName
    };
  } catch (error) {
    logger.error(`Error creating deal for company ${companyId}: ${(error as Error).message}`);
    throw error;
  }
} 