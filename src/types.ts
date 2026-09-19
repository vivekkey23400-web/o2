export interface NavItem {
  name: string;
  href: string;
}

export interface GasProduct {
  id: string;
  name: string;
  formula: string;
  subtitle: string;
  description: string;
  purityGrade: string;
  applications: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export interface IndustryApplication {
  id: string;
  title: string;
  description: string;
  iconName: string;
  keyGas: string;
  details: string;
}

export interface QualityStep {
  step: string;
  title: string;
  description: string;
  methodology: string;
  standardRef: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface SafetyItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  protocolCode: string;
}

export interface PillarItem {
  title: string;
  description: string;
  detail: string;
}
