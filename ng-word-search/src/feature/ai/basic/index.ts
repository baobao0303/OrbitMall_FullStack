// Puter.js Simulation - Free AI without API keys
// https://developer.puter.com/tutorials/free-unlimited-openai-api/

class Puter {
  ai = {
    chat: async (options: any) => {
      // Simulate AI response
      const responses = [
        'Mount Everest is approximately 29,029 feet (8,848 meters) tall, making it the highest peak above sea level on Earth.',
        'Mount Everest stands at 29,029 feet (8,848 meters) above sea level, located in the Mahalangur Himal sub-range of the Himalayas.',
        "The height of Mount Everest is 29,029 feet or 8,848 meters, making it the world's highest mountain above sea level."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      return {
        choices: [
          {
            message: {
              content: randomResponse
            }
          }
        ]
      };
    }
  };
}

const puter = new Puter();

async function main() {
  try {
    const response = await puter.ai.chat({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'How tall is mount Everest?'
        }
      ]
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();

export default {
  chat: main,
  puter
};
