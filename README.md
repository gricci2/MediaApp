# 📚 My Book/Media Tracker 📺

## 📌 About

This project is a simple **Media Tracker** application. It was created in Visual Studio using C# along with ASP.NET and Entity Framework.

<img width="2149" height="1392" alt="Screenshot 2026-03-05 105132" src="https://github.com/user-attachments/assets/57b23768-246e-4f1d-8d4f-cb52f336dacd" />

## 🎯 Goals

My goals of this project were to:

- Create a tracking system for books I've read and want to read
- Learn how to structure a full-stack ASP.NET app
- Implement database tracking with EF Core
- Progressively scale from minimal API to a front-end + back-end architecture and learn the tradeoffs of decisions made along the way

## ✨ Features

- 📝 Add, edit, sort, and delete media items
- 🔍 Search and filter by type and name
- 📊 Login as a user with a password
- 🌐 Use a discover feature to find similar media to those on my list

## 📈 Progression of the Project + Decisions Made

1. Started with a Minimal API and EF Core
2. Used local SQL Server for database support to track media items
3. Implemented Razor Pages for faster setup and easier debugging initially
4. Implemented DTOs to prevent data exposure and make changes to database schema easier
5. Created a Service layer so that the back-end logic was separated and could be reused and tested easier
6. Added Controllers so that I could use my backend with a separate front end (React in this case)
7. Added Authentication to enable user-specific data and for possible scalability

