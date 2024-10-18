export type Unit = {
  id: number
  name: string
  conversionFactor: number
  unitGroup: {
    id: number
    name: string
    unitGroupType: string
  }
  default: boolean
}

export type MidpointImpactCategory = {
  id: number
  name: string
  description: string
  abbr: string
  unit: Unit
}

export type EmissionCompartment = {
  id: number
  name: string
}

export type ImpactCategory = {
  id: number
  name: string | null
  indicator: string | null
  indicatorDescription: string | null
  unit: string | null
  midpointImpactCategory: MidpointImpactCategory | null
  emissionCompartment: EmissionCompartment | null
}

export type ApiResponse = {
  status: string
  message: string
  data: ImpactCategory[]
}