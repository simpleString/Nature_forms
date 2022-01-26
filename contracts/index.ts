export interface ITest {
    id: string;
    title: string;
    content: string;
}

export interface IQuestion {
    id: string;
    testId: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
}
