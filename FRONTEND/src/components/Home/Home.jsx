import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-80 text-center">
        <Link to="/quiz/new">
          <Button style={{ marginRight: "1rem" }} variant="outlined">
            New Quiz
          </Button>
        </Link>
        <Link to="/quiz">
          <Button variant="outlined">Quiz</Button>
        </Link>
      </div>
    </div>
  );
}
