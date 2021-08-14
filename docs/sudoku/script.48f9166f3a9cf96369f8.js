(()=>{"use strict";var e,t={185:(e,t,n)=>{var o={};n.r(o),n.d(o,{hiddenPairs:()=>Q,nakedPairs:()=>Y,pointingArrows:()=>te});var l,s,r,i,c,_,u={},a=[],f=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function d(e,t){for(var n in t)e[n]=t[n];return e}function h(e){var t=e.parentNode;t&&t.removeChild(e)}function p(e,t,n){var o,s,r,i={};for(r in t)"key"==r?o=t[r]:"ref"==r?s=t[r]:i[r]=t[r];if(arguments.length>2&&(i.children=arguments.length>3?l.call(arguments,2):n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===i[r]&&(i[r]=e.defaultProps[r]);return v(e,i,o,s,null)}function v(e,t,n,o,l){var i={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:l??++r};return null!=s.vnode&&s.vnode(i),i}function y(e){return e.children}function g(e,t){this.props=e,this.context=t}function b(e,t){if(null==t)return e.__?b(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?b(e):null}function k(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return k(e)}}function m(e){(!e.__d&&(e.__d=!0)&&i.push(e)&&!C.__r++||_!==s.debounceRendering)&&((_=s.debounceRendering)||c)(C)}function C(){for(var e;C.__r=i.length;)e=i.sort((function(e,t){return e.__v.__b-t.__v.__b})),i=[],e.some((function(e){var t,n,o,l,s,r;e.__d&&(s=(l=(t=e).__v).__e,(r=t.__P)&&(n=[],(o=d({},l)).__v=l.__v+1,D(r,l,o,t.__n,void 0!==r.ownerSVGElement,null!=l.__h?[s]:null,n,s??b(l),l.__h),O(n,l),l.__e!=s&&k(l)))}))}function w(e,t,n,o,l,s,r,i,c,_){var f,d,h,p,g,k,m,C=o&&o.__k||a,w=C.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(p=n.__k[f]=null==(p=t[f])||"boolean"==typeof p?null:"string"==typeof p||"number"==typeof p||"bigint"==typeof p?v(null,p,null,null,p):Array.isArray(p)?v(y,{children:p},null,null,null):p.__b>0?v(p.type,p.props,p.key,null,p.__v):p)){if(p.__=n,p.__b=n.__b+1,null===(h=C[f])||h&&p.key==h.key&&p.type===h.type)C[f]=void 0;else for(d=0;d<w;d++){if((h=C[d])&&p.key==h.key&&p.type===h.type){C[d]=void 0;break}h=null}D(e,p,h=h||u,l,s,r,i,c,_),g=p.__e,(d=p.ref)&&h.ref!=d&&(m||(m=[]),h.ref&&m.push(h.ref,null,p),m.push(d,p.__c||g,p)),null!=g?(null==k&&(k=g),"function"==typeof p.type&&null!=p.__k&&p.__k===h.__k?p.__d=c=S(p,c,e):c=x(e,p,h,C,g,c),_||"option"!==n.type?"function"==typeof n.type&&(n.__d=c):e.value=""):c&&h.__e==c&&c.parentNode!=e&&(c=b(h))}for(n.__e=k,f=w;f--;)null!=C[f]&&("function"==typeof n.type&&null!=C[f].__e&&C[f].__e==n.__d&&(n.__d=b(o,f+1)),B(C[f],C[f]));if(m)for(f=0;f<m.length;f++)$(m[f],m[++f],m[++f])}function S(e,t,n){var o,l;for(o=0;o<e.__k.length;o++)(l=e.__k[o])&&(l.__=e,t="function"==typeof l.type?S(l,t,n):x(n,l,l,e.__k,l.__e,t));return t}function x(e,t,n,o,l,s){var r,i,c;if(void 0!==t.__d)r=t.__d,t.__d=void 0;else if(null==n||l!=s||null==l.parentNode)e:if(null==s||s.parentNode!==e)e.appendChild(l),r=null;else{for(i=s,c=0;(i=i.nextSibling)&&c<o.length;c+=2)if(i==l)break e;e.insertBefore(l,s),r=s}return void 0!==r?r:l.nextSibling}function M(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||f.test(t)?n:n+"px"}function P(e,t,n,o,l){var s;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||M(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||M(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])s=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+s]=n,n?o||e.addEventListener(t,s?A:E,s):e.removeEventListener(t,s?A:E,s);else if("dangerouslySetInnerHTML"!==t){if(l)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=n??"";break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function E(e){this.l[e.type+!1](s.event?s.event(e):e)}function A(e){this.l[e.type+!0](s.event?s.event(e):e)}function D(e,t,n,o,l,r,i,c,_){var u,a,f,h,p,v,b,k,m,C,S,x=t.type;if(void 0!==t.constructor)return null;null!=n.__h&&(_=n.__h,c=t.__e=n.__e,t.__h=null,r=[c]),(u=s.__b)&&u(t);try{e:if("function"==typeof x){if(k=t.props,m=(u=x.contextType)&&o[u.__c],C=u?m?m.props.value:u.__:o,n.__c?b=(a=t.__c=n.__c).__=a.__E:("prototype"in x&&x.prototype.render?t.__c=a=new x(k,C):(t.__c=a=new g(k,C),a.constructor=x,a.render=L),m&&m.sub(a),a.props=k,a.state||(a.state={}),a.context=C,a.__n=o,f=a.__d=!0,a.__h=[]),null==a.__s&&(a.__s=a.state),null!=x.getDerivedStateFromProps&&(a.__s==a.state&&(a.__s=d({},a.__s)),d(a.__s,x.getDerivedStateFromProps(k,a.__s))),h=a.props,p=a.state,f)null==x.getDerivedStateFromProps&&null!=a.componentWillMount&&a.componentWillMount(),null!=a.componentDidMount&&a.__h.push(a.componentDidMount);else{if(null==x.getDerivedStateFromProps&&k!==h&&null!=a.componentWillReceiveProps&&a.componentWillReceiveProps(k,C),!a.__e&&null!=a.shouldComponentUpdate&&!1===a.shouldComponentUpdate(k,a.__s,C)||t.__v===n.__v){a.props=k,a.state=a.__s,t.__v!==n.__v&&(a.__d=!1),a.__v=t,t.__e=n.__e,t.__k=n.__k,t.__k.forEach((function(e){e&&(e.__=t)})),a.__h.length&&i.push(a);break e}null!=a.componentWillUpdate&&a.componentWillUpdate(k,a.__s,C),null!=a.componentDidUpdate&&a.__h.push((function(){a.componentDidUpdate(h,p,v)}))}a.context=C,a.props=k,a.state=a.__s,(u=s.__r)&&u(t),a.__d=!1,a.__v=t,a.__P=e,u=a.render(a.props,a.state,a.context),a.state=a.__s,null!=a.getChildContext&&(o=d(d({},o),a.getChildContext())),f||null==a.getSnapshotBeforeUpdate||(v=a.getSnapshotBeforeUpdate(h,p)),S=null!=u&&u.type===y&&null==u.key?u.props.children:u,w(e,Array.isArray(S)?S:[S],t,n,o,l,r,i,c,_),a.base=t.__e,t.__h=null,a.__h.length&&i.push(a),b&&(a.__E=a.__=null),a.__e=!1}else null==r&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=T(n.__e,t,n,o,l,r,i,_);(u=s.diffed)&&u(t)}catch(e){t.__v=null,(_||null!=r)&&(t.__e=c,t.__h=!!_,r[r.indexOf(c)]=null),s.__e(e,t,n)}}function O(e,t){s.__c&&s.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){s.__e(e,t.__v)}}))}function T(e,t,n,o,s,r,i,c){var _,a,f,d=n.props,p=t.props,v=t.type,y=0;if("svg"===v&&(s=!0),null!=r)for(;y<r.length;y++)if((_=r[y])&&(_===e||(v?_.localName==v:3==_.nodeType))){e=_,r[y]=null;break}if(null==e){if(null===v)return document.createTextNode(p);e=s?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,p.is&&p),r=null,c=!1}if(null===v)d===p||c&&e.data===p||(e.data=p);else{if(r=r&&l.call(e.childNodes),a=(d=n.props||u).dangerouslySetInnerHTML,f=p.dangerouslySetInnerHTML,!c){if(null!=r)for(d={},y=0;y<e.attributes.length;y++)d[e.attributes[y].name]=e.attributes[y].value;(f||a)&&(f&&(a&&f.__html==a.__html||f.__html===e.innerHTML)||(e.innerHTML=f&&f.__html||""))}if(function(e,t,n,o,l){var s;for(s in n)"children"===s||"key"===s||s in t||P(e,s,null,n[s],o);for(s in t)l&&"function"!=typeof t[s]||"children"===s||"key"===s||"value"===s||"checked"===s||n[s]===t[s]||P(e,s,t[s],n[s],o)}(e,p,d,s,c),f)t.__k=[];else if(y=t.props.children,w(e,Array.isArray(y)?y:[y],t,n,o,s&&"foreignObject"!==v,r,i,r?r[0]:n.__k&&b(n,0),c),null!=r)for(y=r.length;y--;)null!=r[y]&&h(r[y]);c||("value"in p&&void 0!==(y=p.value)&&(y!==e.value||"progress"===v&&!y)&&P(e,"value",y,d.value,!1),"checked"in p&&void 0!==(y=p.checked)&&y!==e.checked&&P(e,"checked",y,d.checked,!1))}return e}function $(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){s.__e(e,n)}}function B(e,t,n){var o,l;if(s.unmount&&s.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||$(o,null,t)),null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){s.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(l=0;l<o.length;l++)o[l]&&B(o[l],t,"function"!=typeof e.type);n||null==e.__e||h(e.__e),e.__e=e.__d=void 0}function L(e,t,n){return this.constructor(e,n)}l=a.slice,s={__e:function(e,t){for(var n,o,l;t=t.__;)if((n=t.__c)&&!n.__)try{if((o=n.constructor)&&null!=o.getDerivedStateFromError&&(n.setState(o.getDerivedStateFromError(e)),l=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),l=n.__d),l)return n.__E=n}catch(t){e=t}throw e}},r=0,g.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=d({},this.state),"function"==typeof e&&(e=e(d({},n),this.props)),e&&d(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),m(this))},g.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},g.prototype.render=y,i=[],c="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,C.__r=0,"undefined"!=typeof window&&window.__PREACT_DEVTOOLS__&&window.__PREACT_DEVTOOLS__.attachPreact("10.5.14",s,{Fragment:y,Component:g});var V=n(364),U=n(103);const N=Array.isArray;var R=n(829),z=U.Z?U.Z.prototype:void 0,I=z?z.toString:void 0;const j=function e(t){if("string"==typeof t)return t;if(N(t))return function(e,t){for(var n=-1,o=null==e?0:e.length,l=Array(o);++n<o;)l[n]=t(e[n],n,e);return l}(t,e)+"";if((0,R.Z)(t))return I?I.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n};var W=0;const H=function(e){var t,n=++W;return(null==(t=e)?"":j(t))+n},F=()=>new Set(Array.from({length:9},((e,t)=>`${t+1}`)));class K{content;possible=F();key=H("cell-");valid=!0;setValidity=()=>(this.valid=void 0===this.content?this.possible.size>0:/^[1-9]$/.test(this.content),this);setContent=e=>((e=e.trim())?(this.content=e.trim(),this.possible.clear()):this.clear(),this.setValidity());clear=()=>(this.content=void 0,this.possible=F(),this.valid=!0,this)}const Z=e=>16843009*((e=(858993459&(e-=e>>1&1431655765))+(e>>2&858993459))+(e>>4)&252645135)>>24,G=["getRow","getCol","getBlock"],q=e=>{const t=Math.log2(e);if(t!==Math.trunc(t))throw new TypeError(`${e} doesn't have exactly one bit.`);return t},J=(e,t)=>{let n=!1;for(let o=0;o<9;++o){const l=e[t](o),s=new Map;for(let e=0;e<9;++e){const{content:t,possible:n}=l[e];if(void 0===t)for(const t of n)s.set(t,(s.get(t)??0)|2**e);else s.set(t,(s.get(t)??0)|2**e)}const r=new Map;for(const[e,t]of s){if(Z(t)>8)continue;let n=r.get(t);n||(n=[],r.set(t,n)),n.push(e)}for(const[e,t]of r){if(Z(e)<t.length)throw new Error(`bitCount was smaller than allowed: ${e.toString(2)}; ${t.join(",")}`);if(!(Z(e)>t.length))for(let o=0;o<=Math.log2(e);++o){if(0==(e&2**o))continue;const s=l[o];s.possible.size>t.length&&(n=!0,s.possible=new Set(t))}}}return n},Q=e=>{let t=!1;for(const n of G)t=J(e,n)||t;return t},X=(e,t)=>{let n=!1;for(let o=0;o<9;++o){const l=e[t](o),s=new Map;for(const[e,t]of l.entries())if(void 0===t.content){let n=0;for(const e of t.possible)n|=2**(Number(e)-1);s.set(e,n)}else s.set(e,(s.get(e)??0)|2**(Number(t.content)-1));const r=new Map;for(const[e,t]of s){let n=r.get(t);n||(n=[],r.set(t,n)),n.push(e)}for(const[e,t]of r)if(!(Z(e)!==t.length||t.length>8))for(let o=0;o<=Math.log2(e);++o){if(0==(e&2**o))continue;const s=`${o+1}`;for(const[e,o]of l.entries())!t.includes(e)&&o.possible.has(s)&&(n=!0,o.possible.delete(s))}}return n},Y=e=>{let t=!1;for(const n of G)t=X(e,n)||t;return t},ee=(e,t,n)=>{let o=!1;for(const[l,s]of e.entries())l>=t&&l<t+3||s.possible.has(n)&&(o=!0,s.possible.delete(n));return o},te=e=>{let t=!1;for(let n=0;n<9;++n){const o=e.getBlock(n),l=3*Math.trunc(n/3),s=n%3*3,r=new Map;for(const[e,{content:t,possible:n}]of o.entries()){const o=2**(e%3)|2**(Math.trunc(e/3)+3);if(void 0===t)for(const e of n)r.set(e,(r.get(e)??0)|o);else r.set(t,(r.get(t)??0)|o)}for(const[n,o]of r){const r=7&o,i=o>>3&7;1===Z(r)&&Z(i)>1?t=ee(e.getCol(s+q(r)),l,n)||t:1===Z(i)&&Z(r)>1&&(t=ee(e.getRow(l+q(i)),s,n)||t)}}return t},ne=(e,t,n)=>{if(!Number.isInteger(n))throw new TypeError(`${n} was not an integer.`);if(n<e||n>t)throw new RangeError(`${n} ∉ [${e}, ${t}].`)};class oe{_cells;#subscriptions=new Set;#plugins=Object.values(o);constructor(e){if(this._cells=Array.from({length:81},(()=>new K)),e)for(const[t,n]of e.entries())for(const[e,o]of n.entries())if("number"==typeof o){const n=9*t;this.setContent(n+e,`${o}`)}}setContent=(e,t)=>(ne(0,80,e),this._cells[e].setContent(t),this.cellsIndividuallyValidByStructure(),this.#dispatch("change"));getContent=e=>(ne(0,80,e),this._cells[e].content);clearCell=e=>(this.getCell(e).clear(),this.cellsIndividuallyValidByStructure(),this.#dispatch("change"));clearAllCells=()=>{for(const e of this._cells)e.clear();return this.#dispatch("change")};getCol=e=>{ne(0,8,e);const t=[];for(let n=e;n<81;n+=9)t.push(this._cells[n]);return t};getRow=e=>(ne(0,8,e),e*=9,this._cells.slice(e,e+9));getBlock=e=>{ne(0,8,e);const t=e%3*3,n=3*Math.floor(e/3),o=[];for(let e=0;e<9;++e){let l=n+Math.floor(e/3);const s=t+e%3;l*=9,o.push(this.getCell(l+s))}return o};getCell=e=>(ne(0,80,e),this._cells[e]);getCells=()=>[...this._cells];solve=()=>{if(this.isValid()){for(const e of this._cells)void 0===e.content&&e.clear();let e=!1,t=!0;do{e=!1;for(const n of this.#plugins)try{e=n(this)||e}catch(e){console.error(e,this._cells),t=!1;break}for(const[e,n]of this._cells.entries())if(void 0===n.content)if(1===n.possible.size)n.setContent(n.possible.values().next().value);else if(0===n.possible.size){console.error("cell.possible.size === 0",[e,n]),t=!1;break}t&&=this.isValid()}while(e&&t);this.#dispatch(t?"finish":"error")}else this.#dispatch("error");return this};subscribe=e=>(this.#subscriptions.add(e),this);unsubscribe=e=>(this.#subscriptions.delete(e),this);#dispatch=e=>{for(const t of this.#subscriptions)t(this,e);return this};cellsIndividuallyValidByStructure=()=>{for(const e of this._cells)e.setValidity();for(let e=0;e<9;++e)for(const t of[this.getCol(e),this.getRow(e),this.getBlock(e)])this._validateByStructure(t);for(const[e,t]of this._cells.entries())if(!t.valid)return console.error("cell was not valid",[e,t]),!1;return!0};isValid=()=>{const e=["getRow","getBlock","getCol"];for(const t of e)for(let e=0;e<9;++e){const n=this[t](e),o=new Map;for(const e of n)if(void 0===e.content)for(const t of e.possible)o.set(t,(o.get(t)??0)+1);else o.set(e.content,(o.get(e.content)??0)+1);if(9!==o.size)return console.error("dict.size !== 9",o),!1}return this.cellsIndividuallyValidByStructure()};_validateByStructure=e=>{const t=new Map;for(const{content:n}of e)"string"==typeof n&&t.set(n,(t.get(n)??0)+1);for(const[n,o]of t)if(1!==o)for(const[t,o]of e.entries())o.content===n&&(console.error("cell.content === key",[t,o]),o.valid=!1);return this};isSolved=()=>{if(!this.cellsIndividuallyValidByStructure())return!1;for(const e of this._cells)if(void 0===e.content)return!1;return!0}}const le=()=>p("svg",{width:"16",height:"16",fill:"currentColor",class:"svg-eraser-fill",viewBox:"0 0 16 16"},p("path",{d:"M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"})),se=void 0,re={easy:[[5,se,3,se,9,4],[se,9,se,se,3,6,2,5,8],[se,se,se,se,se,se,3],[se,se,8,9,5,se,6,7],[],[se,7,2,se,6,1,4],[se,se,4],[6,5,9,8,2,se,se,1],[se,se,se,1,4,se,5,se,6]],evil:[[6,se,4,se,se,se,se,se,3],[se,se,se,se,3,7,8],[se,se,se,5,se,se,7],[8,9,se,1],[3,se,se,se,se,se,se,se,2],[se,se,se,se,se,3,se,1,9],[se,se,5,se,se,9],[se,se,1,8,6],[9,se,se,se,se,se,4,se,8]],expert:[[se,se,se,se,se,4,se,se,2],[se,6,se,2,se,se,se,3],[se,8,se,se,se,3,5,se,9],[se,4,se,se,se,se,1],[1,se,se,7,se,5],[5,se,3],[se,9,se,3],[se,se,4,se,6,1],[se,se,5,se,se,se,7]],invalid1:[[],[se,se,se,6],[se,se,se,5],[se,se,se,se,se,se,5,6],[],[se,6,5],[se,se,se,se,se,5],[se,se,se,se,se,6]],invalid2:[[se,se,se,se,1],[se,se,se,se,2],[se,se,se,se,3],[],[4,5,6],[se,se,se,se,se,se,4,5,6],[se,se,se,1],[se,se,se,2],[se,se,se,3]]};!function(e,t){var n,o,r;s.__&&s.__(e,t),o=(n=!1)?null:t.__k,r=[],D(t,e=t.__k=p(y,null,[e]),o||u,u,void 0!==t.ownerSVGElement,o?null:t.firstChild?l.call(t.childNodes):null,r,o?o.__e:t.firstChild,n),O(r,e)}(p(class extends g{#sudokuClass=new oe(re.expert);state={cells:this.#sudokuClass.getCells(),error:void 0,focused:0};constructor(...e){super(...e),this.#sudokuClass.subscribe(((e,t)=>{switch(t){case"change":this.setState({cells:e.getCells(),error:void 0});break;case"finish":{const t=e.isSolved();this.setState({cells:e.getCells(),error:t?void 0:"Sudoku wasn't solved completely."});break}case"error":this.setState({error:"Sudoku is invalid"})}}))}componentDidMount=()=>{document.addEventListener("keydown",this.handleKeyDown)};componentWillUnmount=()=>{document.removeEventListener("keydown",this.handleKeyDown)};render=()=>{const{cells:e,error:t,focused:n}=this.state;return p("div",{class:"App"},p("div",{class:"sudoku"},e.map((({content:e,key:t,valid:o},l)=>p("div",{key:t,class:`cell${o?"":" invalid-input"}${n===l?" focused-cell":""}`,"data-index":l,onMouseDown:this.handleCellClick(l),onTouchStart:e=>{e.preventDefault(),this.handleCellClick(l)()}},e)))),void 0!==typeof t&&p("div",{class:"error"},t),p("button",{type:"button",title:"Solve sudoku",class:"solve",onClick:this.solve},"Solve"),p("button",{type:"button",title:"Clear sudoku",class:"clear",onClick:this.clear},"Clear"),p("div",{class:"keyboardless-inputs"},Array.from({length:9},((e,t)=>p("div",{key:t,class:"keyboardless-input",title:`${t+1}`,onClick:this.handleKeyboardlessClick(`${t+1}`)},t+1))),p("div",{class:"keyboardless-input input-eraser",title:"Clear cell",onClick:this.handleKeyboardlessClick(" ")},p(le,null))))};solve=()=>{this.#sudokuClass.solve()};clear=()=>{this.#sudokuClass.clearAllCells()};handleCellClick=e=>()=>{this.setState({focused:e})};handleKeyDown=e=>{this.setState((0,V.Uy)((t=>{const n=e.key.toLowerCase();switch(n){case"arrowdown":case"arrowup":{const e="arrowdown"===n?9:-9;let o=t.focused+e;o<0?o+=81:o>80&&(o-=81),t.focused=o;break}case"arrowright":case"arrowleft":{const e="arrowright"===n?1:-1,o=t.focused%9+e;o<0?t.focused+=8:o>8?t.focused-=8:t.focused+=e;break}case" ":this.#sudokuClass.clearCell(t.focused),t.focused=(t.focused+1)%81;break;case"tab":{e.preventDefault();const{shiftKey:n}=e,o=n?-1:1;t.focused=(t.focused+o+81)%81;break}case"delete":case"backspace":this.#sudokuClass.clearCell(t.focused);break;default:/^[1-9]$/.test(n)&&(this.#sudokuClass.setContent(t.focused,n),t.focused=(t.focused+1)%81)}})))};handleKeyboardlessClick=e=>()=>{" "===e?this.#sudokuClass.clearCell(this.state.focused):(this.#sudokuClass.setContent(this.state.focused,e),this.setState((0,V.Uy)((e=>{e.focused=(e.focused+1)%81}))))}},null),document.body)}},n={};function o(e){var l=n[e];if(void 0!==l)return l.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,o),s.exports}o.m=t,e=[],o.O=(t,n,l,s)=>{if(!n){var r=1/0;for(u=0;u<e.length;u++){for(var[n,l,s]=e[u],i=!0,c=0;c<n.length;c++)(!1&s||r>=s)&&Object.keys(o.O).every((e=>o.O[e](n[c])))?n.splice(c--,1):(i=!1,s<r&&(r=s));if(i){e.splice(u--,1);var _=l();void 0!==_&&(t=_)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[n,l,s]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={991:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var l,s,[r,i,c]=n,_=0;for(l in i)o.o(i,l)&&(o.m[l]=i[l]);if(c)var u=c(o);for(t&&t(n);_<r.length;_++)s=r[_],o.o(e,s)&&e[s]&&e[s][0](),e[r[_]]=0;return o.O(u)},n=self.webpackChunkmelusc_github_io=self.webpackChunkmelusc_github_io||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var l=o.O(void 0,[259],(()=>o(185)));l=o.O(l)})();
//# sourceMappingURL=script.48f9166f3a9cf96369f8.js.map