export interface Test {
    id: string;
    title: string;
    content: string;
}

export interface Question {
    id: string;
    testId: string;
    title: string;
}
