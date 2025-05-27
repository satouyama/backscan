// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = "BOT-TOKEN"; // Substitua pelo token do seu bot
const TELEGRAM_CHAT_ID = "CHAT-TOKEN"; // Substitua pelo ID do chat (ou grupo) para onde quer enviar

app.post("/send-location", async (req, res) => {
  const { coords, device } = req.body;
  console.log(coords, device)
  const base = 'https://www.google.com/maps';
  const localization = `${coords.latitude},${coords.longitude}`;

  try {
    console.table({
      latitude: coords.latitude,
      longitude: coords.longitude,
      searchUrl: `${base}/search/?api=1&query=${encodeURIComponent(localization)}`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});

app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});
