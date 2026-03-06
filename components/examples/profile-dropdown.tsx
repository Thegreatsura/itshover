"use client";

import React, { useRef, useState } from "react";

import UserCheckIcon from "../ui/user-check-icon";
import GearIcon from "../ui/gear-icon";
import FilledBellIcon from "../ui/filled-bell-icon";
import MoonIcon from "../ui/moon-icon";
import LogoutIcon from "../ui/logout-icon";

import type { AnimatedIconHandle, AnimatedIconProps } from "../ui/types";

interface DropdownItemProps {
  icon: React.ComponentType<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
  label: string;
  isAnimated?: boolean;
  rightElement?: React.ReactNode;
}

const DropdownItem = ({
  icon: Icon,
  label,
  isAnimated = true,
  rightElement,
}: DropdownItemProps) => {
  const ref = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    if (isAnimated) ref.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    if (isAnimated) ref.current?.stopAnimation();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group hover:bg-muted flex items-center justify-between rounded-xl px-4 py-3 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <Icon
          ref={ref}
          className="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors"
          disableHover={!isAnimated}
        />
        <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">
          {label}
        </span>
      </div>

      {rightElement}
    </div>
  );
};

interface ProfileDropdownProps {
  isAnimated?: boolean;
}

const ProfileDropdown = ({ isAnimated = true }: ProfileDropdownProps) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="bg-card border-border/50 w-[280px] overflow-hidden rounded-2xl border shadow-xl">

      <div className="border-border/20 flex items-center gap-3 border-b p-4">

        <div className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#020024,#090979,#00d4ff)]" />

        <div className="flex flex-col">
          <span className="text-foreground text-sm font-semibold">
            John Doe
          </span>
          <span className="text-muted-foreground text-xs">
            johndoe@email.com
          </span>
        </div>
      </div>

      <div className="space-y-1 p-2">

        <DropdownItem
          icon={UserCheckIcon}
          label="Profile"
          isAnimated={isAnimated}
        />

        <DropdownItem
          icon={GearIcon}
          label="Account Settings"
          isAnimated={isAnimated}
        />

        <DropdownItem
          icon={FilledBellIcon}
          label="Notifications"
          isAnimated={isAnimated}
        />

        <DropdownItem
          icon={MoonIcon}
          label="Dark Mode"
          isAnimated={isAnimated}
          rightElement={
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative flex h-5 w-9 items-center rounded-full transition-colors ${
                darkMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </button>
          }
        />

      </div>

      <div className="border-border/20 border-t p-2">
        <DropdownItem
          icon={LogoutIcon}
          label="Logout"
          isAnimated={isAnimated}
        />
      </div>

    </div>
  );
};

export default ProfileDropdown;