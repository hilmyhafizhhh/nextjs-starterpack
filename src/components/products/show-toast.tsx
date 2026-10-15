import { toast } from "@/components/ui/toast";

export const showToast = (type: "success" | "error", description: string) => {
  toast.add({
    type,
    description,
  });
};
