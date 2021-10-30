import mongoose from 'mongoose';

const {Schema, model} = mongoose;
const ConversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
export const Conversation = model('Conversation', ConversationSchema);
