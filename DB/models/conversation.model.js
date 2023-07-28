import { Schema, model, Types } from 'mongoose'


const conversationSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    type: { type: String, required: true, enum: ["chat", "group"], },    
}, {
    timestamps: true
})


const conversationModel = model('Conversation', conversationSchema)

export default conversationModel