import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UnitGroup } from '@/types/unitGroup'

const formSchema = z.object({
  unitName: z.string().min(1, 'Unit name is required'),
  conversionFactor: z.number().min(0, 'Conversion factor must be non-negative'),
  isDefault: z.boolean(),
  unitGroupId: z.string().min(1, 'Unit group is required'),
})

type FormData = z.infer<typeof formSchema>;

interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  unitGroups: UnitGroup[];
}

export default function AddUnitModal({ isOpen, onClose, onSubmit, isSubmitting, error, unitGroups }: AddUnitModalProps) {
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitName: '',
      conversionFactor: 1,
      isDefault: false,
      unitGroupId: '',
    },
  })

  const handleSubmit = (values: FormData) => {
    onSubmit(values)
  }

  const handleIsDefaultChange = (checked: boolean | string) => {
    const isChecked = checked === true || checked === "true";
    setIsDefaultChecked(isChecked);
    if (isChecked) {
      form.setValue("conversionFactor", 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[520px]">
        <DialogHeader>
          <DialogTitle>Add New Unit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="unitName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unit name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                  <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        handleIsDefaultChange(checked);
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Is Default
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conversionFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conversion Factor</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      disabled={isDefaultChecked}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      
            <FormField
              control={form.control}
              name="unitGroupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Group</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a unit group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unitGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
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
              <Button className='mt-6' type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Unit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}