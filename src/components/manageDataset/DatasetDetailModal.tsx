import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dataset, Impact } from "@/types/dataset";

interface DatasetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: Dataset | null;
}

const DatasetDetailModal = ({
  isOpen,
  onClose,
  dataset,
}: DatasetDetailModalProps) => {
  const renderSystemBoundary = (from: string, to: string) => (
    <div className="inline-flex items-center px-3 py-1 rounded-lg">
      <span className="text-purple-600 font-medium">{from}</span>
      <span className="mx-2 text-gray-500">to</span>
      <span className="text-blue-600 font-medium">{to}</span>
    </div>
  );
  if (!dataset) return null;
  const renderIcon = (iconUrl: string) => {
    if (iconUrl.startsWith("<svg")) {
      return (
        <span
          dangerouslySetInnerHTML={{ __html: iconUrl }}
          className="w-5 h-5 mr-2"
        />
      );
    } else {
      return (
        <img src={iconUrl} alt="Icon" className="w-5 h-5 mr-2 object-contain" />
      );
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{dataset.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow px-6 py-4 h-full overflow-auto">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-2">System Boundary: {renderSystemBoundary(
                    dataset.systemBoundary.boundaryFrom,
                    dataset.systemBoundary.boundaryTo
                  )}</h3>
              <div className="space-y-1">       
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {dataset.systemBoundary.description}
                </p>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-2">Impacts</h3>
              <div className="space-y-4">
                {dataset.impacts.map((impact: Impact) => (
                  <div key={impact.id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-lg mb-2 flex items-center">
                      {renderIcon(impact.impactCategory.iconUrl)}
                      {impact.impactCategory.name}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                      <p>
                        <span className="font-medium">Midpoint Category:</span>{" "}
                        {impact.impactCategory.midpointImpactCategory.name} (
                        {impact.impactCategory.midpointImpactCategory.abbr})
                      </p>
                      <p>
                        <span className="font-medium">Unit:</span>{" "}
                        {impact.unitLevel}{" "}
                        {impact.impactCategory.midpointImpactCategory.unit.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DatasetDetailModal;
