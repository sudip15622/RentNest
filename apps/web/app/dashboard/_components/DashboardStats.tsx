"use client";
import React, { useState, useEffect } from "react";
import { FaBuilding, FaEye, FaEnvelope, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getUserStats } from "../../../lib/actions";
import { UserStats } from "../../../lib/types";

interface DashboardStatsProps {
  userId: string;
}

export default function DashboardStats({ userId }: DashboardStatsProps) {
  const [stats, setStats] = useState<UserStats>({
    totalListings: 0,
    totalViews: 0,
    totalInquiries: 0,
    trends: {
      listingsThisMonth: 0,
      inquiriesToday: 0,
      viewGrowthPercentage: 0,
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const statsData = await getUserStats();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Keep default stats in case of error
        setStats({
          totalListings: 0,
          totalViews: 0,
          totalInquiries: 0,
          trends: {
            listingsThisMonth: 0,
            inquiriesToday: 0,
            viewGrowthPercentage: 0,
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  const statItems = [
    {
      title: "Total Listings",
      value: stats.totalListings,
      icon: FaBuilding,
      color: "text-[var(--primary)]",
      bgColor: "bg-[var(--primary-light)]",
      borderColor: "border-[var(--primary)]/20",
      change: stats.trends.listingsThisMonth > 0 
        ? `+${stats.trends.listingsThisMonth} this month`
        : "No new listings this month",
      trend: stats.trends.listingsThisMonth > 0 ? "up" : "neutral",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: FaEye,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      change: stats.trends.viewGrowthPercentage !== 0
        ? `${stats.trends.viewGrowthPercentage > 0 ? '+' : ''}${stats.trends.viewGrowthPercentage}% this week`
        : "No change this week",
      trend: stats.trends.viewGrowthPercentage > 0 ? "up" : stats.trends.viewGrowthPercentage < 0 ? "down" : "neutral",
    },
    {
      title: "Total Inquiries",
      value: stats.totalInquiries,
      icon: FaEnvelope,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      change: stats.trends.inquiriesToday > 0 
        ? `+${stats.trends.inquiriesToday} new today`
        : "No new inquiries today",
      trend: stats.trends.inquiriesToday > 0 ? "up" : "neutral",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-6 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mt-3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        const TrendIcon = item.trend === "up" ? FaArrowUp : item.trend === "down" ? FaArrowDown : null;
        
        return (
          <div
            key={index}
            className={`
              bg-[var(--background)] border ${item.borderColor} rounded-xl p-6 
              hover:shadow-lg transition-all duration-300 hover:scale-[1.02]
              relative overflow-hidden group
            `}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5 transform rotate-12 translate-x-6 -translate-y-6">
              <Icon size={96} className={item.color} />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`
                  ${item.bgColor} ${item.color} 
                  w-12 h-12 rounded-lg flex items-center justify-center
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon size={20} />
                </div>
                <div className={`
                  flex items-center space-x-1 text-xs font-medium
                  ${item.trend === "up" ? "text-green-600" : item.trend === "down" ? "text-red-600" : "text-gray-600"}
                `}>
                  {TrendIcon && <TrendIcon size={10} />}
                  <span>{item.change}</span>
                </div>
              </div>

              {/* Value */}
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                  {item.value}
                </h3>
                <p className="text-sm text-[var(--foreground-sec)] font-medium">
                  {item.title}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[var(--border)] rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full ${item.color.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: loading ? '0%' : '75%' }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
