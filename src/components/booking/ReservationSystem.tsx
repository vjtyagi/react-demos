import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./reservation.css";
import UserDetails from "./UserDetails";
import useFetchData from "./useFetchData";
import { Room, User } from "./utils";
export default function ReservationSystem() {
  const { data, status: roomDataStatus } = useFetchData<Room[]>(
    "rooms_data",
    []
  );
  const [roomsData, setRoomsData] = useState<Room[]>([]);

  const { data: userData, status: userDetailsStatus } =
    useFetchData<User | null>("user_data", null);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  const roomCost = useMemo(() => {
    return roomsData
      .filter((room) => room.isReserved)
      .reduce((acc, curr) => acc + curr.cost, 0);
  }, [roomsData]);

  useEffect(() => {
    setRoomsData([...data]);
  }, [data]);

  useEffect(() => {
    setUserDetails(userData ? { ...userData } : null);
  }, [userData]);

  useEffect(() => {
    if (userData) {
      setUserDetails((prev) => {
        return prev
          ? {
              ...prev,
              credits: userData?.credits - roomCost,
            }
          : null;
      });
    }
  }, [roomsData]);

  const handleReserve = (id: string) => {
    setRoomsData((prev) => {
      return prev.map((room) => {
        if (room.id == id) {
          return {
            ...room,
            isReserved: !room.isReserved,
          };
        } else {
          return room;
        }
      });
    });
  };

  console.log("ReservationSystem rendered");

  return (
    <div className="reservation-system">
      <div className="title">Book a Room!</div>
      <div className="details-container">
        {roomsData && userDetails && (
          <RoomList
            roomsData={roomsData}
            user={userDetails}
            handleReserve={handleReserve}
          />
        )}
        <div className="user-details-section">
          {userDetails && (
            <UserDetails user={userDetails} roomsData={roomsData} />
          )}
        </div>
      </div>
    </div>
  );
}
function RoomList({
  roomsData,
  user,
  handleReserve,
}: {
  roomsData: Room[];
  user: User | null;
  handleReserve: Function;
}) {
  return (
    <div className="rooms-list-container">
      {roomsData != null &&
        roomsData.map((record: Room) => {
          return (
            <MeetingRoom
              key={record.id}
              record={record}
              onClick={handleReserve}
              user={user}
            />
          );
        })}
    </div>
  );
}
function MeetingRoom({
  record,
  onClick,
  user,
}: {
  record: Room;
  onClick: Function;
  user: User | null;
}) {
  const handleClick = useCallback(() => {
    onClick(record.id);
  }, [record]);
  return (
    <div className="room" onClick={handleClick}>
      <div className="room__num">R{record.roomNumber}</div>
      <div className="room__cost">Cost: {record.cost}</div>
      <div className="room__status">
        {user && <RoomStatus room={record} user={user} />}
      </div>
    </div>
  );
}
function RoomStatus({ room, user }: { room: Room; user: User }) {
  if (room.isReserved) {
    return <div className="room__status--reserved">Reserved</div>;
  } else {
    if (user.credits >= room.cost) {
      return <div className="room__status--available">Available</div>;
    } else {
      return <div className="room__status--credit">Not Enough Credits</div>;
    }
  }
}
