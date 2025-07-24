import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto, CreateListingSchema } from './schemas/create-listing.schema';
import { ZodValidationPipe } from 'src/auth/pipes/zod-validation.pipe';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post("create")
  createListing (@Request() req: any, @Body(new ZodValidationPipe(CreateListingSchema)) createListingDto: CreateListingDto) {
    // Pass user ID to service, which will find the associated owner profile
    return this.listingService.create(createListingDto, req.user.id);
  }

  @Public()
  @Get(":id")
  getListingById(@Param('id') id: string) {
    return this.listingService.findById(id);
  }
}
