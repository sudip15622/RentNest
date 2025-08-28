"use client";
import React from "react";
import { FaHome, FaBuilding, FaEnvelope, FaUser, FaTimes, FaAngleDoubleLeft, FaAngleDoubleRight, FaBars } from "react-icons/fa";

type TabType = "overview" | "listings" | "inquiries" | "profile";

interface DashboardSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const menuItems = [
  { id: "overview" as TabType, label: "Overview", icon: FaHome },
  { id: "listings" as TabType, label: "My Listings", icon: FaBuilding },
  { id: "inquiries" as TabType, label: "Inquiries", icon: FaEnvelope },
  { id: "profile" as TabType, label: "Profile", icon: FaUser },
];

export default function DashboardSidebar({ 
  activeTab, 
  onTabChange, 
  isOpen, 
  onClose,
  onOpen,
  isCollapsed = false,
  onToggleCollapse
}: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile Menu Button - Fixed Position */}
      {!isOpen && (
        <button
          onClick={onOpen}
          data-menu-button="mobile"
          className="lg:hidden fixed top-20 left-4 z-30 p-2 rounded-lg bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--primary-dark)] transition-colors"
          title="Open Menu"
        >
          <FaBars size={16} />
        </button>
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block fixed top-14 bottom-0 left-0 z-10 bg-[var(--background)] border-r border-[var(--border)] transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-end'} p-2 border-b border-[var(--border)]`}>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-2 rounded-md text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <FaAngleDoubleRight size={16} /> : <FaAngleDoubleLeft size={16} />}
              </button>
            )}
          </div>

          <nav className="flex-1 px-2 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-3 rounded-lg text-left transition-all duration-200 group relative ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-lg"
                      : "text-[var(--foreground)] hover:bg-[var(--border)]"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={18} />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`lg:hidden fixed top-14 bottom-0 left-0 z-40 w-64 bg-[var(--background)] border-r border-[var(--border)] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        data-sidebar="mobile"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
              title="Close Menu"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-lg"
                      : "text-[var(--foreground)] hover:bg-[var(--border)]"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
