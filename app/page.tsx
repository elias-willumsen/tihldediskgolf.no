import { Disc3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <h1 className="flex items-center justify-center gap-3 text-5xl font-semibold">
        <Disc3 className="h-[1em] w-[1em]" />
        Tihlde diskgolf!
      </h1>
    </div>
  );
}
