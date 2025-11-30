
export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
}

export interface MedicineData {
  name: string;
  summary: string;
  uses: string[];
  dosage_note: string;
  side_effects: string[];
  warnings: string[];
  alternates: string[];
  is_medicine: boolean;
  sources?: { title: string; uri: string }[];
}

export interface AnalysisError {
  message: string;
}