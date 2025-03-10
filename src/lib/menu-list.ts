import {
  Users,
  SquarePen,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "Dashboard",
      menus: [
        {
          href: "/student",
          label: "Student Management",
          icon: Users
        },
        {
          href: "/degree",
          label: "Degree Management",
          icon: SquarePen
        }
      ]
    },
  ];
}
