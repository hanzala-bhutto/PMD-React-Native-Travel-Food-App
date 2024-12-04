# Travel-Food-App

## Table of Contents
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

PMD React Native Travel Food App is a mobile application developed using React Native for discovering travel destinations and food spots. The app provides users with a seamless experience of browsing places to travel and where to eat in those destinations.

## Tech Stack

- **React Native**: A framework for building mobile apps using JavaScript and React.
- **TypeScript**: For static type checking, enhancing development with fewer bugs.
- **Tailwind CSS**: Utility-first CSS framework for fast UI styling.
- **Expo**: A framework for building React Native apps, providing a rich set of development tools.
- **EAS Build**: For building React Native apps in the cloud.

## Features

- User-friendly interface for discovering travel destinations.
- Lists of popular food places at each travel location.
- Seamless navigation between pages and interactive features.
- Integration of Tailwind CSS for a responsive and clean UI.

## Project Structure
```bash
PMD-React-Native-Travel-Food-App/
├── app/                     # Main application code
│   ├── assets/              # Images, fonts, and other static resources
│   ├── data/                # Mock or actual data for travel and food
│   ├── components/          # React components for UI
│   └── screens/             # Different screen components of the app
├── .gitignore               # Git ignore file for unnecessary files
├── App.js                   # Main entry point for the app
├── app.json                 # App configuration for Expo
├── babel.config.js          # Babel configuration for compiling code
├── package.json             # Node.js package dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation (this file)
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (preferably the latest LTS version)
- npm or yarn package manager
- Expo CLI (for running and building the app)

### Installation

- Clone the repository:
   ```bash
   git clone https://github.com/hanzala-bhutto/PMD-React-Native-Travel-Food-App.git
- Navigate to the project folder:
  ```bash
  cd PMD-React-Native-Travel-Food-App

- Install dependencies:
  ```bash
  npm install # or using yarn


### Usage

To run the app in development mode, use the following command:
  ```bash
    expo start
  ```
This will start the development server, and you can scan the QR code with the Expo Go app to run the app on your mobile device. Alternatively, you can run it on an Android/iOS emulator.

## Contributing

Contributions are welcome! If you'd like to improve the app, feel free to fork the repository and create a pull request. To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your forked repository (`git push origin feature-name`).
6. Open a pull request.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- Thanks to **React Native** and **Expo** for providing a robust framework for mobile app development.
- Special thanks to the **Tailwind CSS** community for their utility-first approach to CSS.
- To the **React Native community** for continuous updates and support for building mobile apps.
