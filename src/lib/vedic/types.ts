export interface BirthInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM (24h)
  birthPlace: string;
  timezoneOffset: number; // hours from UTC (e.g., -5 for EST)
  email?: string;
  context?: string; // optional life area focus
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  displayName: string;
}

export interface PlanetPosition {
  planet: string;
  tropicalLongitude: number;
  siderealLongitude: number;
  sign: string;
  signIndex: number; // 0-11
  degree: number; // degree within sign (0-30)
  house: number; // 1-12
  nakshatra: string;
  nakshatraPada: number; // 1-4
  nakshatraLord: string;
  isRetrograde: boolean;
}

export interface HouseData {
  house: number; // 1-12
  sign: string;
  signIndex: number;
  planets: string[];
}

export interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  years: number;
  isActive: boolean;
  subPeriods?: DashaPeriod[];
}

export interface DashaResult {
  birthNakshatra: string;
  birthNakshatraLord: string;
  moonDegreeInNakshatra: number;
  balanceAtBirth: number; // years remaining in first dasha
  mahaDashas: DashaPeriod[];
  currentMahaDasha: DashaPeriod | null;
  currentAntarDasha: DashaPeriod | null;
}

export interface YogaResult {
  name: string;
  description: string;
  planets: string[];
  isPresent: boolean;
}

export interface ValidationResult {
  passed: boolean;
  sunCheck: { expected: number; actual: number; diff: number };
  moonCheck: { expected: number; actual: number; diff: number };
  tolerance: number;
}

export interface ChartData {
  input: BirthInput;
  location: GeoLocation;
  ayanamsa: number;
  julianDate: number;
  localSiderealTime: number;
  planets: PlanetPosition[];
  houses: HouseData[];
  ascendant: {
    siderealLongitude: number;
    sign: string;
    signIndex: number;
    degree: number;
    nakshatra: string;
    nakshatraPada: number;
  };
  dashas: DashaResult;
  yogas: YogaResult[];
  validation: ValidationResult;
}

export interface ReportSections {
  overview: string;
  planets: string;
  houses: string;
  dashas: string;
  nakshatras: string;
  yogas: string;
  predictions: string;
  home_context?: string;
  remedies: string;
}

export interface AstrologyReport {
  id: string;
  status: "pending" | "calculating" | "generating" | "complete" | "error";
  name: string;
  birth_date: string;
  birth_time: string;
  birth_place: string;
  latitude: number;
  longitude: number;
  timezone_offset: number;
  email?: string;
  context?: string;
  chart_data?: ChartData;
  validation_pass: boolean;
  report_html?: string;
  report_sections?: ReportSections;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}
