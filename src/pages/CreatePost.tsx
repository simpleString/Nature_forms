import React, { useState } from 'react';

import '../styles/createPost.css';
import api from '../utils/api';
import { BASE_URL } from '../configs';
import { MDCreateFrom } from '../components/MDCreateForm';

import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface ITestForm {
  title: string;
  options: {
    id: number;
    name: string;
  }[];
  rightAnswer: number;
}

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [tests, setTests] = useState<ITestForm[]>([]);
  const navigate = useNavigate();

  const createPost = async () => {
    const result = await api.post(BASE_URL + 'posts', {
      title,
      content,
      tests,
    });
    console.log(result);

    if (result.status === 200) {
      navigate('posts/' + result.data.id + '/test');
    }
    console.log(result.data);
  };

  const deleteRadioButton = (test: ITestForm, questionIndex: number) => {
    test.options = test.options.filter((option) => option.id !== questionIndex);
    setTests([...tests]);
  };

  const createTest = async () => {
    setTests([...tests, { title: '', options: [], rightAnswer: 0 }]);
  };

  const createRadioButton = (index: number) => {
    tests[index].options.push({
      id: tests[index].options.length + 1,
      name: '',
    });
    setTests([...tests]);
  };

  const changeRadioButtonName = (
    e: React.ChangeEvent<HTMLInputElement>,
    testIndex: number,
    optionIndex: number
  ) => {
    tests[testIndex].options[optionIndex].name = e.target.value;
    setTests([...tests]);
  };

  const changeTestTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
    testIndex: number
  ) => {
    tests[testIndex].title = e.target.value;
    setTests([...tests]);
  };

  const radioButtonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const currentTest = tests.find((test) => test.title === name);
    const option = currentTest?.options.find((option) => option.name === value);
    if (currentTest && option) currentTest.rightAnswer = option.id;
    setTests([...tests]);
  };

  return (
    <div>
      <MDCreateFrom
        title={title}
        content={content}
        setContent={setContent}
        setTitle={setTitle}
      />

      <div className="create_test">
        {tests &&
          tests.map((test, i) => (
            <div key={i}>
              <h1>
                <input
                  type="text"
                  value={test.title}
                  onChange={(e) => {
                    changeTestTitle(e, i);
                  }}
                />
              </h1>
              {test.options.map((option, j) => (
                <div key={j} className="create_test__option">
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) => changeRadioButtonName(e, i, j)}
                  />
                  <input
                    type="radio"
                    name={test.title}
                    value={option.name}
                    onChange={radioButtonHandler}
                  />
                  <DeleteIcon
                    onClick={() => deleteRadioButton(test, option.id)}
                    className="create_test__delete-button"
                  />
                </div>
              ))}

              <button onClick={() => createRadioButton(i)}>RadioCreate</button>
            </div>
          ))}
        <div className="create_test_header">
          <button onClick={createTest}>Create test</button>
        </div>
      </div>

      <div className="create_form_finish">
        <button onClick={createPost}>Create</button>
      </div>
    </div>
  );
};
