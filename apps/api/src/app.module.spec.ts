import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should compile the module and resolve providers and controllers', () => {
    expect(module).toBeDefined();
    const controller = module.get<AppController>(AppController);
    const service = module.get<AppService>(AppService);
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});

