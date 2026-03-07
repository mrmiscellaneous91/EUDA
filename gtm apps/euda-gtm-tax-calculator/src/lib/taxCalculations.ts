import spendingData from './spendingData.json';

export interface TaxBreakdown {
    gross: number;
    net: number;
    totalTax: number;
    totalSS: number;
    irpf: number;
    ss: number;
    spending: SpendingCategory[];
    details?: TaxDetails;
}

export interface TaxDetails {
    // For Autonomo
    expenseDeduction?: number;
    netYields?: number;
    monthlyNetYields?: number;
    ssTramo?: {
        tramoNumber: number;
        minBase: number;
        maxBase: number;
        chosenBase: number;
        monthlyQuota: number;
        description: string;
    };
    // For Employee
    employerSS?: number;
    // Common
    irpfBrackets: IRPFBracketResult[];
    taxableBase: number;
}

export interface IRPFBracketResult {
    from: number;
    to: number;
    rate: number;
    taxableInBracket: number;
    taxPaid: number;
}

export interface SpendingCategory {
    name: string;
    percentage: number;
    amount: number;
    description: string;
    subcategories: SpendingSubcategory[];
}

export interface SpendingSubcategory {
    name: string;
    percentage: number;
    amount: number;
    description: string;
}

// IRPF Brackets 2025 (from official Tax Agency data)
export const IRPF_BRACKETS = [
    { limit: 12450, rate: 0.19 },
    { limit: 20200, rate: 0.24 },
    { limit: 35200, rate: 0.30 },
    { limit: 60000, rate: 0.37 },
    { limit: 300000, rate: 0.45 },
    { limit: Infinity, rate: 0.47 },
];

// Autonomo Social Security Tramos 2025 (based on monthly net yields)
// Rate: 31.40% (28.3% common + 1.3% professional + 0.9% cessation + 0.1% training + 0.8% MEI)
const AUTONOMO_SS_RATE = 0.314;

interface SSTramo {
    minIncome: number;  // Monthly net income lower bound
    maxIncome: number;  // Monthly net income upper bound
    minBase: number;    // Minimum contribution base
    maxBase: number;    // Maximum contribution base (for most, user can choose)
    tramoNumber: number;
}

// Official 2025 Autonomo SS Tramos (monthly figures)
const AUTONOMO_TRAMOS: SSTramo[] = [
    { tramoNumber: 1, minIncome: 0, maxIncome: 670, minBase: 653.59, maxBase: 653.59 },
    { tramoNumber: 2, minIncome: 670, maxIncome: 900, minBase: 718.95, maxBase: 900 },
    { tramoNumber: 3, minIncome: 900, maxIncome: 1166.70, minBase: 718.95, maxBase: 1166.70 },
    { tramoNumber: 4, minIncome: 1166.70, maxIncome: 1300, minBase: 950.98, maxBase: 1300 },
    { tramoNumber: 5, minIncome: 1300, maxIncome: 1500, minBase: 960.78, maxBase: 1500 },
    { tramoNumber: 6, minIncome: 1500, maxIncome: 1700, minBase: 960.78, maxBase: 1700 },
    { tramoNumber: 7, minIncome: 1700, maxIncome: 1850, minBase: 1143.79, maxBase: 1850 },
    { tramoNumber: 8, minIncome: 1850, maxIncome: 2030, minBase: 1209.15, maxBase: 2030 },
    { tramoNumber: 9, minIncome: 2030, maxIncome: 2330, minBase: 1274.51, maxBase: 2330 },
    { tramoNumber: 10, minIncome: 2330, maxIncome: 2760, minBase: 1356.21, maxBase: 2760 },
    { tramoNumber: 11, minIncome: 2760, maxIncome: 3190, minBase: 1437.91, maxBase: 3190 },
    { tramoNumber: 12, minIncome: 3190, maxIncome: 3620, minBase: 1519.61, maxBase: 3620 },
    { tramoNumber: 13, minIncome: 3620, maxIncome: 4050, minBase: 1601.31, maxBase: 4050 },
    { tramoNumber: 14, minIncome: 4050, maxIncome: 6000, minBase: 1732.03, maxBase: 4720.50 },
    { tramoNumber: 15, minIncome: 6000, maxIncome: Infinity, minBase: 1928.10, maxBase: 4909.50 },
];

export function getAutonomoTramo(monthlyNetYields: number): SSTramo {
    for (const tramo of AUTONOMO_TRAMOS) {
        if (monthlyNetYields >= tramo.minIncome && monthlyNetYields < tramo.maxIncome) {
            return tramo;
        }
    }
    // Default to highest tramo if above all
    return AUTONOMO_TRAMOS[AUTONOMO_TRAMOS.length - 1];
}

export function calculateAutonomoSS(monthlyNetYields: number): { annual: number; tramo: SSTramo; monthlyQuota: number; chosenBase: number } {
    const tramo = getAutonomoTramo(monthlyNetYields);
    // Most autonomos choose minimum base to minimize costs
    // We use minimum base as the default (most common choice)
    const chosenBase = tramo.minBase;
    const monthlyQuota = chosenBase * AUTONOMO_SS_RATE;
    const annual = monthlyQuota * 12;

    return { annual, tramo, monthlyQuota, chosenBase };
}

export function calculateIRPFWithDetails(taxableIncome: number): { total: number; brackets: IRPFBracketResult[] } {
    let tax = 0;
    let prevLimit = 0;
    const brackets: IRPFBracketResult[] = [];

    for (const bracket of IRPF_BRACKETS) {
        if (taxableIncome <= prevLimit) break;

        const to = Math.min(taxableIncome, bracket.limit);
        const taxableInBracket = to - prevLimit;
        const taxPaid = taxableInBracket * bracket.rate;

        if (taxableInBracket > 0) {
            brackets.push({
                from: prevLimit,
                to: to,
                rate: bracket.rate,
                taxableInBracket,
                taxPaid
            });
            tax += taxPaid;
        }
        prevLimit = bracket.limit;
    }

    return { total: tax, brackets };
}

export function calculateIRPF(taxableIncome: number): number {
    return calculateIRPFWithDetails(taxableIncome).total;
}

// Employee Social Security Rate (from official data)
// 4.7% common contingencies + 1.55% unemployment + 0.1% training = 6.35%
const EMPLOYEE_SS_RATE = 0.0635;

// Employer Social Security Rate (approximate)
const EMPLOYER_SS_RATE = 0.299;

export function getTaxBreakdown(amount: number, type: 'employee' | 'autonomo', period: 'monthly' | 'yearly'): TaxBreakdown {
    const annualGross = period === 'monthly' ? amount * 12 : amount;
    let irpf = 0;
    let ss = 0;
    let details: TaxDetails;

    if (type === 'employee') {
        // Employee: SS is deducted from gross, then IRPF on remaining
        ss = annualGross * EMPLOYEE_SS_RATE;
        const taxableBase = annualGross - ss;
        const irpfResult = calculateIRPFWithDetails(taxableBase);
        irpf = irpfResult.total;

        details = {
            employerSS: annualGross * EMPLOYER_SS_RATE,
            taxableBase,
            irpfBrackets: irpfResult.brackets,
        };
    } else {
        // Autonomo: Apply 7% general expense deduction, then use tramo system
        const expenseDeduction = annualGross * 0.07;
        const netYields = annualGross - expenseDeduction;
        const monthlyNetYields = netYields / 12;

        // Calculate SS using official tramo system
        const ssResult = calculateAutonomoSS(monthlyNetYields);
        ss = ssResult.annual;

        // IRPF is calculated on net yields minus SS contributions
        const taxableBase = netYields - ss;
        const irpfResult = calculateIRPFWithDetails(taxableBase);
        irpf = irpfResult.total;

        details = {
            expenseDeduction,
            netYields,
            monthlyNetYields,
            ssTramo: {
                tramoNumber: ssResult.tramo.tramoNumber,
                minBase: ssResult.tramo.minBase,
                maxBase: ssResult.tramo.maxBase,
                chosenBase: ssResult.chosenBase,
                monthlyQuota: ssResult.monthlyQuota,
                description: getTramoDescription(ssResult.tramo.tramoNumber),
            },
            taxableBase,
            irpfBrackets: irpfResult.brackets,
        };
    }

    const totalContribution = irpf + ss;
    const net = annualGross - totalContribution;

    const spending = (spendingData as any[]).map(cat => ({
        name: cat.name,
        percentage: cat.percentage,
        amount: totalContribution * cat.percentage,
        description: cat.description || '',
        subcategories: (cat.subcategories || []).map((sub: any) => ({
            name: sub.name,
            percentage: sub.percentage,
            amount: totalContribution * sub.percentage,
            description: sub.description || ''
        }))
    }));

    return {
        gross: annualGross,
        net,
        totalTax: totalContribution,
        totalSS: ss,
        irpf,
        ss,
        spending,
        details,
    };
}

function getTramoDescription(tramoNumber: number): string {
    if (tramoNumber <= 3) return 'Low income';
    if (tramoNumber <= 6) return 'Lower-middle income';
    if (tramoNumber <= 10) return 'Middle income';
    if (tramoNumber <= 13) return 'Upper-middle income';
    return 'High income';
}
