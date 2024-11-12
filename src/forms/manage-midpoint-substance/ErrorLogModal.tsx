import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  fileName: string;
}

const ErrorLogModal = ({ isOpen, onClose, onDownload, fileName }: ErrorLogModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
            Import Error Log
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>An error occurred during the import process. Would you like to download the error log?</p>
          <p className="mt-2 text-sm text-muted-foreground">File: {fileName}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onDownload}>Download Error Log</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorLogModal