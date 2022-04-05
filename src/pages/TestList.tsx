import { Box, Button } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../configs';
import api from '../utils/api';

interface ITestResponse {
  id: number;
  title: string;
  postId: number;
  questions: {
    id: number;
    name: string;
    testId: number;
    isRightQuestion: boolean;
  }[];
}

interface ITestAnswer {
  testId: number;
  answerId: number;
}

export const TestList = () => {
  const [tests, setTests] = useState<ITestResponse[]>([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const [answers, setAnswers] = useState<ITestAnswer[]>([]);

  const radioButtonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const currentTest = tests.find((test) => test.title === name);
    const option = currentTest?.questions.find(
      (option) => option.name === value
    );
    if (option)
      setAnswers([...answers, { testId: option.testId, answerId: option.id }]);
  };

  const submitData = async () => {
    const result = await api.post(BASE_URL + 'posts/' + id + '/tests', answers);
    console.log(result);
    navigate('/posts/' + id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(BASE_URL + 'posts/' + id + '/tests');
      if (result.status === 200) {
        setTests(result.data);
        console.log(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="create_test">
        {tests &&
          tests.map((test, i) => (
            <div key={i}>
              <MDEditor.Markdown source={test.title} />
              {test.questions.map((option, j) => (
                <div key={j} className="create_test__grid-option">
                  <input
                    type="radio"
                    name={test.title}
                    value={option.name}
                    onChange={radioButtonHandler}
                  />
                  {option.name}
                </div>
              ))}
            </div>
          ))}
      </div>
      <div className="create_test__button">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={submitData}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
