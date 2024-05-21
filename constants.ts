export const baseUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://cit-application-tracker.vercel.app";
