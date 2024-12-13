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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { IndustryCode } from "@/types/industryCode";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  email: z.string().email("Invalid email address"),
  description: z.string().min(1, "Description is required"),
  taxCode: z.string().min(1, "Tax code is required"),
  industryCodeIds: z.array(z.string()).min(1, "At least one industry code is required"),
  contractFile: z.instanceof(File, { message: "Contract file is required" }),
  logo: z.instanceof(File, { message: "Logo is required" }),
});

type FormData = z.infer<typeof formSchema>;

interface AddOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  onSearchIndustryCodes: (keyword: string) => Promise<IndustryCode[]>;
}

const AddOrganizationModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  onSearchIndustryCodes,
}: AddOrganizationModalProps) => {
  const [industryCodeSearchTerm, setIndustryCodeSearchTerm] = useState("");
  const [searchedIndustryCodes, setSearchedIndustryCodes] = useState<IndustryCode[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      taxCode: "",
      industryCodeIds: [],
      contractFile: undefined,
      logo: undefined,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
      setIndustryCodeSearchTerm("");
      setSearchedIndustryCodes([]);
    }
  }, [isOpen, form]);

  const handleSubmit = (values: FormData) => {
    onSubmit(values);
  };

  useEffect(() => {
    const searchIndustryCodes = async () => {
      try {
        const results = await onSearchIndustryCodes(industryCodeSearchTerm);
        setSearchedIndustryCodes(results);
      } catch (error) {
        console.error("Error searching industry codes:", error);
      }
    };

    if (isOpen) {
      searchIndustryCodes();
    }

    const debounce = setTimeout(() => {
      if (industryCodeSearchTerm.trim() !== '') {
        searchIndustryCodes();
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [industryCodeSearchTerm, onSearchIndustryCodes, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 flex-grow overflow-hidden flex flex-col">
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-4">
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
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter organization email"
                          {...field}
                        />
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
                        <Textarea
                          placeholder="Enter organization description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="taxCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tax code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industryCodeIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Codes</FormLabel>
                      <div className="mb-2">
                        <Input
                          placeholder="Search industry codes"
                          value={industryCodeSearchTerm}
                          onChange={(e) => setIndustryCodeSearchTerm(e.target.value)}
                          onFocus={() => {
                            if (industryCodeSearchTerm === '') {
                              setIndustryCodeSearchTerm(' ');
                            }
                          }}
                        />
                      </div>
                      <ScrollArea className="h-[200px] border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">Select</TableHead>
                              <TableHead>Code</TableHead>
                              <TableHead>Name</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {searchedIndustryCodes.map((industryCode) => (
                              <TableRow key={industryCode.id}>
                                <TableCell>
                                  <Checkbox
                                    checked={field.value.includes(industryCode.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = checked
                                        ? [...field.value, industryCode.id]
                                        : field.value.filter((id) => id !== industryCode.id);
                                      field.onChange(updatedValue);
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{industryCode.code}</TableCell>
                                <TableCell>{industryCode.name}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contractFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            field.onChange(file);
                          }}
                        />
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
              </div>
            </ScrollArea>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Organization"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrganizationModal;

