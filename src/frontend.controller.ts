import { Controller, Get, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { join } from 'path';

@Controller()
export class FrontendController {
  @Get()
  index(@Res() res: Response) {
    res.sendFile(join(process.cwd(), 'dist/frontend/index.html'));
  }

  @Get('assets/*')
  assets(@Req() req: Request, @Res() res: Response) {
    const filePath = join(process.cwd(), 'dist/frontend', req.url);
    res.sendFile(filePath);
  }
}
