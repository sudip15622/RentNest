"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaUpload,
  FaTrash,
  FaUndo,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { updateUserDetails } from "../../../lib/actions";
import { useToast } from "../../../contexts/ToastContext";
import { UpdateUserType } from "../../../lib/types";

interface ProfileFormData {
  name: string;
  email: string;
  phoneNumber: string;
  propertyAddress: string;
  citizenshipNumber: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileSettingsProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    phoneNumber: string;
    citizenshipNumber: string;
    propertyAddress: string;
  };
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const [imageUploading, setImageUploading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isValid, isSubmitting, errors, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      propertyAddress: user.propertyAddress,
      citizenshipNumber: user.citizenshipNumber,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    watch: watchPassword,
    formState: {
      isSubmitting: isPasswordSubmitting,
      errors: passwordErrors,
      isDirty: isPasswordDirty,
    },
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    if (isSubmitting) return;

    try {
      const response = await updateUserDetails(data);
      if (!response) {
        toast("Something went wrong, Please try again!", "error");
        return;
      }
      if (response.success) {
        toast("Profile update successfull!", "success");
        return;
      } else {
        if (response.errors) {
          // Iterate through each error field and set the error
          Object.entries(response.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages?.length > 0) {
              // Only set error if field exists in our signup form
              if (["name", "email", "image", "phoneNumber", "propertyAddress", "citizenshipNumber"].includes(field)) {
                setError(field as keyof Omit<UpdateUserType, "image">, {
                  type: "server",
                  message: messages[0], // Show the first error message
                });
              }
            }
          });

          return;
        }

        if (response.message) {
          toast(response.message, "error");
          return;
        }
      }

      // Show success message (you can implement toast here)
      alert("Profile updated successfully!");

      // Reset form dirty state after successful save
      reset(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Handle error
      alert("Failed to update profile. Please try again.");
    }
  };

  const onPasswordSubmit: SubmitHandler<PasswordFormData> = async (data) => {
    if (isPasswordSubmitting) return;

    try {
      // TODO: Replace with actual API call
      console.log("Password change data:", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      alert("Password changed successfully!");

      // Reset password form
      resetPassword();
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("Failed to change password. Please try again.");
    }
  };

  const handleResetChanges = () => {
    if (!isDirty) return;

    if (
      confirm(
        "Are you sure you want to reset all changes? This will discard any unsaved modifications."
      )
    ) {
      reset({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        propertyAddress: user.propertyAddress,
        citizenshipNumber: user.citizenshipNumber,
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      // TODO: Implement actual image upload
      console.log("Uploading image:", file);

      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // TODO: Implement actual account deletion API call
      console.log("Deleting account for user:", user.id);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(
        "Account deleted successfully. You will be redirected to the homepage."
      );
      // Redirect logic would go here
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Image Section */}
      <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
          Profile Picture
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={user.image || "/default_user.png"}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[var(--border)]"
            />
            {imageUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-medium text-[var(--foreground)] mb-2">
              Change Profile Picture
            </h3>
            <p className="text-sm text-[var(--foreground-sec)] mb-4">
              Choose a photo that represents you well. It will be visible to
              other users.
            </p>

            <label className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors cursor-pointer">
              <FaUpload size={14} />
              Upload New Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={imageUploading}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Profile Information Form */}
      <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
          Profile Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Full name is required!",
                  pattern: {
                    value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                    message:
                      "Name must contain only letters and a single space between words!",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    field={field}
                    error={fieldState.error}
                    label=""
                    type="text"
                  />
                )}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email address is required!",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address!",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    field={field}
                    error={fieldState.error}
                    label=""
                    type="email"
                  />
                )}
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: "Phone number is required!",
                  pattern: {
                    value: /^(98|97)[0-9]{8}$/,
                    message:
                      "Invalid phone number! Must start with 98 or 97 and be 10 digits",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    field={field}
                    error={fieldState.error}
                    label=""
                    type="tel"
                  />
                )}
              />
            </div>

            {/* Property Address Field */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Property Address <span className="text-red-500">*</span>
              </label>
              <Controller
                name="propertyAddress"
                control={control}
                rules={{
                  required: "Property address is required!",
                  minLength: {
                    value: 10,
                    message: "Property address must be at least 10 characters",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    field={field}
                    error={fieldState.error}
                    label=""
                    type="text"
                  />
                )}
              />
            </div>
          </div>

          {/* Citizenship Number Field - Full Width */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Citizenship Number <span className="text-red-500">*</span>
            </label>
            <Controller
              name="citizenshipNumber"
              control={control}
              rules={{
                required: "Citizenship number is required!",
                pattern: {
                  value: /^[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{5}$/,
                  message: "Citizenship number format: XX-XX-XX-XXXXX",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  field={field}
                  error={fieldState.error}
                  label=""
                  type="text"
                />
              )}
            />
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleResetChanges}
              disabled={!isDirty}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <FaUndo size={14} />
              Reset
            </button>

            <Button
              type="submit"
              isSubmitting={isSubmitting}
              icon={<FaSave size={14} />}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
          Change Password
        </h2>

        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Password Field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Controller
                  name="currentPassword"
                  control={passwordControl}
                  rules={{
                    required: "Current password is required!",
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      field={field}
                      error={fieldState.error}
                      label=""
                      type={showCurrentPassword ? "text" : "password"}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Controller
                  name="newPassword"
                  control={passwordControl}
                  rules={{
                    required: "New password is required!",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message:
                        "Password must contain uppercase, lowercase, number, and special character",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      field={field}
                      error={fieldState.error}
                      label=""
                      type={showNewPassword ? "text" : "password"}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Controller
                  name="confirmPassword"
                  control={passwordControl}
                  rules={{
                    required: "Please confirm your new password!",
                    validate: (value) => {
                      const newPassword = watchPassword("newPassword");
                      return value === newPassword || "Passwords do not match!";
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      field={field}
                      error={fieldState.error}
                      label=""
                      type={showConfirmPassword ? "text" : "password"}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Password Change Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => resetPassword()}
              disabled={!isPasswordDirty}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <FaUndo size={14} />
              Reset
            </button>

            <Button
              type="submit"
              isSubmitting={isPasswordSubmitting}
              icon={<FaKey size={14} />}
            >
              {isPasswordSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </form>
      </div>

      {/* Account Management */}
      <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
          Account Management
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FaTrash size={14} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
