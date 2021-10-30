import "./message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


export default function Message({conversation, message, own }) {
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const [user, setUser] = useState("")
const {user: currentUser} = useContext(AuthContext)



  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${currentUser._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser._id]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own?.profilePicture
            ? PF + own.profilePicture
            : PF + user.profilePicture}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
