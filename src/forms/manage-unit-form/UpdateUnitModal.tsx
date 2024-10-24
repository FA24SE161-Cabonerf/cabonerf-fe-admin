import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useUnit } from '@/api/manageUnit'
import { Unit } from '@/types/unit'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  conversionFactor: z.number().min(0, 'Conversion factor must be non-negative'),
  isDefault: z.boolean(),
})

type UpdateUnitModalProps = {
  isOpen: boolean
  onClose: () => void
  unitId: number
  onUpdateUnit: (unit: Unit) => void
}

const UpdateUnitModal = ({ isOpen, onClose, unitId, onUpdateUnit }: UpdateUnitModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: unit, isLoading, error } = useUnit(unitId)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      conversionFactor: 0,
      isDefault: false,
    },
  })

  useEffect(() => {
    if (unit) {
      form.reset({
        name: unit.name,
        conversionFactor: unit.conversionFactor,
        isDefault: unit.default,
      })
    }
  }, [unit, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      if (unit) {
        const updatedUnit: Unit = {
          ...unit,
          name: values.name,
          conversionFactor: values.conversionFactor,
          default: values.isDefault,
        }
        await onUpdateUnit(updatedUnit)
        onClose()
      }
    } catch (error) {
      console.error('Failed to update unit:', error)
      // Handle error (e.g., show an error message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Unit</DialogTitle>
          <DialogDescription>Loading unit data...</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  }

  if (error) {
    return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>Failed to load unit data: {error instanceof Error ? error.message : 'Unknown error'}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Unit</DialogTitle>
          <DialogDescription>Make changes to the unit details below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
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
              name="conversionFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conversion Factor</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter conversion factor" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Default Unit
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {unit && (
              <div>
                <FormLabel>Unit Group</FormLabel>
                <Input value={unit.unitGroup.name} disabled />
              </div>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Unit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateUnitModal