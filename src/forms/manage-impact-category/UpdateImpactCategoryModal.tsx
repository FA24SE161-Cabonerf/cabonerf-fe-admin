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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImpactCategory } from "@/types/impactCategory";
import { MidpointImpactCategory } from "@/types/midpointImpactCategory";
import { EmissionCompartment } from "@/types/emissionCompartment";

const formSchema = z.object({
  name: z.string().min(1, "Impact category name is required"),
  indicator: z.string().min(1, "Indicator is required"),
  indicatorDescription: z.string().min(1, "Indicator description is required"),
  unit: z.string().min(1, "Unit is required"),
  midpointImpactCategoryId: z.string().min(1, "Midpoint impact category is required"),
  emissionCompartmentId: z.string().min(1, "Emission compartment is required"),
});

type FormData = z.infer<typeof formSchema>;

interface UpdateImpactCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: FormData) => void;
  isSubmitting: boolean;
  error: string | null;
  impactCategory: ImpactCategory | null;
  midpointImpactCategories: MidpointImpactCategory[];
  emissionCompartments: EmissionCompartment[];
}

const UpdateImpactCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  impactCategory,
  midpointImpactCategories,
  emissionCompartments,
}: UpdateImpactCategoryModalProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: impactCategory?.name || "",
      indicator: impactCategory?.indicator || "",
      indicatorDescription: impactCategory?.indicatorDescription || "",
      unit: impactCategory?.unit || "",
      midpointImpactCategoryId: impactCategory?.midpointImpactCategory.id || "",
      emissionCompartmentId: impactCategory?.emissionCompartment.id || "",
    },
  });

  useEffect(() => {
    if (impactCategory) {
      form.reset({
        name: impactCategory.name,
        indicator: impactCategory.indicator,
        indicatorDescription: impactCategory.indicatorDescription,
        unit: impactCategory.unit,
        midpointImpactCategoryId: impactCategory.midpointImpactCategory.id,
        emissionCompartmentId: impactCategory.emissionCompartment.id,
      });
    }
  }, [impactCategory, form]);

  const handleSubmit = (values: FormData) => {
    if (impactCategory) {
      onSubmit(impactCategory.id, values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Impact Category</DialogTitle>
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
                    <Input placeholder="Enter impact category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="indicator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indicator</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter indicator" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="indicatorDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indicator Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter indicator description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="midpointImpactCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Midpoint Impact Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a midpoint impact category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px]">
                        {midpointImpactCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emissionCompartmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emission Compartment</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an emission compartment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px]">
                        {emissionCompartments.map((compartment) => (
                          <SelectItem key={compartment.id} value={compartment.id}>
                            {compartment.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
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
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting  ? "Updating..." : "Update Impact Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateImpactCategoryModal;