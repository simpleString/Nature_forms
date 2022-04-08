import { Box, Button } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../configs';
import api from '../utils/api';
import '../styles/TestList.css';

interface ITestResponse {
  id: number;
  title: string;
  postId: number;
  post: {
    title: string;
  };
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
    navigate('result');
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
    <div className="test container">
      <div className="test__title">Тест по разделу {tests[0]?.post.title}</div>
      {tests.map((test, i) => (
        <div className="test__question" key={i}>
          <MDEditor.Markdown className="test__title" source={`${test.title}`} />
          {test.questions.map((option, j) => (
            <div key={j} className="test__row">
              <input
                type="radio"
                name={test.title}
                value={option.name}
                onChange={radioButtonHandler}
              />
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="login__inputs-button test__button">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={submitData}
        >
          Проверить
        </Button>
      </div>
    </div>
  );
};
