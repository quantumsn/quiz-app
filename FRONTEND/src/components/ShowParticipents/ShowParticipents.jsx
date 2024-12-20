export default function ShowParticipents({ participent, marks }) {
  return (
    <div className="bg-purple-100 m-4 min-w-80 p-6 rounded-xl text-center">
      <h1 className="text-orange-700 text-2xl font-semibold">@{participent}</h1>
      <h3 className="text-gray-800 text-lg font-semibold">Marks : {marks}</h3>
    </div>
  );
}
