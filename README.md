# Athlos Travel | Technical Test for Frontend Engineer

This repository contains the solution for the **Frontend Engineer** technical test for **Athlos Travel**. The goal of the test is to evaluate your skills in **problem-solving**, **UI/UX design**, and **API integration** by building a frontend application.

The project implements a **Next.js** web app that allows users to search, filter, and view accommodation data fetched from a simulated API. The app provides the following features:

- **Search Tool**: Users can search accommodations by name or keyword.
- **Filters**: Users can filter accommodations by location, category (stars), type, and other relevant criteria.
- **Accommodation Details**: Each accommodation card links to a detailed page showing more information, including photos and descriptions.
  
The application was designed to showcase **clean code**, **responsive design**, and a **user-friendly interface**. While this is not a fully operational app for production, it demonstrates the key aspects of frontend development and design thinking.


## Key Features

- **Accommodation Cards**: Browse through accommodation options, including location, room details, and ratings.
- **Accommodation Details**: View detailed information for each property, including photos, description, and contact info.
- **Filters**: Narrow down your options by location, type of stay, and rating to find the perfect match.
- **Pagination**: Easily navigate between pages of accommodation options.
- **Similar Accommodations**: Discover similar places to your current selection.

## Getting Started

To get started with the project, follow these simple steps:

### 1. Clone the Repository
   First, clone the repository to your local machine:
   ```bash
   git clone https://github.com/jferreiros/athlos-travel.git
   cd athlos-travel
   ```

### 2. Install Dependencies
   After cloning the repository, navigate into the project folder and run the following command to install all the required dependencies:
```bash
   npm install
```

### 4. Start the Development Server
   Once the dependencies are installed and the environment variables are set, start the development server:
```bash
   npm run dev
```

### 5. Open the App
Now, you can visit the app by navigating to [http://localhost:3000](http://localhost:3000) in your browser and start exploring!

## Technologies Used

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Libraries**:
  - [React Photo View](https://www.npmjs.com/package/react-photo-view) for the image gallery functionality
  - [Lucide Icons](https://lucide.dev/) for clean and scalable icons
  - [React-Day-Picker](https://react-day-picker.js.org/) for easy date range selection

## Project Structure

Here’s a quick overview of how the project is organized:

- **`app/`**: Contains the main pages of the application, such as the accommodation listing and detail pages.
- **`components/`**: Reusable components like the accommodation card, filter bar, and pagination controls.
- **`context/`**: The context provider for global state management across the app.
- **`services/`**: Handles external API calls, such as fetching accommodation data and generating descriptions using OpenAI.
- **`lib/`**: Utility functions and types that are shared across the project.

## How to Use the App

1. **Browse Accommodations**: Go to the homepage or the accommodations listing page to see all available properties, each with details like location, price, and rating.
2. **Filter Your Search**: Use the filter bar to narrow down your search by location, accommodation type, or rating to find exactly what you’re looking for.
3. **View Details**: Click on any accommodation card to view more details, such as photos, descriptions, and contact information.
4. **Request a Booking**: On the accommodation details page, you can select check-in and check-out dates, group size, and leave additional notes before submitting a request.

## License

This project is licensed under the MIT License.

