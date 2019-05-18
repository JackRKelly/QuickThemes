
/*SCRIPT ONLOAD CHECK FOR UNDEFINED VALUES NOT FUNCTIONING
  chrome.storage.sync.get(['spotify', 'youtube'], function(themes) {
    if (typeof themes.youtube === 'undefined') {
      chrome.storage.sync.set({'youtube': 'none'}, function() {
        console.log("youtube set" + themes.youtube);
      });
    } else {
      console.log("Youtube theme already set in google chrome storage");
    }
    if (typeof themes.spotify === 'undefined') {
      chrome.storage.sync.set({'spotify': 'none'}, function() {
        console.log("spotify set" + themes.spotify);
      });
    } else {
      console.log("Spotify theme already set in google chrome storage");
    }
  });*/


function getPathFromUrl(url) {
  return url.split("?")[0];
}

function addCss(styleSheet) {
  var head = document.head;
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = styleSheet;
  head.appendChild(link);
}

/*THEMES*/
const retrowave = {
  youtube: chrome.extension.getURL("themes/retrowave/youtube.css"),
  spotify: chrome.extension.getURL("themes/retrowave/spotify.css")
};

const amethyst = {
  youtube: chrome.extension.getURL("themes/amethyst/youtube.css"),
  spotify: chrome.extension.getURL("themes/amethyst/spotify.css")
};

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

/*YOUTUBE SPOTIFY LISTENER*/
window.addEventListener('load', function() {
      if (document.URL.indexOf("https://www.youtube.com/") > -1) {
          chrome.storage.sync.get(['youtube'], function(site) {
            if (site.youtube == 'retrowave') {
              addCss(retrowave.youtube);
              console.log('%c Retrowave Theme Loaded. Enjoy!', logStyles);
            } else if (site.youtube == 'none') {
              console.log('%c None Themes Loaded.', logStyles);
            } else if (site.youtube == 'amethyst') {
              addCss(amethyst.youtube);
              console.log('%c Amethyst Theme Loaded. Enjoy!', logStyles);
            }

          });
      } else if (document.URL.indexOf("https://open.spotify.com/" || "https://play.spotify.com") > -1) {
          chrome.storage.sync.get(['spotify'], function(site) {
            if (site.spotify == 'none') {
              console.log('%c None Themes Loaded.', logStyles);
            } else if (site.spotify == 'retrowave') {
              addCss(retrowave.spotify);
              console.log('%c Retrowave Theme Loaded. Enjoy!', logStyles);
            } else if (site.spotify == 'amethyst') {
              addCss(amethyst.spotify);
              console.log('%c Amethyst Theme Loaded. Enjoy!', logStyles);
            }
          });
      }
});

/*POP UP LISTENER HTML*/
window.addEventListener('load', function() {
  let documentNoQuery = getPathFromUrl(document.URL);
  if (documentNoQuery == chrome.extension.getURL("popup.html")) {
    var themeChange = document.getElementById("themeChange");
    var youtubeThemeInput = document.getElementById("youtubeThemeInput");
    var spotifyThemeInput = document.getElementById("spotifyThemeInput");
    /*Sets to already set theme if set*/
    chrome.storage.sync.get(['spotify', 'youtube'], function(themes) {
      spotifyThemeInput.value = themes.spotify;
      youtubeThemeInput.value = themes.youtube;
    });
    console.log("Popup.html detected as current page");
    themeChange.addEventListener('submit', function() {
      if (youtubeThemeInput.value == "retrowave") {
        chrome.storage.sync.set({'youtube': 'retrowave'}, function() {
        });
      } else if (youtubeThemeInput.value == 'none') {
        chrome.storage.sync.set({'youtube': 'none'}, function() {
        });
      } else if (youtubeThemeInput.value == 'amethyst') {
        chrome.storage.sync.set({'youtube': 'amethyst'}, function() {
        });
      }
      if (spotifyThemeInput.value == "retrowave") {
        chrome.storage.sync.set({'spotify': 'retrowave'}, function() {
        });
      } else if (spotifyThemeInput.value == "none") {
        chrome.storage.sync.set({'spotify': 'none'}, function() {
        });
      } else if (spotifyThemeInput.value == 'amethyst') {
        chrome.storage.sync.set({'spotify': 'amethyst'}, function() {
        });
      }
    });
  } else {
  }
});
