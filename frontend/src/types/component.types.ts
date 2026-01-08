/**
 * Component prop types.
 */
import type { UseFormReturn } from 'react-hook-form';
import type { AnalyseFormType } from './form.types';

/** Base layout component props. */
export interface BaseLayoutPropsType {
    children: React.ReactNode;
}

/** Loading spinner component props. */
export interface LoadingSpinnerPropsType {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

/** Analyse form component props. */
export interface AnalyseFormPropsType {
    form: UseFormReturn<AnalyseFormType>;
    onSubmit: (values: AnalyseFormType) => void;
    isPending: boolean;
}

/** Result display component props. */
export interface ResultDisplayPropsType {
    prediction: string;
    data: AnalyseFormType;
    onReset: () => void;
}

/** Result state for analyse page. */
export interface ResultStateType {
    prediction: string | null;
    error: string | null;
    data: AnalyseFormType | null;
}

/** Health tip entry. */
export interface HealthTipType {
    title: string;
    tips: string[];
}

/** History entry for localStorage. */
export interface HistoryEntryType {
    id: string;
    timestamp: number;
    prediction: string;
    data: AnalyseFormType;
}

/** Global health stat entry. */
export interface HealthStatType {
    label: string;
    value: string;
    unit: string;
    note: string;
    source?: string;
    status: 'accurate' | 'warning' | 'critical';
}

/** Obesity prevalence stat. */
export interface ObesityStatType {
    label: string;
    value: string;
    description: string;
}

/** Key finding entry. */
export interface KeyFindingType {
    title: string;
    stat: string;
    description: string;
}

