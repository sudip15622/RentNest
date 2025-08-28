import { Body, Controller, Get, Post, Put, Query, Request, Param } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { ZodValidationPipe } from 'src/auth/pipes/zod-validation.pipe';
import { CreateInquiryDto, CreateInquirySchema } from './schemas/create-inquiry.schema';
import { UpdateInquiryStatusDto, UpdateInquiryStatusSchema } from './schemas/update-inquiry-status.schema';
import { Public } from 'src/auth/decorators/public.decorator';
import { InquiryStatus } from '../../generated/prisma';

@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Public()
  @Post("create")
  createInquiry(@Body(new ZodValidationPipe(CreateInquirySchema)) createInquiryDto: CreateInquiryDto) {
    return this.inquiryService.create(createInquiryDto);
  }

  @Get("my-inquiries")
  getUserInquiries(
    @Request() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string
  ) {
    const queryParams = {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
      status: status && Object.values(InquiryStatus).includes(status as InquiryStatus)
        ? (status as InquiryStatus)
        : undefined,
    };
    return this.inquiryService.findUserInquiries(req.user.id, queryParams);
  }

  @Put(":id/status")
  updateInquiryStatus(
    @Request() req: any,
    @Param('id') inquiryId: string,
    @Body(new ZodValidationPipe(UpdateInquiryStatusSchema)) body: UpdateInquiryStatusDto
  ) {
    return this.inquiryService.updateInquiryStatus(req.user.id, inquiryId, body.status);
  }
}
