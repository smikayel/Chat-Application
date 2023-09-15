import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface MessagesI {
  roomName: string;
  senderName: string;
  date: string;
  text: string;
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private rooms: string[] = [];
  private messages: MessagesI[] = [];

  handleConnection(client: Socket) {
    console.log('Client connected to the socket');
  }

  handleDisconnect(client: Socket) {
    console.log('Client dsconnected from socket');
  }

  @SubscribeMessage('getRooms')
  handleGiveRomms(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('ClientGetRooms', this.rooms);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() data: MessagesI,
    @ConnectedSocket() client: Socket,
  ) {
    this.messages.push(data);
    client.broadcast.emit('ReciveMessage', data);
  }

  @SubscribeMessage('getRoomMessages')
  handleGetRoomMessages(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomName);
    const roomMessages = this.messages.filter(
      (message) => message.roomName === roomName,
    );
    client.emit('ClientGetRoomMessages', roomMessages);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (this.rooms.includes(roomName)) {
      client.emit('errorMsg', `Room "${roomName}" already exists.`);
    } else {
      this.rooms.push(roomName);
      client.emit('ClientGetRooms', this.rooms);
      client.broadcast.emit('ClientGetRooms', this.rooms);
    }
  }
}
