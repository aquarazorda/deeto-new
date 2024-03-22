import LeftMenuLayout from "@/components/layouts/left-menu-layout";
import { useUser } from "@/lib/states/user";
import { Navigate, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";

import HomeIcon from "@/assets/icons/home.svg?react";
import GiftBox from "@/assets/icons/gift-box.svg?react";
import CircleArrows from "@/assets/icons/circle-arrows.svg?react";
import PenAndPaper from "@/assets/icons/pen-and-paper.svg?react";

const MenuItems = [
  { title: "dashboard", path: "/dashboard", icon: HomeIcon },
  { title: "rewards", path: "/rewards", icon: GiftBox },
  { title: "referrals", path: "/referrals", icon: CircleArrows },
  { title: "my_content", path: "/my-content", icon: PenAndPaper },
];

export const Route = createLazyFileRoute("/_reference")({
  component: () => {
    const isReference = useUser(useShallow((state) => state?.me?.isReference));

    if (!isReference) {
      return <Navigate to="/login-with-email" />;
    }

    return (
      <LeftMenuLayout items={MenuItems}>
        <Outlet />
      </LeftMenuLayout>
    );
  },
});
