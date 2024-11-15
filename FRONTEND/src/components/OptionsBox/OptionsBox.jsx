import TextField from "@mui/material/TextField";

export function OptionsBox({ option, onChangeOption }) {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Options"
        value={option}
        onChange={(e) => onChangeOption(e.target.value)}
        variant="outlined"
      />
    </>
  );
}
