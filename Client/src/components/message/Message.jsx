import "./message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


export default function Message({ message, own, receiver}) {
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const [user, setUser] = useState("")
const [conversation, setConversation] = useState([])
const [friend, setFriend] = useState([])
const {user: currentUser} = useContext(AuthContext)


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${currentUser._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser._id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  
  const friendId = conversation.map((c)=> c.members.find((m) => m !== currentUser._id));

  useEffect(() => {
    const getFriend= async () => {
      try {
        const res = await axios("/users?userId="+friendId);
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [friendId])
console.log("my friend----",friend)
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg" 
          src={own?  PF + user.profilePicture:  PF + friend.profilePicture || PF + "noAvatar.png"}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
