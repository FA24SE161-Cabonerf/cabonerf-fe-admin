import { ApiResponse } from "./apiResponse";
import { EmissionCompartment } from "./emissionCompartment";
import { Unit } from "./unit";

export type EmissionSubstance = {
  id: string;
  substance: {
    id: string;
    name: string;
    chemicalName: string;
    molecularFormula: string;
    alternativeFormula: string;
  };
  emissionCompartment: EmissionCompartment;
  unit: Unit
};

export type EmissionSubstanceListResponse = ApiResponse<EmissionSubstance[]>;
export type EmissionSubstanceResponse = ApiResponse<EmissionSubstance>;