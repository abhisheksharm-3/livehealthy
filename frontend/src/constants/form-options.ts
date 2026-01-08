/**
 * Form select options and descriptive labels.
 */
import type { DescriptiveLabelsType } from '@/types';

export const DESCRIPTIVE_LABELS: DescriptiveLabelsType = {
    Age: 'Age',
    Gender: { label: 'Gender', values: { 2: 'Female', 3: 'Male' } },
    Height: 'Height (m)',
    Weight: 'Weight (kg)',
    CALC: {
        label: 'Alcohol Consumption',
        values: { 2: 'Never', 3: 'Sometimes', 4: 'Frequently', 5: 'Almost Daily' },
    },
    FAVC: {
        label: 'High-Calorie Food',
        values: { 2: 'No', 3: 'Yes' },
    },
    FCVC: {
        label: 'Vegetable Intake',
        values: { 1: 'Never', 2: 'Sometimes', 3: 'Always' },
    },
    NCP: 'Meals per Day',
    SCC: { label: 'Calorie Counting', values: { 2: 'No', 3: 'Yes' } },
    SMOKE: { label: 'Smoking', values: { 2: 'No', 3: 'Yes' } },
    CH2O: 'Water (liters)',
    family_history_with_overweight: {
        label: 'Family History',
        values: { 2: 'No', 3: 'Yes' },
    },
    FAF: {
        label: 'Physical Activity',
        values: { 0: 'Never', 1: 'Sometimes', 2: 'Frequently', 3: 'Daily' },
    },
    TUE: 'Tech Use (hours)',
    CAEC: {
        label: 'Snacking',
        values: { 2: 'Never', 3: 'Sometimes', 4: 'Frequently', 5: 'Always' },
    },
    MTRANS: {
        label: 'Transportation',
        values: { 2: 'Car', 3: 'Motorbike', 4: 'Bicycle', 5: 'Public', 6: 'Walking' },
    },
};

export const GENDER_OPTIONS = [
    { value: '3', label: 'Male' },
    { value: '2', label: 'Female' },
];

export const ALCOHOL_OPTIONS = [
    { value: '2', label: 'Never' },
    { value: '3', label: 'Sometimes' },
    { value: '4', label: 'Frequently' },
    { value: '5', label: 'Almost Daily' },
];

export const YES_NO_OPTIONS = [
    { value: '2', label: 'No' },
    { value: '3', label: 'Yes' },
];

export const VEGETABLE_OPTIONS = [
    { value: '1', label: 'Never' },
    { value: '2', label: 'Sometimes' },
    { value: '3', label: 'Always' },
];

export const ACTIVITY_OPTIONS = [
    { value: '0', label: 'Never' },
    { value: '1', label: 'Sometimes' },
    { value: '2', label: 'Frequently' },
    { value: '3', label: 'Daily' },
];

export const SNACKING_OPTIONS = [
    { value: '2', label: 'Never' },
    { value: '3', label: 'Sometimes' },
    { value: '4', label: 'Frequently' },
    { value: '5', label: 'Always' },
];

export const TRANSPORT_OPTIONS = [
    { value: '2', label: 'Car' },
    { value: '3', label: 'Motorbike' },
    { value: '4', label: 'Bicycle' },
    { value: '5', label: 'Public Transport' },
    { value: '6', label: 'Walking' },
];
