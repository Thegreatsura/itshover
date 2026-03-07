"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

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
  href?: string;
  onClick?: () => void;
  isAnimated?: boolean;
  rightElement?: React.ReactNode;
}

const DropdownItem = ({
  icon: Icon,
  label,
  href,
  onClick,
  isAnimated = true,
  rightElement,
}: DropdownItemProps) => {
  const ref = useRef<AnimatedIconHandle>(null);

  const startAnimation = () => {
    if (isAnimated) ref.current?.startAnimation();
  };

  const stopAnimation = () => {
    if (isAnimated) ref.current?.stopAnimation();
  };

  const baseClasses =
    "group hover:bg-muted flex items-center rounded-xl px-4 py-3 transition-all cursor-pointer w-full";

  const content = (
    <>
      <div className="flex items-center gap-3">
        <Icon
          ref={ref}
          className="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors"
          disableHover={!isAnimated}
        />
        <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium">
          {label}
        </span>
      </div>

      {rightElement && (
        <div className="ml-auto flex items-center">{rightElement}</div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        onMouseEnter={startAnimation}
        onMouseLeave={stopAnimation}
        onFocus={startAnimation}
        onBlur={stopAnimation}
      >
        {content}
      </Link>
    );
  }

  if (rightElement) {
    return (
      <div
        className={baseClasses}
        onMouseEnter={startAnimation}
        onMouseLeave={stopAnimation}
        onFocus={startAnimation}
        onBlur={stopAnimation}
        tabIndex={0}
      >
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
      onFocus={startAnimation}
      onBlur={stopAnimation}
    >
      {content}
    </button>
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

      {/* Menu */}
      <div className="space-y-1 p-2">

        <DropdownItem
          icon={UserCheckIcon}
          label="Profile"
          href="#"
          isAnimated={isAnimated}
        />

        <DropdownItem
          icon={GearIcon}
          label="Account Settings"
          href="#"
          isAnimated={isAnimated}
        />

        <DropdownItem
          icon={FilledBellIcon}
          label="Notifications"
          href="#"
          isAnimated={isAnimated}
        />

        <DropdownItem
          icon={MoonIcon}
          label="Dark Mode"
          isAnimated={isAnimated}
          rightElement={
            <button
              type="button"
              aria-label="Toggle dark mode"
              aria-pressed={darkMode}
              onClick={() => setDarkMode(!darkMode)}
              className={`relative flex h-5 w-9 items-center rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-muted"
                }`}
            >
              <span
                className={`h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-4" : "translate-x-0.5"
                  }`}
              />
            </button>
          }
        />

        <DropdownItem
          icon={LogoutIcon}
          label="Logout"
          onClick={() => console.log("Logout clicked")}
          isAnimated={isAnimated}
        />

      </div>
    </div>
  );
};

export default ProfileDropdown;