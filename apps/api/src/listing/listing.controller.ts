import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto, CreateListingSchema } from './schemas/create-listing.schema';
import { FilterListingDto, FilterListingSchema } from './schemas/filter-listing.schema';
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
  @Get("filter")
  getFilteredListings(@Query(new ZodValidationPipe(FilterListingSchema)) filterDto: FilterListingDto) {
    return this.listingService.findFiltered(filterDto);
  }

  @Public()
  @Get("featured")
  getFeaturedListings(@Query('limit') limit?: string) {
    const listingLimit = limit ? parseInt(limit, 10) : 6;
    return this.listingService.findFeatured(listingLimit);
  }

  @Public()
  @Get(":id")
  getListingById(@Param('id') id: string) {
    return this.listingService.findById(id);
  }
}
