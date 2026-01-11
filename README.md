# Welcome to MxHub Exchange Duo!

This is your all-in-one platform for everything related to motocross and supercross racing. Whether you're a fan, a rider, or just looking for some fun, MxHub brings the excitement of the track right to your fingertips.

## What can you do with MxHub?

*   **Follow the Action:** Get schedules for all the major Supercross and Motocross races. See who's racing in the 450cc and 250cc classes and learn more about your favorite riders.
*   **Bet with Friends:** Make race day more exciting by placing friendly bets against your friends on upcoming races.
*   **Manage Your Account:** Create a profile, find and add friends, and track your betting history.
*   **Use Digital Coins:**
    *   **Gold Coins (GC):** Purchase Gold Coins to use for fun bets on the platform. You can exchange them back to your original payment method anytime.
    *   **Sweeps Coins (SC):** Win Sweeps Coins through promotional games. These can be redeemed for real prizes.
*   **Secure Banking:** We use Plaid, a trusted service, to securely link your bank account for exchanges, ensuring your financial information is always safe.

## Our Commitment to Security

Your trust is our top priority. We have implemented strong security policies to protect your information, including data encryption, secure data disposal, and a process for managing any security vulnerabilities. You can read our full policies within the app.

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   An active Firebase project
*   Plaid API keys (for banking features)

### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory and install the dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables by creating a `.env` file in the root of the project and adding your Firebase and Plaid credentials.

## Running the Development Servers

This project requires two separate servers to be running for full functionality: the Next.js web application and the Genkit AI server.

### 1. Start the Web Application

This command starts the Next.js development server for the main application.

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

### 2. Start the AI Server

This command starts the Genkit server, which handles all Generative AI-related tasks, like the AI Summarizer.

```bash
npm run genkit:dev
```

This will start the Genkit development UI, typically available at `http://localhost:4000`, where you can inspect and test your AI flows.
