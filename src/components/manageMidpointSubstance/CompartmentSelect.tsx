import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmissionCompartment } from "@/types/emissionCompartment";

interface CompartmentSelectProps {
  value: string;
  onChange: (value: string) => void;
  emissionCompartments: EmissionCompartment[] | undefined;
  isLoading: boolean;
}

const CompartmentSelect = ({
  value,
  onChange,
  emissionCompartments,
  isLoading,
}: CompartmentSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Compartment" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[320px] overflow-y-auto">
          <SelectItem value="all">All Compartments</SelectItem>
          {!isLoading &&
            emissionCompartments?.map((compartment) => (
              <SelectItem key={compartment.id} value={compartment.id}>
                {compartment.name}
              </SelectItem>
            ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};

export default CompartmentSelect;