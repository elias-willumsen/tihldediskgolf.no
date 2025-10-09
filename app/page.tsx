import { Disc3 } from "lucide-react";
import ResultsBox from "../components/results-box";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 px-4">
        <h1 className="flex items-center justify-center gap-3 text-5xl font-semibold">
          <Disc3 className="h-[1em] w-[1em]" />
          TIHLDE Diskgolf
        </h1>

        {/*Innhold og reultatboks*/}
        <ResultsBox />
      </div>
    </div>
  );
}