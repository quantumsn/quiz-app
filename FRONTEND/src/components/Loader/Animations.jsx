import { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations() {
  let [loader, setLoader] = useState(Array(5).fill("load"));
  return (
    <div className="max-w-screen flex items-center flex-col justify-center flex-1">
      {loader.map((l, idx) => (
        <Box key={idx} className={"w-3/4 m-4"}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ))}
    </div>
  );
}
