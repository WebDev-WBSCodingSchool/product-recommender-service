import type { FunctionTool, ResponseInput } from 'openai/resources/responses/responses';
import type { Recommendation } from '../types';
import { OpenAI } from 'openai';
import { getProducts } from './productsService';

const tools: FunctionTool[] = [
  {
    type: 'function',
    name: 'getProducts',
    description: 'Fetches an array of products from the fake store API',
    parameters: {
      type: 'object',
      properties: {},
      additionalProperties: false
    },
    strict: true
  }
];

const isTextContent = (part: any): part is { type: 'output_text'; text: string } => {
  return part?.type === 'output_text' && typeof part.text === 'string';
};

export const answerWithProducts = async (prompt: string): Promise<Recommendation> => {
  const openai = new OpenAI();
  const model = process.env.OPENAI_MODEL || 'gpt-4.1';
  const input: ResponseInput = [
    {
      role: 'system',
      content: `You are a helpful assistant at an ecommerce business that can fetch products from the fake store API. 
      Based on the user's request, you can call the getProducts function to retrieve product data. Use the product data to provide personalized recommendations
      in the 'message' field of the response. The matching products should be included in the 'products' field of the response.`
    },
    { role: 'user', content: prompt }
  ];
  const response1 = await openai.responses.create({
    model,
    input,
    tools
  });
  const output1 = response1.output[0];

  if (output1.type !== 'function_call' || output1.name !== 'getProducts') {
    return {
      message: 'Seems like you are not asking for product recommendations. Please try again.'
    };
  }

  const products = await getProducts();
  input.push(output1);
  input.push({
    type: 'function_call_output',
    call_id: output1.call_id,
    output: JSON.stringify(products)
  });

  const response2 = await openai.responses.create({
    model,
    input,
    text: {
      format: {
        type: 'json_schema',
        name: 'recommendation_schema',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message providing context or information about the recommendation.'
            },
            products: {
              type: 'array',
              description: 'A list of recommended products.',
              items: {
                $ref: '#/$defs/product_schema'
              }
            }
          },
          required: ['message', 'products'],
          additionalProperties: false,
          $defs: {
            product_schema: {
              type: 'object',
              description: 'Defines a product with its details.',
              properties: {
                id: {
                  type: 'number',
                  description: 'Unique identifier for the product.'
                },
                title: {
                  type: 'string',
                  description: 'The title or name of the product.'
                },
                price: {
                  type: 'number',
                  description: 'Price of the product.'
                },
                description: {
                  type: 'string',
                  description: 'Detailed description of the product.'
                },
                category: {
                  type: 'string',
                  description: 'Category under which the product is classified.'
                },
                image: {
                  type: 'string',
                  description: 'URL to the image of the product.'
                }
              },
              required: ['id', 'title', 'price', 'description', 'category', 'image'],
              additionalProperties: false
            }
          }
        },
        strict: true
      }
    },
    tools
  });
  const output2 = response2.output[0];

  if (output2.type !== 'message' || !output2.content?.length) {
    return {
      message: 'Damn, I am not sure what happened. Please try again.'
    };
  }

  const firstContent = output2.content[0];

  if (!isTextContent(firstContent)) {
    return {
      message: "Oops, it's in the tip of my tongue, but somehow I messed up. Please try again."
    };
  }

  try {
    return JSON.parse(firstContent.text);
  } catch (err) {
    return {
      message: 'I am sorry, but I could not put the response together. Please try again.'
    };
  }
};
