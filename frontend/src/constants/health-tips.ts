/**
 * Health tips based on prediction result.
 */
import type { HealthTipType } from '@/types';

const TIPS: Record<string, HealthTipType> = {
    'Normal Weight': {
        title: 'Maintain Your Healthy Lifestyle',
        tips: [
            'Continue your balanced diet and regular exercise routine',
            'Stay hydrated with 8+ glasses of water daily',
            'Get 7-9 hours of quality sleep each night',
            'Schedule regular health check-ups annually',
        ],
    },
    'Overweight Level I': {
        title: 'Small Changes, Big Impact',
        tips: [
            'Reduce portion sizes by 10-15%',
            'Add 30 minutes of walking to your daily routine',
            'Replace sugary drinks with water or unsweetened beverages',
            'Consider speaking with a nutritionist for a personalized plan',
        ],
    },
    'Overweight Level II': {
        title: 'Time for Action',
        tips: [
            'Consult a healthcare professional for guidance',
            'Focus on whole foods: vegetables, lean proteins, whole grains',
            'Aim for 150 minutes of moderate exercise per week',
            'Track your meals to identify patterns and areas for improvement',
        ],
    },
    'Obesity Type I': {
        title: 'Professional Support Recommended',
        tips: [
            'Schedule an appointment with your doctor to discuss options',
            'Start with low-impact exercises like swimming or cycling',
            'Consider joining a support group or weight management program',
            'Focus on sustainable lifestyle changes rather than quick fixes',
        ],
    },
    'Obesity Type II': {
        title: 'Medical Guidance Important',
        tips: [
            'Work closely with healthcare providers for a comprehensive plan',
            'Explore medically supervised weight management programs',
            'Prioritize mental health support alongside physical changes',
            'Set small, achievable goals to build momentum',
        ],
    },
    'Obesity Type III': {
        title: 'Comprehensive Care Needed',
        tips: [
            'Seek a multidisciplinary healthcare team including doctors and nutritionists',
            'Discuss all treatment options with your healthcare provider',
            'Focus on gradual, sustainable improvements',
            'Celebrate every small victory in your health journey',
        ],
    },
    'Insufficient Weight': {
        title: 'Building Healthy Weight',
        tips: [
            'Consult a doctor to rule out underlying conditions',
            'Eat nutrient-dense foods more frequently throughout the day',
            'Include strength training to build muscle mass',
            'Consider working with a dietitian for a weight gain plan',
        ],
    },
};

export function getTipsForPrediction(prediction: string): HealthTipType {
    return TIPS[prediction] || {
        title: 'General Health Tips',
        tips: [
            'Maintain a balanced diet rich in fruits and vegetables',
            'Exercise regularly for at least 30 minutes daily',
            'Stay hydrated and get adequate sleep',
            'Consult healthcare professionals for personalized advice',
        ],
    };
}
