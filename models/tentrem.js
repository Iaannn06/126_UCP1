module.exports = (sequelize, DataTypes) => {
  const hotel = sequelize.define('hotel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Tipe_Kamar: {
        type: DataTypes.VARCHAR(50),
        allowNull: false
    },
    Kapasitas_Tamu: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Lantai: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Fasilitas: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    Tanggal_pesan: {
       tipe :DataTypes.timestamps, default:current_timestamp(),
       allowNull: false 
    }
  }, {
    tableName: 'hotels',
    timestamps: true,
    freezeTableName: true       
    
    });
    return Komik;
};