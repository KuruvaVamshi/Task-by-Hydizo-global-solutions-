#  Mini Poll System

This is a simple full-stack mini poll application that I built as part of an internship task. The idea was to create a system where users can create a poll, vote on options, and view results in percentage format.

---

##  What this project does

* Allows users to create a poll with multiple options
* Users can vote on any option
* Displays results as percentages (not just vote counts)
* Provides a clean and interactive UI
* Includes reset functionality to start over

---

##  Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js with Express

---

## Key Highlights

One of the main requirements was to show results as percentages, so I implemented logic to calculate vote distribution dynamically.

I also focused on improving user experience by:

* Adding smooth UI styling
* Using SweetAlert instead of default alerts
* Managing frontend and backend state properly (especially for reset functionality)

---

##  How to run the project

1. Install dependencies:

   ```
   npm install
   ```

2. Start the backend server:

   ```
   node server.js
   ```

3. Open the frontend:

   * Simply open `index.html` in your browser
   * (or use Live Server in VS Code)

---

##  Notes

* This project uses in-memory storage, so data will reset when the server restarts
* Designed to be simple, clean, and easy to understand

---

## Author

Vamshi
