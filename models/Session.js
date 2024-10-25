const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");

const Session = sequelize.define(
	"Session",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
			onDelete: "CASCADE",
			field: "user_id",
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: "created_at",
		},
		endTime: {
			type: DataTypes.DATE,
			allowNull: true,
			field: "end_time",
		},
		isWin: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: "is_win",
		},
	},
	{
		tableName: "sessions",
		timestamps: false,
	}
);

User.hasMany(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });

module.exports = Session;
