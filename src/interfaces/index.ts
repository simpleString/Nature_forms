export interface IUserData {
  email: string;
  password: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  category: string;
  img: string;
  tests: ITest[];
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

export interface IUserSignDTO {
  username: string;
  surname: string;
  password: string;
  email: string;
  status: string;
}

export interface IUserStatus {
  id: number;
  name: string;
}
