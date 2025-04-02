const db = require("../config/db");

// Create Data
exports.createData = async (req, res) => {
  const { userId, data } = req.body;

  if (!data || !userId) {
    return res.status(400).json({ message: "User ID and Data are required" });
  }

  try {
    // Insert data into user_data table
    await db.execute("INSERT INTO user_data (user_id, data) VALUES (?, ?)", [userId, JSON.stringify(data)]);

    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Data
exports.getData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Retrieve data for a specific user
    const [data] = await db.execute("SELECT * FROM user_data WHERE user_id = ?", [userId]);

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Data by ID
exports.getDataById = async (req, res) => {
  const { userId, id } = req.params;

  try {
    // Retrieve a specific record for a user
    const [data] = await db.execute("SELECT * FROM user_data WHERE user_id = ? AND id = ?", [userId, id]);

    if (data.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Data
exports.updateData = async (req, res) => {
  const { userId, id } = req.params;
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: "Data is required" });
  }

  try {
    // Update data for a specific record
    await db.execute("UPDATE user_data SET data = ? WHERE user_id = ? AND id = ?", [JSON.stringify(data), userId, id]);

    res.status(200).json({ message: "Data updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Data
exports.deleteData = async (req, res) => {
  const { userId, id } = req.params;

  try {
    // Delete data for a specific user
    await db.execute("DELETE FROM user_data WHERE user_id = ? AND id = ?", [userId, id]);

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
