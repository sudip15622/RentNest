"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import InputWithoutLabel from "../../../../components/ui/InputWithoutLabel";
import SelectWithoutLabel from "../../../../components/ui/SelectWithoutLabel";
import TextareaWithoutLabel from "../../../../components/ui/TextareaWithoutLabel";

import {
  FaHome,
  FaCamera,
  FaMoneyBillWave,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaWifi,
  FaCar,
  FaTv,
  FaSnowflake,
  FaUtensils,
  FaShieldAlt,
  FaUpload,
  FaTrash,
  FaImage,
  FaPlus,
  FaExclamationTriangle,
} from "react-icons/fa";

interface RoomListingFormType {
  title: string;
  description: string;
  address: string;
  city: string;
  district: string;
  roomType: string;
  bedrooms: number;
  bathrooms: number;
  floorArea: string;
  amenities: string[];
  extraAmenities: string;
  photos: File[];
  monthlyRent: number;
  securityDeposit: number;
  availableFrom: string;
  leaseDuration: string;
  utilitiesIncluded: string;
  internetIncluded: string;
  specialTerms: string;
  minimumStay: string;
  rules: string;
  preferences: string;
}

const AMENITIES_OPTIONS = [
  { id: "wifi", label: "WiFi", icon: FaWifi },
  { id: "parking", label: "Parking", icon: FaCar },
  { id: "tv", label: "TV", icon: FaTv },
  { id: "ac", label: "Air Conditioning", icon: FaSnowflake },
  { id: "kitchen", label: "Kitchen Access", icon: FaUtensils },
  { id: "security", label: "24/7 Security", icon: FaShieldAlt },
];

const NEPAL_DISTRICTS = [
  "Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Butwal", 
  "Biratnagar", "Birgunj", "Dharan", "Hetauda", "Janakpur", "Nepalgunj"
];

const ROOM_TYPES = [
  "Single Room", "Shared Room", "Studio", "1BHK Apartment"
];

const CreateListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState({
    accuracy: false,
    terms: false,
    communication: false,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RoomListingFormType>({
    defaultValues: {
      title: "",
      description: "",
      address: "",
      city: "",
      district: "",
      roomType: "Single Room",
      bedrooms: 1,
      bathrooms: 1,
      floorArea: "",
      amenities: [],
      extraAmenities: "",
      photos: [],
      monthlyRent: 0,
      securityDeposit: 0,
      availableFrom: "",
      leaseDuration: "",
      utilitiesIncluded: "",
      internetIncluded: "",
      specialTerms: "",
      minimumStay: "1 Month",
      rules: "",
      preferences: "",
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const watchedAmenities = watch("amenities");
  const watchedPhotos = watch("photos");

  const steps = [
    { number: 1, title: "Basic Info", icon: FaHome },
    { number: 2, title: "Photos", icon: FaCamera },
    { number: 3, title: "Pricing", icon: FaMoneyBillWave },
    { number: 4, title: "Review", icon: FaCheckCircle },
  ];

  const handleAmenityToggle = (amenityId: string) => {
    const currentAmenities = watchedAmenities || [];
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    
    setValue("amenities", newAmenities);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const currentPhotos = watchedPhotos || [];
    const newFiles = Array.from(files).filter(file => {
      // Only allow image files
      return file.type.startsWith('image/');
    });
    
    // Limit to 10 photos total
    const remainingSlots = 10 - currentPhotos.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    if (filesToAdd.length > 0) {
      setValue("photos", [...currentPhotos, ...filesToAdd]);
      // Clear any existing photo validation errors
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
    
    // Clear errors if there are still photos remaining
    if (newPhotos.length > 0) {
      clearErrors("photos");
    }
  };

  const getImagePreview = (file: File): string => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.warn('Invalid file type:', file.type, 'for file:', file.name);
      return '';
    }
    
    const url = URL.createObjectURL(file);
    console.log('Created preview URL for:', file.name, 'Size:', file.size, 'bytes', 'URL:', url);
    return url;
  };

  // Cleanup object URLs when component unmounts or photos change
  React.useEffect(() => {
    return () => {
      // Cleanup object URLs to prevent memory leaks
      if (watchedPhotos) {
        watchedPhotos.forEach(file => {
          const url = URL.createObjectURL(file);
          URL.revokeObjectURL(url);
        });
      }
    };
  }, [watchedPhotos]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof RoomListingFormType)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["title", "description", "address", "city", "district"];
        break;
      case 2:
        // Check if at least one photo is uploaded
        if (!watchedPhotos || watchedPhotos.length === 0) {
          // Use React Hook Form's setError to show validation error
          setError("photos", {
            type: "required",
            message: "At least one photo is required"
          });
          return;
        }
        fieldsToValidate = [];
        break;
      case 3:
        fieldsToValidate = ["monthlyRent", "securityDeposit", "availableFrom"];
        break;
      default:
        fieldsToValidate = [];
    }

    if (fieldsToValidate.length > 0) {
      const isStepValid = await trigger(fieldsToValidate);
      if (!isStepValid) {
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit: SubmitHandler<RoomListingFormType> = async (data) => {
    try {
      console.log("Form submitted:", data);
      
      // Check if we're on step 4 (review page)
      if (currentStep !== 4) {
        // If not on review page, go to next step instead of submitting
        await nextStep();
        return;
      }

      // Validate terms acceptance
      if (!termsAccepted.accuracy || !termsAccepted.terms || !termsAccepted.communication) {
        alert("⚠️ Please accept all terms and conditions before submitting your listing.");
        return;
      }

      // TODO: Implement API call to backend
      // const response = await fetch('/api/listings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert("🎉 Your room listing has been submitted successfully! You will be redirected to your dashboard.");
      
      // TODO: Redirect to dashboard or success page
      // router.push('/dashboard/listings');
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ There was an error submitting your listing. Please try again.");
    }
  };

  return (
    <main className="page-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4">
            List Your Room
          </h1>
          <p className="text-lg text-[var(--foreground-sec)] max-w-2xl mx-auto">
            Fill in the details below to create your room listing
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep >= step.number
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? (
                    <FaCheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`ml-2 font-medium hidden sm:block ${
                    currentStep >= step.number
                      ? "text-[var(--primary)]"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.number
                        ? "bg-[var(--primary)]"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-lg border border-[var(--border)] p-6 sm:p-8 mb-8">            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                  Basic Information
                </h2>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Room Title *
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    rules={{
                      required: "Room title is required!",
                      maxLength: {
                        value: 100,
                        message: "Title must be less than 100 characters!"
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <InputWithoutLabel 
                        field={field} 
                        error={fieldState.error} 
                        placeholder="e.g., Cozy Room in Kathmandu with WiFi"
                        type="text"
                      />
                    )}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Description *
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      required: "Description is required!",
                      minLength: {
                        value: 20,
                        message: "Description must be at least 20 characters!"
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <TextareaWithoutLabel 
                        field={field} 
                        error={fieldState.error} 
                        placeholder="Describe your room, its features, and what makes it special..."
                        rows={4}
                      />
                    )}
                  />
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="district"
                    control={control}
                    rules={{
                      required: "District is required!"
                    }}
                    render={({ field, fieldState }) => (
                      <div>
                        <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                          District *
                        </label>
                        <SelectWithoutLabel 
                          field={field} 
                          error={fieldState.error} 
                          options={["Select District", ...NEPAL_DISTRICTS]}
                          placeholder="Select District"
                        />
                      </div>
                    )}
                  />
                  <div>
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                      City/Area *
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{
                        required: "City/Area is required!"
                      }}
                      render={({ field, fieldState }) => (
                        <InputWithoutLabel 
                          field={field} 
                          error={fieldState.error} 
                          placeholder="e.g., Thamel, Baneshwor"
                          type="text"
                        />
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Full Address *
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    rules={{
                      required: "Full address is required!",
                      minLength: {
                        value: 5,
                        message: "Please enter a complete address!"
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <InputWithoutLabel 
                        field={field} 
                        error={fieldState.error} 
                        placeholder="Enter complete address"
                        type="text"
                      />
                    )}
                  />
                </div>

                {/* Room Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="roomType"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                          Room Type *
                        </label>
                        <SelectWithoutLabel 
                          field={field} 
                          error={fieldState.error} 
                          options={ROOM_TYPES}
                          placeholder="Select Room Type"
                        />
                      </div>
                    )}
                  />
                  <div>
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                      Bedrooms
                    </label>
                    <Controller
                      name="bedrooms"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputWithoutLabel 
                          field={{
                            ...field,
                            onChange: (e: any) => field.onChange(parseInt(e.target.value) || 1)
                          }} 
                          error={fieldState.error} 
                          placeholder="1"
                          type="number"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                      Bathrooms
                    </label>
                    <Controller
                      name="bathrooms"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputWithoutLabel 
                          field={{
                            ...field,
                            onChange: (e: any) => field.onChange(parseInt(e.target.value) || 1)
                          }} 
                          error={fieldState.error} 
                          placeholder="1"
                          type="number"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Floor Area */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Floor Area (sq ft)
                  </label>
                  <Controller
                    name="floorArea"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputWithoutLabel 
                        field={field} 
                        error={fieldState.error} 
                        placeholder="e.g., 150"
                        type="text"
                      />
                    )}
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-4">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {AMENITIES_OPTIONS.map((amenity) => (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                          watchedAmenities?.includes(amenity.id)
                            ? "border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]"
                            : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]/30"
                        }`}
                      >
                        <amenity.icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{amenity.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extra Amenities */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    Additional Amenities
                  </label>
                  <Controller
                    name="extraAmenities"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextareaWithoutLabel 
                        field={field} 
                        error={fieldState.error} 
                        placeholder="List any additional amenities not mentioned above (e.g., Balcony, Garden access, Gym, Laundry, etc.)"
                        rows={3}
                      />
                    )}
                  />
                  <p className="text-xs text-[var(--foreground-sec)] mt-1">
                    Separate multiple amenities with commas
                  </p>
                </div>
              </div>
            )}

          {/* Placeholder for other steps */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Upload Photos
              </h2>
              
              <div className="text-center mb-6">
                <p className="text-[var(--foreground-sec)] mb-2">
                  Add high-quality photos to showcase your room and attract more tenants
                </p>
                <p className="text-sm text-[var(--foreground-sec)]">
                  You can upload up to 10 photos. The first photo will be your main listing image.
                </p>
              </div>

              {/* Photo Upload Area */}
              <div className="space-y-4">
                {/* Upload Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--primary)] transition-colors duration-200 bg-gray-50"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                      <FaUpload className="w-8 h-8 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[var(--foreground)] mb-2">
                        Drag & drop photos here
                      </p>
                      <p className="text-[var(--foreground-sec)] mb-4">
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
                    <p className="text-xs text-[var(--foreground-sec)]">
                      Supports: JPG, PNG, WebP (Max 5MB per photo)
                    </p>
                  </div>
                </div>

                {/* Photo Preview Grid */}
                {watchedPhotos && watchedPhotos.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        Uploaded Photos ({watchedPhotos.length}/10)
                      </h3>
                      {watchedPhotos.length > 0 && (
                        <p className="text-sm text-[var(--foreground-sec)]">
                          {watchedPhotos.length === 1 ? "This will be your main photo" : "First photo will be the main listing image"}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {watchedPhotos.map((file, index) => {
                        const imageUrl = getImagePreview(file);
                        console.log(`Rendering image ${index + 1}:`, file.name, 'URL:', imageUrl);
                        
                        return (
                          <div key={`photo-${index}-${file.name}`} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-gray-300 transition-colors">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={`Room photo ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  style={{ 
                                    display: 'block',
                                    minHeight: '100%',
                                    minWidth: '100%'
                                  }}
                                  onLoad={(e) => {
                                    console.log('Image loaded successfully:', file.name);
                                  }}
                                  onError={(e) => {
                                    console.error('Image failed to load:', file.name, e);
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                  <FaImage className="w-8 h-8 text-gray-400" />
                                  <span className="text-xs text-gray-500 ml-2">Invalid image</span>
                                </div>
                              )}
                              
                              {/* Main Photo Badge */}
                              {index === 0 && (
                                <div className="absolute top-2 left-2 bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full font-semibold z-20">
                                  Main Photo
                                </div>
                              )}
                              
                              {/* Remove Button */}
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-20"
                                title="Remove photo"
                              >
                                <FaTrash className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <p className="text-xs text-[var(--foreground-sec)] mt-1 truncate" title={file.name}>
                              {file.name} ({Math.round(file.size / 1024)}KB)
                            </p>
                          </div>
                        );
                      })}
                      
                      {/* Add More Photos Button */}
                      {watchedPhotos.length < 10 && (
                        <div className="aspect-square rounded-lg border-2 border-dashed border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] transition-colors group cursor-pointer">
                          <label htmlFor="photo-upload-more" className="cursor-pointer w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-[var(--primary-light)] transition-colors">
                                <FaPlus className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary)] transition-colors" />
                              </div>
                              <p className="text-xs text-[var(--foreground-sec)]">Add More</p>
                            </div>
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

                {/* Error Message for Photos */}
                {errors.photos && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                      <FaExclamationTriangle className="w-4 h-4" />
                      {errors.photos.message}
                    </p>
                  </div>
                )}

                {/* Photo Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <FaCamera className="w-4 h-4" />
                    Photo Tips for Better Listings
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Take photos in good lighting (natural light works best)</li>
                    <li>• Show the room from different angles</li>
                    <li>• Include photos of bathroom, kitchen access if available</li>
                    <li>• Keep the room clean and organized</li>
                    <li>• Highlight unique features and amenities</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <FaMoneyBillWave className="w-16 h-16 text-[var(--primary)] mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                  Pricing & Availability
                </h2>
                <p className="text-[var(--foreground-sec)]">
                  Set your rental price and availability details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Rent */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--foreground)]">
                    Monthly Rent <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="monthlyRent"
                    control={control}
                    rules={{
                      required: "Monthly rent is required",
                      min: { value: 1000, message: "Minimum rent should be Rs. 1,000" },
                      max: { value: 100000, message: "Maximum rent should be Rs. 100,000" },
                    }}
                    render={({ field, fieldState }) => (
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-[var(--foreground-sec)] font-medium z-10">
                          Rs.
                        </span>
                        <InputWithoutLabel
                          field={{
                            ...field,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(Number(e.target.value) || 0)
                          }}
                          error={fieldState.error}
                          placeholder="e.g., 15000"
                          type="number"
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              paddingLeft: "2.5rem",
                            },
                          }}
                        />
                      </div>
                    )}
                  />
                </div>

                {/* Security Deposit */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--foreground)]">
                    Security Deposit <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="securityDeposit"
                    control={control}
                    rules={{
                      required: "Security deposit is required",
                      min: { value: 0, message: "Security deposit cannot be negative" },
                      max: { value: 200000, message: "Maximum security deposit should be Rs. 200,000" },
                    }}
                    render={({ field, fieldState }) => (
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-[var(--foreground-sec)] font-medium z-10">
                          Rs.
                        </span>
                        <InputWithoutLabel
                          field={{
                            ...field,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(Number(e.target.value) || 0)
                          }}
                          error={fieldState.error}
                          placeholder="e.g., 30000"
                          type="number"
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              paddingLeft: "2.5rem",
                            },
                          }}
                        />
                      </div>
                    )}
                  />
                </div>

                {/* Available From */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--foreground)]">
                    Available From <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="availableFrom"
                    control={control}
                    rules={{
                      required: "Available from date is required",
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return selectedDate >= today || "Available date cannot be in the past";
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputWithoutLabel
                        field={field}
                        error={fieldState.error}
                        type="date"
                        placeholder=""
                      />
                    )}
                  />
                </div>

                {/* Lease Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--foreground)]">
                    Preferred Lease Duration
                  </label>
                  <Controller
                    name="leaseDuration"
                    control={control}
                    render={({ field, fieldState }) => (
                      <SelectWithoutLabel
                        field={field}
                        error={fieldState.error}
                        options={[
                          "Select lease duration",
                          "No preference",
                          "3 months",
                          "6 months", 
                          "1 year",
                          "2 years",
                          "Long term (2+ years)"
                        ]}
                        placeholder="Select lease duration"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Additional Pricing Info */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                  Additional Costs & Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Utilities Included */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[var(--foreground)]">
                      Utilities Included
                    </label>
                    <Controller
                      name="utilitiesIncluded"
                      control={control}
                      render={({ field, fieldState }) => (
                        <SelectWithoutLabel
                          field={field}
                          error={fieldState.error}
                          options={[
                            "Select utilities option",
                            "All utilities included",
                            "Some utilities included", 
                            "No utilities included"
                          ]}
                          placeholder="Select utilities option"
                        />
                      )}
                    />
                  </div>

                  {/* Internet Included */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[var(--foreground)]">
                      Internet/WiFi
                    </label>
                    <Controller
                      name="internetIncluded"
                      control={control}
                      render={({ field, fieldState }) => (
                        <SelectWithoutLabel
                          field={field}
                          error={fieldState.error}
                          options={[
                            "Select internet option",
                            "Included in rent",
                            "Available (separate cost)",
                            "Not available"
                          ]}
                          placeholder="Select internet option"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Special Terms */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--foreground)]">
                    Special Terms or Conditions
                  </label>
                  <Controller
                    name="specialTerms"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextareaWithoutLabel
                        field={field}
                        error={fieldState.error}
                        placeholder="Any special conditions, restrictions, or additional information about the rental terms..."
                        rows={3}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <FaMoneyBillWave className="w-4 h-4" />
                  Pricing Summary
                </h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <div className="flex justify-between">
                    <span>Monthly Rent:</span>
                    <span className="font-semibold">
                      Rs. {watch("monthlyRent")?.toLocaleString() || "0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit:</span>
                    <span className="font-semibold">
                      Rs. {watch("securityDeposit")?.toLocaleString() || "0"}
                    </span>
                  </div>
                  <div className="border-t border-blue-300 pt-1 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Move-in Cost:</span>
                      <span>
                        Rs. {((watch("monthlyRent") || 0) + (watch("securityDeposit") || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center">
                <FaCheckCircle className="w-16 h-16 text-[var(--primary)] mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                  Review Your Listing
                </h2>
                <p className="text-[var(--foreground-sec)]">
                  Please review all the details before submitting your room listing
                </p>
              </div>

              {/* Review Sections */}
              <div className="space-y-6">
                {/* Basic Information Review */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaHome className="w-5 h-5 text-[var(--primary)]" />
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">Basic Information</h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="ml-auto text-sm text-[var(--primary)] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-[var(--foreground-sec)]">Title:</span>
                      <p className="text-[var(--foreground)]">{watch("title") || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--foreground-sec)]">Room Type:</span>
                      <p className="text-[var(--foreground)]">{watch("roomType")}</p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--foreground-sec)]">Location:</span>
                      <p className="text-[var(--foreground)]">{watch("address")}, {watch("city")}, {watch("district")}</p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--foreground-sec)]">Size:</span>
                      <p className="text-[var(--foreground)]">{watch("bedrooms")} bedroom(s), {watch("bathrooms")} bathroom(s)</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-[var(--foreground-sec)]">Description:</span>
                      <p className="text-[var(--foreground)] mt-1">{watch("description") || "Not specified"}</p>
                    </div>
                    {watch("floorArea") && (
                      <div>
                        <span className="font-medium text-[var(--foreground-sec)]">Floor Area:</span>
                        <p className="text-[var(--foreground)]">{watch("floorArea")}</p>
                      </div>
                    )}
                    {watch("amenities") && watch("amenities").length > 0 && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-[var(--foreground-sec)]">Amenities:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {watch("amenities").map((amenity) => (
                            <span key={amenity} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {watch("extraAmenities") && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-[var(--foreground-sec)]">Additional Amenities:</span>
                        <p className="text-[var(--foreground)] mt-1">{watch("extraAmenities")}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Photos Review */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCamera className="w-5 h-5 text-[var(--primary)]" />
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">Photos ({watch("photos")?.length || 0})</h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="ml-auto text-sm text-[var(--primary)] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  {watch("photos") && watch("photos").length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {watch("photos").slice(0, 6).map((file, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                          <img
                            src={getImagePreview(file)}
                            alt={`Room photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {index === 0 && (
                            <div className="absolute top-1 left-1 bg-[var(--primary)] text-white text-xs px-1 py-0.5 rounded">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                      {watch("photos").length > 6 && (
                        <div className="aspect-square rounded-lg bg-gray-100 border flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{watch("photos").length - 6} more</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-500 text-sm">No photos uploaded</p>
                  )}
                </div>

                {/* Pricing Review */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaMoneyBillWave className="w-5 h-5 text-[var(--primary)]" />
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">Pricing & Availability</h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="ml-auto text-sm text-[var(--primary)] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-[var(--foreground-sec)]">Monthly Rent:</span>
                      <p className="text-[var(--foreground)] font-semibold text-lg">
                        Rs. {watch("monthlyRent")?.toLocaleString() || "0"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--foreground-sec)]">Security Deposit:</span>
                      <p className="text-[var(--foreground)] font-semibold text-lg">
                        Rs. {watch("securityDeposit")?.toLocaleString() || "0"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--foreground-sec)]">Available From:</span>
                      <p className="text-[var(--foreground)]">
                        {watch("availableFrom") ? new Date(watch("availableFrom")).toLocaleDateString() : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--foreground-sec)]">Lease Duration:</span>
                      <p className="text-[var(--foreground)]">{watch("leaseDuration") || "Not specified"}</p>
                    </div>
                    {watch("utilitiesIncluded") && (
                      <div>
                        <span className="font-medium text-[var(--foreground-sec)]">Utilities:</span>
                        <p className="text-[var(--foreground)]">{watch("utilitiesIncluded")}</p>
                      </div>
                    )}
                    {watch("internetIncluded") && (
                      <div>
                        <span className="font-medium text-[var(--foreground-sec)]">Internet:</span>
                        <p className="text-[var(--foreground)]">{watch("internetIncluded")}</p>
                      </div>
                    )}
                    {watch("specialTerms") && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-[var(--foreground-sec)]">Special Terms:</span>
                        <p className="text-[var(--foreground)] mt-1">{watch("specialTerms")}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Total Cost Summary */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-blue-900">Total Move-in Cost:</span>
                        <span className="text-2xl font-bold text-blue-900">
                          Rs. {((watch("monthlyRent") || 0) + (watch("securityDeposit") || 0)).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">
                        Includes first month's rent + security deposit
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Terms and Conditions</h3>
                  <div className="space-y-3 text-sm text-[var(--foreground-sec)]">
                    <label className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        className="mt-1" 
                        checked={termsAccepted.accuracy}
                        onChange={(e) => setTermsAccepted(prev => ({ ...prev, accuracy: e.target.checked }))}
                        required 
                      />
                      <span>
                        I confirm that all the information provided is accurate and up-to-date. I understand that false information may result in my listing being removed.
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        className="mt-1" 
                        checked={termsAccepted.terms}
                        onChange={(e) => setTermsAccepted(prev => ({ ...prev, terms: e.target.checked }))}
                        required 
                      />
                      <span>
                        I agree to RentNest's Terms of Service and Privacy Policy. I understand the platform fees and commission structure.
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        className="mt-1" 
                        checked={termsAccepted.communication}
                        onChange={(e) => setTermsAccepted(prev => ({ ...prev, communication: e.target.checked }))}
                        required 
                      />
                      <span>
                        I commit to responding to inquiries promptly and maintaining professional communication with potential tenants.
                      </span>
                    </label>
                  </div>
                  {(!termsAccepted.accuracy || !termsAccepted.terms || !termsAccepted.communication) && (
                    <p className="text-red-500 text-sm mt-3">
                      Please accept all terms and conditions to continue
                    </p>
                  )}
                </div>

                {/* Publishing Options */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Publishing Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="radio" name="publishOption" value="immediate" defaultChecked />
                      <div>
                        <span className="font-medium text-[var(--foreground)]">Publish Immediately</span>
                        <p className="text-sm text-[var(--foreground-sec)]">Your listing will be live and visible to potential tenants right away</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="radio" name="publishOption" value="draft" />
                      <div>
                        <span className="font-medium text-[var(--foreground)]">Save as Draft</span>
                        <p className="text-sm text-[var(--foreground-sec)]">Save your listing and publish it later from your dashboard</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-[var(--border)] text-[var(--foreground)] hover:bg-gray-50"
              }`}
            >
              <FaArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Next Step
                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="relative">
                {(!termsAccepted.accuracy || !termsAccepted.terms || !termsAccepted.communication) && (
                  <p className="absolute -top-6 left-0 text-red-500 text-xs">
                    Please accept terms!
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !termsAccepted.accuracy || !termsAccepted.terms || !termsAccepted.communication}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateListingForm;
