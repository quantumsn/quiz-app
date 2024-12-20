import TextField from "@mui/material/TextField";

export function InputBox({ placeholder, values, onChangeValue, styles }) {
  return (
    <>
      <TextField
        id="standard-basic"
        placeholder={placeholder}
        value={values}
        onChange={(e) => onChangeValue(e.target.value)}
        label={placeholder}
        variant="standard"
        className="md:w-4/5 w-72 "
        required
      />
    </>
  );
}
