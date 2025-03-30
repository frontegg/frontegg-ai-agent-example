import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { logger } from '../utils/logger';
import { CompanyData } from './hubspot';
import { QualificationAssessment, AssessmentResult } from '../types';

let chatModel: ChatOpenAI;

/**
 * Initialize LangChain with OpenAI 
 */
export function initOpenAI(): void {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    
    // Initialize LangChain ChatOpenAI model
    chatModel = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: 'gpt-4',
      temperature: 0.7
    });
    
    logger.info('LangChain with OpenAI initialized successfully');
  } catch (error) {
    logger.error(`Failed to initialize LangChain with OpenAI: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Assess company qualification using LangChain
 */
export async function assessCompanyQualification(companyData: CompanyData): Promise<QualificationAssessment> {
  try {
    if (!chatModel) {
      throw new Error('LangChain OpenAI model not initialized');
    }

    logger.info(`Starting qualification assessment for company: ${companyData.name}`);

    // For direct text output instead of JSON
    // const parser = new JsonOutputParser<AssessmentResult>();
    
    // Define the template for qualification assessment
    const promptTemplate = PromptTemplate.fromTemplate(`
You are an AI assistant specialized in qualifying potential customers based on company information.
Provide a detailed assessment with a qualification score (1-10), where 10 is the highest quality lead.

Please assess this company as a potential customer:
Company Name: {name}
Industry: {industry}
Company Size: {size}
Annual Revenue: {revenue}
Description: {description}
Website: {website}
{contactInfo}

Based on the above information, provide a detailed qualification assessment.
Include a clear score (1-10) and recommended action at the end of your assessment.
`);

    // Extract contact information if available
    const contactInfo = companyData.primaryContact 
      ? `Primary Contact: ${companyData.primaryContact.name || 'N/A'}\nContact Email: ${companyData.primaryContact.email || 'N/A'}`
      : 'Primary Contact: Not Available';

    // Create the chain - direct from prompt to model
    const chain = promptTemplate.pipe(chatModel);

    // Run the chain
    const result = await chain.invoke({
      name: companyData.name,
      industry: companyData.industry || 'N/A',
      size: companyData.size || 'N/A',
      revenue: companyData.revenue || 'N/A',
      description: companyData.description || 'N/A',
      website: companyData.website || 'N/A',
      contactInfo: contactInfo
    });
    
    logger.debug(`Raw OpenAI response: ${JSON.stringify(result)}`);
    
    // Get the text content from the response
    let assessmentText = '';
    
    if (typeof result.content === 'string') {
      assessmentText = result.content;
    } else if (Array.isArray(result.content)) {
      assessmentText = result.content
        .map(item => {
          if (typeof item === 'string') {
            return item;
          } else if (typeof item === 'object' && item !== null) {
            // Handle different types of content objects
            if ('text' in item) {
              return item.text;
            } else if ('type' in item && item.type === 'text' && 'text' in item) {
              return item.text;
            }
          }
          return '';
        })
        .join('');
    }
    
    logger.debug(`Extracted assessment text: ${assessmentText}`);
    
    // Extract score and recommended action using regex
    const scoreRegex = /score\D*(\d+)(?:\/10)?/i;
    const scoreMatch = assessmentText.match(scoreRegex);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 5; // Default to 5 if not found
    
    const actionRegex = /recommended action:?\s*([^\.]+)/i;
    const actionMatch = assessmentText.match(actionRegex);
    const recommendedAction = actionMatch ? actionMatch[1].trim() : "Follow Up";
    
    // Get a list of reasons from bullet points or numbered lists if present
    const reasonsRegex = /(?:reason|factor|consideration)s?:(?:\s*(?:-|\d+\.)\s*([^\n]+))+/gi;
    const reasonsMatch = assessmentText.match(reasonsRegex);
    let reasons: string[] = [];
    
    if (reasonsMatch) {
      // Extract individual bullet points
      const bulletRegex = /(?:-|\d+\.)\s*([^\n]+)/g;
      let bulletMatch;
      while ((bulletMatch = bulletRegex.exec(reasonsMatch[0])) !== null) {
        reasons.push(bulletMatch[1].trim());
      }
    }
    
    // If no reasons extracted, use sentences as reasons
    if (reasons.length === 0) {
      const sentences = assessmentText
        .split(/\.\s+/)
        .filter((s: string) => s.length > 10 && !s.includes('score') && !s.includes('action'))
        .slice(0, 3)
        .map((s: string) => s.trim() + (s.endsWith('.') ? '' : '.'));
      reasons = sentences;
    }
    
    // Format the response
    const assessment: QualificationAssessment = {
      company: companyData.name,
      assessment: assessmentText,
      score: score,
      reasons: reasons,
      recommendedAction: recommendedAction,
      timestamp: new Date().toISOString()
    };
    
    logger.info(`Company qualification assessment completed for ${companyData.name} with score ${assessment.score}/10`);
    
    return assessment;
  } catch (error) {
    logger.error(`Error in company qualification assessment: ${(error as Error).message}`);
    throw error;
  }
}

export { chatModel }; 