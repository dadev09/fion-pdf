# fion-pdf

## Introduction
This app downloads pdfs from urls(already provided) and stores them locally in the app. And users can select one of the downloaded app to open and see the pdf. You can search by text during view.

## How to install
This app is using Expo and you can follow steps to install.
1. Setting up your environment. You can follow [this doc](https://reactnative.dev/docs/environment-setup) to set up your local environment.
2. Open your terminal and clone/pull git repository into your local.
```jsx
git clone https://github.com/dadev09/fion-pdf.git
```
3. Go into the project directory and install packages.
```jsx
cd fion-pdf
```
```jsx
npm install
```
4. Run the application.
```jsx
npm start
```

## Packages
For downloading and viewing pdfs, I used two packages(`FileSystem`, `IntentLauncher`) and the others are common react native packages.
The reason I choose these packages is:
> since we should download the file into local, we should work with File system to handle them locally.
> since we should show the pdf using local file path(uri), we can't use normal pdf viewer.

- `FileSystem`
`FileSystem` provides access to a file system stored locally on the device. By using its `downloadAsync` function, pdf can be downloaded into local directory.
- `IntentLauncher`
`IntentLauncher` provides a way to launch Android intents. By using its startActivityAsync, pdf can be opened on Android(this isn't provided for iOS).

#### note
After a pdf is opened, since it provides the search functionality by text, we don't need to add specific search functionality there.