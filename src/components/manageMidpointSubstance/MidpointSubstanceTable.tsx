

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { MidpointSubstance } from '@/types/midpointSubstance'

interface MidpointSubstancesTableProps {
  substances: MidpointSubstance[]

}

const MidpointSubstancesTable = ({ substances }: MidpointSubstancesTableProps) => {
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
      <TableBody>
        {substances.map((substance) => (
          <TableRow key={substance.id}>
            <TableCell className="font-medium">{substance.name}</TableCell>
            <TableCell>{substance.casNumber}</TableCell>
            <TableCell>{substance.compartmentName}</TableCell>
            <TableCell>{substance.molecularFormula}</TableCell>
            <TableCell>{substance.individualist}</TableCell>
            <TableCell>{substance.hierarchist}</TableCell>
            <TableCell>{substance.egalitarian}</TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MidpointSubstancesTable