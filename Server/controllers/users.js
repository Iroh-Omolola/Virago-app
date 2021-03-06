import User from "../models/User.js";

const UserController = {
  updateUser:async (req, res) => {
   
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        if(user){
          res.status(200).json(user);
        }else{
          return res.status(403).json("You can update only your account!");
        }
      
      } catch (err) {
        return res.status(500).json(err);
      }
  },
  deleteUser:async (req, res) => {
      try {
       const user= await User.findByIdAndDelete(req.params.id);
       if(user){
        res.status(200).json("Account has been deleted");
       } else {
        return res.status(403).json("You can delete only your account!");
      }
       } catch (err) {
        return res.status(500).json(err);
      }
    },
    
  getAUser: async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUsers: async (req, res) => {
    try{
      const userProfile= await User.find({"user_id": req.body.user}).lean().exec();
     if(!userProfile || userProfile[0]=='' || userProfile.length==0 || userProfile[0] == undefined) {
       res.status(401).json({
             message : "User profile can not be fetched"
            });
      }
      else {
      
          res.status(200).json(userProfile);
        }
      }
    catch(err) {
      console.log("Error : ", err);
      res.status(400).json({
        message: "User profile can not be fetched successfully"
      });
    }
  },
  getAFriend:  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  followAUser:  async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you already follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cannot follow yourself");
    }
  },
  unfollowAUser: async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you did not follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you can not unfollow yourself");
    }
  }
}
export default UserController



















