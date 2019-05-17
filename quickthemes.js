window.addEventListener('load', function () {
  if (localStorage.getItem('spotify') === null) {
    localStorage.setItem('spotify', 'none');
  } else {
    console.log("Spotify theme already set.");
  };
  if (localStorage.getItem('youtube') === null) {
    localStorage.setItem('youtube', 'none');
  } else {
    console.log("Youtube theme already set.");
  };
});

function getPathFromUrl(url) {
  return url.split("?")[0];
}

function addCss(styleSheet) {
  const head = document.head;
  const link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = styleSheet;

  head.appendChild(link);
}

/*THEMES*/
const retrowaveYoutube = chrome.extension.getURL("themes/retrowave/youtube.css");
const retrowaveSpotify = chrome.extension.getURL("themes/retrowave/spotify.css");

const logStyles = [
    'background: linear-gradient(#FFA1F1, #258EA6)'
    , 'border: 1px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 40px'
    , 'text-align: center'
    , 'font-weight: bold'
    , 'padding: 25px'
].join(';');

/*ONLOAD CHECK FOR SPOTIFY AND YOUTUBE*/
window.addEventListener('load', function() {
    if (document.URL == "https://www.youtube.com/") {
        if (localStorage.getItem('youtube') == 'retrowave') {
          addCss(retrowaveYoutube);
          console.log('%c QuickThemes Loaded. Enjoy!', logStyles);
        } else if (localStorage.getItem('youtube') == 'none') {
          console.log('%c No Themes :O', logStyles);
        }
    } else if (document.URL == "https://open.spotify.com/" || "https://play.spotify.com") {
      if (localStorage.getItem('spotify') == 'retrowave') {
        addCss(retrowaveSpotify);
        console.log('%c QuickThemes Loaded. Enjoy!', logStyles);
      } else if (localStorage.getItem('spotify') == 'none') {
        console.log('%c No Themes :O', logStyles);
      }
    }
});

/*POPUP.HTML ACTIVE CHECK + SET LOCAL STORAGE ON SUBMIT*/
window.addEventListener('load', function() {
  let documentNoQuery = getPathFromUrl(document.URL);

  if (documentNoQuery == chrome.extension.getURL("popup.html")) {
    var themeChange = document.getElementById("themeChange");
    var youtubeThemeInput = document.getElementById("youtubeThemeInput");
    var spotifyThemeInput = document.getElementById("spotifyThemeInput");
    /*Sets to already set theme if set*/
    youtubeThemeInput.value = localStorage.getItem('youtube');
    spotifyThemeInput.value = localStorage.getItem('spotify');
    console.log("Popup.html detected as current page");

    themeChange.addEventListener('submit', function() {

      if (youtubeThemeInput.value == "retrowave") {
        localStorage.setItem('youtube', 'retrowave');
        console.log("retrowave theme set");

      } else if (youtubeThemeInput.value == 'none') {
        localStorage.setItem('youtube', 'none');
        console.log("none theme set");

      } else {
        console.log("Youtube theme isnt set to a theme");

      }
      if (spotifyThemeInput.value == "retrowave") {
        localStorage.setItem('spotify', 'retrowave');
        console.log("retrowave theme set");

      } else if (spotifyThemeInput.value == "none") {
        localStorage.setItem('spotify', 'none');
        console.log("none theme set");

      } else {
        console.log("Spotify theme isnt set to a theme");

      }

    });
  } else {
    console.log("Page not currently Popup.html");
    console.log(document.URL);
    console.log(chrome.extension.getURL("popup.html"));
  }
});
