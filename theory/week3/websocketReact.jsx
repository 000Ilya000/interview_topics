import { useEffect, useState } from "react";

const WebSocketChat = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // 1. Создаем WebSocket-соединение
    const socket = new WebSocket("wss://example.com/chat");

    // 2. Обрабатываем входящие сообщения
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    // 3. Обрабатываем закрытие соединения
    socket.onclose = () => console.log("Соединение закрыто");

    // 4. Сохраняем соединение в state
    setWs(socket);

    // 5. Закрываем соединение при размонтировании компонента
    return () => socket.close();
  }, []);

  // Функция для отправки сообщений
  const sendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({ text: "Привет, сервер!" }));
    }
  };

  return (
    <div>
      <h2>WebSocket Чат</h2>
      <button onClick={sendMessage}>Отправить сообщение</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketChat;
