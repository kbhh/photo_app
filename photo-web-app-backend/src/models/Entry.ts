import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

class Entry extends Model {
  public id!: number;
  public name!: string;
  public imagePath!: string;
  public userId!: number;
}

Entry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Entry",
  }
);

Entry.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Entry, { foreignKey: "userId" });

export default Entry;
