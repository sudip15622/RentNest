import { Body, Controller, Post } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { ZodValidationPipe } from 'src/auth/pipes/zod-validation.pipe';
import { CreateInquiryDto, CreateInquirySchema } from './schemas/create-inquiry.schema';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Public()
  @Post("create")
  createInquiry(@Body(new ZodValidationPipe(CreateInquirySchema)) createInquiryDto: CreateInquiryDto) {
    return this.inquiryService.create(createInquiryDto);
  }
}
