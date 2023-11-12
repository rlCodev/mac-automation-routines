config = {
  "apps": [
      {
          "name": "Slack",
          "action": "your_action_here",
          "modality": "minimized",
          "location": "Monitor1"
      },
      {
          "name": "Visual Studio Code",
          "action": "your_action_here",
          "modality": "minimized",
          "location": "Monitor2"
      },
      {
          "name": "Safari",
          "action": "your_action_here",
          "modality": "minimized",
          "location": "Monitor1",
          "urls": [
              {
                  "url": "https://www.github.com",
                  "action": "your_action_here"
              },
              {
                  "url": "https://app.clickup.com/24592238/home",
                  "action": "your_action_here"
              },
              {
                  "url": "https://app.clockify.me/tracker",
                  "action": "your_action_here"
              }
          ]
      }
  ]
}

// Read URLs from a file and open in Safari
// var app = Application.currentApplication();
// app.includeStandardAdditions = true;
// var fileContents = app.read(
//   Path("/Users/<yourname>/<your-path>/config.json")
// );
// var config = JSON.parse(fileContents);

// Open apps
config.apps.forEach(function (appConfig) {
  var app = Application(appConfig.name);
  app.activate();

  // Check if app is safari
  if (appConfig.name == "Safari") {
    // Open URLs in Safari
    console.log("Opening URLs in Safari, urls: " + appConfig.urls);
    handleSafari(appConfig, app);
  }

  // Perform action based on appConfig.action
  // Handle modality based on appConfig.modality
  const modality = appConfig.modality;
  if (modality) {
    try {
      if (modality == "fullscreen") {
        app.windows[0].fullscreen = true;
      } else if (modality == "minimized") {
        app.windows[0].minimized = true;
      } else if (modality == "hidden") {
        app.windows[0].visible = false;
      }
    } catch (error) {
      console.log("Error handling modality: " + error);
    }
  }

  // Handle location based on appConfig.location
  const location = appConfig.location;
  // Check on which screen the app should be opened
  if (location) {
    try {
      if (location == "left") {
        app.windows[0].bounds = { x: 0, y: 0, width: 960, height: 1080 };
      } else if (location == "right") {
        app.windows[0].bounds = { x: 960, y: 0, width: 960, height: 1080 };
      }
    } catch (error) {
      console.log("Error handling location: " + error);
    }
  }
});

function handleSafari(appConfig, safari) {
  // Check if a Safari window is open
  if (safari.windows.length === 0) {
    // If not, open a new window
    safari.Document().make();
  }

  config = appConfig.urls;

  config.forEach(function (item) {
    // Open URL in new tab
    var currentWindow = safari.windows[0];
    var newTab = safari.Tab({ url: item.url });
    currentWindow.tabs.push(newTab);
    currentWindow.currentTab = newTab;

    // Perform action based on item.action
  });
}
