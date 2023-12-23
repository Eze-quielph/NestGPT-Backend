/* eslint-disable prettier/prettier */

import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckuseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Te seran proveidos textos en español con posibles errores ortográficos y gramaticales, 
            Las palabras usadas deben existir en el diccionario de la RAE,
          Debes de responder en formato JSON
           tu tarea es corregirlos y retornar información soluciones, tambien debes de dar un porcentaje de acierto por el usuario,  
           
           Si no hay errores,debes de retornar un mensaje de felicitaciones 
           
           Ejemplo de salida:
           {
            userScore: number,
            errors: string[], // ['error -> solucion']
            message: string, // usa emojis y texto para felicitar al usuario
           }`,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 120,
    temperature: 0.3,
    //Si no es soportado, cambiar modelo o comentar esto.
   /*  response_format: {
      type: 'json_object',
    }, */
  });

  console.log(completion.choices[0]);
  const jsonResp = JSON.parse(completion.choices[0].message.content);
  return jsonResp;
};
