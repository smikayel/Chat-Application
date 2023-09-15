import { memo } from "react";

const backgroundOptions = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-gray-500",
  // colors
];

interface RoomsI {
  roomsData: string[];
  roomOnClick: (roomName: string) => void;
}

function Rooms({ roomsData, roomOnClick }: RoomsI) {
  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-80 overflow-y-auto">
      {roomsData.map((room) => {
        const randomBackground =
          backgroundOptions[
            Math.floor(Math.random() * backgroundOptions.length)
          ];

        return (
          <button
            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            key={room}
            onClick={() => roomOnClick(room)}
          >
            <div
              className={`flex items-center justify-center h-8 w-8 ${randomBackground} rounded-full`}
            >
              {room[0]}
            </div>
            <div className="ml-2 text-sm font-semibold">{room}</div>
          </button>
        );
      })}
    </div>
  );
}

export default memo(Rooms);
