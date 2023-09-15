import { useState, useEffect, useRef } from "react";
import io from "socket.io-client"
import { Message } from "../components/Message/message";
import Rooms from "../components/Rooms/rooms";
import CustomButton from "../components/button";
import CustomInput from "../components/input";
import authService from "../services/auth/auth.service";
import { getCurrentTime } from "../features/utils/getDate";

export interface MessagesI {
  roomName: string;
  senderName: string;
  date: string;
  text: string;
}

export interface UserI {
  uuid: string;
  username: string;
  accessToken?: string;
}

export function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [error, setError] = useState('')
  const [selectedRoom, setSelectedRoom] = useState("")
  const [user, setCurrentUser] = useState<UserI>()
  const [rooms, setRooms] = useState<string[]>([]);
  const [messagesData, setMessagesHistory] = useState<MessagesI[]>([]);
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<any>(null);

  useEffect(() => {
    socket.current = io("ws://localhost:4200/"); 
    socket.current.on("ClientGetRooms", (roomData: string[]) => {
      setRooms(roomData)
      setError('')
    });
    socket.current.on("ReciveMessage", (rcvMessage: MessagesI) => {
      if (rcvMessage.roomName === selectedRoom) {
        setMessagesHistory((prevMessages) => [...prevMessages, rcvMessage]);
      }
    });

    socket.current.on("ClientGetRoomMessages", (roomData: MessagesI[]) => {
      setMessagesHistory(roomData)
      setError('')
    });

    socket.current.on("errorMsg", (errorFromSocket: string) => {
      setError(errorFromSocket)
    })

    const getUser = async() => {
      const user = await authService.getCurrentUser();
      setCurrentUser(user)
    }

    handleGetRooms()
    getUser()

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [])
  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [messagesData]);

  const handleGetRooms = () => {
    socket.current.emit("getRooms");
  }

  const handleCreateRoom = () => {
    newGroupName && socket.current.emit("createRoom", newGroupName);
  };

  const handleGetRoomMessages = (roomName: string) => {
    socket.current.emit("getRoomMessages", roomName);
    setSelectedRoom(roomName)
  };

  const handleSendMessage = async () => {
    if (!newMessage || !user) return

    const newMessageInfo = {
      roomName: selectedRoom,
      senderName: user.username,
      date: getCurrentTime(),
      text: newMessage,
    }
    socket.current.emit("sendMessage", newMessageInfo);
    setMessagesHistory([...messagesData, newMessageInfo])
    setNewMessage("");
  }
console.log(messagesData)
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-col mt-8">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Rooms</span>
            </div>
            <Rooms roomsData={rooms} roomOnClick={handleGetRoomMessages}/>
            <hr />
            <div className="flex flex-col">
              <CustomInput
                placeholder="new goup name"
                value={newGroupName}
                onChange={setNewGroupName}
              />
              <CustomButton
                text="Create Room"
                customStyles={{ height: "35px", fontSize: "15px", padding: 0 }}
                onClick={handleCreateRoom}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div
                  className=" h-full grid grid-cols-12 gap-y-2 overflow-y-scroll"
                  ref={scrollableDivRef}
                >
                  {messagesData.map((messageInfo) => {
                    return (
                      <Message
                        senderName={messageInfo.senderName}
                        messageContent={messageInfo.text}
                        date={messageInfo.date}
                        isClient={messageInfo.senderName === user?.username}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
