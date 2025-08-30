// Import class chung và interfaces từ common
import { NGWorkSearchAI, ChatResponse, IToolCall, IToolResponse } from '../common';

// Class CallOpenAIWithTools
export class CallOpenAIWithTools extends NGWorkSearchAI {
  private tools: IToolCall[] = [];
  private model: string = 'gpt-3.5-turbo-0613';

  constructor() {
    super();
    this.initializeTools();
  }

  // Khởi tạo tools
  private initializeTools(): void {
    this.tools = [
      {
        type: 'function',
        function: {
          name: 'getTimeOfDay',
          description: 'Get the current time of day'
        }
      },
      {
        type: 'function',
        function: {
          name: 'getOrderStatus',
          description: 'Returns the status of an order',
          parameters: {
            type: 'object',
            properties: {
              orderId: {
                type: 'string',
                description: 'The id of the order to get the status of'
              }
            },
            required: ['orderId']
          }
        }
      }
    ];
  }

  // Thêm tool mới
  addTool(tool: IToolCall): void {
    this.tools.push(tool);
  }

  // Xóa tool theo tên
  removeTool(toolName: string): void {
    this.tools = this.tools.filter((tool) => tool.function.name !== toolName);
  }

  // Lấy danh sách tools
  getTools(): IToolCall[] {
    return this.tools;
  }

  // Set model
  setModel(model: string): void {
    this.model = model;
  }

  // Get model
  getModel(): string {
    return this.model;
  }

  // Xử lý tool calls - sử dụng interface từ common
  private async handleToolCall(
    toolCall: NonNullable<ChatResponse['choices'][0]['message']['tool_calls']>[0]
  ): Promise<IToolResponse> {
    const toolName = toolCall.function.name;
    let toolResponse = '';

    try {
      switch (toolName) {
        case 'getTimeOfDay':
          toolResponse = this.getTimeOfDay();
          break;
        case 'getOrderStatus': {
          const args = JSON.parse(toolCall.function.arguments);
          toolResponse = this.getOrderStatus(args.orderId);
          break;
        }
        default:
          toolResponse = `Unknown tool: ${toolName}`;
      }
    } catch (error) {
      toolResponse = `Error executing tool ${toolName}: ${error}`;
    }

    return {
      tool_call_id: toolCall.id,
      content: toolResponse
    };
  }

  // Tool: Get time of day
  private getTimeOfDay(): string {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  // Tool: Get order status
  private getOrderStatus(orderId: string): string {
    console.log(`Getting the status of order ${orderId}`);
    const orderAsNumber = parseInt(orderId);
    if (orderAsNumber % 2 === 0) {
      return 'IN_PROGRESS';
    }
    return 'COMPLETED';
  }

  // Main method để gọi AI với tools
  async callWithTools(userPrompt: string): Promise<string> {
    // Set prompt và context
    this.prompt = userPrompt;

    const context = [
      {
        role: 'system',
        content: 'You are a helpful assistant that gives information about the time of day and order status'
      },
      {
        role: 'user',
        content: userPrompt
      }
    ];

    this.context = context;

    try {
      // First call - AI decides to use tools
      const firstResponse = await this.chat({
        prompt: userPrompt,
        tools: this.tools,
        model: this.model,
        messages: this.context,
        tool_choice: 'auto'
      });

      // Check if tool call is required
      const willInvokeFunction = firstResponse.choices[0].finish_reason === 'tool_calls';

      if (willInvokeFunction && firstResponse.choices[0].message.tool_calls) {
        const toolCall = firstResponse.choices[0].message.tool_calls[0];

        // Add assistant message to context
        this.addMessage('assistant', `I need to use the ${toolCall.function.name} tool to help you.`);

        // Execute tool and get response
        const toolResponse = await this.handleToolCall(toolCall);

        // Add tool response to context
        this.addMessage('tool', toolResponse.content);

        // Second call - AI gives final response with tool result
        const secondResponse = await this.chat({
          prompt: userPrompt,
          model: this.model,
          messages: this.context
        });

        return secondResponse.choices[0].message.content || 'No response generated';
      } else {
        // No tools needed, return direct response
        return firstResponse.choices[0].message.content || 'No response generated';
      }
    } catch (error) {
      console.error('Error in callWithTools:', error);
      return `Error: ${error}`;
    }
  }

  // Method để test tools
  async testTools(): Promise<void> {
    console.log('🧪 Testing CallOpenAIWithTools...');

    const testPrompts = ['What is the current time?', 'What is the status of order 1234?', 'Tell me about the weather'];

    for (const prompt of testPrompts) {
      console.log(`\n📝 Testing prompt: "${prompt}"`);
      const response = await this.callWithTools(prompt);
      console.log(`🤖 Response: ${response}`);
    }
  }
}

// Export instance và class
export const callOpenAIWithTools = new CallOpenAIWithTools();

// Export default
export default {
  CallOpenAIWithTools,
  callOpenAIWithTools
};

// Run test tools
callOpenAIWithTools.testTools();
