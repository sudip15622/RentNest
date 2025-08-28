"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardStats from "./DashboardStats";
import MyListings from "./MyListings";
import MyInquiries from "./MyInquiries";
import ProfileSettings from "./ProfileSettings";

type TabType = "overview" | "listings" | "inquiries" | "profile";

interface SessionUser {
  id: string;
  image: string;
}

interface FullUser {
  id: string;
  name: string;
  email: string;
  image: string;
  phoneNumber: string;
  citizenshipNumber: string;
  propertyAddress: string;
}

interface DashboardClientProps {
  user: FullUser;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullUser, setFullUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Get active tab from URL or default to overview
  const activeTab = (searchParams.get("tab") as TabType) || "overview";

  // Handle tab change with URL update
  const handleTabChange = (tab: TabType) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`/dashboard?${params.toString()}`);
  };

  // Fetch full user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFullUser(user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading || !fullUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <DashboardStats userId={fullUser.id} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MyListings userId={fullUser.id} isPreview />
              <MyInquiries userId={fullUser.id} isPreview />
            </div>
          </div>
        );
      case "listings":
        return <MyListings userId={fullUser.id} />;
      case "inquiries":
        return <MyInquiries userId={fullUser.id} />;
      case "profile":
        return <ProfileSettings user={fullUser} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpen={() => setSidebarOpen(true)}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-1" : "lg:ml-64"}`}
        >
          {/* Header inside main content */}
          <DashboardHeader user={fullUser} />

          {/* Page Content */}
          <div className="pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
