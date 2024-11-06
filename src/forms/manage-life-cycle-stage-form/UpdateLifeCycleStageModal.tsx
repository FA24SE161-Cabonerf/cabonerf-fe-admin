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
import { Textarea } from "@/components/ui/textarea";
import { LifeCycleStage } from "@/types/lifeCycleStage";

const formSchema = z.object({
  name: z.string().min(1, "Life cycle stage name is required"),
  description: z.string().min(1, "Description is required"),
  iconUrl: z.string().url("Invalid URL for icon"),
});

type FormData = z.infer<typeof formSchema>;

interface UpdateLifeCycleStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: FormData) => void;
  isSubmitting: boolean;
  error: string | null;
  lifeCycleStage: LifeCycleStage | null;
}

const UpdateLifeCycleStageModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  lifeCycleStage,
}: UpdateLifeCycleStageModalProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: lifeCycleStage?.name || "",
      description: lifeCycleStage?.description || "",
      iconUrl: lifeCycleStage?.iconUrl || "",
    },
  });

  useEffect(() => {
    if (lifeCycleStage) {
      form.reset({
        name: lifeCycleStage.name,
        description: lifeCycleStage.description,
        iconUrl: lifeCycleStage.iconUrl,
      });
    }
  }, [lifeCycleStage, form]);

  const handleSubmit = (values: FormData) => {
    if (lifeCycleStage) {
      onSubmit(lifeCycleStage.id, values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[520px]">
        <DialogHeader>
          <DialogTitle>Update Life Cycle Stage</DialogTitle>
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
                    <Input placeholder="Enter life cycle stage name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter icon URL" {...field} />
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
              <Button className="mt-6" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Life Cycle Stage"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLifeCycleStageModal;