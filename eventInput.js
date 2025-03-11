const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function inputEvent() {
  try {
    const event = {
      title: await askQuestion("Enter event title: "),
      date: await askQuestion("Enter event date (DD-MM-YYYY): "),
      time: await askQuestion("Enter event time (e.g., 8:30 AM - 12:20 AM): "),
      location: await askQuestion("Enter event location: "),
      description: await askQuestion("Enter event description: "),
      image: await askQuestion("Enter image path (e.g., /uploads/image.jpg): "),
      website: await askQuestion("Enter website (optional): "),
    };

    // Read existing events
    const eventsPath = "./events.json";
    let events = [];

    if (fs.existsSync(eventsPath)) {
      const data = fs.readFileSync(eventsPath, "utf8");
      events = JSON.parse(data);
    }

    // Add new event
    events.push(event);

    // Write back to file
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
    console.log("Event added successfully!");

    // Ask if user wants to add another event
    const answer = await askQuestion(
      "Do you want to add another event? (y/n): "
    );
    if (answer.toLowerCase() === "y") {
      await inputEvent();
    } else {
      rl.close();
    }
  } catch (error) {
    console.error("Error:", error);
    rl.close();
  }
}

inputEvent();
