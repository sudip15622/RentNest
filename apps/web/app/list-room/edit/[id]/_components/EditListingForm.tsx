"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useToast } from "../../../../../contexts/ToastContext";
import { useRouter } from "next/navigation";
import { getListingForEdit, updateListing } from "../../../../../lib/actions";
import InputWithoutLabel from "../../../../../components/ui/InputWithoutLabel";
import SelectWithoutLabel from "../../../../../components/ui/SelectWithoutLabel";
import TextareaWithoutLabel from "../../../../../components/ui/TextareaWithoutLabel";
import {
  FaCamera,
  FaUpload,
  FaTrash,
  FaImage,
  FaPlus,
  FaWifi,
  FaCar,
  FaTv,
  FaSnowflake,
  FaUtensils,
  FaShieldAlt,
} from "react-icons/fa";

interface EditListingFormProps {
  listingId: string;
}

interface RoomListingFormType {
  title: string;
  description: string;
  location: string;
  roomType: string;
  bedrooms: number;
  bathrooms: number;
  floorArea: string;
  amenities: string[];
  extraAmenities: string;
  photos: (File | string)[]; // Can be File (new) or string (existing URL)
  monthlyRent: number;
  securityDeposit: number;
  availableFrom: string;
  leaseDuration: string;
  utilitiesIncluded: boolean;
  internetIncluded: boolean;
  specialTerms: string;
}

export default function EditListingForm({ listingId }: EditListingFormProps) {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<RoomListingFormType>();

  const watchedPhotos = watch("photos");

  // Available amenities
  const availableAmenities = [
    { id: "wifi", label: "WiFi", icon: FaWifi },
    { id: "parking", label: "Parking", icon: FaCar },
    { id: "tv", label: "TV", icon: FaTv },
    { id: "ac", label: "AC", icon: FaSnowflake },
    { id: "kitchen", label: "Kitchen", icon: FaUtensils },
    { id: "security", label: "Security", icon: FaShieldAlt },
  ];

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        setLoading(true);
        const listing = await getListingForEdit(listingId);
        
        // Pre-populate form with existing data
        setValue("title", listing.title);
        setValue("description", listing.description);
        setValue("location", listing.location);
        setValue("roomType", listing.roomType);
        setValue("bedrooms", listing.bedrooms);
        setValue("bathrooms", listing.bathrooms);
        setValue("floorArea", listing.floorArea || "");
        setValue("amenities", listing.amenities || []);
        setValue("extraAmenities", listing.extraAmenities || "");
        setValue("monthlyRent", listing.monthlyRent);
        setValue("securityDeposit", listing.securityDeposit);
        setValue("availableFrom", listing.availableFrom ? new Date(listing.availableFrom).toISOString().split('T')[0] : "" as any);
        setValue("leaseDuration", listing.leaseDuration);
        setValue("utilitiesIncluded", listing.utilitiesIncluded);
        setValue("internetIncluded", listing.internetIncluded);
        setValue("specialTerms", listing.specialTerms || "");
        
        // Set existing photos
        if (listing.photos && listing.photos.length > 0) {
          setExistingPhotos(listing.photos);
          setValue("photos", listing.photos);
        } else {
          setValue("photos", []);
        }
        
      } catch (error) {
        console.error("Error fetching listing:", error);
        toast("Failed to load listing data. Please try again.", "error");
        router.push("/dashboard?tab=listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListingData();
  }, [listingId, setValue, toast, router]);

  // Photo handling functions
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const currentPhotos = watchedPhotos || [];
    const newFiles = Array.from(files).filter((file) => {
      return file.type.startsWith("image/");
    });

    // Limit to 10 photos total
    const remainingSlots = 10 - currentPhotos.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      setValue("photos", [...currentPhotos, ...filesToAdd]);
      clearErrors("photos");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileUpload(e.dataTransfer.files);
  };

  const removePhoto = (index: number) => {
    const currentPhotos = watchedPhotos || [];
    const newPhotos = currentPhotos.filter((_, i) => i !== index);
    setValue("photos", newPhotos);

    if (newPhotos.length > 0) {
      clearErrors("photos");
    }
  };

  const getImagePreview = (photo: File | string): string => {
    if (typeof photo === "string") {
      return photo; // Existing photo URL
    }
    // New file
    if (!photo.type.startsWith("image/")) {
      return "";
    }
    return URL.createObjectURL(photo);
  };

  const toggleAmenity = (amenityId: string) => {
    const currentAmenities = watch("amenities") || [];
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((id) => id !== amenityId)
      : [...currentAmenities, amenityId];

    setValue("amenities", newAmenities);
  };

  const onSubmit: SubmitHandler<RoomListingFormType> = async (data) => {
    try {
      setUpdating(true);
      
      // Check if photos are required
      if (!data.photos || data.photos.length === 0) {
        setError("photos", {
          type: "required",
          message: "At least one photo is required",
        });
        return;
      }

      // Handle photo uploads for new files
      let photoUrls: string[] = [];
      const newFiles: File[] = [];
      const existingUrls: string[] = [];

      // Separate new files from existing URLs
      data.photos.forEach((photo) => {
        if (typeof photo === "string") {
          existingUrls.push(photo);
        } else {
          newFiles.push(photo);
        }
      });

      // Upload new files if any
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => {
          formData.append("images", file);
        });
        formData.append("listingId", listingId);

        const uploadResponse = await fetch("/api/upload-images", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload images");
        }

        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload images");
        }

        photoUrls = [...existingUrls, ...uploadResult.urls];
      } else {
        photoUrls = existingUrls;
      }
      
      const result = await updateListing(listingId, {
        ...data,
        photos: photoUrls,
        availableFrom: new Date(data.availableFrom).toISOString(),
      });

      if (result.success) {
        toast("Listing updated successfully!", "success");
        router.push("/dashboard?tab=listings");
      } else {
        toast(result.message || "Failed to update listing", "error");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      toast("Failed to update listing. Please try again.", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--primary)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Listing</h1>
          <p className="text-gray-600">Update your room listing details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Title</label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ 
                    required: "Room title is required!",
                    maxLength: {
                      value: 100,
                      message: "Title must be less than 100 characters!",
                    },
                  }}
                  render={({ field }) => (
                    <InputWithoutLabel
                      field={field}
                      error={errors.title}
                      placeholder="e.g., Spacious Single Room in Thamel"
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ 
                    required: "Description is required!",
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters!",
                    },
                  }}
                  render={({ field }) => (
                    <TextareaWithoutLabel
                      field={field}
                      error={errors.description}
                      placeholder="Describe your room in detail..."
                      rows={4}
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Controller
                  name="location"
                  control={control}
                  rules={{ 
                    required: "Location is required!",
                    minLength: {
                      value: 5,
                      message: "Location must be at least 5 characters!",
                    },
                  }}
                  render={({ field }) => (
                    <InputWithoutLabel
                      field={field}
                      error={errors.location}
                      placeholder="e.g., Thamel, Kathmandu"
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <Controller
                    name="roomType"
                    control={control}
                    rules={{ required: "Room type is required!" }}
                    render={({ field }) => (
                      <SelectWithoutLabel
                        field={field}
                        error={errors.roomType}
                        placeholder="Select type"
                        options={[
                          "single",
                          "double",
                          "master",
                          "studio",
                          "shared"
                        ]}
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <Controller
                    name="bedrooms"
                    control={control}
                    rules={{ 
                      required: "Number of bedrooms is required!",
                      min: { value: 1, message: "At least 1 bedroom is required!" },
                      max: { value: 10, message: "Maximum 10 bedrooms allowed!" }
                    }}
                    render={({ field }) => (
                      <InputWithoutLabel
                        field={{
                          ...field,
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 1)
                        }}
                        error={errors.bedrooms}
                        placeholder="Number of bedrooms"
                        type="number"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <Controller
                    name="bathrooms"
                    control={control}
                    rules={{ 
                      required: "Number of bathrooms is required!",
                      min: { value: 1, message: "At least 1 bathroom is required!" },
                      max: { value: 10, message: "Maximum 10 bathrooms allowed!" }
                    }}
                    render={({ field }) => (
                      <InputWithoutLabel
                        field={{
                          ...field,
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 1)
                        }}
                        error={errors.bathrooms}
                        placeholder="Number of bathrooms"
                        type="number"
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor Area (Optional)</label>
                <Controller
                  name="floorArea"
                  control={control}
                  render={({ field }) => (
                    <InputWithoutLabel
                      field={field}
                      error={errors.floorArea}
                      placeholder="e.g., 120 sq ft"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Amenities</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableAmenities.map((amenity) => {
                  const Icon = amenity.icon;
                  const isSelected = watch("amenities")?.includes(amenity.id) || false;
                  
                  return (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center gap-2 ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{amenity.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Amenities (Optional)</label>
              <Controller
                name="extraAmenities"
                control={control}
                render={({ field }) => (
                  <TextareaWithoutLabel
                    field={field}
                    error={errors.extraAmenities}
                    placeholder="Any additional amenities or features..."
                    rows={3}
                  />
                )}
              />
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Photos</h2>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You can upload up to 10 photos. The first photo will be your main listing image.
              </p>

              {/* Upload Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[var(--primary)] transition-colors duration-200 bg-gray-50"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                    <FaUpload className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Drag & drop photos here
                    </p>
                    <p className="text-gray-600 mb-4">
                      or click to browse files
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-[var(--primary-dark)] transition-colors"
                    >
                      <FaCamera className="w-4 h-4" />
                      Choose Photos
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supports: JPG, PNG, WebP (Max 5MB per photo)
                  </p>
                </div>
              </div>

              {/* Photo Preview Grid */}
              {watchedPhotos && watchedPhotos.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Photos ({watchedPhotos.length}/10)
                    </h3>
                    {watchedPhotos.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {watchedPhotos.length === 1
                          ? "This will be your main photo"
                          : "First photo will be the main listing image"}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {watchedPhotos.map((photo, index) => {
                      const imageUrl = getImagePreview(photo);

                      return (
                        <div
                          key={`photo-${index}`}
                          className="relative group"
                        >
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-gray-300 transition-colors">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FaImage className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          
                          {/* Main Photo Badge */}
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-[var(--primary)] text-white text-xs px-2 py-1 rounded">
                              Main
                            </div>
                          )}
                          
                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}

                    {/* Add More Button */}
                    {watchedPhotos.length < 10 && (
                      <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                        <label
                          htmlFor="photo-upload-more"
                          className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-gray-600"
                        >
                          <FaPlus className="w-6 h-6" />
                          <span className="text-sm">Add More</span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                          id="photo-upload-more"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {errors.photos && (
                <p className="text-red-500 text-sm">{errors.photos.message}</p>
              )}
            </div>
          </div>

          {/* Pricing & Availability */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Pricing & Availability</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent (Rs.)</label>
                <Controller
                  name="monthlyRent"
                  control={control}
                  rules={{ 
                    required: "Monthly rent is required!",
                    min: { value: 1000, message: "Minimum rent should be Rs. 1000!" },
                    max: { value: 500000, message: "Maximum rent should be Rs. 500,000!" }
                  }}
                  render={({ field }) => (
                    <InputWithoutLabel
                      field={{
                        ...field,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseFloat(e.target.value) || 0)
                      }}
                      error={errors.monthlyRent}
                      placeholder="Enter monthly rent"
                      type="number"
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit (Rs.)</label>
                <Controller
                  name="securityDeposit"
                  control={control}
                  rules={{ 
                    required: "Security deposit is required!",
                    min: { value: 0, message: "Security deposit cannot be negative!" },
                    max: { value: 1000000, message: "Maximum security deposit should be Rs. 10,00,000!" }
                  }}
                  render={({ field }) => (
                    <InputWithoutLabel
                      field={{
                        ...field,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseFloat(e.target.value) || 0)
                      }}
                      error={errors.securityDeposit}
                      placeholder="Enter security deposit"
                      type="number"
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available From</label>
              <Controller
                name="availableFrom"
                control={control}
                rules={{ required: "Available from date is required!" }}
                render={({ field }) => (
                  <InputWithoutLabel
                    field={field}
                    error={errors.availableFrom}
                    placeholder="Select date"
                    type="date"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lease Duration</label>
              <Controller
                name="leaseDuration"
                control={control}
                rules={{ required: "Lease duration is required!" }}
                render={({ field }) => (
                  <SelectWithoutLabel
                    field={field}
                    error={errors.leaseDuration}
                    placeholder="Select duration"
                    options={[
                      "monthly",
                      "quarterly",
                      "biannually",
                      "yearly",
                      "flexible"
                    ]}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  {...register("utilitiesIncluded")}
                  type="checkbox"
                  id="utilities"
                  className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                />
                <label htmlFor="utilities" className="text-sm font-medium text-gray-700">
                  Utilities Included
                </label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  {...register("internetIncluded")}
                  type="checkbox"
                  id="internet"
                  className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                />
                <label htmlFor="internet" className="text-sm font-medium text-gray-700">
                  Internet Included
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Terms (Optional)</label>
              <Controller
                name="specialTerms"
                control={control}
                render={({ field }) => (
                  <TextareaWithoutLabel
                    field={field}
                    error={errors.specialTerms}
                    placeholder="Any special terms or conditions..."
                    rows={3}
                  />
                )}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {updating ? "Updating..." : "Update Listing"}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
