import { memo } from "react";
import type { UserStatus } from "@/types/user.types";
import { Badge } from "./badge";

interface Props {
  status: UserStatus;
}

const StatusBadge = memo(({ status }: Props) => {
  const isActive = status === "Active";

  return (
    <Badge
      className={`hover:bg-transparent ${
        isActive
          ? "border-green-200 bg-green-100 text-green-700"
          : "border-red-200 bg-red-100 text-red-700"
      }`}
    >
      {status}
    </Badge>
  );
});

StatusBadge.displayName = "StatusBadge";

export default StatusBadge;
