var itens = [
    "bala fini",
    "salgadinho", 
    "doritos"
];

function pesquisar(){
    console.log("tá funcionado")
}

onkeydown = ()=>{
    pesquisar();
};

document.querySelector(".ladinho2").onclick = function(){
    document.querySelector("#anunc").scrollBy(365,0);

};

document.querySelector(".ladinho1").onclick = function(){
    document.querySelector("#anunc").scrollBy(-365,0);

};

document.querySelector(body).navigator=function(){
if ("geolocation" in navigator) {
    var geolocation = Components.classes["@mozilla.org/geolocation;1"].getService(
        Components.interfaces.nsIDOMGeoGeolocation,
      ); /* geolocation is available */
  } else {
    alert(
      "I'm sorry, but geolocation services are not supported by your browser.",
    );
  }
}

navigator.geolocation.getCurrentPosition(function (position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });
  function prompt(window, pref, message, callback) {
    let branch = Components.classes[
      "@mozilla.org/preferences-service;1"
    ].getService(Components.interfaces.nsIPrefBranch);
  
    if (branch.getPrefType(pref) === branch.PREF_STRING) {
      switch (branch.getCharPref(pref)) {
        case "always":
          return callback(true);
        case "never":
          return callback(false);
      }
    }
  
    let done = false;
  
    function remember(value, result) {
      return function () {
        done = true;
        branch.setCharPref(pref, value);
        callback(result);
      };
    }
  
    let self = window.PopupNotifications.show(
      window.gBrowser.selectedBrowser,
      "geolocation",
      message,
      "geo-notification-icon",
      {
        label: "Share Location",
        accessKey: "S",
        callback: function (notification) {
          done = true;
          callback(true); },
      },
      [
        {
          label: "Always Share",
          accessKey: "A",
          callback: remember("always", true),
        },
        {
          label: "Never Share",
          accessKey: "N",
          callback: remember("never", false),
        },
      ],
      {
        eventCallback: function (event) {
          if (event === "dismissed") {
            if (!done) callback(false);
            done = true;
            window.PopupNotifications.remove(self);
          }
        },
        persistWhileVisible: true,
      },
    );
  }
  
  prompt(
    window,
    "extensions.foo-addon.allowGeolocation",
    "Foo Add-on wants to know your location.",
    function callback(allowed) {
      alert(allowed);
    },
  );