import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImpactMethodName } from "@/types/impactMethod";

interface ImportMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (methodName: string, file: File) => void;
  impactMethodNames: ImpactMethodName[];
}

export default function ImportMethodModal({ isOpen, onClose, onImport, impactMethodNames }: ImportMethodModalProps) {
  const [selectedMethodName, setSelectedMethodName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleImport = () => {
    if (selectedMethodName && file) {
      onImport(selectedMethodName, file);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Midpoint Substances</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="method" className="text-right">
              Impact Method
            </Label>
            <Select onValueChange={setSelectedMethodName} value={selectedMethodName}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                {impactMethodNames.map((method) => (
                  <SelectItem key={method.name} value={method.name}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleImport} disabled={!selectedMethodName || !file}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}