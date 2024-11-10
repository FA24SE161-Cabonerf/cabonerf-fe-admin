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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EmissionCompartment } from "@/types/emissionCompartment";
import { ImpactMethod } from "@/types/impactMethod";
import { ImpactCategory } from "@/types/impactCategory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmissionSubstance } from "@/types/emissionSubstance";
import { useState } from "react";
import EmissionSubstancesTable from "@/components/manageMidpointSubstance/EmissionSubstancesTable";
import { Unit } from "@/types/unit";
import { CreateMidpointSubstanceInput } from "@/api/manageMidpointSubstance";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  chemicalName: z.string().nullable().optional(),
  molecularFormula: z.string().nullable().optional(),
  alternativeFormula: z.string().nullable().optional(),
  cas: z.string().nullable().optional(),
  value: z.number().min(0, "Value must be a non-negative number"),
  emissionCompartmentId: z
    .string()
    .min(1, "Emission Compartment is required")
    .uuid("Invalid category ID"),
  methodId: z.string().min(1, "Method is required").uuid("Invalid category ID"),
  categoryId: z
    .string()
    .min(1, "Category is required")
    .uuid("Invalid category ID"),
  unitId: z.string().min(1, "Unit is required").uuid("Invalid unit ID"),
});

type FormData = z.infer<typeof formSchema>;

interface AddMidpointSubstanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMidpointSubstanceInput) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  emissionCompartments: EmissionCompartment[];
  impactMethods: ImpactMethod[];
  impactCategories: ImpactCategory[];
  units: Unit[];
}

export default function AddMidpointSubstanceModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  emissionCompartments,
  impactMethods,
  impactCategories,
  units,
}: AddMidpointSubstanceModalProps) {
  const [selectedEmissionSubstance, setSelectedEmissionSubstance] =
    useState<EmissionSubstance | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      chemicalName: null,
      molecularFormula: null,
      alternativeFormula: null,
      cas: null,
      value: 0,
      emissionCompartmentId: "",
      methodId: "",
      categoryId: "",
      unitId: "",
    },
  });

  const handleSubmit = (values: FormData) => {
    const submitData: CreateMidpointSubstanceInput = {
      ...values,
      chemicalName: values.chemicalName || "-",
      molecularFormula: values.molecularFormula || "-",
      alternativeFormula: values.alternativeFormula || "-",
      cas: values.cas || "-",
      substanceCompartmentId: selectedEmissionSubstance?.id,
    };
    onSubmit(submitData);
  };

  const handleEmissionSubstanceSelect = (substance: EmissionSubstance) => {
    setSelectedEmissionSubstance(substance);
    form.setValue("name", substance.substance.name);
    form.setValue("chemicalName", substance.substance.chemicalName || null);
    form.setValue(
      "molecularFormula",
      substance.substance.molecularFormula || null
    );
    form.setValue(
      "alternativeFormula",
      substance.substance.alternativeFormula || null
    );
    form.setValue("emissionCompartmentId", substance.emissionCompartment.id);
    form.setValue("unitId", substance.unit.id);
  };

  const handleUnselectEmissionSubstance = () => {
    setSelectedEmissionSubstance(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-[95vw] h-[95vh] max-h-[95vh]"
        aria-description="Add New Midpoint Substance"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Midpoint Substance</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          <div className="w-full lg:w-2/3 pr-0 lg:pr-4 mb-4 lg:mb-0">
            <ScrollArea className="h-[calc(95vh-180px)] pr-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6 pb-6"
                >
                  {selectedEmissionSubstance && (
                    <div className="flex items-center justify-between bg-blue-100 dark:bg-primary/20 p-2 rounded-md mb-4">
                      <span>
                        Selected:{" "}
                        {selectedEmissionSubstance.substance.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleUnselectEmissionSubstance}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter substance name"
                              {...field}
                              disabled={!!selectedEmissionSubstance}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="chemicalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chemical Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter chemical name"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(e.target.value || null)
                              }
                              disabled={!!selectedEmissionSubstance}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="molecularFormula"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Molecular Formula</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter molecular formula"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(e.target.value || null)
                              }
                              disabled={!!selectedEmissionSubstance}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="alternativeFormula"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternative Formula</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter alternative formula"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(e.target.value || null)
                              }
                              disabled={!!selectedEmissionSubstance}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CAS Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter CAS number"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(e.target.value || null)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter value"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
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
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!!selectedEmissionSubstance}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an emission compartment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <ScrollArea className="h-[200px]">
                                {emissionCompartments.map((compartment) => (
                                  <SelectItem
                                    key={compartment.id}
                                    value={compartment.id}
                                  >
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
                    <FormField
                      control={form.control}
                      name="methodId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Method</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <ScrollArea className="h-[200px]">
                                {impactMethods.map((method) => (
                                  <SelectItem key={method.id} value={method.id}>
                                    {method.name} {method.perspective.abbr}
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
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <ScrollArea className="h-[200px]">
                                {impactCategories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
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
                      name="unitId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!!selectedEmissionSubstance}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <ScrollArea className="h-[200px]">
                                {units.map((unit) => (
                                  <SelectItem key={unit.id} value={unit.id}>
                                    {unit.name}
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </form>
              </Form>
            </ScrollArea>
          </div>
          <div className="w-full lg:w-1/3 pl-0 lg:pl-4">
            <h3 className="text-xl font-semibold mb-4">
              Select Emission Substance
            </h3>
            <ScrollArea className="h-[calc(95vh-240px)]">
              <EmissionSubstancesTable onSelect={handleEmissionSubstanceSelect} />
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={form.handleSubmit(handleSubmit)}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Adding..." : "Add Midpoint Substance"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}