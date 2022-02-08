export interface IUserData {
  username: string;
  password: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
}

export type IPostWithTestCount = IPost & {
  _count: {
    tests: number;
  };
  maxResult: number;
};

export interface ITest {
  id: string;
  title: string;
  question: string;
}
