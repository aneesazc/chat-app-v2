import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    // console.log("useEffect ran", { socket, messages, setMessages }); // Log when the effect runs

    if (socket) {
      // console.log("Setting up listener for new messages."); // Log listener setup
      socket.on("newMessage", (newMessage) => {
        // console.log("Received new message:", newMessage); // Log received messages
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
        // console.log("newMessage sent");
      });

      return () => {
        console.log("Removing listener for new messages."); // Log listener removal
        socket.off("newMessage");
      };
    }
  }, [socket, messages, setMessages]);

  return null;
};

export default useListenMessages;
