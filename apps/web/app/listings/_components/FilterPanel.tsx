"use client";
import React from "react";
import {
  FaDollarSign,
  FaBed,
  FaHome,
  FaSort,
  FaWifi,
  FaCar,
  FaTv,
  FaSnowflake,
} from "react-icons/fa";
import {
  ListingFilterState,
  ROOM_TYPES,
  SORT_OPTIONS,
  AMENITIES,
  NEPAL_CITIES,
} from "../_types";
import {
  TextField,
  Select as MuiSelect,
  FormControl,
  MenuItem,
} from "@mui/material";

interface FilterPanelProps {
  filters: ListingFilterState;
  onFilterChange: (filters: Partial<ListingFilterState>) => void;
}

const amenitiesList = AMENITIES;

const amenityIcons = {
  wifi: FaWifi,
  parking: FaCar,
  tv: FaTv,
  ac: FaSnowflake,
  kitchen: FaHome,
  laundry: FaHome,
  furnished: FaHome,
  security: FaHome,
};

const sortOptions = SORT_OPTIONS;

const cities = NEPAL_CITIES;

export default function FilterPanel({
  filters,
  onFilterChange,
}: FilterPanelProps) {
  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];
    onFilterChange({ amenities: newAmenities });
  };

  return (
    <div className="backdrop-blur-sm rounded-xl p-6 border-1 border-[var(--border)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-3">
            <FaDollarSign className="inline mr-2" size={12} />
            Price Range
          </label>
          <div className="space-y-3">
            <div>
              <TextField
                fullWidth
                placeholder="Min rent"
                value={filters.minRent?.toString() || ""}
                onChange={(e) =>
                  onFilterChange({ minRent: parseInt(e.target.value) || undefined })
                }
                type="number"
                size="small"
                // fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#a16207",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#a16207",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    "&::placeholder": {
                      color: "var(--foreground-sec)",
                      opacity: 1,
                    },
                  },
                }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                placeholder="Max rent"
                value={filters.maxRent?.toString() || ""}
                onChange={(e) =>
                  onFilterChange({
                    maxRent: parseInt(e.target.value) || undefined,
                  })
                }
                type="number"
                size="small"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#a16207",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#a16207",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    "&::placeholder": {
                      color: "var(--foreground-sec)",
                      opacity: 1,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Location & Room Details */}
        <div>
          <label className="block text-sm font-medium mb-3">
            <FaHome className="inline mr-2" size={12} />
            Location & Type
          </label>
          <div className="space-y-3">
            <div>
              <FormControl fullWidth size="small">
                <MuiSelect
                  value={filters.city || ""}
                  onChange={(e) => onFilterChange({ city: e.target.value || undefined })}
                  displayEmpty
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bab9b6",
                      borderRadius: "8px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "& .MuiSelect-select": {
                      color: filters.city ? "#313330" : "#5f5e5e",
                      backgroundColor: "transparent",
                    },
                    "& .MuiSvgIcon-root": {
                      color: filters.city ? "#313330" : "#5f5e5e",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#f2f1ed",
                        border: "1px solid #bab9b6",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "& .MuiMenuItem-root": {
                          color: "#313330",
                          "&:hover": {
                            backgroundColor: "#f3e8ab",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#f3e8ab",
                            //   color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#f3e8ab",
                            },
                          },
                          "&.Mui-focusVisible": {
                            backgroundColor: "transparent",
                          },
                        },
                      },
                    },
                    autoFocus: false,
                  }}
                >
                  <MenuItem value="" disabled>
                    All Cities
                  </MenuItem>
                  {cities.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth size="small">
                <MuiSelect
                  value={filters.roomType || ""}
                  onChange={(e) =>
                    onFilterChange({
                      roomType:
                        (e.target.value as any) === ""
                          ? undefined
                          : (e.target.value as
                              | "single"
                              | "double"
                              | "master"
                              | "studio"
                              | "shared"),
                    })
                  }
                  displayEmpty
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bab9b6",
                      borderRadius: "8px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "& .MuiSelect-select": {
                      color: filters.roomType ? "#313330" : "#5f5e5e",
                      backgroundColor: "transparent",
                    },
                    "& .MuiSvgIcon-root": {
                      color: filters.roomType ? "#313330" : "#5f5e5e",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#f2f1ed",
                        border: "1px solid #bab9b6",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "& .MuiMenuItem-root": {
                          color: "#313330",
                          "&:hover": {
                            backgroundColor: "#f3e8ab",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#f3e8ab",
                            //   color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#f3e8ab",
                            },
                          },
                          "&.Mui-focusVisible": {
                            backgroundColor: "transparent",
                          },
                        },
                      },
                    },
                    autoFocus: false,
                  }}
                >
                  <MenuItem value="" disabled>
                    All Room Types
                  </MenuItem>
                  {ROOM_TYPES.map((roomType) => (
                    <MenuItem key={roomType.value} value={roomType.value}>
                      {roomType.label}
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </div>
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div>
          <label className="block text-sm font-medium mb-3">
            <FaBed className="inline mr-2" size={12} />
            Rooms & Baths
          </label>
          <div className="space-y-3">
            <div>
              <FormControl fullWidth size="small">
                <MuiSelect
                  value={
                    filters.minBedrooms === undefined
                      ? ""
                      : String(filters.minBedrooms)
                  }
                  onChange={(e) =>
                    onFilterChange({
                      minBedrooms:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                    })
                  }
                  displayEmpty
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bab9b6",
                      borderRadius: "8px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "& .MuiSelect-select": {
                      color: filters.minBedrooms ? "#313330" : "#5f5e5e",
                      backgroundColor: "transparent",
                    },
                    "& .MuiSvgIcon-root": {
                      color: filters.minBedrooms ? "#313330" : "#5f5e5e",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#f2f1ed",
                        border: "1px solid #bab9b6",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "& .MuiMenuItem-root": {
                          color: "#313330",
                          "&:hover": {
                            backgroundColor: "#f3e8ab",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#f3e8ab",
                            //   color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#f3e8ab",
                            },
                          },
                          "&.Mui-focusVisible": {
                            backgroundColor: "transparent",
                          },
                        },
                      },
                    },
                    autoFocus: false,
                  }}
                >
                  <MenuItem value="">Any Bedrooms</MenuItem>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}+ BR
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth size="small">
                <MuiSelect
                  value={
                    filters.minBathrooms === undefined
                      ? ""
                      : String(filters.minBathrooms)
                  }
                  onChange={(e) =>
                    onFilterChange({
                      minBathrooms:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                    })
                  }
                  displayEmpty
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bab9b6",
                      borderRadius: "8px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "& .MuiSelect-select": {
                      color: filters.minBathrooms ? "#313330" : "#5f5e5e",
                      backgroundColor: "transparent",
                    },
                    "& .MuiSvgIcon-root": {
                      color: filters.minBathrooms ? "#313330" : "#5f5e5e",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#f2f1ed",
                        border: "1px solid #bab9b6",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "& .MuiMenuItem-root": {
                          color: "#313330",
                          "&:hover": {
                            backgroundColor: "#f3e8ab",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#f3e8ab",
                            //   color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#f3e8ab",
                            },
                          },
                          "&.Mui-focusVisible": {
                            backgroundColor: "transparent",
                          },
                        },
                      },
                    },
                    autoFocus: false,
                  }}
                >
                  <MenuItem value="">Any Bathrooms</MenuItem>
                  {[1, 2, 3, 4].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}+ BR
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </div>
          </div>
        </div>

        {/* Amenities & Sort */}
        <div>
          <label className="block text-sm font-medium mb-3">
            <FaSort className="inline mr-2" size={12} />
            Amenities & Sort
          </label>
          <div className="space-y-3">
            <div>
              <FormControl fullWidth size="small">
                <MuiSelect
                  value={(() => {
                    // Find the current sort option based on sortBy and sortOrder
                    const currentOption = sortOptions.find(
                      (option) =>
                        option.value === (filters.sortBy || "createdAt") &&
                        option.order === (filters.sortOrder || "desc")
                    );
                    return currentOption?.id || "latest";
                  })()}
                  onChange={(e) => {
                    const selectedOption = sortOptions.find(
                      (option) => option.id === e.target.value
                    );
                    if (selectedOption) {
                      onFilterChange({
                        sortBy: selectedOption.value as
                          | "createdAt"
                          | "monthlyRent"
                          | "viewCount",
                        sortOrder: selectedOption.order as "asc" | "desc",
                      });
                    }
                  }}
                  displayEmpty
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bab9b6",
                      borderRadius: "8px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a16207",
                    },
                    "& .MuiSelect-select": {
                      color: filters.city ? "#313330" : "#5f5e5e",
                      backgroundColor: "transparent",
                    },
                    "& .MuiSvgIcon-root": {
                      color: filters.city ? "#313330" : "#5f5e5e",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#f2f1ed",
                        border: "1px solid #bab9b6",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "& .MuiMenuItem-root": {
                          color: "#313330",
                          "&:hover": {
                            backgroundColor: "#f3e8ab",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#f3e8ab",
                            //   color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#f3e8ab",
                            },
                          },
                          "&.Mui-focusVisible": {
                            backgroundColor: "transparent",
                          },
                        },
                      },
                    },
                    autoFocus: false,
                  }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((amenity) => {
                const Icon =
                  amenityIcons[amenity.value as keyof typeof amenityIcons] ||
                  FaHome;
                const isSelected =
                  filters.amenities?.includes(amenity.value) || false;
                return (
                  <button
                    key={amenity.value}
                    onClick={() => handleAmenityToggle(amenity.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                      isSelected
                        ? "bg-[var(--primary)] text-[var(--background)]"
                        : "border-1 border-[var(--border)] hover:bg-[var(--primary-light)]"
                    }`}
                  >
                    <Icon size={12} />
                    {amenity.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
