const express = require("express");
const notificationRouter = express.Router();
const Notification = require("../models/notification.model");

// GET all notifications
notificationRouter.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific notification
notificationRouter.get("/:id", getNotification, (req, res) => {
  res.json(res.notification);
});

// POST a new notification
notificationRouter.post("/", async (req, res) => {
  const notification = new Notification({
    title: req.body.title,
    description: req.body.description,
    recipient: req.body.recipient,
  });

  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an existing notification
notificationRouter.put("/:id", getNotification, async (req, res) => {
  if (req.body.title != null) {
    res.notification.title = req.body.title;
  }
  if (req.body.description != null) {
    res.notification.description = req.body.description;
  }
  if (req.body.recipient != null) {
    res.notification.recipient = req.body.recipient;
  }

  try {
    const updatedNotification = await res.notification.save();
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a notification
notificationRouter.delete("/:id", getNotification, async (req, res) => {
  try {
    await res.notification.remove();
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getNotification(req, res, next) {
  let notification;
  try {
    notification = await Notification.findById(req.params.id);
    if (notification == null) {
      return res.status(404).json({ message: "Notification not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.notification = notification;
  next();
}

module.exports = notificationRouter;
