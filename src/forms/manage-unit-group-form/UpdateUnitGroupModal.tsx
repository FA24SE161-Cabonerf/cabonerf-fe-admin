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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  unitGroupName: z.string().min(1, "Unit group name is required"),
  unitGroupType: z.enum(['Impact', 'Normal'], {
    required_error: 'Please select a unit group type',
  }),
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
      unitGroupType: unitGroup?.unitGroupType as "Impact" | "Normal" || undefined,
    },
  });

  useEffect(() => {
    if (unitGroup) {
      form.reset({
        unitGroupName: unitGroup.name,
        unitGroupType: unitGroup.unitGroupType as "Impact" | "Normal",
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
      <DialogContent className="sm:max-w-[500px] h-[420px]">
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a unit group type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Impact">Impact</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
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
              <Button className="mt-6" type="submit" disabled={isSubmitting}>
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