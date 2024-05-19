const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

// ambil semua user
router.get("/users", async function (req, res) {
  // ambil datanya
  const users = await db.users.findMany();
  res.status(200).json({
    message: "Berhasil mendapatkan data",
    data: users,
  });
});

// ambil 1 user berdasarkan id
router.get("/users/:id",async function (req, res){
  const userId = Number(req.params.id);
  const user = await db.users.findUnique({
    where: {
      Id: userId,
    },
  });
  res.status(200).json({
    message: "Berhasil mendapatkan data",
    data: user,
  });
})
// ...

// membuat user baru
router.post("/users/post", async function (req, res) {
  const { nama } = req.body;

  try {
      const newUser = await db.users.create({
          data: { nama }
      });
      res.status(201).json(newUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create user" });
  }
});

// merubah user yang sudah ada

// Update a user by ID
router.put("/users/:id", async function (req, res) {
  const id = parseInt(req.params.id);
  const { nama } = req.body;

  try {
    const updatedUser = await db.users.update({
      where: { Id: id },
      data: { nama: nama },
    });

    res.status(200).json({
      message: "Berhasil memperbarui data user",
      data: updatedUser,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      console.error(error);
      res.status(500).json({ error: "Unable to update user" });
    }
  }
});
// menghapus user yang sudah ada
router.delete("/users/:id", async function (req, res) {
  // ambil data
  const userId = Number(req.params.id);

  // udpate user
  await db.users.delete({
    where: {
      Id: userId,
    },
  });

  res.status(200).json({
    message: "Berhasil menghapus data",
  });
});



module.exports = router;
