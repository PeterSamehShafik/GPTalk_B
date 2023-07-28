import { Schema, model, Types } from 'mongoose'


const friendshipSchema = new mongoose.Schema({
    user1: { type: Schema.Types.ObjectId, ref: 'User' },
    user2: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true },
}, {
    timestamps: true
})


const friendshipModel = model('Friendship', friendshipSchema)

export default friendshipModel