import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";

export default function ShareQuiz() {
  const [url, setUrl] = useState(window.location.href);

  let urlRef = useRef(null);
  const handleCopyUrl = () => {
    urlRef.current?.select();
    window.navigator.clipboard.writeText(currentUrl);
  };
  return (
    <div className="flex justify-center m-4">
      <input
        type="text"
        placeholder="Write your Quiz tiltle"
        value={url}
        ref={urlRef}
        readOnly
        className="w-full text-xl bg-white p-3 box-border shadow-sm focus:outline-none border border-orange-700 text-black"
      />
      <Button
        className="!bg-orange-700 !rounded-none"
        variant="contained"
        onClick={handleCopyUrl}
      >
        Copy
      </Button>
    </div>
  );
}
