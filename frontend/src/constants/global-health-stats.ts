/**
 * Global health statistics constants.
 * Data sourced from WHO, IDF, World Obesity Federation, and peer-reviewed studies.
 */
import type { HealthStatType, ObesityStatType, KeyFindingType } from '@/types';

export const GLOBAL_HEALTH_STATS: HealthStatType[] = [
    {
        label: 'Global Average BMI',
        value: '25',
        unit: 'kg/m²',
        note: 'Threshold for overweight classification (WHO 2016)',
        source: 'Our World in Data',
        status: 'warning',
    },
    {
        label: 'Blood Pressure',
        value: '127/78',
        unit: 'mmHg',
        note: 'Age-standardized mean; higher than optimal 120/80',
        source: 'NCD Risk Factor Collaboration',
        status: 'warning',
    },
    {
        label: 'Adults with Obesity',
        value: '1B+',
        unit: 'people',
        note: 'Tripled since 1975, 79% in low/middle-income countries',
        source: 'World Obesity Federation 2024',
        status: 'critical',
    },
    {
        label: 'Diabetes Prevalence',
        value: '589M',
        unit: 'adults',
        note: '43% undiagnosed, projected 853M by 2050',
        source: 'IDF Diabetes Atlas 2024',
        status: 'critical',
    },
    {
        label: 'Hypertension',
        value: '1.4B',
        unit: 'adults',
        note: 'Only 23% have blood pressure under control',
        source: 'WHO 2025',
        status: 'critical',
    },
    {
        label: 'Physical Inactivity',
        value: '31%',
        unit: 'of adults',
        note: '1.8B people fail to meet 150 min/week recommendation',
        source: 'WHO 2024',
        status: 'warning',
    },
];

export const OBESITY_PREVALENCE: ObesityStatType[] = [
    { label: 'Adults Obese', value: '1 billion+', description: 'BMI ≥30' },
    { label: 'Adults Overweight', value: '2 billion+', description: 'BMI 25-29.9' },
    { label: 'Children Obese', value: '160 million', description: 'Ages 5-19' },
    { label: 'Children Overweight', value: '390 million', description: 'Ages 5-19' },
];

export const KEY_FINDINGS: KeyFindingType[] = [
    {
        title: 'NCDs Dominate',
        stat: '64%',
        description: 'Of global disease burden from non-communicable diseases',
    },
    {
        title: 'Diabetes Spending',
        stat: '$1.015T',
        description: 'Annual health expenditure (338% increase since 2007)',
    },
    {
        title: 'Life Expectancy',
        stat: '73.4 years',
        description: 'Global average (70.8 male, 76.0 female)',
    },
    {
        title: 'Under-5 Mortality',
        stat: '37 per 1,000',
        description: '59% improvement since 1990',
    },
];
