import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const API_URL = 'http://localhost:8080';
const SOCKET_URL = `${API_URL}/ws`; // 로컬 테스트 시 사용
// const API_URL = SERVER_BASE_URL;
// const SOCKET_URL = `${API_URL}/wss`;

export default class WebSocketClient {
  private client: Client;

  private isConnected: boolean = false;

  constructor(private userIdVal: string) {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        // 이 부분 수정해야 함
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6ZmFsc2UsInN1YiI6IjE2MDRiNzcyLWFkYzAtNDIxMi04YTkwLTgxMTg2YzU3ZjU5OCIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzEzNDc4MTZ9.6u9YzSMA0OqD3bw4la-qmgy77jJqUnoz_5bMsDNx-5zSlJumHiJYxCEca5hj-lmehwqGVREgXaRIY231QIyJMA',
      },
      debug: () => {
        // console.log('STOMP: ' + str);
      },
      onConnect: () => {
        // console.log('Connected to WebSocket');
        this.isConnected = true; // Set connected status to true
      },
      onDisconnect: () => {
        // console.log('Disconnected from WebSocket');
        this.isConnected = false; // Set connected status to false
      },
      onStompError: () => {
        // console.error('Broker reported error: ' + frame.headers['message']);
        // console.error('Additional details: ' + frame.body);
      },
    });
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.activate();

      this.client.onConnect = () => {
        this.isConnected = true;
        resolve();
      };

      this.client.onDisconnect = () => {
        this.isConnected = false;
      };

      this.client.onStompError = (frame) => {
        // console.error('Broker reported error: ' + frame.headers['message']);
        // console.error('Additional details: ' + frame.body);
        reject(new Error(`STOMP error: ${frame.body}`));
      };
    });
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
    }
  }

  subscribe(destination: string, callback: (message: Message) => void): void {
    if (this.isConnected) {
      // console.log("LISTENING ...", destination);
      this.client.subscribe(destination, callback);
    } else {
      throw new Error('No active STOMP connection');
    }
  }

  send(destination: string, body: string): void {
    if (this.isConnected) {
      // console.log("PUBLISHING ...", destination);
      this.client.publish({ destination, body });
    } else {
      throw new Error('No active STOMP connection');
    }
  }
}
