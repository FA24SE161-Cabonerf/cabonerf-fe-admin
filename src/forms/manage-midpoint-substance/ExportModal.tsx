import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImpactMethod } from "@/types/impactMethod";
import { ImpactCategory } from "@/types/impactCategory";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (methodId: string, categoryId: string, methodName: string) => void;
  impactMethods: ImpactMethod[];
  impactCategories: ImpactCategory[];
}

const ExportModal = ({ isOpen, onClose, onExport, impactMethods, impactCategories }: ExportModalProps) => {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedMethodName, setSelectedMethodName] = useState<string>('');

  useEffect(() => {
    if (selectedMethodId) {
      const method = impactMethods.find(m => m.id === selectedMethodId);
      if (method) {
        setSelectedMethodName(method.name);
      }
    }
  }, [selectedMethodId, impactMethods]);

  const handleExport = () => {
    if (selectedMethodId && selectedCategoryId) {
      onExport(selectedMethodId, selectedCategoryId, selectedMethodName);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Midpoint Substances</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="method" className="text-right">
              Impact Method
            </Label>
            <Select onValueChange={setSelectedMethodId} value={selectedMethodId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[200px]">
                  {impactMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name} ({method.perspective.abbr})
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Impact Category
            </Label>
            <Select onValueChange={setSelectedCategoryId} value={selectedCategoryId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[200px]">
                  {impactCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleExport} disabled={!selectedMethodId || !selectedCategoryId}>
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;