import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class FrontendController {
  @Get()
  index(@Res() res: Response) {
    res.sendFile(join(process.cwd(), 'index.html'));
  }

  @Get('styles.css')
  styles(@Res() res: Response) {
    res.sendFile(join(process.cwd(), 'styles.css'));
  }

  @Get('main.js')
  script(@Res() res: Response) {
    res.sendFile(join(process.cwd(), 'main.js'));
  }
}
