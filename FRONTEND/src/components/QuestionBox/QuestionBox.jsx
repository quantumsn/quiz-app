import { useEffect, useState } from "react";
import { InputBox } from "../InputBox/InputBox";
import { OptionsBox } from "../OptionsBox/OptionsBox";
import Button from "@mui/material/Button";

export function QuestionBox({ question, onUpdate }) {
  let [values, setvalue] = useState(question.quesText);
  let [options, setOptions] = useState(question.options);

  useEffect(() => {
    onUpdate({ quesText: values, options });
  }, [values, options]);

  const addOptions = () => {
    setOptions((prevOps) => {
      return [...prevOps, ""];
    });
  };

  const handleOptions = (val, idx) => {
    setOptions((prevOps) => {
      prevOps[idx] = val;
      return [...prevOps];
    });
  };
  return (
    <>
      <div className="bg-slate-300 w-1/2 rounded-sm min-h-96 my-4 flex flex-col justify-center items-center gap-4 py-4">
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
      </div>
    </>
  );
}
