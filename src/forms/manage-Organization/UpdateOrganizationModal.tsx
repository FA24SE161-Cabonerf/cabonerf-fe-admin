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
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Organization } from "@/types/organization";

const formSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
});

type FormData = z.infer<typeof formSchema>;

interface UpdateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: FormData) => void;
  isSubmitting: boolean;
  error: string | null;
  organization: Organization | null;
}

const UpdateOrganizationModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  organization,
}: UpdateOrganizationModalProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization?.name || "",
    },
  });

  useEffect(() => {
    if (organization) {
      form.reset({
        name: organization.name,
      });
    }
  }, [organization, form]);

  const handleSubmit = (values: FormData) => {
    if (organization) {
      onSubmit(organization.id, values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Organization</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
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
                {isSubmitting ? "Updating..." : "Update Organization"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrganizationModal;