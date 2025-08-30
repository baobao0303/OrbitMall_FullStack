export interface INGWorkSearchAI {
  prompt: string;
  context: any[];
}

export interface IToolCall {
  type: string;
  function: {
    name: string;
    description: string;
    parameters?: {
      type: string;
      properties: Record<string, any>;
      required: string[];
    };
  };
}

export interface IToolResponse {
  tool_call_id: string;
  content: string;
}
export interface INGWorkSearchAIChatMessage {
  message: string;
  tools: any[];
  reasoning: string;
}

// Interface cho chat options
export interface ChatOptions {
  prompt?: string;
  tools?: any[];
  model?: string;
  messages?: any[];
  tool_choice?: string;
  temperature?: number;
  max_tokens?: number;
}

// Interface cho chat response
export interface ChatResponse {
  choices: Array<{
    message: {
      content: string | null;
      tool_calls?: Array<{
        id: string;
        type: string;
        function: {
          name: string;
          arguments: string;
        };
      }>;
    };
    finish_reason?: string;
  }>;
}

export class NGWorkSearchAI implements INGWorkSearchAI {
  private _prompt: string = ''; // Current prompt
  private _context: any[] = []; // Current context

  // Get current prompt
  get prompt(): string {
    return this._prompt;
  }

  // Set new prompt
  set prompt(newPrompt: string) {
    this._prompt = newPrompt;
  }

  // Get current context
  get context(): any[] {
    return this._context;
  }

  // Set new context
  set context(newContext: any[]) {
    this._context = newContext;
  }

  // Add message to context
  addMessage(role: string, content: string): void {
    this._context.push({ role, content });
  }

  // Clear context
  clearContext(): void {
    this._context = [];
  }

  // AI chat completion với tham số linh hoạt
  async chat(options: ChatOptions = {}): Promise<ChatResponse> {
    const {
      prompt = this._prompt,
      tools = [],
      model = 'gpt-3.5-turbo',
      messages = this._context,
      tool_choice = 'auto',
      temperature = 0.7,
      max_tokens = 1000
    } = options;

    // Nếu có tools, xử lý tool calls
    if (tools && tools.length > 0) {
      const toolCallId = `call_${Date.now()}`;
      const selectedTool = tools[0]; // Chọn tool đầu tiên

      return {
        choices: [
          {
            message: {
              content: null,
              tool_calls: [
                {
                  id: toolCallId,
                  type: 'function',
                  function: {
                    name: selectedTool.function?.name || 'unknown_tool',
                    arguments: JSON.stringify({
                      prompt: prompt,
                      model: model,
                      temperature: temperature
                    })
                  }
                }
              ]
            },
            finish_reason: 'tool_calls'
          }
        ]
      };
    }

    // Nếu không có tools, tạo response dựa trên prompt
    let responseContent = '';

    if (prompt.toLowerCase().includes('time') || prompt.toLowerCase().includes('giờ')) {
      const timeResponses = [
        'The current time of day depends on your location. I can help you find the time if you tell me where you are!',
        "I'm here to help with time-related information. What specific time information do you need?",
        'Time of day varies by timezone. I can assist you with time calculations and conversions.',
        "I'm a helpful assistant that can provide information about time, dates, and scheduling."
      ];
      responseContent = timeResponses[Math.floor(Math.random() * timeResponses.length)];
    } else if (prompt.toLowerCase().includes('order') || prompt.toLowerCase().includes('đơn hàng')) {
      responseContent = `I can help you with order information. Your prompt was: "${prompt}". What specific order details do you need?`;
    } else if (prompt.toLowerCase().includes('weather') || prompt.toLowerCase().includes('thời tiết')) {
      responseContent = `I can provide weather information. Your prompt was: "${prompt}". What location are you interested in?`;
    } else {
      responseContent = `I received your prompt: "${prompt}". I'm here to help! What specific information do you need?`;
    }

    return {
      choices: [
        {
          message: {
            content: responseContent
          }
        }
      ]
    };
  }

  // Method để tạo completions (giống OpenAI API)
  completions = {
    create: async (options: ChatOptions): Promise<ChatResponse> => {
      return this.chat(options);
    }
  };
}
