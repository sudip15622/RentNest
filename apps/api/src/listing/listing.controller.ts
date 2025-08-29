import { Body, Controller, Get, Param, Post, Put, Delete, Query, Request } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto, CreateListingSchema } from './schemas/create-listing.schema';
import { UpdateListingDto, UpdateListingSchema } from './schemas/update-listing.schema';
import { FilterListingDto, FilterListingSchema } from './schemas/filter-listing.schema';
import { ZodValidationPipe } from 'src/auth/pipes/zod-validation.pipe';
import { Public } from 'src/auth/decorators/public.decorator';
import { ListingStatus } from '../../generated/prisma';

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

  @Get("my-listings")
getUserListings(
  @Request() req: any, 
  @Query('page') page?: string,
  @Query('limit') limit?: string,
  @Query('status') status?: string,
  @Query('includeInactive') includeInactive?: string
) {
  const queryParams = {
    page: page ? parseInt(page, 10) : 1,
    limit: limit ? parseInt(limit, 10) : 10,
    status: status && Object.values(ListingStatus).includes(status as ListingStatus) 
      ? (status as ListingStatus) 
      : undefined,
    includeInactive: includeInactive === 'true' ? true : false // Only include inactive if explicitly requested
  };
  return this.listingService.findUserListings(req.user.id, queryParams);
}

  @Get(":id/edit")
  getListingForEdit(@Param('id') id: string, @Request() req: any) {
    return this.listingService.findByIdForEdit(id, req.user.id);
  }

  @Public()
  @Get(":id")
  getListingById(@Param('id') id: string) {
    return this.listingService.findById(id);
  }

  @Put(":id")
  updateListing(
    @Param('id') id: string,
    @Request() req: any,
    @Body(new ZodValidationPipe(UpdateListingSchema)) updateListingDto: UpdateListingDto
  ) {
    return this.listingService.updateListing(id, updateListingDto, req.user.id);
  }

  @Put(":id/toggle-status")
  toggleListingStatus(@Param('id') id: string, @Request() req: any) {
    return this.listingService.toggleListingStatus(id, req.user.id);
  }

  @Put(":id/restore")
  restoreListing(@Param('id') id: string, @Request() req: any) {
    return this.listingService.restoreListing(id, req.user.id);
  }

  @Delete(":id")
  deleteListing(
    @Param('id') id: string, 
    @Request() req: any,
    @Query('hard') hardDelete?: string
  ) {
    const isHardDelete = hardDelete === 'true';
    return this.listingService.deleteListing(id, req.user.id, isHardDelete);
  }
}
