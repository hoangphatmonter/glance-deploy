(function () {var K=Object.defineProperty;var te=(r,e,t)=>e in r?K(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var u=(r,e)=>()=>(r&&(e=r(r=0)),e);var g=(r,e)=>{for(var t in e)K(r,t,{get:e[t],enumerable:!0})};var o=(r,e,t)=>(te(r,typeof e!="symbol"?e+"":e,t),t);var a=u(()=>{});var N={};g(N,{default:()=>ie});var E,ie,H=u(()=>{"use strict";a();E=class{constructor(){o(this,"popup");o(this,"title");o(this,"chooseButton");o(this,"closeButton");o(this,"onChoose",e=>{this.chooseButton.addEventListener("click",()=>{e(),this.hide()},{once:!0})});o(this,"onClose",e=>{this.closeButton.addEventListener("click",()=>{e(),this.hide()},{once:!0})});this.popup=document.createElement("div"),this.popup.classList.add("popup"),this.popup.classList.add("dark-mode"),this.title=document.createElement("h2"),this.title.textContent="Choose Async",this.popup.appendChild(this.title),this.chooseButton=document.createElement("button"),this.chooseButton.textContent="Choose",this.popup.appendChild(this.chooseButton),this.closeButton=document.createElement("button"),this.closeButton.textContent="Close",this.popup.appendChild(this.closeButton)}show(){document.body.appendChild(this.popup)}hide(){document.body.removeChild(this.popup)}},ie=E});var U={};g(U,{default:()=>re});var w,re,j=u(()=>{"use strict";a();w=class{constructor(){o(this,"popup");o(this,"title");o(this,"switchButton");o(this,"closeButton");o(this,"onSwitch",e=>{this.switchButton.addEventListener("click",()=>{e(),this.hide()},{once:!0})});o(this,"onClose",e=>{this.closeButton.addEventListener("click",()=>{e(),this.hide()},{once:!0})});this.popup=document.createElement("div"),this.popup.classList.add("popup"),this.popup.classList.add("dark-mode"),this.title=document.createElement("h2"),this.title.textContent="Create Async",this.popup.appendChild(this.title),this.switchButton=document.createElement("button"),this.switchButton.textContent="Switch",this.popup.appendChild(this.switchButton),this.closeButton=document.createElement("button"),this.closeButton.textContent="Close",this.popup.appendChild(this.closeButton)}show(e){let t=document.createElement("div");t.textContent=`Player ID: ${e}`,this.popup.appendChild(t),document.body.appendChild(this.popup)}hide(){document.body.removeChild(this.popup)}},re=w});var C,l,A=u(()=>{"use strict";a();C=class extends Error{constructor(t,n){super(n);o(this,"code");this.code=t}},l=C});var D,b,S=u(()=>{"use strict";a();D=class{constructor(e,t){o(this,"type");o(this,"placementId");this.type=e,this.placementId=t}getPlacementID(){return this.placementId}async hideAsync(){return Promise.resolve()}},b=D});var Q={};g(Q,{default:()=>le});var ce,de,q,k,le,Y=u(()=>{"use strict";a();A();S();ce=`
<div class="mock-banner-ads-content">
    <img id="mock-banner-ads-image" alt="" />
</div>
`,de=`
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
`,q=["NETWORK_FAILURE","ADS_FREQUENT_LOAD"],k=class extends b{constructor(t,n){super(t,n);o(this,"adContent");o(this,"apiAdContent");o(this,"mockAdElement");o(this,"errorRate");o(this,"setupBannerSizeAndPosition",()=>{let t=this.mockAdElement.querySelector(".mock-banner-ads-content");if(!(t instanceof HTMLDivElement))return;let n=document.getElementById("GameDiv");if(!n)return;let i=this.getBannerAdOption();if(!i)return;let{width:s,height:c}=n.getBoundingClientRect(),{width:p,height:m}=document.body.getBoundingClientRect(),{Position:h,BannerWidth:O,BannerHeight:T}=i;switch(t.style.width=O?`${O}px`:`${s}px`,t.style.height=T?`${T}px`:`${c}px`,h){case"right":t.style.right=`${(p-s)/2}px`,t.style.bottom=`${(m-c)/2}px`;break;case"left":case"bottom":default:t.style.left=`${(p-s)/2}px`,t.style.bottom=`${(m-c)/2}px`;break}});let{ErrorRate:i,GiphyApiKey:s}=GameCore.Configs.Mockup.Ads;this.adContent="",this.apiAdContent=`https://api.giphy.com/v1/gifs/trending?api_key=${s}&rate=pg&bundle=low_bandwidth`,this.errorRate=i,this.mockAdElement=this.createBannerMockElement(`mock-ads-${n}`),this.setupBannerSizeAndPosition(),this.listenDocumentBodyResize()}listenDocumentBodyResize(){new ResizeObserver(this.setupBannerSizeAndPosition).observe(document.body)}createBannerMockElement(t){if(document.getElementById(t))return document.getElementById(t);let n=document.createElement("div");return n.id=t,n.style.display="none",n.innerHTML=ce,this.addBannerMockElementStyle(),document.body.appendChild(n),n}addBannerMockElementStyle(){if(document.getElementById("mock-banner-ads-style"))return;let t=document.createElement("style");t.id="mock-banner-ads-style",(document.head||document.getElementsByTagName("head")[0]).appendChild(t),t.appendChild(document.createTextNode(de))}async getAdContentAsync(){let n=await(await fetch(this.apiAdContent,{method:"GET"})).json();if(!GameCore.Utils.Valid.isObject(n))return"";let i=n.data,s=Math.floor(Math.random()*i.length);return i[s].images.downsized.url}async loadAsync(){if(!(Math.random()*100<=this.errorRate))this.adContent=await this.getAdContentAsync(),await GameCore.Utils.Image.loadImage(this.adContent);else{await GameCore.Utils.Time.sleepAsync(1e3);let n=q[Math.floor(Math.random()*q.length)];throw new l(n,"Load ads mock error")}}async showAsync(){let t=this.mockAdElement.querySelector("#mock-banner-ads-image");t instanceof HTMLImageElement&&(this.mockAdElement.style.zIndex="888",this.mockAdElement.style.display="flex",t.src=this.adContent)}async hideAsync(){this.mockAdElement&&(this.mockAdElement.style.display="none")}getBannerAdOption(){let{BannerDisplayAdOptions:t}=GameCore.Configs.Ads;return t.find(n=>n.PlacementId===this.placementId)}},le=k});var G={};g(G,{default:()=>ue});var J,pe,me,X,Z,L,ue,B=u(()=>{"use strict";a();A();S();J=`
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
`,pe=`
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
`,me=r=>{let{type:e,adContent:t,adElement:n,onSuccess:i,onSkip:s}=r;n.style.display="flex";let c=n.querySelector("#ad-type");c&&(c.innerHTML=`TYPE ${e.toUpperCase()}`);let p=n.querySelector("#ad-image");p instanceof HTMLImageElement&&(p.src=t);let m=n.querySelector("#close-btn"),h=n.querySelector("#reward-btn");e==="rewarded"&&(m instanceof HTMLDivElement&&(m.innerHTML="Skip",m.onclick=()=>s()),h instanceof HTMLDivElement&&(h.onclick=()=>i())),e==="interstitial"&&(m instanceof HTMLDivElement&&(m.onclick=()=>i()),h instanceof HTMLDivElement&&h.remove())},X=["NETWORK_FAILURE","ADS_FREQUENT_LOAD","ADS_NO_FILL","INVALID_PARAM"],Z=["INVALID_OPERATION","RATE_LIMITED","NETWORK_FAILURE","INVALID_PARAM","ADS_NOT_LOADED"],L=class extends b{constructor(t,n){super(t,n);o(this,"adContent");o(this,"apiAdContent");o(this,"mockAdElement");o(this,"errorRate");o(this,"setupAdSizeAndPosition",()=>{let t=this.mockAdElement.querySelector(".mock-ads-content");if(!(t instanceof HTMLDivElement))return;let n=document.getElementById("GameDiv");if(!n)return;let{width:i,height:s}=n.getBoundingClientRect();t.style.width=`${i}px`,t.style.height=`${s}px`;let{width:c,height:p}=document.body.getBoundingClientRect();t.style.left=`${(c-i)/2}px`,t.style.top=`${(p-s)/2}px`});let{ErrorRate:i,GiphyApiKey:s}=GameCore.Configs.Mockup.Ads;this.adContent=null,this.apiAdContent=`https://api.giphy.com/v1/gifs/trending?api_key=${s}&rate=pg&bundle=low_bandwidth`,this.errorRate=i,this.mockAdElement=this.createMockAdElement("mock-ads"),this.listenGameDivResize()}listenGameDivResize(){let t=document.getElementById("GameDiv");if(!t)return;new ResizeObserver(this.setupAdSizeAndPosition).observe(t)}createMockAdElement(t){if(document.getElementById(t))return document.getElementById(t);let n=document.createElement("div");return n.id=t,n.style.zIndex="999",n.style.display="none",n.innerHTML=J,this.addMockAdElementStyle(),document.body.appendChild(n),n}addMockAdElementStyle(){if(document.getElementById("mock-ads-style"))return;let t=document.createElement("style");t.id="mock-ads-style",(document.head||document.getElementsByTagName("head")[0]).appendChild(t),t.appendChild(document.createTextNode(pe))}async loadAsync(){if(Math.random()*100<=this.errorRate){await GameCore.Utils.Time.sleepAsync(1500);let n=X[Math.floor(Math.random()*X.length)];throw new l(n,"Load ads mock error")}else{if(this.adContent=await this.getAdContentAsync(),!this.adContent)throw new l("INVALID_PARAM","Load ads mock error");await GameCore.Utils.Image.loadImage(this.adContent)}}async showAsync(){if(Math.random()*100<=this.errorRate){await GameCore.Utils.Time.sleepAsync(1500);let n=Z[Math.floor(Math.random()*Z.length)];throw new l(n,"Show ads mock error")}else return this.mockAdElement.innerHTML=J,this.setupAdSizeAndPosition(),new Promise((n,i)=>{if(typeof this.adContent!="string"){i(new l("INVALID_PARAM","Show ads mock error"));return}me({type:this.type,adContent:this.adContent,adElement:this.mockAdElement,onSuccess:()=>{this.mockAdElement.style.display="none",n()},onSkip:()=>{this.mockAdElement.style.display="none",i(new l("USER_INPUT","Skip ads mock"))}})})}async getAdContentAsync(){let n=await(await fetch(this.apiAdContent,{method:"GET"})).json();if(!GameCore.Utils.Valid.isObject(n))return null;let i=n.data,s=Math.floor(Math.random()*i.length);return i[s].images.downsized.url}},ue=L});a();a();var y={};a();var _=[],ne=r=>{try{let e=new Error;if(e.stack==null)throw new Error;let t=e.stack.split(`
`),i=t.length>=4?t[3]:t[0];if(!i||_.includes(i))return r;if(["eval","at <","(<"].some(s=>i.includes(s)))throw new Error;return _.push(i),r}catch{return}},oe=(r,e)=>{let t=Object.getOwnPropertyDescriptor(r,e)?.value;t&&Object.defineProperty(r,e,{enumerable:!1,get(){return ne(t)},set(){}})},R=oe;a();a();var v=class{constructor(e){o(this,"adapter");o(this,"extra");o(this,"currentContextID",null);o(this,"currentContextType","SOLO");o(this,"currentContextPlayers",[]);o(this,"chooseAsyncPopup",null);o(this,"createAsyncPopup",null);this.adapter=e,this.extra=e.extra}initContextInfo(e,t){!e||!t||["SOLO","THREAD","POST","GROUP"].includes(t)&&(this.currentContextID=e,this.currentContextType=t)}getID(){return this.currentContextID}getType(){return this.currentContextType}async switchAsync(e){if(e==="SOLO"){this.currentContextID=null,this.currentContextType="SOLO";return}this.currentContextID=e,this.currentContextType="THREAD"}async chooseAsync(e){if(!this.chooseAsyncPopup){let t=(await Promise.resolve().then(()=>(H(),N))).default;this.chooseAsyncPopup=new t}return new Promise((t,n)=>{this.chooseAsyncPopup||this.adapter.extra.exceptionUnsupported(),this.chooseAsyncPopup.onChoose(t),this.chooseAsyncPopup.onClose(n),this.chooseAsyncPopup.show()})}async createAsync(e){if(!this.createAsyncPopup){let t=(await Promise.resolve().then(()=>(j(),U))).default;this.createAsyncPopup=new t}return new Promise((t,n)=>{this.createAsyncPopup||this.adapter.extra.exceptionUnsupported(),this.createAsyncPopup.onSwitch(t),this.createAsyncPopup.onClose(n),this.createAsyncPopup.show(e)})}async getPlayersAsync(){return this.currentContextPlayers}},z=v;a();a();var se=`
<div id="lds-dual-ring"></div>
<div id="lds-text">
    <span id="lds-percent">0</span>%
</div>
`,ae=`
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
`,f="lds-content",I=class{constructor(){document.addEventListener("DOMContentLoaded",()=>{this.createLoadingElement(),this.addLoadingElementStyle();let e=new MutationObserver(()=>{document.getElementById("GameDiv")&&this.setupLoadingElementSizeAndPosition()}),t={attributes:!0,childList:!0,subtree:!0},n=document.body;e.observe(n,t)})}createLoadingElement(){let e=document.createElement("div");return e.id=f,e.innerHTML=se,document.body.appendChild(e),e}addLoadingElementStyle(){let e=document.createElement("style");(document.head||document.getElementsByTagName("head")[0]).appendChild(e),e.appendChild(document.createTextNode(ae))}setupLoadingElementSizeAndPosition(){let e=document.getElementById(f);if(!e)return;let t=document.getElementById("GameDiv");if(!t)return;let{width:n,height:i}=t.getBoundingClientRect();e.style.width=`${n}px`,e.style.height=`${i}px`;let{width:s,height:c}=document.body.getBoundingClientRect();e.style.left=`${(s-n)/2}px`,e.style.top=`${(c-i)/2}px`}setLoadingProgress(e){let t=document.getElementById("lds-percent");if(!t)return;t.innerHTML=`${e}`;let n=document.getElementById(f);if(!n)return;let i=1-e/100;n.style.backgroundColor=`rgba(81, 81, 81, ${i})`}removeLoadingElement(){let e=document.getElementById(f);e&&(e.style.backgroundColor="rgba(81, 81, 81, 0)",setTimeout(()=>{e.remove()},300))}},$=I;A();var P=class{constructor(e){o(this,"adapter");o(this,"maxWaitGameCoreReadyTime",1e4);o(this,"loadingElement",null);this.adapter=e}async waitGameCoreReadyAsync(){let e=0;return new Promise(t=>{let n=setInterval(()=>{if("GameCore"in window){clearInterval(n),t();return}e+=100,e>this.maxWaitGameCoreReadyTime&&(e=0)},100)})}createLoadingElement(){this.loadingElement||(this.loadingElement=new $)}setLoadingElementProgress(e){this.loadingElement&&this.loadingElement.setLoadingProgress(e)}destroyLoadingElement(){this.loadingElement&&this.loadingElement.removeLoadingElement()}exceptionUserInput(e){throw new l("USER_INPUT",e)}exceptionUnsupported(){throw new l("UNSUPPORTED","Unsupported method")}exceptionInvalidParam(e){throw new l("INVALID_PARAM",e)}exceptionMethodNotImplemented(){throw new l("METHOD_NOT_IMPLEMENTED","Method not implemented")}},V=P;a();var F="Tile Connect Game".replace(/ /g,"-"),x=class{constructor(e){o(this,"adapter");o(this,"extra");o(this,"defaultPlayerInfo");o(this,"currentPlayerInfo");o(this,"infoKey",F+"_PlayerInfo");o(this,"dataKey",F+"_PlayerData");o(this,"getSignature",()=>{let e=this.getSignatureFormMockup();return GameCore.Utils.Valid.isString(e)?e:"default_token"});this.adapter=e,this.extra=e.extra,this.initDefaultPlayerInfo()}initDefaultPlayerInfo(){this.defaultPlayerInfo={playerId:"guest-007",playerName:"Guest",playerPhoto:""},this.currentPlayerInfo={...this.defaultPlayerInfo}}initPlayerInfo(e){this.updateCurrentPlayerInfo(e),GameCore.Utils.Browser.writeLocalStorage(this.infoKey,this.currentPlayerInfo)}getID(){let{Browser:e,Valid:t,Object:n}=GameCore.Utils,i=e.getLocalStorage(this.infoKey),{playerId:s}=this.currentPlayerInfo;return t.isObject(i)&&n.hasOwn(i,"playerId")&&t.isString(i.playerId)?i.playerId:s}getName(){let{Browser:e,Valid:t,Object:n}=GameCore.Utils,i=e.getLocalStorage(this.infoKey),{playerName:s}=this.currentPlayerInfo;return t.isObject(i)&&n.hasOwn(i,"name")&&t.isString(i.name)?i.name:s}getPhoto(){let{Browser:e,Valid:t,Object:n}=GameCore.Utils,i=e.getLocalStorage(this.infoKey),{playerPhoto:s}=this.currentPlayerInfo;return t.isObject(i)&&n.hasOwn(i,"photo")&&t.isString(i.photo)?i.photo:s}async getDataAsync(e){let{Browser:t,Valid:n,Object:i}=GameCore.Utils,s=t.getLocalStorage(this.dataKey);if(!n.isObject(s))return{};if(e.length===0)return s;let c={};return e.forEach(p=>{i.hasOwn(s,p)&&(c[p]=s[p])}),c}async setDataAsync(e){GameCore.Utils.Browser.writeLocalStorage(this.dataKey,e)}async getSignedPlayerInfoAsync(){return{getPlayerID:()=>this.getID()??"",getSignature:this.getSignature}}async getConnectedPlayersAsync(){return[]}updateCurrentPlayerInfo(e){if(!e)return;let{Match:t}=GameCore.Configs.Mockup,n=t.PlayerInfo.Id===e,i=t.OpponentInfo.Id===e;n&&(this.currentPlayerInfo.playerId=t.PlayerInfo.Id,t.PlayerInfo.Name&&(this.currentPlayerInfo.playerName=t.PlayerInfo.Name),t.PlayerInfo.Photo&&(this.currentPlayerInfo.playerPhoto=t.PlayerInfo.Photo)),i&&(this.currentPlayerInfo.playerId=t.OpponentInfo.Id,t.OpponentInfo.Name&&(this.currentPlayerInfo.playerName=t.OpponentInfo.Name),t.OpponentInfo.Photo&&(this.currentPlayerInfo.playerPhoto=t.OpponentInfo.Photo))}getSignatureFormMockup(){let{Match:e}=GameCore.Configs.Mockup,t=e.PlayerInfo.Id===this.getID(),n=e.OpponentInfo.Id===this.getID();return t?e.PlayerInfo.Signature:n?e.OpponentInfo.Signature:null}},W=x;var M=class{constructor(){o(this,"extra");o(this,"player");o(this,"context");o(this,"isInitialized",!1);o(this,"bannerAdInstances",{});o(this,"rewardedVideoInstance",null);o(this,"interstitialAdInstance",null)}initialize(){this.extra=new V(this),this.player=new W(this),this.context=new z(this)}getLocale(){return GameCore.Utils.Browser.getLocale()}getPlatform(){let{Device:e}=GameCore.Utils;return e.isAndroid()?"ANDROID":e.isIOS()?"IOS":e.isDesktop()?"WEB":e.isMobile()?"MOBILE_WEB":null}getSDKName(){return"GameCore"}getSDKVersion(){return"1.0.0"}async initializeAsync(){if(this.isInitialized)return;this.initialize(),this.extra.createLoadingElement(),await this.extra.waitGameCoreReadyAsync();let e=GameCore.Utils.Browser.getQueryParams(),t=e.playerId;this.player.initPlayerInfo(t);let n=e.context_source_id,i=e.context_type;this.context.initContextInfo(n,i),this.isInitialized=!0}async startGameAsync(){window.__sdkLoadingCount=100,this.setLoadingProgress(100),this.extra.destroyLoadingElement()}setLoadingProgress(e){this.extra.setLoadingElementProgress(e)}getEntryPointData(){return{}}async getEntryPointAsync(){return"no_entry"}async loadBannerAdAsync(e){if(!e)return;let{Enable:t}=GameCore.Configs.Mockup.Ads;if(t||this.extra.exceptionInvalidParam("Banner ads mock is not enabled"),!this.bannerAdInstances[e]){let n=(await Promise.resolve().then(()=>(Y(),Q))).default;this.bannerAdInstances[e]=new n("banner",e)}await this.bannerAdInstances[e].loadAsync(),await this.bannerAdInstances[e].showAsync()}async hideBannerAdAsync(e){this.bannerAdInstances[e]&&await this.bannerAdInstances[e].hideAsync()}async getInterstitialAdAsync(e){let{Enable:t}=GameCore.Configs.Mockup.Ads;if(t||this.extra.exceptionInvalidParam("Interstitial ads mock is not enabled"),!this.interstitialAdInstance){let n=(await Promise.resolve().then(()=>(B(),G))).default;this.interstitialAdInstance=new n("interstitial",e)}return this.interstitialAdInstance}async getRewardedVideoAsync(e){let{Enable:t}=GameCore.Configs.Mockup.Ads;if(t||this.extra.exceptionInvalidParam("Rewarded video ads mock is not enabled"),!this.rewardedVideoInstance){let n=(await Promise.resolve().then(()=>(B(),G))).default;this.rewardedVideoInstance=new n("rewarded",e)}return this.rewardedVideoInstance}},ee=M;function he(){let r,e=window,t="GameSDK";return"FBInstant"in e?(t="FBInstant",r=new y(window.FBInstant)):"gdsdk"in e?(t="GameDistribution",r=new y(window.gdsdk)):"CrazyGames"in e?(t="CrazyGames",r=new y(window.CrazyGames.SDK)):r=new ee,r}window.GameSDK=Object.seal(he());R(window,"GameSDK");
})();(function () {var r={GA_MEASUREMENT_ID:"null"};var d=r,_=()=>{let n=setInterval(()=>{if(window.__sdkLoadingCount>=99){clearInterval(n);return}GameSDK.setLoadingProgress(window.__sdkLoadingCount++)},100)};var w=async()=>{try{window.__sdkLoadingCount=1,_(),await GameSDK.initializeAsync(),await l(),window.__sdkInitiated=!0}catch{}},l=async()=>{if(!d)return;let{BUILD_VERSION:n=0,GA_MEASUREMENT_ID:o}=d||{},e=GameSDK.player.getID(),i="no_entry";try{i=await GameSDK.getEntryPointAsync()}catch{}m(o,n,e,i)},m=(n,o,e,i)=>{if(n!="null")try{let{fbig_ad_id:t,fbig_adset_id:g,fbig_campaign_id:s}=GameSDK.getEntryPointData()||{},a=document.createElement("script");a.async=!0,a.src="https://www.googletagmanager.com/window.gtag/js?id="+n,document.head.appendChild(a),window.focus(),window.gtag("set","client_id",`100.${e}`),window.gtag("set","user_id",e),window.gtag("set","send_page_view",!1),window.gtag("js",new Date),window.gtag("config",n,{groups:"GA",build:o,medium:i,campaign:s,cookie_flags:"SameSite=None;Secure"}),window.gtag("set","user_properties",{user_id:e,ad_id:t,adset_id:g,campaign_id:s,traffic_source:i}),window.gtag("event","app_launch",{send_to:"GA"})}catch{}};w();
})();