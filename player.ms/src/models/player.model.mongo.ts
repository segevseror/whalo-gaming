import { Connection, Schema } from "mongoose";
import { PlayerType } from "whalo-types";


const playerSchema = new Schema<PlayerType>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export function getPlayerModel(mongoDbConnection: Connection) {
  return mongoDbConnection.model<PlayerType>("players", playerSchema);
}
