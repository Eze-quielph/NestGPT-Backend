import { Injectable } from '@nestjs/common';
import { orthographyCheckuseCase } from './use-cases';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPEN_API_AI,
  });

  // Use Case: Orthography Check
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckuseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }
}
