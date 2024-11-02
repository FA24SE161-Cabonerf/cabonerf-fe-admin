import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MidpointSubstance } from '@/types/midpointSubstance'
import SkeletonTable from "@/components/sketeton/SkeletonTable"

interface MidpointSubstancesTableProps {
  substances: MidpointSubstance[] | undefined
  isLoading: boolean
}

const MidpointSubstancesTable = ({ substances, isLoading }: MidpointSubstancesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>CAS Number</TableHead>
          <TableHead>Compartment</TableHead>
          <TableHead>Molecular Formula</TableHead>
          <TableHead>Individualist</TableHead>
          <TableHead>Hierarchist</TableHead>
          <TableHead>Egalitarian</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={7} rows={10} />
      ) : (
        <TableBody>
          {substances && substances.length > 0 ? (
            substances.map((substance) => (
              <TableRow key={substance.id}>
                <TableCell className="font-medium">{substance.name}</TableCell>
                <TableCell>{substance.casNumber}</TableCell>
                <TableCell>{substance.compartmentName}</TableCell>
                <TableCell>{substance.molecularFormula}</TableCell>
                <TableCell>{substance.individualist}</TableCell>
                <TableCell>{substance.hierarchist}</TableCell>
                <TableCell>{substance.egalitarian}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No midpoint substances found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  )
}

export default MidpointSubstancesTable