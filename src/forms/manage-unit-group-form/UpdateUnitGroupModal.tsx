import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UnitGroup } from "@/types/unitGroup";

const formSchema = z.object({
  unitGroupName: z.string().min(1, "Unit group name is required"),
  unitGroupType: z.string().min(1, "Unit group type is required"),
});

type FormData = z.infer<typeof formSchema>;

interface UpdateUnitGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: FormData) => void;
  isSubmitting: boolean;
  error: string | null;
  unitGroup: UnitGroup | null;
}

const UpdateUnitGroupModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  unitGroup,
}: UpdateUnitGroupModalProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitGroupName: unitGroup?.name || "",
      unitGroupType: unitGroup?.unitGroupType || "",
    },
  });

  useEffect(() => {
    if (unitGroup) {
      form.reset({
        unitGroupName: unitGroup.name,
        unitGroupType: unitGroup.unitGroupType,
      });
    }
  }, [unitGroup, form]);

  const handleSubmit = (values: FormData) => {
    if (unitGroup) {
      onSubmit(unitGroup.id, values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Unit Group</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="unitGroupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unit group name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unitGroupType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unit group type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Unit Group"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUnitGroupModal;
