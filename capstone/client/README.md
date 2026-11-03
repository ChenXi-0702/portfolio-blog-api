# Lab Manual 18

## Open a detail page for each GitHub project

This folder contains the completed cumulative project for Lab 18. Earlier features remain unless the lab replaces them with a new implementation.

The manual calls the working project `portfolio-react`. You can run this folder directly using the instructions below, or rename a working copy to `portfolio-react` when following the next lab. Keep an unchanged copy of each completed lab.

## Run the project

Install the current Node.js LTS release with npm (Node.js 24 or later). Open this folder in VS Code or IntelliJ IDEA. Open a terminal inside this folder.

Windows PowerShell:

```powershell
npm.cmd ci
npm.cmd run dev
```

macOS/Linux:

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. Keep the terminal running. Press Ctrl+C to stop it. Use `npm.cmd` in Windows PowerShell if `npm.ps1` is blocked.

## Build and preview

Windows PowerShell:

```powershell
npm.cmd run build
npm.cmd run preview
```

macOS/Linux:

```bash
npm run build
npm run preview
```

`build` writes the production site to `dist`. `preview` serves that built site locally. Keep `package-lock.json` so another copy installs the same package versions. `node_modules` and `dist` are generated locally and are not included in this source project.

## Using the files

Follow the corresponding Markdown lab manual in the chapter folder. The source here shows the result after all guided steps are complete. To practise the exercise, start from the preceding lab's completed project; Lab 01 starts with an empty folder, and Lab 11 creates the React project.

## Features and sample content

The profile image is a sample initials avatar for Alex Chen. Replace it with your own square image and update the image description when you personalise the portfolio.

The shared project image is a 640 by 360 pixel preview of the practice portfolio. It is not a screenshot of every linked GitHub repository.

The public GitHub API uses the example account `octocat` and no access token. GitHub can limit repeated requests. The gallery requests up to six recently updated public repositories.

The contact form validates input locally and sends no message. A successful check clears the fields. Use disposable values when testing.

The theme starts light after a full reload. It stays selected while moving between app routes.

Home uses `/`, Projects uses `/projects`, and Contact uses `/contact`. Unknown addresses show a return link.

Use **View details** on a live project card to open `/projects/:projectId`. The detail page requests that repository independently, including after a direct visit or reload.

## Editor setup

In VS Code, use **File > Open Folder** and **Terminal > New Terminal**. In IntelliJ IDEA, open this folder and use the Terminal tool window; select the installed Node.js runtime in JavaScript/Node.js settings if your edition provides those settings. The terminal commands work without a custom run configuration.
