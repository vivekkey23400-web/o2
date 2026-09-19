import { GasProduct, IndustryApplication, QualityStep, SafetyItem, PillarItem } from '../types';

export const CORE_PRODUCTS: GasProduct[] = [
  {
    id: 'oxygen',
    name: 'Oxygen',
    formula: 'O₂',
    subtitle: 'High-purity oxygen solutions for medical, industrial, and specialized applications.',
    description: 'Separated cryogenically and purified under strict chromatographic analysis. Engineered for continuous life support in medical theaters and high-efficiency oxy-fuel industrial manufacturing.',
    purityGrade: 'Up to 99.995% [DEMONSTRATION GRADE]',
    applications: [
      'Healthcare',
      'Metal fabrication',
      'Water treatment',
      'Industrial processes',
    ],
    specs: [
      { label: 'Molecular Weight', value: '31.9988 g/mol' },
      { label: 'Boiling Point', value: '-182.96 °C (90.19 K)' },
      { label: 'Supply Modes', value: 'High-Pressure Cylinders, Dewars, MicroBulk' },
      { label: 'Compliance Spec', value: '[CERTIFICATION / PHARMACOPEIA SPEC]' },
    ],
  },
  {
    id: 'carbon-dioxide',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    subtitle: 'Reliable CO₂ supply for food, beverage, industrial, and specialized applications.',
    description: 'Sourced and refined with hydrocarbon-stripping filtration for exceptional beverage carbonation, inert blanketing, modified atmosphere packaging, and precise metal-arc shielding.',
    purityGrade: 'Up to 99.99% [DEMONSTRATION GRADE]',
    applications: [
      'Food & Beverage',
      'Carbonation',
      'Welding',
      'Industrial processing',
    ],
    specs: [
      { label: 'Molecular Weight', value: '44.01 g/mol' },
      { label: 'Sublimation Point', value: '-78.5 °C (194.7 K)' },
      { label: 'Supply Modes', value: 'Liquid Bulk Tankers, 50L Cylinders, Manifolds' },
      { label: 'Compliance Spec', value: '[FOOD GRADE PURITY SPECIFICATION]' },
    ],
  },
  {
    id: 'bulk-supply',
    name: 'Bulk & Cylinder Supply',
    formula: 'BULK / CYL',
    subtitle: 'Flexible gas storage, cylinder filling, bulk delivery, and distribution solutions designed around customer requirements.',
    description: 'Turnkey cryogenic on-site vessel telemetry, emergency backup manifolds, dedicated high-pressure cylinder logistics, and planned route distribution ensuring zero process downtime.',
    purityGrade: 'Custom Technical & Medical Specifications',
    applications: [
      'Manufacturing',
      'Hospitals',
      'Laboratories',
      'Industrial facilities',
    ],
    specs: [
      { label: 'Telemetry Monitoring', value: '24/7 Digital Level & Pressure Telemetry' },
      { label: 'Vessel Sizes', value: '1,500L to 60,000L Cryogenic Storage' },
      { label: 'Pressure Range', value: '150 bar to 300 bar Cylinder Bundles' },
      { label: 'Delivery Schedule', value: 'Scheduled Logistics & Rapid On-Demand' },
    ],
  },
];

export const INDUSTRY_APPLICATIONS: IndustryApplication[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Reliable medical oxygen solutions for hospitals, clinics, and healthcare facilities.',
    iconName: 'Activity',
    keyGas: 'Medical Grade O₂',
    details: 'Complies with critical respiratory protocols, centralized manifold systems, and portable emergency therapy supplies.',
  },
  {
    id: 'food-beverage',
    title: 'Food & Beverage',
    description: 'CO₂ solutions for carbonation, preservation, processing, and controlled environments.',
    iconName: 'Sparkles',
    keyGas: 'Beverage & MAP CO₂',
    details: 'Delivers micro-bubble carbonation for craft and industrial bottling, cryogenic freezing, and shelf-life extension gas flushing.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Industrial gases supporting cutting, welding, fabrication, and production processes.',
    iconName: 'Flame',
    keyGas: 'Industrial O₂ / CO₂ Shielding',
    details: 'Enhances oxy-acetylene cutting speed, laser kerf quality, MAG welding penetration, and thermal processing stability.',
  },
  {
    id: 'laboratories',
    title: 'Laboratories',
    description: 'Controlled gas solutions for laboratories, research, testing, and specialized applications.',
    iconName: 'FlaskConical',
    keyGas: 'Ultra-High Purity Grades',
    details: 'Zero-hydrocarbon analytical carrier gases, incubator carbon dioxide balance, and calibrated gas mixtures for gas chromatography.',
  },
];

export const QUALITY_STEPS: QualityStep[] = [
  {
    step: '01',
    title: 'SOURCE',
    description: 'Controlled gas production and sourcing.',
    methodology: 'Atmospheric air separation unit (ASU) cryogenic liquefaction and high-selectivity carbon capture feedstocks.',
    standardRef: '[FEEDSTOCK PURITY PROTOCOL]',
  },
  {
    step: '02',
    title: 'PROCESS',
    description: 'Precision processing and filling.',
    methodology: 'Multi-stage sub-micron catalytic filtration, residual evacuation cycles, and automated gravimetric cylinder filling.',
    standardRef: '[FILLING DENSITY & VACUUM SPEC]',
  },
  {
    step: '03',
    title: 'TEST',
    description: 'Quality and purity verification.',
    methodology: 'In-line gas chromatography, infrared moisture spectrometry, and individual batch traceability analysis.',
    standardRef: '[LAB ANALYTICAL ACCREDITATION]',
  },
  {
    step: '04',
    title: 'DELIVER',
    description: 'Secure and reliable distribution.',
    methodology: 'Sealed tamper-evident valve caps, insulated vacuum transport tankers, and GPS-monitored hazardous-goods logistics.',
    standardRef: '[DISTRIBUTION SAFETY PROTOCOL]',
  },
];

export const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: 'handling',
    title: 'Handling',
    description: 'Controlled procedures for gas handling.',
    iconName: 'Shield',
    protocolCode: '[SAFETY PROTOCOL: HANDLING-01]',
  },
  {
    id: 'storage',
    title: 'Storage',
    description: 'Proper storage systems and monitoring.',
    iconName: 'Layers',
    protocolCode: '[SAFETY PROTOCOL: STORAGE-02]',
  },
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Safe movement and delivery of gas products.',
    iconName: 'Truck',
    protocolCode: '[SAFETY PROTOCOL: LOGISTICS-03]',
  },
  {
    id: 'compliance',
    title: 'Compliance',
    description: 'Operations designed around applicable safety and quality requirements.',
    iconName: 'CheckCircle2',
    protocolCode: '[SAFETY PROTOCOL: AUDIT-04]',
  },
];

export const WHY_COLUMNS: PillarItem[] = [
  {
    title: 'CONSISTENCY',
    description: 'Reliable product quality and controlled processes.',
    detail: 'Continuous batch validation ensures zero variance across deliveries.',
  },
  {
    title: 'PRECISION',
    description: 'Gas purity and filling handled with attention to specification.',
    detail: 'Trace moisture and particulate levels calibrated to ppm tolerances.',
  },
  {
    title: 'RELIABILITY',
    description: 'Supply solutions designed around customer requirements.',
    detail: 'Multi-hub distribution networks to prevent regional interruptions.',
  },
  {
    title: 'PARTNERSHIP',
    description: 'Long-term relationships with customers across industries.',
    detail: 'Dedicated gas engineers assist in telemetry sizing and equipment safety audits.',
  },
];

export const PLACEHOLDERS = {
  certification: '[CERTIFICATION]',
  productionCapacity: '[PRODUCTION CAPACITY: 250,000 NM³/MONTH EST.]',
  phone: '[PHONE NUMBER: +1 (800) 555-OXYC]',
  email: '[EMAIL ADDRESS: supply@oxycarbonindustries.com]',
  facilityAddress: '[FACILITY ADDRESS: 100 Industrial Parkway, Cryogenic Complex A, Sector 7]',
};
