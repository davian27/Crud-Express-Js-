// pemanggilan npm module express
const express = require("express");
// pemanggilan npm module cors
const cors = require("cors");

// pemanggilan local module routes
const routes = require("./routes");

// inisiasi aplikasi express
const app = express();

// menggunakan npm module cors
app.use(cors());

// menggunakan express module untuk menangani data yang dikirim dalam bentuk json
app.use(express.json());

// menggunakan local modul untuk routing
app.use("/", routes);

// membuat kode untuk menjalankan server
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server Running For Users Endpoint: http://localhost:${PORT}/users`);
});
