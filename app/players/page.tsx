import PlayerForm from "./player-form";
import PlayersClient from "./PlayersClient";

export default function PlayersPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Players</h1>
      <PlayerForm />
      <PlayersClient />
    </>
  );
}
