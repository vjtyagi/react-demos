import { Room, User } from "./utils";

export default function UserDetails({
  user,
  roomsData,
}: {
  user: User | null;
  roomsData: Room[];
}) {
  return (
    <div className="user-details-container">
      <div className="user-info">
        <div className="greetings">
          Hello, {user?.firstname} {user?.lastname}
        </div>
        <div className="credits">Available Credits: {user?.credits}</div>
      </div>
      <UserReservedRooms rooms={roomsData} />
    </div>
  );
}
function UserReservedRooms({ rooms }: { rooms: Room[] }) {
  return (
    <div className="reserved-rooms">
      <h3>Reserved Rooms:</h3>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Room Cost</th>
          </tr>
        </thead>
        <tbody>
          {rooms
            .filter((room) => room.isReserved)
            .map((room) => {
              return (
                <tr key={room.id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.cost}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
