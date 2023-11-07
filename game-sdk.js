(function () {var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// <define:__INIT_CONFIG__>
var init_define_INIT_CONFIG = __esm({
  "<define:__INIT_CONFIG__>"() {
  }
});

// src/game-sdk/common/ChooseAsyncPopup.ts
var ChooseAsyncPopup_exports = {};
__export(ChooseAsyncPopup_exports, {
  default: () => ChooseAsyncPopup_default
});
var _ChooseAsyncPopup, ChooseAsyncPopup, ChooseAsyncPopup_default;
var init_ChooseAsyncPopup = __esm({
  "src/game-sdk/common/ChooseAsyncPopup.ts"() {
    "use strict";
    init_define_INIT_CONFIG();
    _ChooseAsyncPopup = class _ChooseAsyncPopup {
      constructor() {
        __publicField(this, "popup");
        __publicField(this, "title");
        __publicField(this, "chooseButton");
        __publicField(this, "closeButton");
        __publicField(this, "onChoose", /* @__PURE__ */ __name((callback) => {
          this.chooseButton.addEventListener(
            "click",
            () => {
              callback();
              this.hide();
            },
            { once: true }
          );
        }, "onChoose"));
        __publicField(this, "onClose", /* @__PURE__ */ __name((callback) => {
          this.closeButton.addEventListener(
            "click",
            () => {
              callback();
              this.hide();
            },
            { once: true }
          );
        }, "onClose"));
        this.popup = document.createElement("div");
        this.popup.classList.add("popup");
        this.popup.classList.add("dark-mode");
        this.title = document.createElement("h2");
        this.title.textContent = "Choose Async";
        this.popup.appendChild(this.title);
        this.chooseButton = document.createElement("button");
        this.chooseButton.textContent = "Choose";
        this.popup.appendChild(this.chooseButton);
        this.closeButton = document.createElement("button");
        this.closeButton.textContent = "Close";
        this.popup.appendChild(this.closeButton);
      }
      show() {
        document.body.appendChild(this.popup);
      }
      hide() {
        document.body.removeChild(this.popup);
      }
    };
    __name(_ChooseAsyncPopup, "ChooseAsyncPopup");
    ChooseAsyncPopup = _ChooseAsyncPopup;
    ChooseAsyncPopup_default = ChooseAsyncPopup;
  }
});

// src/game-sdk/common/CreateAsyncPopup.ts
var CreateAsyncPopup_exports = {};
__export(CreateAsyncPopup_exports, {
  default: () => CreateAsyncPopup_default
});
var _CreateAsyncPopup, CreateAsyncPopup, CreateAsyncPopup_default;
var init_CreateAsyncPopup = __esm({
  "src/game-sdk/common/CreateAsyncPopup.ts"() {
    "use strict";
    init_define_INIT_CONFIG();
    _CreateAsyncPopup = class _CreateAsyncPopup {
      constructor() {
        __publicField(this, "popup");
        __publicField(this, "title");
        __publicField(this, "switchButton");
        __publicField(this, "closeButton");
        __publicField(this, "onSwitch", /* @__PURE__ */ __name((callback) => {
          this.switchButton.addEventListener(
            "click",
            () => {
              callback();
              this.hide();
            },
            { once: true }
          );
        }, "onSwitch"));
        __publicField(this, "onClose", /* @__PURE__ */ __name((callback) => {
          this.closeButton.addEventListener(
            "click",
            () => {
              callback();
              this.hide();
            },
            { once: true }
          );
        }, "onClose"));
        this.popup = document.createElement("div");
        this.popup.classList.add("popup");
        this.popup.classList.add("dark-mode");
        this.title = document.createElement("h2");
        this.title.textContent = "Create Async";
        this.popup.appendChild(this.title);
        this.switchButton = document.createElement("button");
        this.switchButton.textContent = "Switch";
        this.popup.appendChild(this.switchButton);
        this.closeButton = document.createElement("button");
        this.closeButton.textContent = "Close";
        this.popup.appendChild(this.closeButton);
      }
      show(playerId) {
        const playerIdElement = document.createElement("div");
        playerIdElement.textContent = `Player ID: ${playerId}`;
        this.popup.appendChild(playerIdElement);
        document.body.appendChild(this.popup);
      }
      hide() {
        document.body.removeChild(this.popup);
      }
    };
    __name(_CreateAsyncPopup, "CreateAsyncPopup");
    CreateAsyncPopup = _CreateAsyncPopup;
    CreateAsyncPopup_default = CreateAsyncPopup;
  }
});

// src/game-sdk/exceptions/SDKCommonError.ts
var _SDKCommonError, SDKCommonError, SDKCommonError_default;
var init_SDKCommonError = __esm({
  "src/game-sdk/exceptions/SDKCommonError.ts"() {
    "use strict";
    init_define_INIT_CONFIG();
    _SDKCommonError = class _SDKCommonError extends Error {
      constructor(code, message) {
        super(message);
        __publicField(this, "code");
        this.code = code;
      }
    };
    __name(_SDKCommonError, "SDKCommonError");
    SDKCommonError = _SDKCommonError;
    SDKCommonError_default = SDKCommonError;
  }
});

// src/game-sdk/sdk/AdInstance.ts
var _AdInstance, AdInstance, AdInstance_default;
var init_AdInstance = __esm({
  "src/game-sdk/sdk/AdInstance.ts"() {
    "use strict";
    init_define_INIT_CONFIG();
    _AdInstance = class _AdInstance {
      constructor(type, placementId) {
        __publicField(this, "type");
        __publicField(this, "placementId");
        this.type = type;
        this.placementId = placementId;
      }
      getPlacementID() {
        return this.placementId;
      }
      async hideAsync() {
        return Promise.resolve();
      }
    };
    __name(_AdInstance, "AdInstance");
    AdInstance = _AdInstance;
    AdInstance_default = AdInstance;
  }
});

// src/game-sdk/common/MockBannerInstance.ts
var MockBannerInstance_exports = {};
__export(MockBannerInstance_exports, {
  default: () => MockBannerInstance_default
});
var html2, css2, loadErrorCodes, _MockBannerInstance, MockBannerInstance, MockBannerInstance_default;
var init_MockBannerInstance = __esm({
  "src/game-sdk/common/MockBannerInstance.ts"() {
    "use strict";
    init_define_INIT_CONFIG();
    init_SDKCommonError();
    init_AdInstance();
    html2 = /* html */
    `
<div class="mock-banner-ads-content">
    <img id="mock-banner-ads-image" alt="" />
</div>
`;
    css2 = /*css*/
    `
.mock-banner-ads-content {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    outline-offset: -2px;
    outline: 2px solid #ffffff40;
}

.mock-banner-ads-content img {
    width: 100%;
    object-fit: cover;
}
`;
    loadErrorCodes = ["NETWORK_FAILURE", "ADS_FREQUENT_LOAD"];
    _MockBannerInstance = class _MockBannerInstance extends AdInstance_default {
      constructor(type, placementId) {
        super(type, placementId);
        __publicField(this, "adContent");
        __publicField(this, "apiAdContent");
        __publicField(this, "mockAdElement");
        __publicField(this, "errorRate");
        __publicField(this, "setupBannerSizeAndPosition", /* @__PURE__ */ __name(() => {
          const bannerElement = this.mockAdElement.querySelector(".mock-banner-ads-content");
          if (!(bannerElement instanceof HTMLDivElement))
            return;
          const gameDiv = document.getElementById("GameDiv");
          if (!gameDiv)
            return;
          const bannerAdOption = this.getBannerAdOption();
          if (!bannerAdOption)
            return;
          const { width, height } = gameDiv.getBoundingClientRect();
          const { width: cWidth, height: cHeight } = document.body.getBoundingClientRect();
          const { Position, BannerWidth, BannerHeight } = bannerAdOption;
          bannerElement.style.width = BannerWidth ? `${BannerWidth}px` : `${width}px`;
          bannerElement.style.height = BannerHeight ? `${BannerHeight}px` : `${height}px`;
          switch (Position) {
            case "right":
              bannerElement.style.right = `${(cWidth - width) / 2}px`;
              bannerElement.style.bottom = `${(cHeight - height) / 2}px`;
              break;
            case "left":
            case "bottom":
            default:
              bannerElement.style.left = `${(cWidth - width) / 2}px`;
              bannerElement.style.bottom = `${(cHeight - height) / 2}px`;
              break;
          }
        }, "setupBannerSizeAndPosition"));
        const { ErrorRate, GiphyApiKey } = GameCore.Configs.Mockup.Ads;
        this.adContent = "";
        this.apiAdContent = `https://api.giphy.com/v1/gifs/trending?api_key=${GiphyApiKey}&rate=pg&bundle=low_bandwidth`;
        this.errorRate = ErrorRate;
        this.mockAdElement = this.createBannerMockElement(`mock-ads-${placementId}`);
        this.setupBannerSizeAndPosition();
        this.listenDocumentBodyResize();
      }
      listenDocumentBodyResize() {
        const observer = new ResizeObserver(this.setupBannerSizeAndPosition);
        observer.observe(document.body);
      }
      createBannerMockElement(id) {
        if (document.getElementById(id)) {
          return document.getElementById(id);
        }
        const mockAdElement = document.createElement("div");
        mockAdElement.id = id;
        mockAdElement.style.display = "none";
        mockAdElement.innerHTML = html2;
        this.addBannerMockElementStyle();
        document.body.appendChild(mockAdElement);
        return mockAdElement;
      }
      addBannerMockElementStyle() {
        if (document.getElementById("mock-banner-ads-style"))
          return;
        const style = document.createElement("style");
        style.id = "mock-banner-ads-style";
        const head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(style);
        style.appendChild(document.createTextNode(css2));
      }
      async getAdContentAsync() {
        const response = await fetch(this.apiAdContent, { method: "GET" });
        const json = await response.json();
        if (!GameCore.Utils.Valid.isObject(json))
          return "";
        const images = json.data;
        const rand = Math.floor(Math.random() * images.length);
        return images[rand].images.downsized.url;
      }
      async loadAsync() {
        const isError = Math.random() * 100 <= this.errorRate;
        if (!isError) {
          this.adContent = await this.getAdContentAsync();
          await GameCore.Utils.Image.loadImage(this.adContent);
        } else {
          await GameCore.Utils.Time.sleepAsync(1e3);
          const code = loadErrorCodes[Math.floor(Math.random() * loadErrorCodes.length)];
          throw new SDKCommonError_default(code, "Load ads mock error");
        }
      }
      async showAsync() {
        const imgTag = this.mockAdElement.querySelector("#mock-banner-ads-image");
        if (!(imgTag instanceof HTMLImageElement))
          return;
        this.mockAdElement.style.zIndex = "888";
        this.mockAdElement.style.display = "flex";
        imgTag.src = this.adContent;
      }
      async hideAsync() {
        if (!this.mockAdElement)
          return;
        this.mockAdElement.style.display = "none";
      }
      getBannerAdOption() {
        const { BannerDisplayAdOptions } = GameCore.Configs.Ads;
        return BannerDisplayAdOptions.find((option) => option.PlacementId === this.placementId);
      }
    };
    __name(_MockBannerInstance, "MockBannerInstance");
    MockBannerInstance = _MockBannerInstance;
    MockBannerInstance_default = MockBannerInstance;
  }
});

// src/game-sdk/common/MockAdInstance.ts
var MockAdInstance_exports = {};
__export(MockAdInstance_exports, {
  default: () => MockAdInstance_default
});
var html3, css3, showMockPopupAd, loadErrorCodes2, showErrorCodes, _MockAdInstance, MockAdInstance, MockAdInstance_default;
var init_MockAdInstance = __esm({
  "src/game-sdk/common/MockAdInstance.ts"() {
    "use strict";
    init_define_INIT_CONFIG();
    init_SDKCommonError();
    init_AdInstance();
    html3 = /* html */
    `
<div class="mock-ads-content">
    <div class="ad-header">
        <div id="close-btn">Close</div>
        <div id="reward-btn">Reward</div>
    </div>
    <div class="ad-content">
        <div id="ad-type"></div>
        <img id="ad-image" alt="" />
    </div>
    <div class="ad-footer"></div>
</div>
`;
    css3 = /*css*/
    `
.mock-ads-content {
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: flex-start;
    background: #202020;
    font-family: sans-serif;
}

.ad-header {
    display: flex;
    width: 100%;
    padding: 10px 0;
    font-size: larger;
    align-items: center;
    justify-content: space-between;
    background-color: #0d0d0d;
}

#close-btn,
#reward-btn {
    width: 80px;
    display: flex;
    margin: 0 10px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
}

.ad-content {
    height: 70%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
}

#ad-type {
    display: flex;
    margin: 10px;
    padding: 20px;
    border-radius: 100vw;
    background-color: #101010;
}

#ad-image {
    max-width: 80%;
    max-height: 80%;
    display: flex;
    align-items: center;
    border-radius: 16px;
    justify-content: center;
    background-color: #101010;
}

.ad-footer {
    bottom: 0;
    width: 100%;
    padding: 10px;
    position: absolute;
    background-color: #111111;
}
`;
    showMockPopupAd = /* @__PURE__ */ __name((payload) => {
      const { type, adContent, adElement, onSuccess, onSkip } = payload;
      adElement.style.display = "flex";
      const adTypeElement = adElement.querySelector("#ad-type");
      if (adTypeElement) {
        adTypeElement.innerHTML = `TYPE ${type.toUpperCase()}`;
      }
      const adImageElement = adElement.querySelector("#ad-image");
      if (adImageElement instanceof HTMLImageElement) {
        adImageElement.src = adContent;
      }
      const closeButton = adElement.querySelector("#close-btn");
      const rewardButton = adElement.querySelector("#reward-btn");
      if (type === "rewarded") {
        if (closeButton instanceof HTMLDivElement) {
          closeButton.innerHTML = "Skip";
          closeButton.onclick = () => onSkip();
        }
        if (rewardButton instanceof HTMLDivElement) {
          rewardButton.onclick = () => onSuccess();
        }
      }
      if (type === "interstitial") {
        if (closeButton instanceof HTMLDivElement) {
          closeButton.onclick = () => onSuccess();
        }
        if (rewardButton instanceof HTMLDivElement) {
          rewardButton.remove();
        }
      }
    }, "showMockPopupAd");
    loadErrorCodes2 = ["NETWORK_FAILURE", "ADS_FREQUENT_LOAD", "ADS_NO_FILL", "INVALID_PARAM"];
    showErrorCodes = [
      "INVALID_OPERATION",
      "RATE_LIMITED",
      "NETWORK_FAILURE",
      "INVALID_PARAM",
      "ADS_NOT_LOADED"
    ];
    _MockAdInstance = class _MockAdInstance extends AdInstance_default {
      constructor(type, placementId) {
        super(type, placementId);
        __publicField(this, "adContent");
        __publicField(this, "apiAdContent");
        __publicField(this, "mockAdElement");
        __publicField(this, "errorRate");
        __publicField(this, "setupAdSizeAndPosition", /* @__PURE__ */ __name(() => {
          const mockAdElement = this.mockAdElement.querySelector(".mock-ads-content");
          if (!(mockAdElement instanceof HTMLDivElement))
            return;
          const gameDiv = document.getElementById("GameDiv");
          if (!gameDiv)
            return;
          const { width, height } = gameDiv.getBoundingClientRect();
          mockAdElement.style.width = `${width}px`;
          mockAdElement.style.height = `${height}px`;
          const { width: cWidth, height: cHeight } = document.body.getBoundingClientRect();
          mockAdElement.style.left = `${(cWidth - width) / 2}px`;
          mockAdElement.style.top = `${(cHeight - height) / 2}px`;
        }, "setupAdSizeAndPosition"));
        const { ErrorRate, GiphyApiKey } = GameCore.Configs.Mockup.Ads;
        this.adContent = null;
        this.apiAdContent = `https://api.giphy.com/v1/gifs/trending?api_key=${GiphyApiKey}&rate=pg&bundle=low_bandwidth`;
        this.errorRate = ErrorRate;
        this.mockAdElement = this.createMockAdElement("mock-ads");
        this.listenGameDivResize();
      }
      listenGameDivResize() {
        const gameDiv = document.getElementById("GameDiv");
        if (!gameDiv)
          return;
        const observer = new ResizeObserver(this.setupAdSizeAndPosition);
        observer.observe(gameDiv);
      }
      createMockAdElement(id) {
        if (document.getElementById(id)) {
          return document.getElementById(id);
        }
        const mockAdElement = document.createElement("div");
        mockAdElement.id = id;
        mockAdElement.style.zIndex = "999";
        mockAdElement.style.display = "none";
        mockAdElement.innerHTML = html3;
        this.addMockAdElementStyle();
        document.body.appendChild(mockAdElement);
        return mockAdElement;
      }
      addMockAdElementStyle() {
        if (document.getElementById("mock-ads-style"))
          return;
        const style = document.createElement("style");
        style.id = "mock-ads-style";
        const head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(style);
        style.appendChild(document.createTextNode(css3));
      }
      async loadAsync() {
        const isError = Math.random() * 100 <= this.errorRate;
        if (!isError) {
          this.adContent = await this.getAdContentAsync();
          if (!this.adContent) {
            throw new SDKCommonError_default("INVALID_PARAM", "Load ads mock error");
          }
          await GameCore.Utils.Image.loadImage(this.adContent);
        } else {
          await GameCore.Utils.Time.sleepAsync(1500);
          const code = loadErrorCodes2[Math.floor(Math.random() * loadErrorCodes2.length)];
          throw new SDKCommonError_default(code, "Load ads mock error");
        }
      }
      async showAsync() {
        const isError = Math.random() * 100 <= this.errorRate;
        if (!isError) {
          this.mockAdElement.innerHTML = html3;
          this.setupAdSizeAndPosition();
          return new Promise((resolve, reject) => {
            if (typeof this.adContent !== "string") {
              reject(new SDKCommonError_default("INVALID_PARAM", "Show ads mock error"));
              return;
            }
            showMockPopupAd({
              type: this.type,
              adContent: this.adContent,
              adElement: this.mockAdElement,
              onSuccess: () => {
                this.mockAdElement.style.display = "none";
                resolve();
              },
              onSkip: () => {
                this.mockAdElement.style.display = "none";
                reject(new SDKCommonError_default("USER_INPUT", "Skip ads mock"));
              }
            });
          });
        } else {
          await GameCore.Utils.Time.sleepAsync(1500);
          const code = showErrorCodes[Math.floor(Math.random() * showErrorCodes.length)];
          throw new SDKCommonError_default(code, "Show ads mock error");
        }
      }
      async getAdContentAsync() {
        const response = await fetch(this.apiAdContent, { method: "GET" });
        const json = await response.json();
        if (!GameCore.Utils.Valid.isObject(json))
          return null;
        const images = json.data;
        const rand = Math.floor(Math.random() * images.length);
        return images[rand].images.downsized.url;
      }
    };
    __name(_MockAdInstance, "MockAdInstance");
    MockAdInstance = _MockAdInstance;
    MockAdInstance_default = MockAdInstance;
  }
});

// src/game-sdk/index.ts
init_define_INIT_CONFIG();

// libs/empty-script.js
init_define_INIT_CONFIG();
var empty_script_default = {};

// src/utils/function/security.ts
init_define_INIT_CONFIG();
var usedCallLocations = [];
var blockAccess = /* @__PURE__ */ __name((source) => {
  try {
    if (true)
      return source;
    if (false)
      return source;
    const error = new Error();
    if (error.stack == null) {
      throw new Error();
    }
    const stackLines = error.stack.split("\n");
    const stackLineCount = stackLines.length;
    const callerLine = stackLineCount >= 4 ? stackLines[3] : stackLines[0];
    if (!callerLine)
      return source;
    if (usedCallLocations.includes(callerLine)) {
      return source;
    }
    console.warn("Access:", callerLine);
    if (["eval", "at <", "(<"].some((keyword) => callerLine.includes(keyword))) {
      throw new Error();
    }
    usedCallLocations.push(callerLine);
    return source;
  } catch (error) {
    console.warn("Block access:", error);
    return void 0;
  }
}, "blockAccess");
var wrapGetterToBlockObjectAccess = /* @__PURE__ */ __name((source, key) => {
  const originalValue = Object.getOwnPropertyDescriptor(source, key)?.value;
  if (!originalValue)
    return;
  Object.defineProperty(source, key, {
    enumerable: false,
    get() {
      return blockAccess(originalValue);
    },
    set() {
      return;
    }
  });
}, "wrapGetterToBlockObjectAccess");
var security_default = wrapGetterToBlockObjectAccess;

// src/game-sdk/sdk/GameSDK.ts
init_define_INIT_CONFIG();

// src/game-sdk/sdk/Context.ts
init_define_INIT_CONFIG();
var _Context = class _Context {
  constructor(adapter) {
    __publicField(this, "adapter");
    __publicField(this, "extra");
    __publicField(this, "currentContextID", null);
    __publicField(this, "currentContextType", "SOLO");
    __publicField(this, "currentContextPlayers", []);
    __publicField(this, "chooseAsyncPopup", null);
    __publicField(this, "createAsyncPopup", null);
    this.adapter = adapter;
    this.extra = adapter.extra;
  }
  initContextInfo(contextId, contextType) {
    if (!contextId || !contextType)
      return;
    if (!["SOLO", "THREAD", "POST", "GROUP"].includes(contextType)) {
      console.warn(`Invalid context type: ${contextType}`);
      return;
    }
    this.currentContextID = contextId;
    this.currentContextType = contextType;
  }
  getID() {
    return this.currentContextID;
  }
  getType() {
    return this.currentContextType;
  }
  async switchAsync(contextId) {
    if (contextId === "SOLO") {
      this.currentContextID = null;
      this.currentContextType = "SOLO";
      return;
    }
    this.currentContextID = contextId;
    this.currentContextType = "THREAD";
  }
  async chooseAsync(_options) {
    if (!this.chooseAsyncPopup) {
      const ChooseAsyncPopup2 = (await Promise.resolve().then(() => (init_ChooseAsyncPopup(), ChooseAsyncPopup_exports))).default;
      this.chooseAsyncPopup = new ChooseAsyncPopup2();
    }
    return new Promise((resolve, reject) => {
      if (!this.chooseAsyncPopup) {
        this.adapter.extra.exceptionUnsupported();
      }
      this.chooseAsyncPopup.onChoose(resolve);
      this.chooseAsyncPopup.onClose(reject);
      this.chooseAsyncPopup.show();
    });
  }
  async createAsync(playerId) {
    if (!this.createAsyncPopup) {
      const CreateAsyncPopup2 = (await Promise.resolve().then(() => (init_CreateAsyncPopup(), CreateAsyncPopup_exports))).default;
      this.createAsyncPopup = new CreateAsyncPopup2();
    }
    return new Promise((resolve, reject) => {
      if (!this.createAsyncPopup) {
        this.adapter.extra.exceptionUnsupported();
      }
      this.createAsyncPopup.onSwitch(resolve);
      this.createAsyncPopup.onClose(reject);
      this.createAsyncPopup.show(playerId);
    });
  }
  async getPlayersAsync() {
    return this.currentContextPlayers;
  }
};
__name(_Context, "Context");
var Context = _Context;
var Context_default = Context;

// src/game-sdk/sdk/Extra.ts
init_define_INIT_CONFIG();

// src/game-sdk/common/LoadingScreenElement.ts
init_define_INIT_CONFIG();
var html = (
  /*html*/
  `
<div id="lds-dual-ring"></div>
<div id="lds-text">
    <span id="lds-percent">0</span>%
</div>
`
);
var css = (
  /*css*/
  `
#lds-dual-ring {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #515151 transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
    -webkit-animation: lds-dual-ring 1.2s linear infinite;
}

#lds-text {
    color: #fff;
    font-family: monospace;
    display: flex;
    font-size: 1.2rem;
    position: absolute;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-shadow: 0 0.5px 1px #999;
}

#lds-content {
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #515151;
    pointer-events: none;
    transition: background-color 0.5s ease-in-out;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
`
);
var loadingId = "lds-content";
var _LoadingScreenElement = class _LoadingScreenElement {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.createLoadingElement();
      this.addLoadingElementStyle();
      const observer = new MutationObserver(() => {
        const gameDiv = document.getElementById("GameDiv");
        if (!gameDiv)
          return;
        this.setupLoadingElementSizeAndPosition();
      });
      const config = { attributes: true, childList: true, subtree: true };
      const target = document.body;
      observer.observe(target, config);
    });
  }
  createLoadingElement() {
    const loadingElement = document.createElement("div");
    loadingElement.id = loadingId;
    loadingElement.innerHTML = html;
    document.body.appendChild(loadingElement);
    return loadingElement;
  }
  addLoadingElementStyle() {
    const style = document.createElement("style");
    const head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }
  setupLoadingElementSizeAndPosition() {
    const loadingElement = document.getElementById(loadingId);
    if (!loadingElement)
      return;
    const gameDiv = document.getElementById("GameDiv");
    if (!gameDiv)
      return;
    const { width, height } = gameDiv.getBoundingClientRect();
    loadingElement.style.width = `${width}px`;
    loadingElement.style.height = `${height}px`;
    const { width: cWidth, height: cHeight } = document.body.getBoundingClientRect();
    loadingElement.style.left = `${(cWidth - width) / 2}px`;
    loadingElement.style.top = `${(cHeight - height) / 2}px`;
  }
  setLoadingProgress(percentage) {
    const loadingPercent = document.getElementById("lds-percent");
    if (!loadingPercent)
      return;
    loadingPercent.innerHTML = `${percentage}`;
    const loadingElement = document.getElementById(loadingId);
    if (!loadingElement)
      return;
    const opacity = 1 - percentage / 100;
    loadingElement.style.backgroundColor = `rgba(81, 81, 81, ${opacity})`;
  }
  removeLoadingElement() {
    const loadingElement = document.getElementById(loadingId);
    if (!loadingElement)
      return;
    loadingElement.style.backgroundColor = `rgba(81, 81, 81, 0)`;
    setTimeout(() => {
      loadingElement.remove();
    }, 300);
  }
};
__name(_LoadingScreenElement, "LoadingScreenElement");
var LoadingScreenElement = _LoadingScreenElement;
var LoadingScreenElement_default = LoadingScreenElement;

// src/game-sdk/sdk/Extra.ts
init_SDKCommonError();
var _Extra = class _Extra {
  constructor(adapter) {
    __publicField(this, "adapter");
    __publicField(this, "maxWaitGameCoreReadyTime", 1e4);
    __publicField(this, "loadingElement", null);
    this.adapter = adapter;
  }
  async waitGameCoreReadyAsync() {
    let waitTime = 0;
    return new Promise((resolve) => {
      const waitInterval = setInterval(() => {
        if ("GameCore" in window) {
          clearInterval(waitInterval);
          resolve();
          return;
        }
        waitTime += 100;
        if (waitTime > this.maxWaitGameCoreReadyTime) {
          waitTime = 0;
          console.warn("GameCore is slow to load, please check your network connection.");
        }
      }, 100);
    });
  }
  createLoadingElement() {
    if (this.loadingElement)
      return;
    this.loadingElement = new LoadingScreenElement_default();
  }
  setLoadingElementProgress(progress) {
    if (!this.loadingElement)
      return;
    this.loadingElement.setLoadingProgress(progress);
  }
  destroyLoadingElement() {
    if (!this.loadingElement)
      return;
    this.loadingElement.removeLoadingElement();
  }
  // ? Why is this method here?
  // * Make reduce code size and make it easier to read
  exceptionUserInput(message) {
    throw new SDKCommonError_default("USER_INPUT", message);
  }
  exceptionUnsupported() {
    throw new SDKCommonError_default("UNSUPPORTED", "Unsupported method");
  }
  exceptionInvalidParam(message) {
    throw new SDKCommonError_default("INVALID_PARAM", message);
  }
  exceptionMethodNotImplemented() {
    throw new SDKCommonError_default("METHOD_NOT_IMPLEMENTED", "Method not implemented");
  }
};
__name(_Extra, "Extra");
var Extra = _Extra;
var Extra_default = Extra;

// src/game-sdk/sdk/Player.ts
init_define_INIT_CONFIG();
var GameName = "Tile Connect Game".replace(/ /g, "-");
var _Player = class _Player {
  constructor(adapter) {
    __publicField(this, "adapter");
    __publicField(this, "extra");
    __publicField(this, "defaultPlayerInfo");
    __publicField(this, "currentPlayerInfo");
    __publicField(this, "infoKey", GameName + "_PlayerInfo");
    __publicField(this, "dataKey", GameName + "_PlayerData");
    __publicField(this, "getSignature", /* @__PURE__ */ __name(() => {
      const token = this.getSignatureFormMockup();
      if (GameCore.Utils.Valid.isString(token))
        return token;
      return "default_token";
    }, "getSignature"));
    this.adapter = adapter;
    this.extra = adapter.extra;
    this.initDefaultPlayerInfo();
  }
  initDefaultPlayerInfo() {
    this.defaultPlayerInfo = {
      playerId: "guest-007",
      playerName: "Guest",
      playerPhoto: ""
    };
    this.currentPlayerInfo = { ...this.defaultPlayerInfo };
  }
  initPlayerInfo(playerId) {
    this.updateCurrentPlayerInfo(playerId);
    GameCore.Utils.Browser.writeLocalStorage(this.infoKey, this.currentPlayerInfo);
  }
  getID() {
    const { Browser, Valid, Object: O } = GameCore.Utils;
    const data = Browser.getLocalStorage(this.infoKey);
    const { playerId } = this.currentPlayerInfo;
    if (!Valid.isObject(data))
      return playerId;
    if (O.hasOwn(data, "playerId") && Valid.isString(data.playerId)) {
      return data.playerId;
    }
    return playerId;
  }
  getName() {
    const { Browser, Valid, Object: O } = GameCore.Utils;
    const data = Browser.getLocalStorage(this.infoKey);
    const { playerName } = this.currentPlayerInfo;
    if (!Valid.isObject(data))
      return playerName;
    if (O.hasOwn(data, "name") && Valid.isString(data.name)) {
      return data.name;
    }
    return playerName;
  }
  getPhoto() {
    const { Browser, Valid, Object: O } = GameCore.Utils;
    const data = Browser.getLocalStorage(this.infoKey);
    const { playerPhoto } = this.currentPlayerInfo;
    if (!Valid.isObject(data))
      return playerPhoto;
    if (O.hasOwn(data, "photo") && Valid.isString(data.photo)) {
      return data.photo;
    }
    return playerPhoto;
  }
  async getDataAsync(keys) {
    const { Browser, Valid, Object: O } = GameCore.Utils;
    const data = Browser.getLocalStorage(this.dataKey);
    if (!Valid.isObject(data))
      return {};
    if (keys.length === 0)
      return data;
    const dataObject = {};
    keys.forEach((key) => {
      if (O.hasOwn(data, key)) {
        dataObject[key] = data[key];
      }
    });
    return dataObject;
  }
  async setDataAsync(data) {
    GameCore.Utils.Browser.writeLocalStorage(this.dataKey, data);
  }
  async getSignedPlayerInfoAsync() {
    return {
      getPlayerID: () => {
        return this.getID() ?? "";
      },
      getSignature: this.getSignature
    };
  }
  async getConnectedPlayersAsync() {
    return [];
  }
  updateCurrentPlayerInfo(playerId) {
    if (!playerId)
      return;
    const { Match } = GameCore.Configs.Mockup;
    const isPlayer = Match.PlayerInfo.Id === playerId;
    const isOpponent = Match.OpponentInfo.Id === playerId;
    if (isPlayer) {
      this.currentPlayerInfo.playerId = Match.PlayerInfo.Id;
      if (Match.PlayerInfo.Name) {
        this.currentPlayerInfo.playerName = Match.PlayerInfo.Name;
      }
      if (Match.PlayerInfo.Photo) {
        this.currentPlayerInfo.playerPhoto = Match.PlayerInfo.Photo;
      }
    }
    if (isOpponent) {
      this.currentPlayerInfo.playerId = Match.OpponentInfo.Id;
      if (Match.OpponentInfo.Name) {
        this.currentPlayerInfo.playerName = Match.OpponentInfo.Name;
      }
      if (Match.OpponentInfo.Photo) {
        this.currentPlayerInfo.playerPhoto = Match.OpponentInfo.Photo;
      }
    }
  }
  getSignatureFormMockup() {
    const { Match } = GameCore.Configs.Mockup;
    const isPlayer = Match.PlayerInfo.Id === this.getID();
    const isOpponent = Match.OpponentInfo.Id === this.getID();
    if (isPlayer)
      return Match.PlayerInfo.Signature;
    if (isOpponent)
      return Match.OpponentInfo.Signature;
    return null;
  }
};
__name(_Player, "Player");
var Player = _Player;
var Player_default = Player;

// src/game-sdk/sdk/GameSDK.ts
var _GameSDK = class _GameSDK {
  constructor() {
    __publicField(this, "extra");
    __publicField(this, "player");
    __publicField(this, "context");
    __publicField(this, "isInitialized", false);
    __publicField(this, "bannerAdInstances", {});
    __publicField(this, "rewardedVideoInstance", null);
    __publicField(this, "interstitialAdInstance", null);
  }
  initialize() {
    this.extra = new Extra_default(this);
    this.player = new Player_default(this);
    this.context = new Context_default(this);
  }
  getLocale() {
    return GameCore.Utils.Browser.getLocale();
  }
  getPlatform() {
    const { Device } = GameCore.Utils;
    if (Device.isAndroid())
      return "ANDROID";
    if (Device.isIOS())
      return "IOS";
    if (Device.isDesktop())
      return "WEB";
    if (Device.isMobile())
      return "MOBILE_WEB";
    return null;
  }
  getSDKName() {
    return "GameCore";
  }
  getSDKVersion() {
    return "1.0.0";
  }
  async initializeAsync() {
    if (this.isInitialized)
      return;
    this.initialize();
    this.extra.createLoadingElement();
    await this.extra.waitGameCoreReadyAsync();
    const params = GameCore.Utils.Browser.getQueryParams();
    const playerIdInQuery = params["playerId"];
    this.player.initPlayerInfo(playerIdInQuery);
    const contextIdInQuery = params["context_source_id"];
    const contextTypeInQuery = params["context_type"];
    this.context.initContextInfo(contextIdInQuery, contextTypeInQuery);
    this.isInitialized = true;
  }
  async startGameAsync() {
    const initedPercent = 100;
    window.__sdkLoadingCount = initedPercent;
    this.setLoadingProgress(initedPercent);
    this.extra.destroyLoadingElement();
  }
  setLoadingProgress(percentage) {
    this.extra.setLoadingElementProgress(percentage);
  }
  getEntryPointData() {
    return {};
  }
  async getEntryPointAsync() {
    return "no_entry";
  }
  async loadBannerAdAsync(placementId) {
    if (!placementId)
      return;
    const { Enable } = GameCore.Configs.Mockup.Ads;
    if (!Enable) {
      this.extra.exceptionInvalidParam("Banner ads mock is not enabled");
    }
    if (!this.bannerAdInstances[placementId]) {
      const MockBannerInstance2 = (await Promise.resolve().then(() => (init_MockBannerInstance(), MockBannerInstance_exports))).default;
      this.bannerAdInstances[placementId] = new MockBannerInstance2("banner", placementId);
    }
    await this.bannerAdInstances[placementId].loadAsync();
    await this.bannerAdInstances[placementId].showAsync();
  }
  async hideBannerAdAsync(placementId) {
    if (!this.bannerAdInstances[placementId])
      return;
    await this.bannerAdInstances[placementId].hideAsync();
  }
  async getInterstitialAdAsync(placementId) {
    const { Enable } = GameCore.Configs.Mockup.Ads;
    if (!Enable) {
      this.extra.exceptionInvalidParam("Interstitial ads mock is not enabled");
    }
    if (!this.interstitialAdInstance) {
      const MockAdInstance2 = (await Promise.resolve().then(() => (init_MockAdInstance(), MockAdInstance_exports))).default;
      this.interstitialAdInstance = new MockAdInstance2("interstitial", placementId);
    }
    return this.interstitialAdInstance;
  }
  async getRewardedVideoAsync(placementId) {
    const { Enable } = GameCore.Configs.Mockup.Ads;
    if (!Enable) {
      this.extra.exceptionInvalidParam("Rewarded video ads mock is not enabled");
    }
    if (!this.rewardedVideoInstance) {
      const MockAdInstance2 = (await Promise.resolve().then(() => (init_MockAdInstance(), MockAdInstance_exports))).default;
      this.rewardedVideoInstance = new MockAdInstance2("rewarded", placementId);
    }
    return this.rewardedVideoInstance;
  }
};
__name(_GameSDK, "GameSDK");
var GameSDK = _GameSDK;
var GameSDK_default = GameSDK;

// src/game-sdk/index.ts
function autoDetectAndInitializeSDKAdapter() {
  let sdkAdapter;
  const w = window;
  let sdkName = "GameSDK";
  if ("FBInstant" in w) {
    sdkName = "FBInstant";
    sdkAdapter = new empty_script_default(window.FBInstant);
  } else if ("gdsdk" in w) {
    sdkName = "GameDistribution";
    sdkAdapter = new empty_script_default(window.gdsdk);
  } else if ("CrazyGames" in w) {
    sdkName = "CrazyGames";
    sdkAdapter = new empty_script_default(window.CrazyGames.SDK);
  } else if (false) {
    sdkName = "AndroidNative";
    sdkAdapter = new ANAdapter();
  } else {
    sdkAdapter = new GameSDK_default();
  }
  console.info(`GameSDK loaded (${sdkName})`);
  return sdkAdapter;
}
__name(autoDetectAndInitializeSDKAdapter, "autoDetectAndInitializeSDKAdapter");
window.GameSDK = Object.seal(autoDetectAndInitializeSDKAdapter());
security_default(window, "GameSDK");
})();(function () {var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// <define:__INIT_CONFIG__>
var define_INIT_CONFIG_default = { GA_MEASUREMENT_ID: "null" };

// libs/init-game-sdk.js
var initConfig = define_INIT_CONFIG_default;
var lastProgress = 0;
var stepProgressLoading = /* @__PURE__ */ __name(() => {
  const gameSdkLoadingTimer = setInterval(() => {
    if (window.__sdkLoadingCount >= 99) {
      clearInterval(gameSdkLoadingTimer);
      return;
    }
    if (lastProgress === window.__sdkLoadingCount)
      return;
    lastProgress = window.__sdkLoadingCount;
    GameSDK.setLoadingProgress(window.__sdkLoadingCount);
  }, 100);
}, "stepProgressLoading");
var initGameSDK = /* @__PURE__ */ __name(async () => {
  try {
    console.info("GameSDK initializing...");
    window.__sdkLoadingCount = 1;
    if (true) {
      stepProgressLoading();
    } else {
      autoProgressLoading();
    }
    await GameSDK.initializeAsync();
    await processGoogleAnalytics();
    window.__sdkInitiated = true;
    console.info("GameSDK initialized");
  } catch (error) {
    console.error("GameSDK initializeAsync:", error);
  }
}, "initGameSDK");
var processGoogleAnalytics = /* @__PURE__ */ __name(async () => {
  if (!initConfig)
    return;
  const { BUILD_VERSION = 0, GA_MEASUREMENT_ID } = initConfig || {};
  const userId = GameSDK.player.getID();
  let entryPoint = "no_entry";
  try {
    entryPoint = await GameSDK.getEntryPointAsync();
  } catch (error) {
    console.warn("GameSDK", error);
  }
  initGoogleAnalytics(GA_MEASUREMENT_ID, BUILD_VERSION, userId, entryPoint);
}, "processGoogleAnalytics");
var initGoogleAnalytics = /* @__PURE__ */ __name((gaId, buildVer, userId, entryPoint) => {
  if (gaId == "null")
    return;
  try {
    const { fbig_ad_id, fbig_adset_id, fbig_campaign_id } = GameSDK.getEntryPointData() || {};
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/window.gtag/js?id=" + gaId;
    document.head.appendChild(gaScript);
    window.focus();
    window.gtag("set", "client_id", `100.${userId}`);
    window.gtag("set", "user_id", userId);
    window.gtag("set", "send_page_view", false);
    window.gtag("js", /* @__PURE__ */ new Date());
    window.gtag("config", gaId, {
      groups: "GA",
      build: buildVer,
      medium: entryPoint,
      campaign: fbig_campaign_id,
      cookie_flags: "SameSite=None;Secure"
    });
    window.gtag("set", "user_properties", {
      user_id: userId,
      ad_id: fbig_ad_id,
      adset_id: fbig_adset_id,
      campaign_id: fbig_campaign_id,
      traffic_source: entryPoint
    });
    window.gtag("event", "app_launch", {
      send_to: "GA"
    });
  } catch (error) {
    console.warn("GameSDK initGoogleAnalytics:", error);
  }
}, "initGoogleAnalytics");
initGameSDK();
})();