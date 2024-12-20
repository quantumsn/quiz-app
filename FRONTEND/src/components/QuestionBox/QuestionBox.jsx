import { useEffect, useState } from "react";
import { InputBox } from "../InputBox/InputBox";
import { OptionsBox } from "../OptionsBox/OptionsBox";
import Button from "@mui/material/Button";

export function QuestionBox({ question, onUpdate }) {
  let [values, setvalue] = useState(question.quesText);
  let [options, setOptions] = useState(question.options);
  let [answer, setAnswer] = useState(question.answer);

  useEffect(() => {
    setvalue(question.quesText);
    setOptions(question.options);
    setAnswer(question.answer);
  }, [question]);

  useEffect(() => {
    onUpdate({ quesText: values, options, answer });
  }, [values, options, answer]);

  const addOptions = () => {
    setOptions((prevOps) => {
      return [...prevOps, ""];
    });
  };

  const handleOptions = (val, idx) => {
    setOptions((prevOps) => {
      const updatedOptions = [...prevOps];
      updatedOptions[idx] = val;
      return updatedOptions;
    });
  };

  return (
    <>
      <div className="bg-slate-300 md:w-1/2 rounded-md min-h-96 m-4 flex flex-col justify-center items-center gap-4 p-4">
        <InputBox
          placeholder={"Write your question.."}
          values={values}
          onChangeValue={(val) => setvalue(val)}
        />
        {options.map((op, idx) => (
          <OptionsBox
            key={idx}
            option={options[idx]}
            onChangeOption={(val) => handleOptions(val, idx)}
          />
        ))}

        <Button onClick={addOptions} className="!text-orange-700">
          Add Options
        </Button>

        <input
          className="w-70 text-sm bg-transparent p-3 focus:outline-none border placeholder-gray-600 border-orange-600 rounded-md text-black"
          type="text"
          placeholder="Write answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </div>
    </>
  );
}
