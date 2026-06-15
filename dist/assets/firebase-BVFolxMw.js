const Xo=()=>{};var Cs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=function(i){const e=[];let n=0;for(let s=0;s<i.length;s++){let o=i.charCodeAt(s);o<128?e[n++]=o:o<2048?(e[n++]=o>>6|192,e[n++]=o&63|128):(o&64512)===55296&&s+1<i.length&&(i.charCodeAt(s+1)&64512)===56320?(o=65536+((o&1023)<<10)+(i.charCodeAt(++s)&1023),e[n++]=o>>18|240,e[n++]=o>>12&63|128,e[n++]=o>>6&63|128,e[n++]=o&63|128):(e[n++]=o>>12|224,e[n++]=o>>6&63|128,e[n++]=o&63|128)}return e},Yo=function(i){const e=[];let n=0,s=0;for(;n<i.length;){const o=i[n++];if(o<128)e[s++]=String.fromCharCode(o);else if(o>191&&o<224){const c=i[n++];e[s++]=String.fromCharCode((o&31)<<6|c&63)}else if(o>239&&o<365){const c=i[n++],l=i[n++],w=i[n++],v=((o&7)<<18|(c&63)<<12|(l&63)<<6|w&63)-65536;e[s++]=String.fromCharCode(55296+(v>>10)),e[s++]=String.fromCharCode(56320+(v&1023))}else{const c=i[n++],l=i[n++];e[s++]=String.fromCharCode((o&15)<<12|(c&63)<<6|l&63)}}return e.join("")},Ir={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let o=0;o<i.length;o+=3){const c=i[o],l=o+1<i.length,w=l?i[o+1]:0,v=o+2<i.length,E=v?i[o+2]:0,A=c>>2,S=(c&3)<<4|w>>4;let O=(w&15)<<2|E>>6,H=E&63;v||(H=64,l||(O=64)),s.push(n[A],n[S],n[O],n[H])}return s.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(yr(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):Yo(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let o=0;o<i.length;){const c=n[i.charAt(o++)],w=o<i.length?n[i.charAt(o)]:0;++o;const E=o<i.length?n[i.charAt(o)]:64;++o;const S=o<i.length?n[i.charAt(o)]:64;if(++o,c==null||w==null||E==null||S==null)throw new Qo;const O=c<<2|w>>4;if(s.push(O),E!==64){const H=w<<4&240|E>>2;if(s.push(H),S!==64){const x=E<<6&192|S;s.push(x)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class Qo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Zo=function(i){const e=yr(i);return Ir.encodeByteArray(e,!0)},cn=function(i){return Zo(i).replace(/\./g,"")},wr=function(i){try{return Ir.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta=()=>ea().__FIREBASE_DEFAULTS__,na=()=>{if(typeof process>"u"||typeof Cs>"u")return;const i=Cs.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},ia=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&wr(i[1]);return e&&JSON.parse(e)},ui=()=>{try{return Xo()||ta()||na()||ia()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},vr=i=>{var e,n;return(n=(e=ui())==null?void 0:e.emulatorHosts)==null?void 0:n[i]},sa=i=>{const e=vr(i);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Er=()=>{var i;return(i=ui())==null?void 0:i.config},Tr=i=>{var e;return(e=ui())==null?void 0:e[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",o=i.iat||0,c=i.sub||i.user_id;if(!c)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l={iss:`https://securetoken.google.com/${s}`,aud:s,iat:o,exp:o+3600,auth_time:o,sub:c,user_id:c,firebase:{sign_in_provider:"custom",identities:{}},...i};return[cn(JSON.stringify(n)),cn(JSON.stringify(l)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function aa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(q())}function ca(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ha(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function la(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ua(){const i=q();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function da(){try{return typeof indexedDB=="object"}catch{return!1}}function fa(){return new Promise((i,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(s);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(s),i(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var c;e(((c=o.error)==null?void 0:c.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa="FirebaseError";class ge extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=pa,Object.setPrototypeOf(this,ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Lt.prototype.create)}}class Lt{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},o=`${this.service}/${e}`,c=this.errors[e],l=c?ga(c,s):"Error",w=`${this.serviceName}: ${l} (${o}).`;return new ge(o,w,s)}}function ga(i,e){return i.replace(ma,(n,s)=>{const o=e[s];return o!=null?String(o):`<${s}?>`})}const ma=/\{\$([^}]+)}/g;function _a(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function Ge(i,e){if(i===e)return!0;const n=Object.keys(i),s=Object.keys(e);for(const o of n){if(!s.includes(o))return!1;const c=i[o],l=e[o];if(ks(c)&&ks(l)){if(!Ge(c,l))return!1}else if(c!==l)return!1}for(const o of s)if(!n.includes(o))return!1;return!0}function ks(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(i){const e=[];for(const[n,s]of Object.entries(i))Array.isArray(s)?s.forEach(o=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function ya(i,e){const n=new Ia(i,e);return n.subscribe.bind(n)}class Ia{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let o;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");wa(e,["next","error","complete"])?o=e:o={next:e,error:n,complete:s},o.next===void 0&&(o.next=qn),o.error===void 0&&(o.error=qn),o.complete===void 0&&(o.complete=qn);const c=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),c}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function wa(i,e){if(typeof i!="object"||i===null)return!1;for(const n of e)if(n in i&&typeof i[n]=="function")return!0;return!1}function qn(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(i){return i&&i._delegate?i._delegate:i}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(i){try{return(i.startsWith("http://")||i.startsWith("https://")?new URL(i).hostname:i).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Sr(i){return(await fetch(i,{credentials:"include"})).ok}class qe{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new ra;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:n});o&&s.resolve(o)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ta(e))try{this.getOrInitializeService({instanceIdentifier:Fe})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(n);try{const c=this.getOrInitializeService({instanceIdentifier:o});s.resolve(c)}catch{}}}}clearInstance(e=Fe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Fe){return this.instances.has(e)}getOptions(e=Fe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[c,l]of this.instancesDeferred.entries()){const w=this.normalizeInstanceIdentifier(c);s===w&&l.resolve(o)}return o}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),o=this.onInitCallbacks.get(s)??new Set;o.add(e),this.onInitCallbacks.set(s,o);const c=this.instances.get(s);return c&&e(c,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const o of s)try{o(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ea(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Fe){return this.component?this.component.multipleInstances?e:Fe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ea(i){return i===Fe?void 0:i}function Ta(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new va(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var N;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(N||(N={}));const Aa={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},ba=N.INFO,Pa={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},Ra=(i,e,...n)=>{if(e<i.logLevel)return;const s=new Date().toISOString(),o=Pa[e];if(o)console[o](`[${s}]  ${i.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class di{constructor(e){this.name=e,this._logLevel=ba,this._logHandler=Ra,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Aa[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const Ca=(i,e)=>e.some(n=>i instanceof n);let Ns,Ds;function ka(){return Ns||(Ns=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Na(){return Ds||(Ds=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ar=new WeakMap,ni=new WeakMap,br=new WeakMap,Kn=new WeakMap,fi=new WeakMap;function Da(i){const e=new Promise((n,s)=>{const o=()=>{i.removeEventListener("success",c),i.removeEventListener("error",l)},c=()=>{n(ke(i.result)),o()},l=()=>{s(i.error),o()};i.addEventListener("success",c),i.addEventListener("error",l)});return e.then(n=>{n instanceof IDBCursor&&Ar.set(n,i)}).catch(()=>{}),fi.set(e,i),e}function Oa(i){if(ni.has(i))return;const e=new Promise((n,s)=>{const o=()=>{i.removeEventListener("complete",c),i.removeEventListener("error",l),i.removeEventListener("abort",l)},c=()=>{n(),o()},l=()=>{s(i.error||new DOMException("AbortError","AbortError")),o()};i.addEventListener("complete",c),i.addEventListener("error",l),i.addEventListener("abort",l)});ni.set(i,e)}let ii={get(i,e,n){if(i instanceof IDBTransaction){if(e==="done")return ni.get(i);if(e==="objectStoreNames")return i.objectStoreNames||br.get(i);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ke(i[e])},set(i,e,n){return i[e]=n,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function La(i){ii=i(ii)}function Ma(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=i.call(Jn(this),e,...n);return br.set(s,e.sort?e.sort():[e]),ke(s)}:Na().includes(i)?function(...e){return i.apply(Jn(this),e),ke(Ar.get(this))}:function(...e){return ke(i.apply(Jn(this),e))}}function Ua(i){return typeof i=="function"?Ma(i):(i instanceof IDBTransaction&&Oa(i),Ca(i,ka())?new Proxy(i,ii):i)}function ke(i){if(i instanceof IDBRequest)return Da(i);if(Kn.has(i))return Kn.get(i);const e=Ua(i);return e!==i&&(Kn.set(i,e),fi.set(e,i)),e}const Jn=i=>fi.get(i);function xa(i,e,{blocked:n,upgrade:s,blocking:o,terminated:c}={}){const l=indexedDB.open(i,e),w=ke(l);return s&&l.addEventListener("upgradeneeded",v=>{s(ke(l.result),v.oldVersion,v.newVersion,ke(l.transaction),v)}),n&&l.addEventListener("blocked",v=>n(v.oldVersion,v.newVersion,v)),w.then(v=>{c&&v.addEventListener("close",()=>c()),o&&v.addEventListener("versionchange",E=>o(E.oldVersion,E.newVersion,E))}).catch(()=>{}),w}const Va=["get","getKey","getAll","getAllKeys","count"],Fa=["put","add","delete","clear"],Xn=new Map;function Os(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(Xn.get(e))return Xn.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,o=Fa.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(o||Va.includes(n)))return;const c=async function(l,...w){const v=this.transaction(l,o?"readwrite":"readonly");let E=v.store;return s&&(E=E.index(w.shift())),(await Promise.all([E[n](...w),o&&v.done]))[0]};return Xn.set(e,c),c}La(i=>({...i,get:(e,n,s)=>Os(e,n)||i.get(e,n,s),has:(e,n)=>!!Os(e,n)||i.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ba(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Ba(i){const e=i.getComponent();return(e==null?void 0:e.type)==="VERSION"}const si="@firebase/app",Ls="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fe=new di("@firebase/app"),Ha="@firebase/app-compat",$a="@firebase/analytics-compat",Wa="@firebase/analytics",za="@firebase/app-check-compat",Ga="@firebase/app-check",qa="@firebase/auth",Ka="@firebase/auth-compat",Ja="@firebase/database",Xa="@firebase/data-connect",Ya="@firebase/database-compat",Qa="@firebase/functions",Za="@firebase/functions-compat",ec="@firebase/installations",tc="@firebase/installations-compat",nc="@firebase/messaging",ic="@firebase/messaging-compat",sc="@firebase/performance",rc="@firebase/performance-compat",oc="@firebase/remote-config",ac="@firebase/remote-config-compat",cc="@firebase/storage",hc="@firebase/storage-compat",lc="@firebase/firestore",uc="@firebase/ai",dc="@firebase/firestore-compat",fc="firebase",pc="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri="[DEFAULT]",gc={[si]:"fire-core",[Ha]:"fire-core-compat",[Wa]:"fire-analytics",[$a]:"fire-analytics-compat",[Ga]:"fire-app-check",[za]:"fire-app-check-compat",[qa]:"fire-auth",[Ka]:"fire-auth-compat",[Ja]:"fire-rtdb",[Xa]:"fire-data-connect",[Ya]:"fire-rtdb-compat",[Qa]:"fire-fn",[Za]:"fire-fn-compat",[ec]:"fire-iid",[tc]:"fire-iid-compat",[nc]:"fire-fcm",[ic]:"fire-fcm-compat",[sc]:"fire-perf",[rc]:"fire-perf-compat",[oc]:"fire-rc",[ac]:"fire-rc-compat",[cc]:"fire-gcs",[hc]:"fire-gcs-compat",[lc]:"fire-fst",[dc]:"fire-fst-compat",[uc]:"fire-vertex","fire-js":"fire-js",[fc]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn=new Map,mc=new Map,oi=new Map;function Ms(i,e){try{i.container.addComponent(e)}catch(n){fe.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,n)}}function ot(i){const e=i.name;if(oi.has(e))return fe.debug(`There were multiple attempts to register component ${e}.`),!1;oi.set(e,i);for(const n of hn.values())Ms(n,i);for(const n of mc.values())Ms(n,i);return!0}function pi(i,e){const n=i.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),i.container.getProvider(e)}function Q(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ne=new Lt("app","Firebase",_c);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ne.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=pc;function Ic(i,e={}){let n=i;typeof e!="object"&&(e={name:e});const s={name:ri,automaticDataCollectionEnabled:!0,...e},o=s.name;if(typeof o!="string"||!o)throw Ne.create("bad-app-name",{appName:String(o)});if(n||(n=Er()),!n)throw Ne.create("no-options");const c=hn.get(o);if(c){if(Ge(n,c.options)&&Ge(s,c.config))return c;throw Ne.create("duplicate-app",{appName:o})}const l=new Sa(o);for(const v of oi.values())l.addComponent(v);const w=new yc(n,s,l);return hn.set(o,w),w}function Pr(i=ri){const e=hn.get(i);if(!e&&i===ri&&Er())return Ic();if(!e)throw Ne.create("no-app",{appName:i});return e}function De(i,e,n){let s=gc[i]??i;n&&(s+=`-${n}`);const o=s.match(/\s|\//),c=e.match(/\s|\//);if(o||c){const l=[`Unable to register library "${s}" with version "${e}":`];o&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&c&&l.push("and"),c&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),fe.warn(l.join(" "));return}ot(new qe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc="firebase-heartbeat-database",vc=1,Nt="firebase-heartbeat-store";let Yn=null;function Rr(){return Yn||(Yn=xa(wc,vc,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(Nt)}catch(n){console.warn(n)}}}}).catch(i=>{throw Ne.create("idb-open",{originalErrorMessage:i.message})})),Yn}async function Ec(i){try{const n=(await Rr()).transaction(Nt),s=await n.objectStore(Nt).get(Cr(i));return await n.done,s}catch(e){if(e instanceof ge)fe.warn(e.message);else{const n=Ne.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});fe.warn(n.message)}}}async function Us(i,e){try{const s=(await Rr()).transaction(Nt,"readwrite");await s.objectStore(Nt).put(e,Cr(i)),await s.done}catch(n){if(n instanceof ge)fe.warn(n.message);else{const s=Ne.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});fe.warn(s.message)}}}function Cr(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc=1024,Sc=30;class Ac{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Pc(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),c=xs();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===c||this._heartbeatsCache.heartbeats.some(l=>l.date===c))return;if(this._heartbeatsCache.heartbeats.push({date:c,agent:o}),this._heartbeatsCache.heartbeats.length>Sc){const l=Rc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){fe.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=xs(),{heartbeatsToSend:s,unsentEntries:o}=bc(this._heartbeatsCache.heartbeats),c=cn(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),c}catch(n){return fe.warn(n),""}}}function xs(){return new Date().toISOString().substring(0,10)}function bc(i,e=Tc){const n=[];let s=i.slice();for(const o of i){const c=n.find(l=>l.agent===o.agent);if(c){if(c.dates.push(o.date),Vs(n)>e){c.dates.pop();break}}else if(n.push({agent:o.agent,dates:[o.date]}),Vs(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Pc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return da()?fa().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ec(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Us(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Us(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Vs(i){return cn(JSON.stringify({version:2,heartbeats:i})).length}function Rc(i){if(i.length===0)return-1;let e=0,n=i[0].date;for(let s=1;s<i.length;s++)i[s].date<n&&(n=i[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cc(i){ot(new qe("platform-logger",e=>new ja(e),"PRIVATE")),ot(new qe("heartbeat",e=>new Ac(e),"PRIVATE")),De(si,Ls,i),De(si,Ls,"esm2020"),De("fire-js","")}Cc("");function kr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const kc=kr,Nr=new Lt("auth","Firebase",kr());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new di("@firebase/auth");function Nc(i,...e){ln.logLevel<=N.WARN&&ln.warn(`Auth (${ht}): ${i}`,...e)}function nn(i,...e){ln.logLevel<=N.ERROR&&ln.error(`Auth (${ht}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(i,...e){throw mi(i,...e)}function te(i,...e){return mi(i,...e)}function gi(i,e,n){const s={...kc(),[e]:n};return new Lt("auth","Firebase",s).create(e,{appName:i.name})}function $e(i){return gi(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Dc(i,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&he(i,"argument-error"),gi(i,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function mi(i,...e){if(typeof i!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=i.name),i._errorFactory.create(n,...s)}return Nr.create(i,...e)}function b(i,e,...n){if(!i)throw mi(e,...n)}function ue(i){const e="INTERNAL ASSERTION FAILED: "+i;throw nn(e),new Error(e)}function pe(i,e){i||ue(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(){var i;return typeof self<"u"&&((i=self.location)==null?void 0:i.href)||""}function Oc(){return Fs()==="http:"||Fs()==="https:"}function Fs(){var i;return typeof self<"u"&&((i=self.location)==null?void 0:i.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lc(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Oc()||ha()||"connection"in navigator)?navigator.onLine:!0}function Mc(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,n){this.shortDelay=e,this.longDelay=n,pe(n>e,"Short delay should be less than long delay!"),this.isMobile=aa()||la()}get(){return Lc()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(i,e){pe(i.emulator,"Emulator should always be set here");const{url:n}=i.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ue("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ue("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ue("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Vc=new Ut(3e4,6e4);function yi(i,e){return i.tenantId&&!e.tenantId?{...e,tenantId:i.tenantId}:e}async function lt(i,e,n,s,o={}){return Or(i,o,async()=>{let c={},l={};s&&(e==="GET"?l=s:c={body:JSON.stringify(s)});const w=Mt({key:i.config.apiKey,...l}).slice(1),v=await i._getAdditionalHeaders();v["Content-Type"]="application/json",i.languageCode&&(v["X-Firebase-Locale"]=i.languageCode);const E={method:e,headers:v,...c};return ca()||(E.referrerPolicy="no-referrer"),i.emulatorConfig&&_n(i.emulatorConfig.host)&&(E.credentials="include"),Dr.fetch()(await Lr(i,i.config.apiHost,n,w),E)})}async function Or(i,e,n){i._canInitEmulator=!1;const s={...Uc,...e};try{const o=new jc(i),c=await Promise.race([n(),o.promise]);o.clearNetworkTimeout();const l=await c.json();if("needConfirmation"in l)throw Zt(i,"account-exists-with-different-credential",l);if(c.ok&&!("errorMessage"in l))return l;{const w=c.ok?l.errorMessage:l.error.message,[v,E]=w.split(" : ");if(v==="FEDERATED_USER_ID_ALREADY_LINKED")throw Zt(i,"credential-already-in-use",l);if(v==="EMAIL_EXISTS")throw Zt(i,"email-already-in-use",l);if(v==="USER_DISABLED")throw Zt(i,"user-disabled",l);const A=s[v]||v.toLowerCase().replace(/[_\s]+/g,"-");if(E)throw gi(i,A,E);he(i,A)}}catch(o){if(o instanceof ge)throw o;he(i,"network-request-failed",{message:String(o)})}}async function Fc(i,e,n,s,o={}){const c=await lt(i,e,n,s,o);return"mfaPendingCredential"in c&&he(i,"multi-factor-auth-required",{_serverResponse:c}),c}async function Lr(i,e,n,s){const o=`${e}${n}?${s}`,c=i,l=c.config.emulator?_i(i.config,o):`${i.config.apiScheme}://${o}`;return xc.includes(n)&&(await c._persistenceManagerAvailable,c._getPersistenceType()==="COOKIE")?c._getPersistence()._getFinalTarget(l).toString():l}class jc{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(te(this.auth,"network-request-failed")),Vc.get())})}}function Zt(i,e,n){const s={appName:i.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const o=te(i,e,s);return o.customData._tokenResponse=n,o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bc(i,e){return lt(i,"POST","/v1/accounts:delete",e)}async function un(i,e){return lt(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Hc(i,e=!1){const n=Xe(i),s=await n.getIdToken(e),o=Ii(s);b(o&&o.exp&&o.auth_time&&o.iat,n.auth,"internal-error");const c=typeof o.firebase=="object"?o.firebase:void 0,l=c==null?void 0:c.sign_in_provider;return{claims:o,token:s,authTime:Pt(Qn(o.auth_time)),issuedAtTime:Pt(Qn(o.iat)),expirationTime:Pt(Qn(o.exp)),signInProvider:l||null,signInSecondFactor:(c==null?void 0:c.sign_in_second_factor)||null}}function Qn(i){return Number(i)*1e3}function Ii(i){const[e,n,s]=i.split(".");if(e===void 0||n===void 0||s===void 0)return nn("JWT malformed, contained fewer than 3 sections"),null;try{const o=wr(n);return o?JSON.parse(o):(nn("Failed to decode base64 JWT payload"),null)}catch(o){return nn("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function js(i){const e=Ii(i);return b(e,"internal-error"),b(typeof e.exp<"u","internal-error"),b(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dt(i,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof ge&&$c(s)&&i.auth.currentUser===i&&await i.auth.signOut(),s}}function $c({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pt(this.lastLoginAt),this.creationTime=Pt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dn(i){var S;const e=i.auth,n=await i.getIdToken(),s=await Dt(i,un(e,{idToken:n}));b(s==null?void 0:s.users.length,e,"internal-error");const o=s.users[0];i._notifyReloadListener(o);const c=(S=o.providerUserInfo)!=null&&S.length?Mr(o.providerUserInfo):[],l=Gc(i.providerData,c),w=i.isAnonymous,v=!(i.email&&o.passwordHash)&&!(l!=null&&l.length),E=w?v:!1,A={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new ci(o.createdAt,o.lastLoginAt),isAnonymous:E};Object.assign(i,A)}async function zc(i){const e=Xe(i);await dn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Gc(i,e){return[...i.filter(s=>!e.some(o=>o.providerId===s.providerId)),...e]}function Mr(i){return i.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qc(i,e){const n=await Or(i,{},async()=>{const s=Mt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:c}=i.config,l=await Lr(i,o,"/v1/token",`key=${c}`),w=await i._getAdditionalHeaders();w["Content-Type"]="application/x-www-form-urlencoded";const v={method:"POST",headers:w,body:s};return i.emulatorConfig&&_n(i.emulatorConfig.host)&&(v.credentials="include"),Dr.fetch()(l,v)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Kc(i,e){return lt(i,"POST","/v2/accounts:revokeToken",yi(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){b(e.idToken,"internal-error"),b(typeof e.idToken<"u","internal-error"),b(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):js(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){b(e.length!==0,"internal-error");const n=js(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(b(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:o,expiresIn:c}=await qc(e,n);this.updateTokensAndExpiration(s,o,Number(c))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:o,expirationTime:c}=n,l=new nt;return s&&(b(typeof s=="string","internal-error",{appName:e}),l.refreshToken=s),o&&(b(typeof o=="string","internal-error",{appName:e}),l.accessToken=o),c&&(b(typeof c=="number","internal-error",{appName:e}),l.expirationTime=c),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new nt,this.toJSON())}_performRefresh(){return ue("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(i,e){b(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class Z{constructor({uid:e,auth:n,stsTokenManager:s,...o}){this.providerId="firebase",this.proactiveRefresh=new Wc(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new ci(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const n=await Dt(this,this.stsTokenManager.getToken(this.auth,e));return b(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Hc(this,e)}reload(){return zc(this)}_assign(e){this!==e&&(b(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Z({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){b(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await dn(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Q(this.auth.app))return Promise.reject($e(this.auth));const e=await this.getIdToken();return await Dt(this,Bc(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,o=n.email??void 0,c=n.phoneNumber??void 0,l=n.photoURL??void 0,w=n.tenantId??void 0,v=n._redirectEventId??void 0,E=n.createdAt??void 0,A=n.lastLoginAt??void 0,{uid:S,emailVerified:O,isAnonymous:H,providerData:x,stsTokenManager:B}=n;b(S&&B,e,"internal-error");const M=nt.fromJSON(this.name,B);b(typeof S=="string",e,"internal-error"),Ae(s,e.name),Ae(o,e.name),b(typeof O=="boolean",e,"internal-error"),b(typeof H=="boolean",e,"internal-error"),Ae(c,e.name),Ae(l,e.name),Ae(w,e.name),Ae(v,e.name),Ae(E,e.name),Ae(A,e.name);const ne=new Z({uid:S,auth:e,email:o,emailVerified:O,displayName:s,isAnonymous:H,photoURL:l,phoneNumber:c,tenantId:w,stsTokenManager:M,createdAt:E,lastLoginAt:A});return x&&Array.isArray(x)&&(ne.providerData=x.map(me=>({...me}))),v&&(ne._redirectEventId=v),ne}static async _fromIdTokenResponse(e,n,s=!1){const o=new nt;o.updateFromServerResponse(n);const c=new Z({uid:n.localId,auth:e,stsTokenManager:o,isAnonymous:s});return await dn(c),c}static async _fromGetAccountInfoResponse(e,n,s){const o=n.users[0];b(o.localId!==void 0,"internal-error");const c=o.providerUserInfo!==void 0?Mr(o.providerUserInfo):[],l=!(o.email&&o.passwordHash)&&!(c!=null&&c.length),w=new nt;w.updateFromIdToken(s);const v=new Z({uid:o.localId,auth:e,stsTokenManager:w,isAnonymous:l}),E={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new ci(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(c!=null&&c.length)};return Object.assign(v,E),v}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bs=new Map;function de(i){pe(i instanceof Function,"Expected a class definition");let e=Bs.get(i);return e?(pe(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,Bs.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ur.type="NONE";const Hs=Ur;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(i,e,n){return`firebase:${i}:${e}:${n}`}class it{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:o,name:c}=this.auth;this.fullUserKey=sn(this.userKey,o.apiKey,c),this.fullPersistenceKey=sn("persistence",o.apiKey,c),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await un(this.auth,{idToken:e}).catch(()=>{});return n?Z._fromGetAccountInfoResponse(this.auth,n,e):null}return Z._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new it(de(Hs),e,s);const o=(await Promise.all(n.map(async E=>{if(await E._isAvailable())return E}))).filter(E=>E);let c=o[0]||de(Hs);const l=sn(s,e.config.apiKey,e.name);let w=null;for(const E of n)try{const A=await E._get(l);if(A){let S;if(typeof A=="string"){const O=await un(e,{idToken:A}).catch(()=>{});if(!O)break;S=await Z._fromGetAccountInfoResponse(e,O,A)}else S=Z._fromJSON(e,A);E!==c&&(w=S),c=E;break}}catch{}const v=o.filter(E=>E._shouldAllowMigration);return!c._shouldAllowMigration||!v.length?new it(c,e,s):(c=v[0],w&&await c._set(l,w.toJSON()),await Promise.all(n.map(async E=>{if(E!==c)try{await E._remove(l)}catch{}})),new it(c,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $s(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(jr(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xr(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Hr(e))return"Blackberry";if($r(e))return"Webos";if(Vr(e))return"Safari";if((e.includes("chrome/")||Fr(e))&&!e.includes("edge/"))return"Chrome";if(Br(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=i.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function xr(i=q()){return/firefox\//i.test(i)}function Vr(i=q()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Fr(i=q()){return/crios\//i.test(i)}function jr(i=q()){return/iemobile/i.test(i)}function Br(i=q()){return/android/i.test(i)}function Hr(i=q()){return/blackberry/i.test(i)}function $r(i=q()){return/webos/i.test(i)}function wi(i=q()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function Jc(i=q()){var e;return wi(i)&&!!((e=window.navigator)!=null&&e.standalone)}function Xc(){return ua()&&document.documentMode===10}function Wr(i=q()){return wi(i)||Br(i)||$r(i)||Hr(i)||/windows phone/i.test(i)||jr(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(i,e=[]){let n;switch(i){case"Browser":n=$s(q());break;case"Worker":n=`${$s(q())}-${i}`;break;default:n=i}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ht}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=c=>new Promise((l,w)=>{try{const v=e(c);l(v)}catch(v){w(v)}});s.onAbort=n,this.queue.push(s);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const o of n)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qc(i,e={}){return lt(i,"GET","/v2/passwordPolicy",yi(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zc=6;class eh{constructor(e){var s;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Zc,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),o&&(n.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let o=0;o<e.length;o++)s=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,o,c){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e,n,s,o){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ws(this),this.idTokenSubscription=new Ws(this),this.beforeStateQueue=new Yc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Nr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(c=>this._resolvePersistenceManagerAvailable=c)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=de(n)),this._initializationPromise=this.queue(async()=>{var s,o,c;if(!this._deleted&&(this.persistenceManager=await it.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((o=this._popupRedirectResolver)!=null&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((c=this.currentUser)==null?void 0:c.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await un(this,{idToken:e}),s=await Z._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var c;if(Q(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(w=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(w,w))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(c=this.redirectUser)==null?void 0:c._redirectEventId,w=s==null?void 0:s._redirectEventId,v=await this.tryRedirectSignIn(e);(!l||l===w)&&(v!=null&&v.user)&&(s=v.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(l){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return b(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await dn(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Mc()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Q(this.app))return Promise.reject($e(this));const n=e?Xe(e):null;return n&&b(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&b(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Q(this.app)?Promise.reject($e(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Q(this.app)?Promise.reject($e(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(de(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Qc(this),n=new eh(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Lt("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await Kc(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&de(e)||this._popupRedirectResolver;b(n,this,"argument-error"),this.redirectPersistenceManager=await it.create(this,[de(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,o){if(this._deleted)return()=>{};const c=typeof n=="function"?n:n.next.bind(n);let l=!1;const w=this._isInitialized?Promise.resolve():this._initializationPromise;if(b(w,this,"internal-error"),w.then(()=>{l||c(this.currentUser)}),typeof n=="function"){const v=e.addObserver(n,s,o);return()=>{l=!0,v()}}else{const v=e.addObserver(n);return()=>{l=!0,v()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return b(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=zr(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var o;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((o=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:o.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var n;if(Q(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&Nc(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function yn(i){return Xe(i)}class Ws{constructor(e){this.auth=e,this.observer=null,this.addObserver=ya(n=>this.observer=n)}get next(){return b(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function nh(i){vi=i}function ih(i){return vi.loadJS(i)}function sh(){return vi.gapiScript}function rh(i){return`__${i}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(i,e){const n=pi(i,"auth");if(n.isInitialized()){const o=n.getImmediate(),c=n.getOptions();if(Ge(c,e??{}))return o;he(o,"already-initialized")}return n.initialize({options:e})}function ah(i,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(de);e!=null&&e.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function ch(i,e,n){const s=yn(i);b(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const o=!1,c=Gr(e),{host:l,port:w}=hh(e),v=w===null?"":`:${w}`,E={url:`${c}//${l}${v}/`},A=Object.freeze({host:l,port:w,protocol:c.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!s._canInitEmulator){b(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),b(Ge(E,s.config.emulator)&&Ge(A,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=E,s.emulatorConfig=A,s.settings.appVerificationDisabledForTesting=!0,_n(l)?Sr(`${c}//${l}${v}`):lh()}function Gr(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function hh(i){const e=Gr(i),n=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(s);if(o){const c=o[1];return{host:c,port:zs(s.substr(c.length+1))}}else{const[c,l]=s.split(":");return{host:c,port:zs(l)}}}function zs(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function lh(){function i(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ue("not implemented")}_getIdTokenResponse(e){return ue("not implemented")}_linkToIdToken(e,n){return ue("not implemented")}_getReauthenticationResolver(e){return ue("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function st(i,e){return Fc(i,"POST","/v1/accounts:signInWithIdp",yi(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh="http://localhost";class Ke extends qr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ke(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):he("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:o,...c}=n;if(!s||!o)return null;const l=new Ke(s,o);return l.idToken=c.idToken||void 0,l.accessToken=c.accessToken||void 0,l.secret=c.secret,l.nonce=c.nonce,l.pendingToken=c.pendingToken||null,l}_getIdTokenResponse(e){const n=this.buildRequest();return st(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,st(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,st(e,n)}buildRequest(){const e={requestUri:uh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Mt(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends Ei{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be extends xt{constructor(){super("facebook.com")}static credential(e){return Ke._fromParams({providerId:be.PROVIDER_ID,signInMethod:be.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return be.credentialFromTaggedObject(e)}static credentialFromError(e){return be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return be.credential(e.oauthAccessToken)}catch{return null}}}be.FACEBOOK_SIGN_IN_METHOD="facebook.com";be.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe extends xt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ke._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Pe.credentialFromTaggedObject(e)}static credentialFromError(e){return Pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Pe.credential(n,s)}catch{return null}}}Pe.GOOGLE_SIGN_IN_METHOD="google.com";Pe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re extends xt{constructor(){super("github.com")}static credential(e){return Ke._fromParams({providerId:Re.PROVIDER_ID,signInMethod:Re.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Re.credentialFromTaggedObject(e)}static credentialFromError(e){return Re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Re.credential(e.oauthAccessToken)}catch{return null}}}Re.GITHUB_SIGN_IN_METHOD="github.com";Re.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce extends xt{constructor(){super("twitter.com")}static credential(e,n){return Ke._fromParams({providerId:Ce.PROVIDER_ID,signInMethod:Ce.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ce.credentialFromTaggedObject(e)}static credentialFromError(e){return Ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Ce.credential(n,s)}catch{return null}}}Ce.TWITTER_SIGN_IN_METHOD="twitter.com";Ce.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,o=!1){const c=await Z._fromIdTokenResponse(e,s,o),l=Gs(s);return new at({user:c,providerId:l,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const o=Gs(s);return new at({user:e,providerId:o,_tokenResponse:s,operationType:n})}}function Gs(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn extends ge{constructor(e,n,s,o){super(n.code,n.message),this.operationType=s,this.user=o,Object.setPrototypeOf(this,fn.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,o){return new fn(e,n,s,o)}}function Kr(i,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(i):n._getIdTokenResponse(i)).catch(c=>{throw c.code==="auth/multi-factor-auth-required"?fn._fromErrorAndOperation(i,c,e,s):c})}async function dh(i,e,n=!1){const s=await Dt(i,e._linkToIdToken(i.auth,await i.getIdToken()),n);return at._forOperation(i,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fh(i,e,n=!1){const{auth:s}=i;if(Q(s.app))return Promise.reject($e(s));const o="reauthenticate";try{const c=await Dt(i,Kr(s,o,e,i),n);b(c.idToken,s,"internal-error");const l=Ii(c.idToken);b(l,s,"internal-error");const{sub:w}=l;return b(i.uid===w,s,"user-mismatch"),at._forOperation(i,o,c)}catch(c){throw(c==null?void 0:c.code)==="auth/user-not-found"&&he(s,"user-mismatch"),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ph(i,e,n=!1){if(Q(i.app))return Promise.reject($e(i));const s="signIn",o=await Kr(i,s,e),c=await at._fromIdTokenResponse(i,s,o);return n||await i._updateCurrentUser(c.user),c}function gh(i,e,n,s){return Xe(i).onIdTokenChanged(e,n,s)}function mh(i,e,n){return Xe(i).beforeAuthStateChanged(e,n)}const pn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(pn,"1"),this.storage.removeItem(pn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h=1e3,yh=10;class Xr extends Jr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Wr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),o=this.localCache[n];s!==o&&e(n,o,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((l,w,v)=>{this.notifyListeners(l,v)});return}const s=e.key;n?this.detachListener():this.stopPolling();const o=()=>{const l=this.storage.getItem(s);!n&&this.localCache[s]===l||this.notifyListeners(s,l)},c=this.storage.getItem(s);Xc()&&c!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,yh):o()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},_h)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Xr.type="LOCAL";const Ih=Xr;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr extends Jr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Yr.type="SESSION";const Qr=Yr;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wh(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(o=>o.isListeningto(e));if(n)return n;const s=new In(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:o,data:c}=n.data,l=this.handlersMap[o];if(!(l!=null&&l.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:o});const w=Array.from(l).map(async E=>E(n.origin,c)),v=await wh(w);n.ports[0].postMessage({status:"done",eventId:s,eventType:o,response:v})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}In.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(i="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return i+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let c,l;return new Promise((w,v)=>{const E=Ti("",20);o.port1.start();const A=setTimeout(()=>{v(new Error("unsupported_event"))},s);l={messageChannel:o,onMessage(S){const O=S;if(O.data.eventId===E)switch(O.data.status){case"ack":clearTimeout(A),c=setTimeout(()=>{v(new Error("timeout"))},3e3);break;case"done":clearTimeout(c),w(O.data.response);break;default:clearTimeout(A),clearTimeout(c),v(new Error("invalid_response"));break}}},this.handlers.add(l),o.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:E,data:n},[o.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(){return window}function Eh(i){ce().location.href=i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zr(){return typeof ce().WorkerGlobalScope<"u"&&typeof ce().importScripts=="function"}async function Th(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Sh(){var i;return((i=navigator==null?void 0:navigator.serviceWorker)==null?void 0:i.controller)||null}function Ah(){return Zr()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo="firebaseLocalStorageDb",bh=1,gn="firebaseLocalStorage",to="fbase_key";class Vt{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function wn(i,e){return i.transaction([gn],e?"readwrite":"readonly").objectStore(gn)}function Ph(){const i=indexedDB.deleteDatabase(eo);return new Vt(i).toPromise()}function no(){const i=indexedDB.open(eo,bh);return new Promise((e,n)=>{i.addEventListener("error",()=>{n(i.error)}),i.addEventListener("upgradeneeded",()=>{const s=i.result;try{s.createObjectStore(gn,{keyPath:to})}catch(o){n(o)}}),i.addEventListener("success",async()=>{const s=i.result;s.objectStoreNames.contains(gn)?e(s):(s.close(),await Ph(),e(await no()))})})}async function qs(i,e,n){const s=wn(i,!0).put({[to]:e,value:n});return new Vt(s).toPromise()}async function Rh(i,e){const n=wn(i,!1).get(e),s=await new Vt(n).toPromise();return s===void 0?null:s.value}function Ks(i,e){const n=wn(i,!0).delete(e);return new Vt(n).toPromise()}const Ch=800,kh=3;class io{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=no(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>kh)throw s;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return Zr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=In._getInstance(Ah()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,s;if(this.activeServiceWorker=await Th(),!this.activeServiceWorker)return;this.sender=new vh(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Sh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await qs(e,pn,"1"),await Ks(e,pn)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>qs(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>Rh(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ks(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const c=wn(o,!1).getAll();return new Vt(c).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:o,value:c}of e)s.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(c)&&(this.notifyListeners(o,c),n.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!s.has(o)&&(this.notifyListeners(o,null),n.push(o));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ch)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}io.type="LOCAL";const Nh=io;new Ut(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function so(i,e){return e?de(e):(b(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si extends qr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return st(e,this._buildIdpRequest())}_linkToIdToken(e,n){return st(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return st(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Dh(i){return ph(i.auth,new Si(i),i.bypassAuthState)}function Oh(i){const{auth:e,user:n}=i;return b(n,e,"internal-error"),fh(n,new Si(i),i.bypassAuthState)}async function Lh(i){const{auth:e,user:n}=i;return b(n,e,"internal-error"),dh(n,new Si(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,n,s,o,c=!1){this.auth=e,this.resolver=s,this.user=o,this.bypassAuthState=c,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:o,tenantId:c,error:l,type:w}=e;if(l){this.reject(l);return}const v={auth:this.auth,requestUri:n,sessionId:s,tenantId:c||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(w)(v))}catch(E){this.reject(E)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Dh;case"linkViaPopup":case"linkViaRedirect":return Lh;case"reauthViaPopup":case"reauthViaRedirect":return Oh;default:he(this.auth,"internal-error")}}resolve(e){pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh=new Ut(2e3,1e4);async function hu(i,e,n){if(Q(i.app))return Promise.reject(te(i,"operation-not-supported-in-this-environment"));const s=yn(i);Dc(i,e,Ei);const o=so(s,n);return new Be(s,"signInViaPopup",e,o).executeNotNull()}class Be extends ro{constructor(e,n,s,o,c){super(e,n,o,c),this.provider=s,this.authWindow=null,this.pollId=null,Be.currentPopupAction&&Be.currentPopupAction.cancel(),Be.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return b(e,this.auth,"internal-error"),e}async onExecution(){pe(this.filter.length===1,"Popup operations only handle one event");const e=Ti();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(te(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(te(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Be.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if((s=(n=this.authWindow)==null?void 0:n.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(te(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Mh.get())};e()}}Be.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh="pendingRedirect",rn=new Map;class xh extends ro{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=rn.get(this.auth._key());if(!e){try{const s=await Vh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}rn.set(this.auth._key(),e)}return this.bypassAuthState||rn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Vh(i,e){const n=Bh(e),s=jh(i);if(!await s._isAvailable())return!1;const o=await s._get(n)==="true";return await s._remove(n),o}function Fh(i,e){rn.set(i._key(),e)}function jh(i){return de(i._redirectPersistence)}function Bh(i){return sn(Uh,i.config.apiKey,i.name)}async function Hh(i,e,n=!1){if(Q(i.app))return Promise.reject($e(i));const s=yn(i),o=so(s,e),l=await new xh(s,o,n).execute();return l&&!n&&(delete l.user._redirectEventId,await s._persistUserIfCurrent(l.user),await s._setRedirectUser(null,e)),l}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h=600*1e3;class Wh{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!zh(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!oo(e)){const o=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";n.onError(te(this.auth,o))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=$h&&this.cachedEventUids.clear(),this.cachedEventUids.has(Js(e))}saveEventToCache(e){this.cachedEventUids.add(Js(e)),this.lastProcessedEventTime=Date.now()}}function Js(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function oo({type:i,error:e}){return i==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function zh(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return oo(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gh(i,e={}){return lt(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Kh=/^https?/;async function Jh(i){if(i.config.emulator)return;const{authorizedDomains:e}=await Gh(i);for(const n of e)try{if(Xh(n))return}catch{}he(i,"unauthorized-domain")}function Xh(i){const e=ai(),{protocol:n,hostname:s}=new URL(e);if(i.startsWith("chrome-extension://")){const l=new URL(i);return l.hostname===""&&s===""?n==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&l.hostname===s}if(!Kh.test(n))return!1;if(qh.test(i))return s===i;const o=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh=new Ut(3e4,6e4);function Xs(){const i=ce().___jsl;if(i!=null&&i.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let n=0;n<i.CP.length;n++)i.CP[n]=null}}function Qh(i){return new Promise((e,n)=>{var o,c,l;function s(){Xs(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Xs(),n(te(i,"network-request-failed"))},timeout:Yh.get()})}if((c=(o=ce().gapi)==null?void 0:o.iframes)!=null&&c.Iframe)e(gapi.iframes.getContext());else if((l=ce().gapi)!=null&&l.load)s();else{const w=rh("iframefcb");return ce()[w]=()=>{gapi.load?s():n(te(i,"network-request-failed"))},ih(`${sh()}?onload=${w}`).catch(v=>n(v))}}).catch(e=>{throw on=null,e})}let on=null;function Zh(i){return on=on||Qh(i),on}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el=new Ut(5e3,15e3),tl="__/auth/iframe",nl="emulator/auth/iframe",il={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},sl=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function rl(i){const e=i.config;b(e.authDomain,i,"auth-domain-config-required");const n=e.emulator?_i(e,nl):`https://${i.config.authDomain}/${tl}`,s={apiKey:e.apiKey,appName:i.name,v:ht},o=sl.get(i.config.apiHost);o&&(s.eid=o);const c=i._getFrameworks();return c.length&&(s.fw=c.join(",")),`${n}?${Mt(s).slice(1)}`}async function ol(i){const e=await Zh(i),n=ce().gapi;return b(n,i,"internal-error"),e.open({where:document.body,url:rl(i),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:il,dontclear:!0},s=>new Promise(async(o,c)=>{await s.restyle({setHideOnLeave:!1});const l=te(i,"network-request-failed"),w=ce().setTimeout(()=>{c(l)},el.get());function v(){ce().clearTimeout(w),o(s)}s.ping(v).then(v,()=>{c(l)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},cl=500,hl=600,ll="_blank",ul="http://localhost";class Ys{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function dl(i,e,n,s=cl,o=hl){const c=Math.max((window.screen.availHeight-o)/2,0).toString(),l=Math.max((window.screen.availWidth-s)/2,0).toString();let w="";const v={...al,width:s.toString(),height:o.toString(),top:c,left:l},E=q().toLowerCase();n&&(w=Fr(E)?ll:n),xr(E)&&(e=e||ul,v.scrollbars="yes");const A=Object.entries(v).reduce((O,[H,x])=>`${O}${H}=${x},`,"");if(Jc(E)&&w!=="_self")return fl(e||"",w),new Ys(null);const S=window.open(e||"",w,A);b(S,i,"popup-blocked");try{S.focus()}catch{}return new Ys(S)}function fl(i,e){const n=document.createElement("a");n.href=i,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl="__/auth/handler",gl="emulator/auth/handler",ml=encodeURIComponent("fac");async function Qs(i,e,n,s,o,c){b(i.config.authDomain,i,"auth-domain-config-required"),b(i.config.apiKey,i,"invalid-api-key");const l={apiKey:i.config.apiKey,appName:i.name,authType:n,redirectUrl:s,v:ht,eventId:o};if(e instanceof Ei){e.setDefaultLanguage(i.languageCode),l.providerId=e.providerId||"",_a(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[A,S]of Object.entries({}))l[A]=S}if(e instanceof xt){const A=e.getScopes().filter(S=>S!=="");A.length>0&&(l.scopes=A.join(","))}i.tenantId&&(l.tid=i.tenantId);const w=l;for(const A of Object.keys(w))w[A]===void 0&&delete w[A];const v=await i._getAppCheckToken(),E=v?`#${ml}=${encodeURIComponent(v)}`:"";return`${_l(i)}?${Mt(w).slice(1)}${E}`}function _l({config:i}){return i.emulator?_i(i,gl):`https://${i.authDomain}/${pl}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn="webStorageSupport";class yl{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Qr,this._completeRedirectFn=Hh,this._overrideRedirectResult=Fh}async _openPopup(e,n,s,o){var l;pe((l=this.eventManagers[e._key()])==null?void 0:l.manager,"_initialize() not called before _openPopup()");const c=await Qs(e,n,s,ai(),o);return dl(e,c,Ti())}async _openRedirect(e,n,s,o){await this._originValidation(e);const c=await Qs(e,n,s,ai(),o);return Eh(c),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:o,promise:c}=this.eventManagers[n];return o?Promise.resolve(o):(pe(c,"If manager is not set, promise should be"),c)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await ol(e),s=new Wh(e);return n.register("authEvent",o=>(b(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:s.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Zn,{type:Zn},o=>{var l;const c=(l=o==null?void 0:o[0])==null?void 0:l[Zn];c!==void 0&&n(!!c),he(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Jh(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Wr()||Vr()||wi()}}const Il=yl;var Zs="@firebase/auth",er="1.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){b(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vl(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function El(i){ot(new qe("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),c=e.getProvider("app-check-internal"),{apiKey:l,authDomain:w}=s.options;b(l&&!l.includes(":"),"invalid-api-key",{appName:s.name});const v={apiKey:l,authDomain:w,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:zr(i)},E=new th(s,o,c,v);return ah(E,n),E},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),ot(new qe("auth-internal",e=>{const n=yn(e.getProvider("auth").getImmediate());return(s=>new wl(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),De(Zs,er,vl(i)),De(Zs,er,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tl=300,Sl=Tr("authIdTokenMaxAge")||Tl;let tr=null;const Al=i=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>Sl)return;const o=n==null?void 0:n.token;tr!==o&&(tr=o,await fetch(i,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function lu(i=Pr()){const e=pi(i,"auth");if(e.isInitialized())return e.getImmediate();const n=oh(i,{popupRedirectResolver:Il,persistence:[Nh,Ih,Qr]}),s=Tr("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const c=new URL(s,location.origin);if(location.origin===c.origin){const l=Al(c.toString());mh(n,l,()=>l(n.currentUser)),gh(n,w=>l(w))}}const o=vr("auth");return o&&ch(n,`http://${o}`),n}function bl(){var i;return((i=document.getElementsByTagName("head"))==null?void 0:i[0])??document}nh({loadJS(i){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",i),s.onload=e,s.onerror=o=>{const c=te("internal-error");c.customData=o,n(c)},s.type="text/javascript",s.charset="UTF-8",bl().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});El("Browser");var Pl="firebase",Rl="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */De(Pl,Rl,"app");var nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ai;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(g,u){function f(){}f.prototype=u.prototype,g.F=u.prototype,g.prototype=new f,g.prototype.constructor=g,g.D=function(m,p,y){for(var d=Array(arguments.length-2),K=2;K<arguments.length;K++)d[K-2]=arguments[K];return u.prototype[p].apply(m,d)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,n),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(g,u,f){f||(f=0);const m=Array(16);if(typeof u=="string")for(var p=0;p<16;++p)m[p]=u.charCodeAt(f++)|u.charCodeAt(f++)<<8|u.charCodeAt(f++)<<16|u.charCodeAt(f++)<<24;else for(p=0;p<16;++p)m[p]=u[f++]|u[f++]<<8|u[f++]<<16|u[f++]<<24;u=g.g[0],f=g.g[1],p=g.g[2];let y=g.g[3],d;d=u+(y^f&(p^y))+m[0]+3614090360&4294967295,u=f+(d<<7&4294967295|d>>>25),d=y+(p^u&(f^p))+m[1]+3905402710&4294967295,y=u+(d<<12&4294967295|d>>>20),d=p+(f^y&(u^f))+m[2]+606105819&4294967295,p=y+(d<<17&4294967295|d>>>15),d=f+(u^p&(y^u))+m[3]+3250441966&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(y^f&(p^y))+m[4]+4118548399&4294967295,u=f+(d<<7&4294967295|d>>>25),d=y+(p^u&(f^p))+m[5]+1200080426&4294967295,y=u+(d<<12&4294967295|d>>>20),d=p+(f^y&(u^f))+m[6]+2821735955&4294967295,p=y+(d<<17&4294967295|d>>>15),d=f+(u^p&(y^u))+m[7]+4249261313&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(y^f&(p^y))+m[8]+1770035416&4294967295,u=f+(d<<7&4294967295|d>>>25),d=y+(p^u&(f^p))+m[9]+2336552879&4294967295,y=u+(d<<12&4294967295|d>>>20),d=p+(f^y&(u^f))+m[10]+4294925233&4294967295,p=y+(d<<17&4294967295|d>>>15),d=f+(u^p&(y^u))+m[11]+2304563134&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(y^f&(p^y))+m[12]+1804603682&4294967295,u=f+(d<<7&4294967295|d>>>25),d=y+(p^u&(f^p))+m[13]+4254626195&4294967295,y=u+(d<<12&4294967295|d>>>20),d=p+(f^y&(u^f))+m[14]+2792965006&4294967295,p=y+(d<<17&4294967295|d>>>15),d=f+(u^p&(y^u))+m[15]+1236535329&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(p^y&(f^p))+m[1]+4129170786&4294967295,u=f+(d<<5&4294967295|d>>>27),d=y+(f^p&(u^f))+m[6]+3225465664&4294967295,y=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(y^u))+m[11]+643717713&4294967295,p=y+(d<<14&4294967295|d>>>18),d=f+(y^u&(p^y))+m[0]+3921069994&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^y&(f^p))+m[5]+3593408605&4294967295,u=f+(d<<5&4294967295|d>>>27),d=y+(f^p&(u^f))+m[10]+38016083&4294967295,y=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(y^u))+m[15]+3634488961&4294967295,p=y+(d<<14&4294967295|d>>>18),d=f+(y^u&(p^y))+m[4]+3889429448&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^y&(f^p))+m[9]+568446438&4294967295,u=f+(d<<5&4294967295|d>>>27),d=y+(f^p&(u^f))+m[14]+3275163606&4294967295,y=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(y^u))+m[3]+4107603335&4294967295,p=y+(d<<14&4294967295|d>>>18),d=f+(y^u&(p^y))+m[8]+1163531501&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^y&(f^p))+m[13]+2850285829&4294967295,u=f+(d<<5&4294967295|d>>>27),d=y+(f^p&(u^f))+m[2]+4243563512&4294967295,y=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(y^u))+m[7]+1735328473&4294967295,p=y+(d<<14&4294967295|d>>>18),d=f+(y^u&(p^y))+m[12]+2368359562&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(f^p^y)+m[5]+4294588738&4294967295,u=f+(d<<4&4294967295|d>>>28),d=y+(u^f^p)+m[8]+2272392833&4294967295,y=u+(d<<11&4294967295|d>>>21),d=p+(y^u^f)+m[11]+1839030562&4294967295,p=y+(d<<16&4294967295|d>>>16),d=f+(p^y^u)+m[14]+4259657740&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^y)+m[1]+2763975236&4294967295,u=f+(d<<4&4294967295|d>>>28),d=y+(u^f^p)+m[4]+1272893353&4294967295,y=u+(d<<11&4294967295|d>>>21),d=p+(y^u^f)+m[7]+4139469664&4294967295,p=y+(d<<16&4294967295|d>>>16),d=f+(p^y^u)+m[10]+3200236656&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^y)+m[13]+681279174&4294967295,u=f+(d<<4&4294967295|d>>>28),d=y+(u^f^p)+m[0]+3936430074&4294967295,y=u+(d<<11&4294967295|d>>>21),d=p+(y^u^f)+m[3]+3572445317&4294967295,p=y+(d<<16&4294967295|d>>>16),d=f+(p^y^u)+m[6]+76029189&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^y)+m[9]+3654602809&4294967295,u=f+(d<<4&4294967295|d>>>28),d=y+(u^f^p)+m[12]+3873151461&4294967295,y=u+(d<<11&4294967295|d>>>21),d=p+(y^u^f)+m[15]+530742520&4294967295,p=y+(d<<16&4294967295|d>>>16),d=f+(p^y^u)+m[2]+3299628645&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(p^(f|~y))+m[0]+4096336452&4294967295,u=f+(d<<6&4294967295|d>>>26),d=y+(f^(u|~p))+m[7]+1126891415&4294967295,y=u+(d<<10&4294967295|d>>>22),d=p+(u^(y|~f))+m[14]+2878612391&4294967295,p=y+(d<<15&4294967295|d>>>17),d=f+(y^(p|~u))+m[5]+4237533241&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~y))+m[12]+1700485571&4294967295,u=f+(d<<6&4294967295|d>>>26),d=y+(f^(u|~p))+m[3]+2399980690&4294967295,y=u+(d<<10&4294967295|d>>>22),d=p+(u^(y|~f))+m[10]+4293915773&4294967295,p=y+(d<<15&4294967295|d>>>17),d=f+(y^(p|~u))+m[1]+2240044497&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~y))+m[8]+1873313359&4294967295,u=f+(d<<6&4294967295|d>>>26),d=y+(f^(u|~p))+m[15]+4264355552&4294967295,y=u+(d<<10&4294967295|d>>>22),d=p+(u^(y|~f))+m[6]+2734768916&4294967295,p=y+(d<<15&4294967295|d>>>17),d=f+(y^(p|~u))+m[13]+1309151649&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~y))+m[4]+4149444226&4294967295,u=f+(d<<6&4294967295|d>>>26),d=y+(f^(u|~p))+m[11]+3174756917&4294967295,y=u+(d<<10&4294967295|d>>>22),d=p+(u^(y|~f))+m[2]+718787259&4294967295,p=y+(d<<15&4294967295|d>>>17),d=f+(y^(p|~u))+m[9]+3951481745&4294967295,g.g[0]=g.g[0]+u&4294967295,g.g[1]=g.g[1]+(p+(d<<21&4294967295|d>>>11))&4294967295,g.g[2]=g.g[2]+p&4294967295,g.g[3]=g.g[3]+y&4294967295}s.prototype.v=function(g,u){u===void 0&&(u=g.length);const f=u-this.blockSize,m=this.C;let p=this.h,y=0;for(;y<u;){if(p==0)for(;y<=f;)o(this,g,y),y+=this.blockSize;if(typeof g=="string"){for(;y<u;)if(m[p++]=g.charCodeAt(y++),p==this.blockSize){o(this,m),p=0;break}}else for(;y<u;)if(m[p++]=g[y++],p==this.blockSize){o(this,m),p=0;break}}this.h=p,this.o+=u},s.prototype.A=function(){var g=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);g[0]=128;for(var u=1;u<g.length-8;++u)g[u]=0;u=this.o*8;for(var f=g.length-8;f<g.length;++f)g[f]=u&255,u/=256;for(this.v(g),g=Array(16),u=0,f=0;f<4;++f)for(let m=0;m<32;m+=8)g[u++]=this.g[f]>>>m&255;return g};function c(g,u){var f=w;return Object.prototype.hasOwnProperty.call(f,g)?f[g]:f[g]=u(g)}function l(g,u){this.h=u;const f=[];let m=!0;for(let p=g.length-1;p>=0;p--){const y=g[p]|0;m&&y==u||(f[p]=y,m=!1)}this.g=f}var w={};function v(g){return-128<=g&&g<128?c(g,function(u){return new l([u|0],u<0?-1:0)}):new l([g|0],g<0?-1:0)}function E(g){if(isNaN(g)||!isFinite(g))return S;if(g<0)return M(E(-g));const u=[];let f=1;for(let m=0;g>=f;m++)u[m]=g/f|0,f*=4294967296;return new l(u,0)}function A(g,u){if(g.length==0)throw Error("number format error: empty string");if(u=u||10,u<2||36<u)throw Error("radix out of range: "+u);if(g.charAt(0)=="-")return M(A(g.substring(1),u));if(g.indexOf("-")>=0)throw Error('number format error: interior "-" character');const f=E(Math.pow(u,8));let m=S;for(let y=0;y<g.length;y+=8){var p=Math.min(8,g.length-y);const d=parseInt(g.substring(y,y+p),u);p<8?(p=E(Math.pow(u,p)),m=m.j(p).add(E(d))):(m=m.j(f),m=m.add(E(d)))}return m}var S=v(0),O=v(1),H=v(16777216);i=l.prototype,i.m=function(){if(B(this))return-M(this).m();let g=0,u=1;for(let f=0;f<this.g.length;f++){const m=this.i(f);g+=(m>=0?m:4294967296+m)*u,u*=4294967296}return g},i.toString=function(g){if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(x(this))return"0";if(B(this))return"-"+M(this).toString(g);const u=E(Math.pow(g,6));var f=this;let m="";for(;;){const p=Ye(f,u).g;f=ne(f,p.j(u));let y=((f.g.length>0?f.g[0]:f.h)>>>0).toString(g);if(f=p,x(f))return y+m;for(;y.length<6;)y="0"+y;m=y+m}},i.i=function(g){return g<0?0:g<this.g.length?this.g[g]:this.h};function x(g){if(g.h!=0)return!1;for(let u=0;u<g.g.length;u++)if(g.g[u]!=0)return!1;return!0}function B(g){return g.h==-1}i.l=function(g){return g=ne(this,g),B(g)?-1:x(g)?0:1};function M(g){const u=g.g.length,f=[];for(let m=0;m<u;m++)f[m]=~g.g[m];return new l(f,~g.h).add(O)}i.abs=function(){return B(this)?M(this):this},i.add=function(g){const u=Math.max(this.g.length,g.g.length),f=[];let m=0;for(let p=0;p<=u;p++){let y=m+(this.i(p)&65535)+(g.i(p)&65535),d=(y>>>16)+(this.i(p)>>>16)+(g.i(p)>>>16);m=d>>>16,y&=65535,d&=65535,f[p]=d<<16|y}return new l(f,f[f.length-1]&-2147483648?-1:0)};function ne(g,u){return g.add(M(u))}i.j=function(g){if(x(this)||x(g))return S;if(B(this))return B(g)?M(this).j(M(g)):M(M(this).j(g));if(B(g))return M(this.j(M(g)));if(this.l(H)<0&&g.l(H)<0)return E(this.m()*g.m());const u=this.g.length+g.g.length,f=[];for(var m=0;m<2*u;m++)f[m]=0;for(m=0;m<this.g.length;m++)for(let p=0;p<g.g.length;p++){const y=this.i(m)>>>16,d=this.i(m)&65535,K=g.i(p)>>>16,Le=g.i(p)&65535;f[2*m+2*p]+=d*Le,me(f,2*m+2*p),f[2*m+2*p+1]+=y*Le,me(f,2*m+2*p+1),f[2*m+2*p+1]+=d*K,me(f,2*m+2*p+1),f[2*m+2*p+2]+=y*K,me(f,2*m+2*p+2)}for(g=0;g<u;g++)f[g]=f[2*g+1]<<16|f[2*g];for(g=u;g<2*u;g++)f[g]=0;return new l(f,0)};function me(g,u){for(;(g[u]&65535)!=g[u];)g[u+1]+=g[u]>>>16,g[u]&=65535,u++}function _e(g,u){this.g=g,this.h=u}function Ye(g,u){if(x(u))throw Error("division by zero");if(x(g))return new _e(S,S);if(B(g))return u=Ye(M(g),u),new _e(M(u.g),M(u.h));if(B(u))return u=Ye(g,M(u)),new _e(M(u.g),u.h);if(g.g.length>30){if(B(g)||B(u))throw Error("slowDivide_ only works with positive integers.");for(var f=O,m=u;m.l(g)<=0;)f=ye(f),m=ye(m);var p=J(f,1),y=J(m,1);for(m=J(m,2),f=J(f,2);!x(m);){var d=y.add(m);d.l(g)<=0&&(p=p.add(f),y=d),m=J(m,1),f=J(f,1)}return u=ne(g,p.j(u)),new _e(p,u)}for(p=S;g.l(u)>=0;){for(f=Math.max(1,Math.floor(g.m()/u.m())),m=Math.ceil(Math.log(f)/Math.LN2),m=m<=48?1:Math.pow(2,m-48),y=E(f),d=y.j(u);B(d)||d.l(g)>0;)f-=m,y=E(f),d=y.j(u);x(y)&&(y=O),p=p.add(y),g=ne(g,d)}return new _e(p,g)}i.B=function(g){return Ye(this,g).h},i.and=function(g){const u=Math.max(this.g.length,g.g.length),f=[];for(let m=0;m<u;m++)f[m]=this.i(m)&g.i(m);return new l(f,this.h&g.h)},i.or=function(g){const u=Math.max(this.g.length,g.g.length),f=[];for(let m=0;m<u;m++)f[m]=this.i(m)|g.i(m);return new l(f,this.h|g.h)},i.xor=function(g){const u=Math.max(this.g.length,g.g.length),f=[];for(let m=0;m<u;m++)f[m]=this.i(m)^g.i(m);return new l(f,this.h^g.h)};function ye(g){const u=g.g.length+1,f=[];for(let m=0;m<u;m++)f[m]=g.i(m)<<1|g.i(m-1)>>>31;return new l(f,g.h)}function J(g,u){const f=u>>5;u%=32;const m=g.g.length-f,p=[];for(let y=0;y<m;y++)p[y]=u>0?g.i(y+f)>>>u|g.i(y+f+1)<<32-u:g.i(y+f);return new l(p,g.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.B,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=E,l.fromString=A,Ai=l}).apply(typeof nr<"u"?nr:typeof self<"u"?self:typeof window<"u"?window:{});var en=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var i,e=Object.defineProperty;function n(t){t=[typeof globalThis=="object"&&globalThis,t,typeof window=="object"&&window,typeof self=="object"&&self,typeof en=="object"&&en];for(var r=0;r<t.length;++r){var a=t[r];if(a&&a.Math==Math)return a}throw Error("Cannot find global object")}var s=n(this);function o(t,r){if(r)e:{var a=s;t=t.split(".");for(var h=0;h<t.length-1;h++){var _=t[h];if(!(_ in a))break e;a=a[_]}t=t[t.length-1],h=a[t],r=r(h),r!=h&&r!=null&&e(a,t,{configurable:!0,writable:!0,value:r})}}o("Symbol.dispose",function(t){return t||Symbol("Symbol.dispose")}),o("Array.prototype.values",function(t){return t||function(){return this[Symbol.iterator]()}}),o("Object.entries",function(t){return t||function(r){var a=[],h;for(h in r)Object.prototype.hasOwnProperty.call(r,h)&&a.push([h,r[h]]);return a}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},l=this||self;function w(t){var r=typeof t;return r=="object"&&t!=null||r=="function"}function v(t,r,a){return t.call.apply(t.bind,arguments)}function E(t,r,a){return E=v,E.apply(null,arguments)}function A(t,r){var a=Array.prototype.slice.call(arguments,1);return function(){var h=a.slice();return h.push.apply(h,arguments),t.apply(this,h)}}function S(t,r){function a(){}a.prototype=r.prototype,t.Z=r.prototype,t.prototype=new a,t.prototype.constructor=t,t.Ob=function(h,_,I){for(var T=Array(arguments.length-2),P=2;P<arguments.length;P++)T[P-2]=arguments[P];return r.prototype[_].apply(h,T)}}var O=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?t=>t&&AsyncContext.Snapshot.wrap(t):t=>t;function H(t){const r=t.length;if(r>0){const a=Array(r);for(let h=0;h<r;h++)a[h]=t[h];return a}return[]}function x(t,r){for(let h=1;h<arguments.length;h++){const _=arguments[h];var a=typeof _;if(a=a!="object"?a:_?Array.isArray(_)?"array":a:"null",a=="array"||a=="object"&&typeof _.length=="number"){a=t.length||0;const I=_.length||0;t.length=a+I;for(let T=0;T<I;T++)t[a+T]=_[T]}else t.push(_)}}class B{constructor(r,a){this.i=r,this.j=a,this.h=0,this.g=null}get(){let r;return this.h>0?(this.h--,r=this.g,this.g=r.next,r.next=null):r=this.i(),r}}function M(t){l.setTimeout(()=>{throw t},0)}function ne(){var t=g;let r=null;return t.g&&(r=t.g,t.g=t.g.next,t.g||(t.h=null),r.next=null),r}class me{constructor(){this.h=this.g=null}add(r,a){const h=_e.get();h.set(r,a),this.h?this.h.next=h:this.g=h,this.h=h}}var _e=new B(()=>new Ye,t=>t.reset());class Ye{constructor(){this.next=this.g=this.h=null}set(r,a){this.h=r,this.g=a,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,J=!1,g=new me,u=()=>{const t=Promise.resolve(void 0);ye=()=>{t.then(f)}};function f(){for(var t;t=ne();){try{t.h.call(t.g)}catch(a){M(a)}var r=_e;r.j(t),r.h<100&&(r.h++,t.next=r.g,r.g=t)}J=!1}function m(){this.u=this.u,this.C=this.C}m.prototype.u=!1,m.prototype.dispose=function(){this.u||(this.u=!0,this.N())},m.prototype[Symbol.dispose]=function(){this.dispose()},m.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function p(t,r){this.type=t,this.g=this.target=r,this.defaultPrevented=!1}p.prototype.h=function(){this.defaultPrevented=!0};var y=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var t=!1,r=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const a=()=>{};l.addEventListener("test",a,r),l.removeEventListener("test",a,r)}catch{}return t})();function d(t){return/^[\s\xa0]*$/.test(t)}function K(t,r){p.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t&&this.init(t,r)}S(K,p),K.prototype.init=function(t,r){const a=this.type=t.type,h=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;this.target=t.target||t.srcElement,this.g=r,r=t.relatedTarget,r||(a=="mouseover"?r=t.fromElement:a=="mouseout"&&(r=t.toElement)),this.relatedTarget=r,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=t.pointerType,this.state=t.state,this.i=t,t.defaultPrevented&&K.Z.h.call(this)},K.prototype.h=function(){K.Z.h.call(this);const t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Le="closure_listenable_"+(Math.random()*1e6|0),mo=0;function _o(t,r,a,h,_){this.listener=t,this.proxy=null,this.src=r,this.type=a,this.capture=!!h,this.ha=_,this.key=++mo,this.da=this.fa=!1}function Bt(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function Ht(t,r,a){for(const h in t)r.call(a,t[h],h,t)}function yo(t,r){for(const a in t)r.call(void 0,t[a],a,t)}function ki(t){const r={};for(const a in t)r[a]=t[a];return r}const Ni="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Di(t,r){let a,h;for(let _=1;_<arguments.length;_++){h=arguments[_];for(a in h)t[a]=h[a];for(let I=0;I<Ni.length;I++)a=Ni[I],Object.prototype.hasOwnProperty.call(h,a)&&(t[a]=h[a])}}function $t(t){this.src=t,this.g={},this.h=0}$t.prototype.add=function(t,r,a,h,_){const I=t.toString();t=this.g[I],t||(t=this.g[I]=[],this.h++);const T=En(t,r,h,_);return T>-1?(r=t[T],a||(r.fa=!1)):(r=new _o(r,this.src,I,!!h,_),r.fa=a,t.push(r)),r};function vn(t,r){const a=r.type;if(a in t.g){var h=t.g[a],_=Array.prototype.indexOf.call(h,r,void 0),I;(I=_>=0)&&Array.prototype.splice.call(h,_,1),I&&(Bt(r),t.g[a].length==0&&(delete t.g[a],t.h--))}}function En(t,r,a,h){for(let _=0;_<t.length;++_){const I=t[_];if(!I.da&&I.listener==r&&I.capture==!!a&&I.ha==h)return _}return-1}var Tn="closure_lm_"+(Math.random()*1e6|0),Sn={};function Oi(t,r,a,h,_){if(Array.isArray(r)){for(let I=0;I<r.length;I++)Oi(t,r[I],a,h,_);return null}return a=Ui(a),t&&t[Le]?t.J(r,a,w(h)?!!h.capture:!1,_):Io(t,r,a,!1,h,_)}function Io(t,r,a,h,_,I){if(!r)throw Error("Invalid event type");const T=w(_)?!!_.capture:!!_;let P=bn(t);if(P||(t[Tn]=P=new $t(t)),a=P.add(r,a,h,T,I),a.proxy)return a;if(h=wo(),a.proxy=h,h.src=t,h.listener=a,t.addEventListener)y||(_=T),_===void 0&&(_=!1),t.addEventListener(r.toString(),h,_);else if(t.attachEvent)t.attachEvent(Mi(r.toString()),h);else if(t.addListener&&t.removeListener)t.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return a}function wo(){function t(a){return r.call(t.src,t.listener,a)}const r=vo;return t}function Li(t,r,a,h,_){if(Array.isArray(r))for(var I=0;I<r.length;I++)Li(t,r[I],a,h,_);else h=w(h)?!!h.capture:!!h,a=Ui(a),t&&t[Le]?(t=t.i,I=String(r).toString(),I in t.g&&(r=t.g[I],a=En(r,a,h,_),a>-1&&(Bt(r[a]),Array.prototype.splice.call(r,a,1),r.length==0&&(delete t.g[I],t.h--)))):t&&(t=bn(t))&&(r=t.g[r.toString()],t=-1,r&&(t=En(r,a,h,_)),(a=t>-1?r[t]:null)&&An(a))}function An(t){if(typeof t!="number"&&t&&!t.da){var r=t.src;if(r&&r[Le])vn(r.i,t);else{var a=t.type,h=t.proxy;r.removeEventListener?r.removeEventListener(a,h,t.capture):r.detachEvent?r.detachEvent(Mi(a),h):r.addListener&&r.removeListener&&r.removeListener(h),(a=bn(r))?(vn(a,t),a.h==0&&(a.src=null,r[Tn]=null)):Bt(t)}}}function Mi(t){return t in Sn?Sn[t]:Sn[t]="on"+t}function vo(t,r){if(t.da)t=!0;else{r=new K(r,this);const a=t.listener,h=t.ha||t.src;t.fa&&An(t),t=a.call(h,r)}return t}function bn(t){return t=t[Tn],t instanceof $t?t:null}var Pn="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ui(t){return typeof t=="function"?t:(t[Pn]||(t[Pn]=function(r){return t.handleEvent(r)}),t[Pn])}function $(){m.call(this),this.i=new $t(this),this.M=this,this.G=null}S($,m),$.prototype[Le]=!0,$.prototype.removeEventListener=function(t,r,a,h){Li(this,t,r,a,h)};function W(t,r){var a,h=t.G;if(h)for(a=[];h;h=h.G)a.push(h);if(t=t.M,h=r.type||r,typeof r=="string")r=new p(r,t);else if(r instanceof p)r.target=r.target||t;else{var _=r;r=new p(h,t),Di(r,_)}_=!0;let I,T;if(a)for(T=a.length-1;T>=0;T--)I=r.g=a[T],_=Wt(I,h,!0,r)&&_;if(I=r.g=t,_=Wt(I,h,!0,r)&&_,_=Wt(I,h,!1,r)&&_,a)for(T=0;T<a.length;T++)I=r.g=a[T],_=Wt(I,h,!1,r)&&_}$.prototype.N=function(){if($.Z.N.call(this),this.i){var t=this.i;for(const r in t.g){const a=t.g[r];for(let h=0;h<a.length;h++)Bt(a[h]);delete t.g[r],t.h--}}this.G=null},$.prototype.J=function(t,r,a,h){return this.i.add(String(t),r,!1,a,h)},$.prototype.K=function(t,r,a,h){return this.i.add(String(t),r,!0,a,h)};function Wt(t,r,a,h){if(r=t.i.g[String(r)],!r)return!0;r=r.concat();let _=!0;for(let I=0;I<r.length;++I){const T=r[I];if(T&&!T.da&&T.capture==a){const P=T.listener,F=T.ha||T.src;T.fa&&vn(t.i,T),_=P.call(F,h)!==!1&&_}}return _&&!h.defaultPrevented}function Eo(t,r){if(typeof t!="function")if(t&&typeof t.handleEvent=="function")t=E(t.handleEvent,t);else throw Error("Invalid listener argument");return Number(r)>2147483647?-1:l.setTimeout(t,r||0)}function xi(t){t.g=Eo(()=>{t.g=null,t.i&&(t.i=!1,xi(t))},t.l);const r=t.h;t.h=null,t.m.apply(null,r)}class To extends m{constructor(r,a){super(),this.m=r,this.l=a,this.h=null,this.i=!1,this.g=null}j(r){this.h=arguments,this.g?this.i=!0:xi(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ut(t){m.call(this),this.h=t,this.g={}}S(ut,m);var Vi=[];function Fi(t){Ht(t.g,function(r,a){this.g.hasOwnProperty(a)&&An(r)},t),t.g={}}ut.prototype.N=function(){ut.Z.N.call(this),Fi(this)},ut.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Rn=l.JSON.stringify,So=l.JSON.parse,Ao=class{stringify(t){return l.JSON.stringify(t,void 0)}parse(t){return l.JSON.parse(t,void 0)}};function ji(){}function bo(){}var dt={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Cn(){p.call(this,"d")}S(Cn,p);function kn(){p.call(this,"c")}S(kn,p);var Qe={},Bi=null;function Nn(){return Bi=Bi||new $}Qe.Ia="serverreachability";function Hi(t){p.call(this,Qe.Ia,t)}S(Hi,p);function ft(t){const r=Nn();W(r,new Hi(r))}Qe.STAT_EVENT="statevent";function $i(t,r){p.call(this,Qe.STAT_EVENT,t),this.stat=r}S($i,p);function z(t){const r=Nn();W(r,new $i(r,t))}Qe.Ja="timingevent";function Wi(t,r){p.call(this,Qe.Ja,t),this.size=r}S(Wi,p);function pt(t,r){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){t()},r)}function gt(){this.g=!0}gt.prototype.ua=function(){this.g=!1};function Po(t,r,a,h,_,I){t.info(function(){if(t.g)if(I){var T="",P=I.split("&");for(let D=0;D<P.length;D++){var F=P[D].split("=");if(F.length>1){const j=F[0];F=F[1];const se=j.split("_");T=se.length>=2&&se[1]=="type"?T+(j+"="+F+"&"):T+(j+"=redacted&")}}}else T=null;else T=I;return"XMLHTTP REQ ("+h+") [attempt "+_+"]: "+r+`
`+a+`
`+T})}function Ro(t,r,a,h,_,I,T){t.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+_+"]: "+r+`
`+a+`
`+I+" "+T})}function Ze(t,r,a,h){t.info(function(){return"XMLHTTP TEXT ("+r+"): "+ko(t,a)+(h?" "+h:"")})}function Co(t,r){t.info(function(){return"TIMEOUT: "+r})}gt.prototype.info=function(){};function ko(t,r){if(!t.g)return r;if(!r)return null;try{const I=JSON.parse(r);if(I){for(t=0;t<I.length;t++)if(Array.isArray(I[t])){var a=I[t];if(!(a.length<2)){var h=a[1];if(Array.isArray(h)&&!(h.length<1)){var _=h[0];if(_!="noop"&&_!="stop"&&_!="close")for(let T=1;T<h.length;T++)h[T]=""}}}}return Rn(I)}catch{return r}}var Dn={NO_ERROR:0,TIMEOUT:8},No={},zi;function On(){}S(On,ji),On.prototype.g=function(){return new XMLHttpRequest},zi=new On;function mt(t){return encodeURIComponent(String(t))}function Do(t){var r=1;t=t.split(":");const a=[];for(;r>0&&t.length;)a.push(t.shift()),r--;return t.length&&a.push(t.join(":")),a}function Ie(t,r,a,h){this.j=t,this.i=r,this.l=a,this.S=h||1,this.V=new ut(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Gi}function Gi(){this.i=null,this.g="",this.h=!1}var qi={},Ln={};function Mn(t,r,a){t.M=1,t.A=Gt(ie(r)),t.u=a,t.R=!0,Ki(t,null)}function Ki(t,r){t.F=Date.now(),zt(t),t.B=ie(t.A);var a=t.B,h=t.S;Array.isArray(h)||(h=[String(h)]),as(a.i,"t",h),t.C=0,a=t.j.L,t.h=new Gi,t.g=As(t.j,a?r:null,!t.u),t.P>0&&(t.O=new To(E(t.Y,t,t.g),t.P)),r=t.V,a=t.g,h=t.ba;var _="readystatechange";Array.isArray(_)||(_&&(Vi[0]=_.toString()),_=Vi);for(let I=0;I<_.length;I++){const T=Oi(a,_[I],h||r.handleEvent,!1,r.h||r);if(!T)break;r.g[T.key]=T}r=t.J?ki(t.J):{},t.u?(t.v||(t.v="POST"),r["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.B,t.v,t.u,r)):(t.v="GET",t.g.ea(t.B,t.v,null,r)),ft(),Po(t.i,t.v,t.B,t.l,t.S,t.u)}Ie.prototype.ba=function(t){t=t.target;const r=this.O;r&&Ee(t)==3?r.j():this.Y(t)},Ie.prototype.Y=function(t){try{if(t==this.g)e:{const P=Ee(this.g),F=this.g.ya(),D=this.g.ca();if(!(P<3)&&(P!=3||this.g&&(this.h.h||this.g.la()||ps(this.g)))){this.K||P!=4||F==7||(F==8||D<=0?ft(3):ft(2)),Un(this);var r=this.g.ca();this.X=r;var a=Oo(this);if(this.o=r==200,Ro(this.i,this.v,this.B,this.l,this.S,P,r),this.o){if(this.U&&!this.L){t:{if(this.g){var h,_=this.g;if((h=_.g?_.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!d(h)){var I=h;break t}}I=null}if(t=I)Ze(this.i,this.l,t,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,xn(this,t);else{this.o=!1,this.m=3,z(12),Me(this),_t(this);break e}}if(this.R){t=!0;let j;for(;!this.K&&this.C<a.length;)if(j=Lo(this,a),j==Ln){P==4&&(this.m=4,z(14),t=!1),Ze(this.i,this.l,null,"[Incomplete Response]");break}else if(j==qi){this.m=4,z(15),Ze(this.i,this.l,a,"[Invalid Chunk]"),t=!1;break}else Ze(this.i,this.l,j,null),xn(this,j);if(Ji(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),P!=4||a.length!=0||this.h.h||(this.m=1,z(16),t=!1),this.o=this.o&&t,!t)Ze(this.i,this.l,a,"[Invalid Chunked Response]"),Me(this),_t(this);else if(a.length>0&&!this.W){this.W=!0;var T=this.j;T.g==this&&T.aa&&!T.P&&(T.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),zn(T),T.P=!0,z(11))}}else Ze(this.i,this.l,a,null),xn(this,a);P==4&&Me(this),this.o&&!this.K&&(P==4?vs(this.j,this):(this.o=!1,zt(this)))}else Ko(this.g),r==400&&a.indexOf("Unknown SID")>0?(this.m=3,z(12)):(this.m=0,z(13)),Me(this),_t(this)}}}catch{}finally{}};function Oo(t){if(!Ji(t))return t.g.la();const r=ps(t.g);if(r==="")return"";let a="";const h=r.length,_=Ee(t.g)==4;if(!t.h.i){if(typeof TextDecoder>"u")return Me(t),_t(t),"";t.h.i=new l.TextDecoder}for(let I=0;I<h;I++)t.h.h=!0,a+=t.h.i.decode(r[I],{stream:!(_&&I==h-1)});return r.length=0,t.h.g+=a,t.C=0,t.h.g}function Ji(t){return t.g?t.v=="GET"&&t.M!=2&&t.j.Aa:!1}function Lo(t,r){var a=t.C,h=r.indexOf(`
`,a);return h==-1?Ln:(a=Number(r.substring(a,h)),isNaN(a)?qi:(h+=1,h+a>r.length?Ln:(r=r.slice(h,h+a),t.C=h+a,r)))}Ie.prototype.cancel=function(){this.K=!0,Me(this)};function zt(t){t.T=Date.now()+t.H,Xi(t,t.H)}function Xi(t,r){if(t.D!=null)throw Error("WatchDog timer not null");t.D=pt(E(t.aa,t),r)}function Un(t){t.D&&(l.clearTimeout(t.D),t.D=null)}Ie.prototype.aa=function(){this.D=null;const t=Date.now();t-this.T>=0?(Co(this.i,this.B),this.M!=2&&(ft(),z(17)),Me(this),this.m=2,_t(this)):Xi(this,this.T-t)};function _t(t){t.j.I==0||t.K||vs(t.j,t)}function Me(t){Un(t);var r=t.O;r&&typeof r.dispose=="function"&&r.dispose(),t.O=null,Fi(t.V),t.g&&(r=t.g,t.g=null,r.abort(),r.dispose())}function xn(t,r){try{var a=t.j;if(a.I!=0&&(a.g==t||Vn(a.h,t))){if(!t.L&&Vn(a.h,t)&&a.I==3){try{var h=a.Ba.g.parse(r)}catch{h=null}if(Array.isArray(h)&&h.length==3){var _=h;if(_[0]==0){e:if(!a.v){if(a.g)if(a.g.F+3e3<t.F)Yt(a),Jt(a);else break e;Wn(a),z(18)}}else a.xa=_[1],0<a.xa-a.K&&_[2]<37500&&a.F&&a.A==0&&!a.C&&(a.C=pt(E(a.Va,a),6e3));Zi(a.h)<=1&&a.ta&&(a.ta=void 0)}else xe(a,11)}else if((t.L||a.g==t)&&Yt(a),!d(r))for(_=a.Ba.g.parse(r),r=0;r<_.length;r++){let D=_[r];const j=D[0];if(!(j<=a.K))if(a.K=j,D=D[1],a.I==2)if(D[0]=="c"){a.M=D[1],a.ba=D[2];const se=D[3];se!=null&&(a.ka=se,a.j.info("VER="+a.ka));const Ve=D[4];Ve!=null&&(a.za=Ve,a.j.info("SVER="+a.za));const Te=D[5];Te!=null&&typeof Te=="number"&&Te>0&&(h=1.5*Te,a.O=h,a.j.info("backChannelRequestTimeoutMs_="+h)),h=a;const Se=t.g;if(Se){const Qt=Se.g?Se.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qt){var I=h.h;I.g||Qt.indexOf("spdy")==-1&&Qt.indexOf("quic")==-1&&Qt.indexOf("h2")==-1||(I.j=I.l,I.g=new Set,I.h&&(Fn(I,I.h),I.h=null))}if(h.G){const Gn=Se.g?Se.g.getResponseHeader("X-HTTP-Session-Id"):null;Gn&&(h.wa=Gn,L(h.J,h.G,Gn))}}a.I=3,a.l&&a.l.ra(),a.aa&&(a.T=Date.now()-t.F,a.j.info("Handshake RTT: "+a.T+"ms")),h=a;var T=t;if(h.na=Ss(h,h.L?h.ba:null,h.W),T.L){es(h.h,T);var P=T,F=h.O;F&&(P.H=F),P.D&&(Un(P),zt(P)),h.g=T}else Is(h);a.i.length>0&&Xt(a)}else D[0]!="stop"&&D[0]!="close"||xe(a,7);else a.I==3&&(D[0]=="stop"||D[0]=="close"?D[0]=="stop"?xe(a,7):$n(a):D[0]!="noop"&&a.l&&a.l.qa(D),a.A=0)}}ft(4)}catch{}}var Mo=class{constructor(t,r){this.g=t,this.map=r}};function Yi(t){this.l=t||10,l.PerformanceNavigationTiming?(t=l.performance.getEntriesByType("navigation"),t=t.length>0&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Qi(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Zi(t){return t.h?1:t.g?t.g.size:0}function Vn(t,r){return t.h?t.h==r:t.g?t.g.has(r):!1}function Fn(t,r){t.g?t.g.add(r):t.h=r}function es(t,r){t.h&&t.h==r?t.h=null:t.g&&t.g.has(r)&&t.g.delete(r)}Yi.prototype.cancel=function(){if(this.i=ts(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function ts(t){if(t.h!=null)return t.i.concat(t.h.G);if(t.g!=null&&t.g.size!==0){let r=t.i;for(const a of t.g.values())r=r.concat(a.G);return r}return H(t.i)}var ns=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Uo(t,r){if(t){t=t.split("&");for(let a=0;a<t.length;a++){const h=t[a].indexOf("=");let _,I=null;h>=0?(_=t[a].substring(0,h),I=t[a].substring(h+1)):_=t[a],r(_,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function we(t){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let r;t instanceof we?(this.l=t.l,yt(this,t.j),this.o=t.o,this.g=t.g,It(this,t.u),this.h=t.h,jn(this,cs(t.i)),this.m=t.m):t&&(r=String(t).match(ns))?(this.l=!1,yt(this,r[1]||"",!0),this.o=wt(r[2]||""),this.g=wt(r[3]||"",!0),It(this,r[4]),this.h=wt(r[5]||"",!0),jn(this,r[6]||"",!0),this.m=wt(r[7]||"")):(this.l=!1,this.i=new Et(null,this.l))}we.prototype.toString=function(){const t=[];var r=this.j;r&&t.push(vt(r,is,!0),":");var a=this.g;return(a||r=="file")&&(t.push("//"),(r=this.o)&&t.push(vt(r,is,!0),"@"),t.push(mt(a).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a=this.u,a!=null&&t.push(":",String(a))),(a=this.h)&&(this.g&&a.charAt(0)!="/"&&t.push("/"),t.push(vt(a,a.charAt(0)=="/"?Fo:Vo,!0))),(a=this.i.toString())&&t.push("?",a),(a=this.m)&&t.push("#",vt(a,Bo)),t.join("")},we.prototype.resolve=function(t){const r=ie(this);let a=!!t.j;a?yt(r,t.j):a=!!t.o,a?r.o=t.o:a=!!t.g,a?r.g=t.g:a=t.u!=null;var h=t.h;if(a)It(r,t.u);else if(a=!!t.h){if(h.charAt(0)!="/")if(this.g&&!this.h)h="/"+h;else{var _=r.h.lastIndexOf("/");_!=-1&&(h=r.h.slice(0,_+1)+h)}if(_=h,_==".."||_==".")h="";else if(_.indexOf("./")!=-1||_.indexOf("/.")!=-1){h=_.lastIndexOf("/",0)==0,_=_.split("/");const I=[];for(let T=0;T<_.length;){const P=_[T++];P=="."?h&&T==_.length&&I.push(""):P==".."?((I.length>1||I.length==1&&I[0]!="")&&I.pop(),h&&T==_.length&&I.push("")):(I.push(P),h=!0)}h=I.join("/")}else h=_}return a?r.h=h:a=t.i.toString()!=="",a?jn(r,cs(t.i)):a=!!t.m,a&&(r.m=t.m),r};function ie(t){return new we(t)}function yt(t,r,a){t.j=a?wt(r,!0):r,t.j&&(t.j=t.j.replace(/:$/,""))}function It(t,r){if(r){if(r=Number(r),isNaN(r)||r<0)throw Error("Bad port number "+r);t.u=r}else t.u=null}function jn(t,r,a){r instanceof Et?(t.i=r,Ho(t.i,t.l)):(a||(r=vt(r,jo)),t.i=new Et(r,t.l))}function L(t,r,a){t.i.set(r,a)}function Gt(t){return L(t,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),t}function wt(t,r){return t?r?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function vt(t,r,a){return typeof t=="string"?(t=encodeURI(t).replace(r,xo),a&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function xo(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var is=/[#\/\?@]/g,Vo=/[#\?:]/g,Fo=/[#\?]/g,jo=/[#\?@]/g,Bo=/#/g;function Et(t,r){this.h=this.g=null,this.i=t||null,this.j=!!r}function Ue(t){t.g||(t.g=new Map,t.h=0,t.i&&Uo(t.i,function(r,a){t.add(decodeURIComponent(r.replace(/\+/g," ")),a)}))}i=Et.prototype,i.add=function(t,r){Ue(this),this.i=null,t=et(this,t);let a=this.g.get(t);return a||this.g.set(t,a=[]),a.push(r),this.h+=1,this};function ss(t,r){Ue(t),r=et(t,r),t.g.has(r)&&(t.i=null,t.h-=t.g.get(r).length,t.g.delete(r))}function rs(t,r){return Ue(t),r=et(t,r),t.g.has(r)}i.forEach=function(t,r){Ue(this),this.g.forEach(function(a,h){a.forEach(function(_){t.call(r,_,h,this)},this)},this)};function os(t,r){Ue(t);let a=[];if(typeof r=="string")rs(t,r)&&(a=a.concat(t.g.get(et(t,r))));else for(t=Array.from(t.g.values()),r=0;r<t.length;r++)a=a.concat(t[r]);return a}i.set=function(t,r){return Ue(this),this.i=null,t=et(this,t),rs(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[r]),this.h+=1,this},i.get=function(t,r){return t?(t=os(this,t),t.length>0?String(t[0]):r):r};function as(t,r,a){ss(t,r),a.length>0&&(t.i=null,t.g.set(et(t,r),H(a)),t.h+=a.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],r=Array.from(this.g.keys());for(let h=0;h<r.length;h++){var a=r[h];const _=mt(a);a=os(this,a);for(let I=0;I<a.length;I++){let T=_;a[I]!==""&&(T+="="+mt(a[I])),t.push(T)}}return this.i=t.join("&")};function cs(t){const r=new Et;return r.i=t.i,t.g&&(r.g=new Map(t.g),r.h=t.h),r}function et(t,r){return r=String(r),t.j&&(r=r.toLowerCase()),r}function Ho(t,r){r&&!t.j&&(Ue(t),t.i=null,t.g.forEach(function(a,h){const _=h.toLowerCase();h!=_&&(ss(this,h),as(this,_,a))},t)),t.j=r}function $o(t,r){const a=new gt;if(l.Image){const h=new Image;h.onload=A(ve,a,"TestLoadImage: loaded",!0,r,h),h.onerror=A(ve,a,"TestLoadImage: error",!1,r,h),h.onabort=A(ve,a,"TestLoadImage: abort",!1,r,h),h.ontimeout=A(ve,a,"TestLoadImage: timeout",!1,r,h),l.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=t}else r(!1)}function Wo(t,r){const a=new gt,h=new AbortController,_=setTimeout(()=>{h.abort(),ve(a,"TestPingServer: timeout",!1,r)},1e4);fetch(t,{signal:h.signal}).then(I=>{clearTimeout(_),I.ok?ve(a,"TestPingServer: ok",!0,r):ve(a,"TestPingServer: server error",!1,r)}).catch(()=>{clearTimeout(_),ve(a,"TestPingServer: error",!1,r)})}function ve(t,r,a,h,_){try{_&&(_.onload=null,_.onerror=null,_.onabort=null,_.ontimeout=null),h(a)}catch{}}function zo(){this.g=new Ao}function Bn(t){this.i=t.Sb||null,this.h=t.ab||!1}S(Bn,ji),Bn.prototype.g=function(){return new qt(this.i,this.h)};function qt(t,r){$.call(this),this.H=t,this.o=r,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}S(qt,$),i=qt.prototype,i.open=function(t,r){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=t,this.D=r,this.readyState=1,St(this)},i.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const r={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};t&&(r.body=t),(this.H||l).fetch(new Request(this.D,r)).then(this.Pa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Tt(this)),this.readyState=0},i.Pa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,St(this)),this.g&&(this.readyState=3,St(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;hs(this)}else t.text().then(this.Oa.bind(this),this.ga.bind(this))};function hs(t){t.j.read().then(t.Ma.bind(t)).catch(t.ga.bind(t))}i.Ma=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var r=t.value?t.value:new Uint8Array(0);(r=this.B.decode(r,{stream:!t.done}))&&(this.response=this.responseText+=r)}t.done?Tt(this):St(this),this.readyState==3&&hs(this)}},i.Oa=function(t){this.g&&(this.response=this.responseText=t,Tt(this))},i.Na=function(t){this.g&&(this.response=t,Tt(this))},i.ga=function(){this.g&&Tt(this)};function Tt(t){t.readyState=4,t.l=null,t.j=null,t.B=null,St(t)}i.setRequestHeader=function(t,r){this.A.append(t,r)},i.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],r=this.h.entries();for(var a=r.next();!a.done;)a=a.value,t.push(a[0]+": "+a[1]),a=r.next();return t.join(`\r
`)};function St(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(qt.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});function ls(t){let r="";return Ht(t,function(a,h){r+=h,r+=":",r+=a,r+=`\r
`}),r}function Hn(t,r,a){e:{for(h in a){var h=!1;break e}h=!0}h||(a=ls(a),typeof t=="string"?a!=null&&mt(a):L(t,r,a))}function U(t){$.call(this),this.headers=new Map,this.L=t||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}S(U,$);var Go=/^https?$/i,qo=["POST","PUT"];i=U.prototype,i.Fa=function(t){this.H=t},i.ea=function(t,r,a,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);r=r?r.toUpperCase():"GET",this.D=t,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():zi.g(),this.g.onreadystatechange=O(E(this.Ca,this));try{this.B=!0,this.g.open(r,String(t),!0),this.B=!1}catch(I){us(this,I);return}if(t=a||"",a=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var _ in h)a.set(_,h[_]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const I of h.keys())a.set(I,h.get(I));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(a.keys()).find(I=>I.toLowerCase()=="content-type"),_=l.FormData&&t instanceof l.FormData,!(Array.prototype.indexOf.call(qo,r,void 0)>=0)||h||_||a.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[I,T]of a)this.g.setRequestHeader(I,T);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(t),this.v=!1}catch(I){us(this,I)}};function us(t,r){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=r,t.o=5,ds(t),Kt(t)}function ds(t){t.A||(t.A=!0,W(t,"complete"),W(t,"error"))}i.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=t||7,W(this,"complete"),W(this,"abort"),Kt(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Kt(this,!0)),U.Z.N.call(this)},i.Ca=function(){this.u||(this.B||this.v||this.j?fs(this):this.Xa())},i.Xa=function(){fs(this)};function fs(t){if(t.h&&typeof c<"u"){if(t.v&&Ee(t)==4)setTimeout(t.Ca.bind(t),0);else if(W(t,"readystatechange"),Ee(t)==4){t.h=!1;try{const I=t.ca();e:switch(I){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break e;default:r=!1}var a;if(!(a=r)){var h;if(h=I===0){let T=String(t.D).match(ns)[1]||null;!T&&l.self&&l.self.location&&(T=l.self.location.protocol.slice(0,-1)),h=!Go.test(T?T.toLowerCase():"")}a=h}if(a)W(t,"complete"),W(t,"success");else{t.o=6;try{var _=Ee(t)>2?t.g.statusText:""}catch{_=""}t.l=_+" ["+t.ca()+"]",ds(t)}}finally{Kt(t)}}}}function Kt(t,r){if(t.g){t.m&&(clearTimeout(t.m),t.m=null);const a=t.g;t.g=null,r||W(t,"ready");try{a.onreadystatechange=null}catch{}}}i.isActive=function(){return!!this.g};function Ee(t){return t.g?t.g.readyState:0}i.ca=function(){try{return Ee(this)>2?this.g.status:-1}catch{return-1}},i.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.La=function(t){if(this.g){var r=this.g.responseText;return t&&r.indexOf(t)==0&&(r=r.substring(t.length)),So(r)}};function ps(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.F){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function Ko(t){const r={};t=(t.g&&Ee(t)>=2&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<t.length;h++){if(d(t[h]))continue;var a=Do(t[h]);const _=a[0];if(a=a[1],typeof a!="string")continue;a=a.trim();const I=r[_]||[];r[_]=I,I.push(a)}yo(r,function(h){return h.join(", ")})}i.ya=function(){return this.o},i.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function At(t,r,a){return a&&a.internalChannelParams&&a.internalChannelParams[t]||r}function gs(t){this.za=0,this.i=[],this.j=new gt,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=At("failFast",!1,t),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=At("baseRetryDelayMs",5e3,t),this.Za=At("retryDelaySeedMs",1e4,t),this.Ta=At("forwardChannelMaxRetries",2,t),this.va=At("forwardChannelRequestTimeoutMs",2e4,t),this.ma=t&&t.xmlHttpFactory||void 0,this.Ua=t&&t.Rb||void 0,this.Aa=t&&t.useFetchStreams||!1,this.O=void 0,this.L=t&&t.supportsCrossDomainXhr||!1,this.M="",this.h=new Yi(t&&t.concurrentRequestLimit),this.Ba=new zo,this.S=t&&t.fastHandshake||!1,this.R=t&&t.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=t&&t.Pb||!1,t&&t.ua&&this.j.ua(),t&&t.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&t&&t.detectBufferingProxy||!1,this.ia=void 0,t&&t.longPollingTimeout&&t.longPollingTimeout>0&&(this.ia=t.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}i=gs.prototype,i.ka=8,i.I=1,i.connect=function(t,r,a,h){z(0),this.W=t,this.H=r||{},a&&h!==void 0&&(this.H.OSID=a,this.H.OAID=h),this.F=this.X,this.J=Ss(this,null,this.W),Xt(this)};function $n(t){if(ms(t),t.I==3){var r=t.V++,a=ie(t.J);if(L(a,"SID",t.M),L(a,"RID",r),L(a,"TYPE","terminate"),bt(t,a),r=new Ie(t,t.j,r),r.M=2,r.A=Gt(ie(a)),a=!1,l.navigator&&l.navigator.sendBeacon)try{a=l.navigator.sendBeacon(r.A.toString(),"")}catch{}!a&&l.Image&&(new Image().src=r.A,a=!0),a||(r.g=As(r.j,null),r.g.ea(r.A)),r.F=Date.now(),zt(r)}Ts(t)}function Jt(t){t.g&&(zn(t),t.g.cancel(),t.g=null)}function ms(t){Jt(t),t.v&&(l.clearTimeout(t.v),t.v=null),Yt(t),t.h.cancel(),t.m&&(typeof t.m=="number"&&l.clearTimeout(t.m),t.m=null)}function Xt(t){if(!Qi(t.h)&&!t.m){t.m=!0;var r=t.Ea;ye||u(),J||(ye(),J=!0),g.add(r,t),t.D=0}}function Jo(t,r){return Zi(t.h)>=t.h.j-(t.m?1:0)?!1:t.m?(t.i=r.G.concat(t.i),!0):t.I==1||t.I==2||t.D>=(t.Sa?0:t.Ta)?!1:(t.m=pt(E(t.Ea,t,r),Es(t,t.D)),t.D++,!0)}i.Ea=function(t){if(this.m)if(this.m=null,this.I==1){if(!t){this.V=Math.floor(Math.random()*1e5),t=this.V++;const _=new Ie(this,this.j,t);let I=this.o;if(this.U&&(I?(I=ki(I),Di(I,this.U)):I=this.U),this.u!==null||this.R||(_.J=I,I=null),this.S)e:{for(var r=0,a=0;a<this.i.length;a++){t:{var h=this.i[a];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break t}h=void 0}if(h===void 0)break;if(r+=h,r>4096){r=a;break e}if(r===4096||a===this.i.length-1){r=a+1;break e}}r=1e3}else r=1e3;r=ys(this,_,r),a=ie(this.J),L(a,"RID",t),L(a,"CVER",22),this.G&&L(a,"X-HTTP-Session-Id",this.G),bt(this,a),I&&(this.R?r="headers="+mt(ls(I))+"&"+r:this.u&&Hn(a,this.u,I)),Fn(this.h,_),this.Ra&&L(a,"TYPE","init"),this.S?(L(a,"$req",r),L(a,"SID","null"),_.U=!0,Mn(_,a,null)):Mn(_,a,r),this.I=2}}else this.I==3&&(t?_s(this,t):this.i.length==0||Qi(this.h)||_s(this))};function _s(t,r){var a;r?a=r.l:a=t.V++;const h=ie(t.J);L(h,"SID",t.M),L(h,"RID",a),L(h,"AID",t.K),bt(t,h),t.u&&t.o&&Hn(h,t.u,t.o),a=new Ie(t,t.j,a,t.D+1),t.u===null&&(a.J=t.o),r&&(t.i=r.G.concat(t.i)),r=ys(t,a,1e3),a.H=Math.round(t.va*.5)+Math.round(t.va*.5*Math.random()),Fn(t.h,a),Mn(a,h,r)}function bt(t,r){t.H&&Ht(t.H,function(a,h){L(r,h,a)}),t.l&&Ht({},function(a,h){L(r,h,a)})}function ys(t,r,a){a=Math.min(t.i.length,a);const h=t.l?E(t.l.Ka,t.l,t):null;e:{var _=t.i;let P=-1;for(;;){const F=["count="+a];P==-1?a>0?(P=_[0].g,F.push("ofs="+P)):P=0:F.push("ofs="+P);let D=!0;for(let j=0;j<a;j++){var I=_[j].g;const se=_[j].map;if(I-=P,I<0)P=Math.max(0,_[j].g-100),D=!1;else try{I="req"+I+"_"||"";try{var T=se instanceof Map?se:Object.entries(se);for(const[Ve,Te]of T){let Se=Te;w(Te)&&(Se=Rn(Te)),F.push(I+Ve+"="+encodeURIComponent(Se))}}catch(Ve){throw F.push(I+"type="+encodeURIComponent("_badmap")),Ve}}catch{h&&h(se)}}if(D){T=F.join("&");break e}}T=void 0}return t=t.i.splice(0,a),r.G=t,T}function Is(t){if(!t.g&&!t.v){t.Y=1;var r=t.Da;ye||u(),J||(ye(),J=!0),g.add(r,t),t.A=0}}function Wn(t){return t.g||t.v||t.A>=3?!1:(t.Y++,t.v=pt(E(t.Da,t),Es(t,t.A)),t.A++,!0)}i.Da=function(){if(this.v=null,ws(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var t=4*this.T;this.j.info("BP detection timer enabled: "+t),this.B=pt(E(this.Wa,this),t)}},i.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,z(10),Jt(this),ws(this))};function zn(t){t.B!=null&&(l.clearTimeout(t.B),t.B=null)}function ws(t){t.g=new Ie(t,t.j,"rpc",t.Y),t.u===null&&(t.g.J=t.o),t.g.P=0;var r=ie(t.na);L(r,"RID","rpc"),L(r,"SID",t.M),L(r,"AID",t.K),L(r,"CI",t.F?"0":"1"),!t.F&&t.ia&&L(r,"TO",t.ia),L(r,"TYPE","xmlhttp"),bt(t,r),t.u&&t.o&&Hn(r,t.u,t.o),t.O&&(t.g.H=t.O);var a=t.g;t=t.ba,a.M=1,a.A=Gt(ie(r)),a.u=null,a.R=!0,Ki(a,t)}i.Va=function(){this.C!=null&&(this.C=null,Jt(this),Wn(this),z(19))};function Yt(t){t.C!=null&&(l.clearTimeout(t.C),t.C=null)}function vs(t,r){var a=null;if(t.g==r){Yt(t),zn(t),t.g=null;var h=2}else if(Vn(t.h,r))a=r.G,es(t.h,r),h=1;else return;if(t.I!=0){if(r.o)if(h==1){a=r.u?r.u.length:0,r=Date.now()-r.F;var _=t.D;h=Nn(),W(h,new Wi(h,a)),Xt(t)}else Is(t);else if(_=r.m,_==3||_==0&&r.X>0||!(h==1&&Jo(t,r)||h==2&&Wn(t)))switch(a&&a.length>0&&(r=t.h,r.i=r.i.concat(a)),_){case 1:xe(t,5);break;case 4:xe(t,10);break;case 3:xe(t,6);break;default:xe(t,2)}}}function Es(t,r){let a=t.Qa+Math.floor(Math.random()*t.Za);return t.isActive()||(a*=2),a*r}function xe(t,r){if(t.j.info("Error code "+r),r==2){var a=E(t.bb,t),h=t.Ua;const _=!h;h=new we(h||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||yt(h,"https"),Gt(h),_?$o(h.toString(),a):Wo(h.toString(),a)}else z(2);t.I=0,t.l&&t.l.pa(r),Ts(t),ms(t)}i.bb=function(t){t?(this.j.info("Successfully pinged google.com"),z(2)):(this.j.info("Failed to ping google.com"),z(1))};function Ts(t){if(t.I=0,t.ja=[],t.l){const r=ts(t.h);(r.length!=0||t.i.length!=0)&&(x(t.ja,r),x(t.ja,t.i),t.h.i.length=0,H(t.i),t.i.length=0),t.l.oa()}}function Ss(t,r,a){var h=a instanceof we?ie(a):new we(a);if(h.g!="")r&&(h.g=r+"."+h.g),It(h,h.u);else{var _=l.location;h=_.protocol,r=r?r+"."+_.hostname:_.hostname,_=+_.port;const I=new we(null);h&&yt(I,h),r&&(I.g=r),_&&It(I,_),a&&(I.h=a),h=I}return a=t.G,r=t.wa,a&&r&&L(h,a,r),L(h,"VER",t.ka),bt(t,h),h}function As(t,r,a){if(r&&!t.L)throw Error("Can't create secondary domain capable XhrIo object.");return r=t.Aa&&!t.ma?new U(new Bn({ab:a})):new U(t.ma),r.Fa(t.L),r}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function bs(){}i=bs.prototype,i.ra=function(){},i.qa=function(){},i.pa=function(){},i.oa=function(){},i.isActive=function(){return!0},i.Ka=function(){};function X(t,r){$.call(this),this.g=new gs(r),this.l=t,this.h=r&&r.messageUrlParams||null,t=r&&r.messageHeaders||null,r&&r.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=r&&r.initMessageHeaders||null,r&&r.messageContentType&&(t?t["X-WebChannel-Content-Type"]=r.messageContentType:t={"X-WebChannel-Content-Type":r.messageContentType}),r&&r.sa&&(t?t["X-WebChannel-Client-Profile"]=r.sa:t={"X-WebChannel-Client-Profile":r.sa}),this.g.U=t,(t=r&&r.Qb)&&!d(t)&&(this.g.u=t),this.A=r&&r.supportsCrossDomainXhr||!1,this.v=r&&r.sendRawJson||!1,(r=r&&r.httpSessionIdParam)&&!d(r)&&(this.g.G=r,t=this.h,t!==null&&r in t&&(t=this.h,r in t&&delete t[r])),this.j=new tt(this)}S(X,$),X.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},X.prototype.close=function(){$n(this.g)},X.prototype.o=function(t){var r=this.g;if(typeof t=="string"){var a={};a.__data__=t,t=a}else this.v&&(a={},a.__data__=Rn(t),t=a);r.i.push(new Mo(r.Ya++,t)),r.I==3&&Xt(r)},X.prototype.N=function(){this.g.l=null,delete this.j,$n(this.g),delete this.g,X.Z.N.call(this)};function Ps(t){Cn.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var r=t.__sm__;if(r){e:{for(const a in r){t=a;break e}t=void 0}(this.i=t)&&(t=this.i,r=r!==null&&t in r?r[t]:void 0),this.data=r}else this.data=t}S(Ps,Cn);function Rs(){kn.call(this),this.status=1}S(Rs,kn);function tt(t){this.g=t}S(tt,bs),tt.prototype.ra=function(){W(this.g,"a")},tt.prototype.qa=function(t){W(this.g,new Ps(t))},tt.prototype.pa=function(t){W(this.g,new Rs)},tt.prototype.oa=function(){W(this.g,"b")},X.prototype.send=X.prototype.o,X.prototype.open=X.prototype.m,X.prototype.close=X.prototype.close,Dn.NO_ERROR=0,Dn.TIMEOUT=8,Dn.HTTP_ERROR=6,No.COMPLETE="complete",bo.EventType=dt,dt.OPEN="a",dt.CLOSE="b",dt.ERROR="c",dt.MESSAGE="d",$.prototype.listen=$.prototype.J,U.prototype.listenOnce=U.prototype.K,U.prototype.getLastError=U.prototype.Ha,U.prototype.getLastErrorCode=U.prototype.ya,U.prototype.getStatus=U.prototype.ca,U.prototype.getResponseJson=U.prototype.La,U.prototype.getResponseText=U.prototype.la,U.prototype.send=U.prototype.ea,U.prototype.setWithCredentials=U.prototype.Fa}).apply(typeof en<"u"?en:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}G.UNAUTHENTICATED=new G(null),G.GOOGLE_CREDENTIALS=new G("google-credentials-uid"),G.FIRST_PARTY=new G("first-party-uid"),G.MOCK_USER=new G("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ft="12.14.0";function Cl(i){Ft=i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct=new di("@firebase/firestore");function ee(i,...e){if(ct.logLevel<=N.DEBUG){const n=e.map(bi);ct.debug(`Firestore (${Ft}): ${i}`,...n)}}function ao(i,...e){if(ct.logLevel<=N.ERROR){const n=e.map(bi);ct.error(`Firestore (${Ft}): ${i}`,...n)}}function kl(i,...e){if(ct.logLevel<=N.WARN){const n=e.map(bi);ct.warn(`Firestore (${Ft}): ${i}`,...n)}}function bi(i){if(typeof i=="string")return i;try{return(function(n){return JSON.stringify(n)})(i)}catch{return i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot(i,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,co(i,s,n)}function co(i,e,n){let s=`FIRESTORE (${Ft}) INTERNAL ASSERTION FAILED: ${e} (ID: ${i.toString(16)})`;if(n!==void 0)try{s+=" CONTEXT: "+JSON.stringify(n)}catch{s+=" CONTEXT: "+n}throw ao(s),new Error(s)}function Rt(i,e,n,s){let o="Unexpected state";typeof n=="string"?o=n:s=n,i||co(e,o,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class k extends ge{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(){this.promise=new Promise(((e,n)=>{this.resolve=e,this.reject=n}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Nl{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable((()=>n(G.UNAUTHENTICATED)))}shutdown(){}}class Dl{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class Ol{constructor(e){this.t=e,this.currentUser=G.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Rt(this.o===void 0,42304);let s=this.i;const o=v=>this.i!==s?(s=this.i,n(v)):Promise.resolve();let c=new Ct;this.o=()=>{this.i++,this.currentUser=this.u(),c.resolve(),c=new Ct,e.enqueueRetryable((()=>o(this.currentUser)))};const l=()=>{const v=c;e.enqueueRetryable((async()=>{await v.promise,await o(this.currentUser)}))},w=v=>{ee("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=v,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit((v=>w(v))),setTimeout((()=>{if(!this.auth){const v=this.t.getImmediate({optional:!0});v?w(v):(ee("FirebaseAuthCredentialsProvider","Auth not yet detected"),c.resolve(),c=new Ct)}}),0),l()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((s=>this.i!==e?(ee("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Rt(typeof s.accessToken=="string",31837,{l:s}),new ho(s.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Rt(e===null||typeof e=="string",2055,{h:e}),new G(e)}}class Ll{constructor(e,n,s){this.P=e,this.T=n,this.I=s,this.type="FirstParty",this.user=G.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Ml{constructor(e,n,s){this.P=e,this.T=n,this.I=s}getToken(){return Promise.resolve(new Ll(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable((()=>n(G.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ir{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ul{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Q(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Rt(this.o===void 0,3512);const s=c=>{c.error!=null&&ee("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${c.error.message}`);const l=c.token!==this.m;return this.m=c.token,ee("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?n(c.token):Promise.resolve()};this.o=c=>{e.enqueueRetryable((()=>s(c)))};const o=c=>{ee("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=c,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((c=>o(c))),setTimeout((()=>{if(!this.appCheck){const c=this.V.getImmediate({optional:!0});c?o(c):ee("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new ir(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((n=>n?(Rt(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new ir(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(i){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(i);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<i;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const o=xl(40);for(let c=0;c<o.length;++c)s.length<20&&o[c]<n&&(s+=e.charAt(o[c]%62))}return s}}function Oe(i,e){return i<e?-1:i>e?1:0}function Fl(i,e){const n=Math.min(i.length,e.length);for(let s=0;s<n;s++){const o=i.charAt(s),c=e.charAt(s);if(o!==c)return ei(o)===ei(c)?Oe(o,c):ei(o)?1:-1}return Oe(i.length,e.length)}const jl=55296,Bl=57343;function ei(i){const e=i.charCodeAt(0);return e>=jl&&e<=Bl}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr="__name__";class re{constructor(e,n,s){n===void 0?n=0:n>e.length&&Ot(637,{offset:n,range:e.length}),s===void 0?s=e.length-n:s>e.length-n&&Ot(1746,{length:s,range:e.length-n}),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return re.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof re?e.forEach((s=>{n.push(s)})):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let o=0;o<s;o++){const c=re.compareSegments(e.get(o),n.get(o));if(c!==0)return c}return Oe(e.length,n.length)}static compareSegments(e,n){const s=re.isNumericId(e),o=re.isNumericId(n);return s&&!o?-1:!s&&o?1:s&&o?re.extractNumericId(e).compare(re.extractNumericId(n)):Fl(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ai.fromString(e.substring(4,e.length-2))}}class Y extends re{construct(e,n,s){return new Y(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new k(C.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter((o=>o.length>0)))}return new Y(n)}static emptyPath(){return new Y([])}}const Hl=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class je extends re{construct(e,n,s){return new je(e,n,s)}static isValidIdentifier(e){return Hl.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),je.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===sr}static keyField(){return new je([sr])}static fromServerFormat(e){const n=[];let s="",o=0;const c=()=>{if(s.length===0)throw new k(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let l=!1;for(;o<e.length;){const w=e[o];if(w==="\\"){if(o+1===e.length)throw new k(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const v=e[o+1];if(v!=="\\"&&v!=="."&&v!=="`")throw new k(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=v,o+=2}else w==="`"?(l=!l,o++):w!=="."||l?(s+=w,o++):(c(),o++)}if(c(),l)throw new k(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new je(n)}static emptyPath(){return new je([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.path=e}static fromPath(e){return new He(Y.fromString(e))}static fromName(e){return new He(Y.fromString(e).popFirst(5))}static empty(){return new He(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Y.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new He(new Y(e.slice()))}}function $l(i,e,n,s){if(e===!0&&s===!0)throw new k(C.INVALID_ARGUMENT,`${i} and ${n} cannot be used together.`)}function Wl(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}function zl(i){if(i===void 0)return"undefined";if(i===null)return"null";if(typeof i=="string")return i.length>20&&(i=`${i.substring(0,20)}...`),JSON.stringify(i);if(typeof i=="number"||typeof i=="boolean")return""+i;if(typeof i=="object"){if(i instanceof Array)return"an array";{const e=(function(s){return s.constructor?s.constructor.name:null})(i);return e?`a custom ${e} object`:"an object"}}return typeof i=="function"?"a function":Ot(12329,{type:typeof i})}function Gl(i,e){if("_delegate"in i&&(i=i._delegate),!(i instanceof e)){if(e.name===i.constructor.name)throw new k(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=zl(i);throw new k(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return i}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(i,e){const n={typeString:i};return e&&(n.value=e),n}function jt(i,e){if(!Wl(i))throw new k(C.INVALID_ARGUMENT,"JSON must be an object");let n;for(const s in e)if(e[s]){const o=e[s].typeString,c="value"in e[s]?{value:e[s].value}:void 0;if(!(s in i)){n=`JSON missing required field: '${s}'`;break}const l=i[s];if(o&&typeof l!==o){n=`JSON field '${s}' must be a ${o}.`;break}if(c!==void 0&&l!==c.value){n=`Expected '${s}' field to equal '${c.value}'`;break}}if(n)throw new k(C.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr=-62135596800,or=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor((e-1e3*n)*or);return new oe(n,s)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new k(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new k(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<rr)throw new k(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/or}_compareTo(e){return this.seconds===e.seconds?Oe(this.nanoseconds,e.nanoseconds):Oe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(jt(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-rr;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:V("string",oe._jsonSchemaVersion),seconds:V("number"),nanoseconds:V("number")};function ql(i){return i.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.binaryString=e}static fromBase64String(e){const n=(function(o){try{return atob(o)}catch(c){throw typeof DOMException<"u"&&c instanceof DOMException?new Kl("Invalid base64 string: "+c):c}})(e);return new Je(n)}static fromUint8Array(e){const n=(function(o){let c="";for(let l=0;l<o.length;++l)c+=String.fromCharCode(o[l]);return c})(e);return new Je(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return s})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Oe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Je.EMPTY_BYTE_STRING=new Je("");const hi="(default)";class mn{constructor(e,n){this.projectId=e,this.database=n||hi}static empty(){return new mn("","")}get isDefaultDatabase(){return this.database===hi}isEqual(e){return e instanceof mn&&e.projectId===this.projectId&&e.database===this.database}}function Jl(i,e){if(!Object.prototype.hasOwnProperty.apply(i.options,["projectId"]))throw new k(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new mn(i.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e,n=null,s=[],o=[],c=null,l="F",w=null,v=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=o,this.limit=c,this.limitType=l,this.startAt=w,this.endAt=v,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Yl(i){return new Xl(i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ar,R;(R=ar||(ar={}))[R.OK=0]="OK",R[R.CANCELLED=1]="CANCELLED",R[R.UNKNOWN=2]="UNKNOWN",R[R.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",R[R.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",R[R.NOT_FOUND=5]="NOT_FOUND",R[R.ALREADY_EXISTS=6]="ALREADY_EXISTS",R[R.PERMISSION_DENIED=7]="PERMISSION_DENIED",R[R.UNAUTHENTICATED=16]="UNAUTHENTICATED",R[R.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",R[R.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",R[R.ABORTED=10]="ABORTED",R[R.OUT_OF_RANGE=11]="OUT_OF_RANGE",R[R.UNIMPLEMENTED=12]="UNIMPLEMENTED",R[R.INTERNAL=13]="INTERNAL",R[R.UNAVAILABLE=14]="UNAVAILABLE",R[R.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Ai([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl=1048576;function ti(){return typeof document<"u"?document:null}class eu{constructor(e,n,s=1e3,o=1.5,c=6e4){this.Di=e,this.timerId=n,this.E_=s,this.R_=o,this.A_=c,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const n=Math.floor(this.V_+this.p_()),s=Math.max(0,Date.now()-this.m_),o=Math.max(0,n-s);o>0&&ee("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,o,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(e,n,s,o,c){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=o,this.removalCallback=c,this.deferred=new Ct,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((l=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,o,c){const l=Date.now()+s,w=new Pi(e,n,l,o,c);return w.start(s),w}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var cr,hr;(hr=cr||(cr={})).Na="default",hr.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(i){const e={};return i.timeoutSeconds!==void 0&&(e.timeoutSeconds=i.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nu="ComponentProvider",lr=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lo="firestore.googleapis.com",ur=!0;class dr{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new k(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=lo,this.ssl=ur}else this.host=e.host,this.ssl=e.ssl??ur;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ql;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Zl)throw new k(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}$l("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=tu(e.experimentalLongPollingOptions??{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new k(C.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new k(C.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new k(C.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(s,o){return s.timeoutSeconds===o.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class uo{constructor(e,n,s,o){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new dr({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new dr(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(s){if(!s)return new Nl;switch(s.type){case"firstParty":return new Ml(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new k(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const s=lr.get(n);s&&(ee(nu,"Removing Datastore"),lr.delete(n),s.terminate())})(this),Promise.resolve()}}function iu(i,e,n,s={}){var E;i=Gl(i,uo);const o=_n(e),c=i._getSettings(),l={...c,emulatorOptions:i._getEmulatorOptions()},w=`${e}:${n}`;o&&Sr(`https://${w}`),c.host!==lo&&c.host!==w&&kl("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const v={...c,host:w,ssl:o,emulatorOptions:s};if(!Ge(v,l)&&(i._setSettings(v),s.mockUserToken)){let A,S;if(typeof s.mockUserToken=="string")A=s.mockUserToken,S=G.MOCK_USER;else{A=oa(s.mockUserToken,(E=i._app)==null?void 0:E.options.projectId);const O=s.mockUserToken.sub||s.mockUserToken.user_id;if(!O)throw new k(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");S=new G(O)}i._authCredentials=new Dl(new ho(A,S))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Ri(this.firestore,e,this._query)}}class ae{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ci(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ae(this.firestore,e,this._key)}toJSON(){return{type:ae._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,s){if(jt(n,ae._jsonSchema))return new ae(e,s||null,new He(Y.fromString(n.referencePath)))}}ae._jsonSchemaVersion="firestore/documentReference/1.0",ae._jsonSchema={type:V("string",ae._jsonSchemaVersion),referencePath:V("string")};class Ci extends Ri{constructor(e,n,s){super(e,n,Yl(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ae(this.firestore,null,new He(e))}withConverter(e){return new Ci(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr="AsyncQueue";class pr{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new eu(this,"async_queue_retry"),this.cc=()=>{const s=ti();s&&ee(fr,"Visibility state changed to "+s.visibilityState),this.F_.y_()},this.lc=e;const n=ti();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const n=ti();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const n=new Ct;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!ql(e))throw e;ee(fr,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const n=this.lc.then((()=>(this._c=!0,e().catch((s=>{throw this.oc=s,this._c=!1,ao("INTERNAL UNHANDLED ERROR: ",gr(s)),s})).then((s=>(this._c=!1,s))))));return this.lc=n,n}enqueueAfterDelay(e,n,s){this.hc(),this.uc.indexOf(e)>-1&&(n=0);const o=Pi.createAndSchedule(this,e,n,s,(c=>this.Ic(c)));return this.sc.push(o),o}hc(){this.oc&&Ot(47125,{Ec:gr(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const n of this.sc)if(n.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((n,s)=>n.targetTimeMs-s.targetTimeMs));for(const n of this.sc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const n=this.sc.indexOf(e);this.sc.splice(n,1)}}function gr(i){let e=i.message||"";return i.stack&&(e=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),e}class su extends uo{constructor(e,n,s,o){super(e,n,s,o),this.type="firestore",this._queue=new pr,this._persistenceKey=(o==null?void 0:o.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new pr(e),this._firestoreClient=void 0,await e}}}function uu(i,e){const n=typeof i=="object"?i:Pr(),s=typeof i=="string"?i:hi,o=pi(n,"firestore").getImmediate({identifier:s});if(!o._initialized){const c=sa("firestore");c&&iu(o,...c)}return o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this._byteString=e}static fromBase64String(e){try{return new le(Je.fromBase64String(e))}catch(n){throw new k(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new le(Je.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:le._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(jt(e,le._jsonSchema))return le.fromBase64String(e.bytes)}}le._jsonSchemaVersion="firestore/bytes/1.0",le._jsonSchema={type:V("string",le._jsonSchemaVersion),bytes:V("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new k(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new je(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new k(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new k(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Oe(this._lat,e._lat)||Oe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:We._jsonSchemaVersion}}static fromJSON(e){if(jt(e,We._jsonSchema))return new We(e.latitude,e.longitude)}}We._jsonSchemaVersion="firestore/geoPoint/1.0",We._jsonSchema={type:V("string",We._jsonSchemaVersion),latitude:V("number"),longitude:V("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this._values=(e||[]).map((n=>n))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(s,o){if(s.length!==o.length)return!1;for(let c=0;c<s.length;++c)if(s[c]!==o[c])return!1;return!0})(this._values,e._values)}toJSON(){return{type:ze._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(jt(e,ze._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((n=>typeof n=="number")))return new ze(e.vectorValues);throw new k(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ze._jsonSchemaVersion="firestore/vectorValue/1.0",ze._jsonSchema={type:V("string",ze._jsonSchemaVersion),vectorValues:V("object")};function po(i,e,n){if((e=Xe(e))instanceof fo)return e._internalPath;if(typeof e=="string")return ou(i,e);throw li("Field path arguments must be of type string or ",i)}const ru=new RegExp("[~\\*/\\[\\]]");function ou(i,e,n){if(e.search(ru)>=0)throw li(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,i);try{return new fo(...e.split("."))._internalPath}catch{throw li(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,i)}}function li(i,e,n,s,o){let c=`Function ${e}() called with invalid data`;c+=". ";let l="";return new k(C.INVALID_ARGUMENT,c+i+l)}const mr="@firebase/firestore",_r="4.15.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,n,s,o,c){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=o,this._converter=c}get id(){return this._key.path.lastSegment()}get ref(){return new ae(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new au(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const n=this._document.data.field(po("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class au extends go{data(){return super.data()}}class tn{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class rt extends go{constructor(e,n,s,o,c,l){super(e,n,s,o,l),this._firestore=e,this._firestoreImpl=e,this.metadata=c}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new an(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(po("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=rt._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}rt._jsonSchemaVersion="firestore/documentSnapshot/1.0",rt._jsonSchema={type:V("string",rt._jsonSchemaVersion),bundleSource:V("string","DocumentSnapshot"),bundleName:V("string"),bundle:V("string")};class an extends rt{data(e={}){return super.data(e)}}class kt{constructor(e,n,s,o){this._firestore=e,this._userDataWriter=n,this._snapshot=o,this.metadata=new tn(o.hasPendingWrites,o.fromCache),this.query=s}get docs(){const e=[];return this.forEach((n=>e.push(n))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach((s=>{e.call(n,new an(this._firestore,this._userDataWriter,s.key,s,new tn(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new k(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=(function(o,c){if(o._snapshot.oldDocs.isEmpty()){let l=0;return o._snapshot.docChanges.map((w=>{const v=new an(o._firestore,o._userDataWriter,w.doc.key,w.doc,new tn(o._snapshot.mutatedKeys.has(w.doc.key),o._snapshot.fromCache),o.query.converter);return w.doc,{type:"added",doc:v,oldIndex:-1,newIndex:l++}}))}{let l=o._snapshot.oldDocs;return o._snapshot.docChanges.filter((w=>c||w.type!==3)).map((w=>{const v=new an(o._firestore,o._userDataWriter,w.doc.key,w.doc,new tn(o._snapshot.mutatedKeys.has(w.doc.key),o._snapshot.fromCache),o.query.converter);let E=-1,A=-1;return w.type!==0&&(E=l.indexOf(w.doc.key),l=l.delete(w.doc.key)),w.type!==1&&(l=l.add(w.doc),A=l.indexOf(w.doc.key)),{type:cu(w.type),doc:v,oldIndex:E,newIndex:A}}))}})(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=kt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Vl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],s=[],o=[];return this.docs.forEach((c=>{c._document!==null&&(n.push(c._document),s.push(this._userDataWriter.convertObjectMap(c._document.data.value.mapValue.fields,"previous")),o.push(c.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function cu(i){switch(i){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Ot(61501,{type:i})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt._jsonSchemaVersion="firestore/querySnapshot/1.0",kt._jsonSchema={type:V("string",kt._jsonSchemaVersion),bundleSource:V("string","QuerySnapshot"),bundleName:V("string"),bundle:V("string")};(function(e,n=!0){Cl(ht),ot(new qe("firestore",((s,{instanceIdentifier:o,options:c})=>{const l=s.getProvider("app").getImmediate(),w=new su(new Ol(s.getProvider("auth-internal")),new Ul(l,s.getProvider("app-check-internal")),Jl(l,o),l);return c={useFetchStreams:n,...c},w._setSettings(c),w}),"PUBLIC").setMultipleInstances(!0)),De(mr,_r,e),De(mr,_r,"esm2020")})();export{Pe as G,uu as a,lu as g,Ic as i,hu as s};
