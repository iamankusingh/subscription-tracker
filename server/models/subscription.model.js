// subscription schema for database
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription value is required"],
      min: [0, "Price must be grater than 0"],
    },
    currency: {
      type: String,
      enum: ["Rupees", "USD"],
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "Sports",
        "Entertainment",
        "News",
        "Bussiness",
        "Education",
        "Personal",
        "Health",
        "Finance",
        "Others",
      ],
      required: true,
    },
    payment: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "Canceled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// auto calculate renewal date
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    this.renewalDate = new Date(this.startDate);

    switch (this.frequency) {
      case "daily":
        this.renewalDate.setDate(this.renewalDate.getDate() + 1);
        break;
      case "weekly":
        this.renewalDate.setDate(this.renewalDate.getDate() + 7);
        break;
      case "monthly":
        this.renewalDate.setMonth(this.renewalDate.getMonth() + 1);
        break;
      case "yearly":
        this.renewalDate.setFullYear(this.renewalDate.getFullYear() + 1);
        break;
      default:
        throw new Error("Unknown frequency: " + this.frequency);
    }
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
