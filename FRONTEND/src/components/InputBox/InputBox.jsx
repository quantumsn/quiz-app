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
        style={{ fontSize: "10rem" }}
        className="w-96 "
        required
      />
    </>
  );
}
