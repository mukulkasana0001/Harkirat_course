import mongoose, { model,Schema } from "mongoose";

const UserSchema = new Schema({
    username:{type:String,unique:true},
    password:{type:String}
});

const ContentSchema = new Schema({
    title:{type:String},
    type:{type:String},
    link:{type:String},
    userid:{type:Schema.Types.ObjectId,ref:"users"},
    tag:[{type:Schema.Types.ObjectId,ref:"tags",}]
})

const LinkSchema = new Schema({
    hash: {type:String},
    userid: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
});

 const LinkModel = model("links", LinkSchema);

const userModel = model("users",UserSchema);
const contentModel= model("contents",ContentSchema)
export {
    userModel,
    contentModel,
    LinkModel
}


