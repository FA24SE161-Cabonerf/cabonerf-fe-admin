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
              <h3 className="text-lg font-semibold mb-2">System Boundary</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">From:</span>{" "}
                  {dataset.systemBoundary.boundaryFrom}
                </p>
                <p>
                  <span className="font-medium">To:</span>{" "}
                  {dataset.systemBoundary.boundaryTo}
                </p>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <p>
                        <span className="font-medium">Method:</span>{" "}
                        {impact.method.name} ({impact.method.version})
                      </p>
                      <p>
                        <span className="font-medium">Perspective:</span>{" "}
                        {impact.method.perspective.name} (
                        {impact.method.perspective.abbr})
                      </p>
                      <p>
                        <span className="font-medium">Midpoint Category:</span>{" "}
                        {impact.impactCategory.midpointImpactCategory.name} (
                        {impact.impactCategory.midpointImpactCategory.abbr})
                      </p>
                      <p>
                        <span className="font-medium">Unit:</span>{" "}
                        {impact.impactCategory.midpointImpactCategory.unit.name}
                      </p>
                      {impact.impactCategory.emissionCompartment && (
                        <>
                          <p>
                            <span className="font-medium">
                              Emission Compartment:
                            </span>{" "}
                            {impact.impactCategory.emissionCompartment.name}
                          </p>
                          <p>
                            <span className="font-medium">Description:</span>{" "}
                            {
                              impact.impactCategory.emissionCompartment
                                .description
                            }
                          </p>
                        </>
                      )}
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
