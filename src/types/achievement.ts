export interface Achievement {
    /* As per Achievement specification */
    id: string;
    date: number;
    data: string[];
    level: number;
    value: number | null;
    goal: number | null;
}