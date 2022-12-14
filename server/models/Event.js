const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const calendarSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    }
  }
);

const Event = model('Event', calendarSchema);

module.exports = Event;