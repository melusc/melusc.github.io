(()=>{"use strict";var e,t,n,_,l,r,o={},u=[],i=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function a(t,n,_){var l,r,o,u={};for(o in n)"key"==o?l=n[o]:"ref"==o?r=n[o]:u[o]=n[o];if(arguments.length>2&&(u.children=arguments.length>3?e.call(arguments,2):_),"function"==typeof t&&null!=t.defaultProps)for(o in t.defaultProps)void 0===u[o]&&(u[o]=t.defaultProps[o]);return p(t,u,l,r,null)}function p(e,_,l,r,o){var u={type:e,props:_,key:l,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o??++n};return null!=t.vnode&&t.vnode(u),u}function f(e){return e.children}function d(e,t){this.props=e,this.context=t}function h(e,t){if(null==t)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?h(e):null}function v(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return v(e)}}function m(e){(!e.__d&&(e.__d=!0)&&_.push(e)&&!y.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||l)(y)}function y(){for(var e;y.__r=_.length;)e=_.sort((function(e,t){return e.__v.__b-t.__v.__b})),_=[],e.some((function(e){var t,n,_,l,r,o;e.__d&&(r=(l=(t=e).__v).__e,(o=t.__P)&&(n=[],(_=s({},l)).__v=l.__v+1,T(o,l,_,t.__n,void 0!==o.ownerSVGElement,null!=l.__h?[r]:null,n,r??h(l),l.__h),M(n,l),l.__e!=r&&v(l)))}))}function g(e,t,n,_,l,r,i,s,c,a){var d,v,m,y,g,S,x,w=_&&_.__k||u,P=w.length;for(n.__k=[],d=0;d<t.length;d++)if(null!=(y=n.__k[d]=null==(y=t[d])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?p(null,y,null,null,y):Array.isArray(y)?p(f,{children:y},null,null,null):y.__b>0?p(y.type,y.props,y.key,null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(m=w[d])||m&&y.key==m.key&&y.type===m.type)w[d]=void 0;else for(v=0;v<P;v++){if((m=w[v])&&y.key==m.key&&y.type===m.type){w[v]=void 0;break}m=null}T(e,y,m=m||o,l,r,i,s,c,a),g=y.__e,(v=y.ref)&&m.ref!=v&&(x||(x=[]),m.ref&&x.push(m.ref,null,y),x.push(v,y.__c||g,y)),null!=g?(null==S&&(S=g),"function"==typeof y.type&&null!=y.__k&&y.__k===m.__k?y.__d=c=b(y,c,e):c=k(e,y,m,w,g,c),a||"option"!==n.type?"function"==typeof n.type&&(n.__d=c):e.value=""):c&&m.__e==c&&c.parentNode!=e&&(c=h(m))}for(n.__e=S,d=P;d--;)null!=w[d]&&("function"==typeof n.type&&null!=w[d].__e&&w[d].__e==n.__d&&(n.__d=h(_,d+1)),E(w[d],w[d]));if(x)for(d=0;d<x.length;d++)N(x[d],x[++d],x[++d])}function b(e,t,n){var _,l;for(_=0;_<e.__k.length;_++)(l=e.__k[_])&&(l.__=e,t="function"==typeof l.type?b(l,t,n):k(n,l,l,e.__k,l.__e,t));return t}function k(e,t,n,_,l,r){var o,u,i;if(void 0!==t.__d)o=t.__d,t.__d=void 0;else if(null==n||l!=r||null==l.parentNode)e:if(null==r||r.parentNode!==e)e.appendChild(l),o=null;else{for(u=r,i=0;(u=u.nextSibling)&&i<_.length;i+=2)if(u==l)break e;e.insertBefore(l,r),o=r}return void 0!==o?o:l.nextSibling}function S(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||i.test(t)?n:n+"px"}function x(e,t,n,_,l){var r;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof _&&(e.style.cssText=_=""),_)for(t in _)n&&t in n||S(e.style,t,"");if(n)for(t in n)_&&n[t]===_[t]||S(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])r=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+r]=n,n?_||e.addEventListener(t,r?P:w,r):e.removeEventListener(t,r?P:w,r);else if("dangerouslySetInnerHTML"!==t){if(l)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=n??"";break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function w(e){this.l[e.type+!1](t.event?t.event(e):e)}function P(e){this.l[e.type+!0](t.event?t.event(e):e)}function T(e,n,_,l,r,o,u,i,c){var a,p,h,v,m,y,b,k,S,x,w,P=n.type;if(void 0!==n.constructor)return null;null!=_.__h&&(c=_.__h,i=n.__e=_.__e,n.__h=null,o=[i]),(a=t.__b)&&a(n);try{e:if("function"==typeof P){if(k=n.props,S=(a=P.contextType)&&l[a.__c],x=a?S?S.props.value:a.__:l,_.__c?b=(p=n.__c=_.__c).__=p.__E:("prototype"in P&&P.prototype.render?n.__c=p=new P(k,x):(n.__c=p=new d(k,x),p.constructor=P,p.render=D),S&&S.sub(p),p.props=k,p.state||(p.state={}),p.context=x,p.__n=l,h=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=P.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=s({},p.__s)),s(p.__s,P.getDerivedStateFromProps(k,p.__s))),v=p.props,m=p.state,h)null==P.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==P.getDerivedStateFromProps&&k!==v&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(k,x),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(k,p.__s,x)||n.__v===_.__v){p.props=k,p.state=p.__s,n.__v!==_.__v&&(p.__d=!1),p.__v=n,n.__e=_.__e,n.__k=_.__k,n.__k.forEach((function(e){e&&(e.__=n)})),p.__h.length&&u.push(p);break e}null!=p.componentWillUpdate&&p.componentWillUpdate(k,p.__s,x),null!=p.componentDidUpdate&&p.__h.push((function(){p.componentDidUpdate(v,m,y)}))}p.context=x,p.props=k,p.state=p.__s,(a=t.__r)&&a(n),p.__d=!1,p.__v=n,p.__P=e,a=p.render(p.props,p.state,p.context),p.state=p.__s,null!=p.getChildContext&&(l=s(s({},l),p.getChildContext())),h||null==p.getSnapshotBeforeUpdate||(y=p.getSnapshotBeforeUpdate(v,m)),w=null!=a&&a.type===f&&null==a.key?a.props.children:a,g(e,Array.isArray(w)?w:[w],n,_,l,r,o,u,i,c),p.base=n.__e,n.__h=null,p.__h.length&&u.push(p),b&&(p.__E=p.__=null),p.__e=!1}else null==o&&n.__v===_.__v?(n.__k=_.__k,n.__e=_.__e):n.__e=C(_.__e,n,_,l,r,o,u,c);(a=t.diffed)&&a(n)}catch(e){n.__v=null,(c||null!=o)&&(n.__e=i,n.__h=!!c,o[o.indexOf(i)]=null),t.__e(e,n,_)}}function M(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function C(t,n,_,l,r,u,i,s){var a,p,f,d=_.props,v=n.props,m=n.type,y=0;if("svg"===m&&(r=!0),null!=u)for(;y<u.length;y++)if((a=u[y])&&(a===t||(m?a.localName==m:3==a.nodeType))){t=a,u[y]=null;break}if(null==t){if(null===m)return document.createTextNode(v);t=r?document.createElementNS("http://www.w3.org/2000/svg",m):document.createElement(m,v.is&&v),u=null,s=!1}if(null===m)d===v||s&&t.data===v||(t.data=v);else{if(u=u&&e.call(t.childNodes),p=(d=_.props||o).dangerouslySetInnerHTML,f=v.dangerouslySetInnerHTML,!s){if(null!=u)for(d={},y=0;y<t.attributes.length;y++)d[t.attributes[y].name]=t.attributes[y].value;(f||p)&&(f&&(p&&f.__html==p.__html||f.__html===t.innerHTML)||(t.innerHTML=f&&f.__html||""))}if(function(e,t,n,_,l){var r;for(r in n)"children"===r||"key"===r||r in t||x(e,r,null,n[r],_);for(r in t)l&&"function"!=typeof t[r]||"children"===r||"key"===r||"value"===r||"checked"===r||n[r]===t[r]||x(e,r,t[r],n[r],_)}(t,v,d,r,s),f)n.__k=[];else if(y=n.props.children,g(t,Array.isArray(y)?y:[y],n,_,l,r&&"foreignObject"!==m,u,i,u?u[0]:_.__k&&h(_,0),s),null!=u)for(y=u.length;y--;)null!=u[y]&&c(u[y]);s||("value"in v&&void 0!==(y=v.value)&&(y!==t.value||"progress"===m&&!y)&&x(t,"value",y,d.value,!1),"checked"in v&&void 0!==(y=v.checked)&&y!==t.checked&&x(t,"checked",y,d.checked,!1))}return t}function N(e,n,_){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,_)}}function E(e,n,_){var l,r;if(t.unmount&&t.unmount(e),(l=e.ref)&&(l.current&&l.current!==e.__e||N(l,null,n)),null!=(l=e.__c)){if(l.componentWillUnmount)try{l.componentWillUnmount()}catch(e){t.__e(e,n)}l.base=l.__P=null}if(l=e.__k)for(r=0;r<l.length;r++)l[r]&&E(l[r],n,"function"!=typeof e.type);_||null==e.__e||c(e.__e),e.__e=e.__d=void 0}function D(e,t,n){return this.constructor(e,n)}e=u.slice,t={__e:function(e,t){for(var n,_,l;t=t.__;)if((n=t.__c)&&!n.__)try{if((_=n.constructor)&&null!=_.getDerivedStateFromError&&(n.setState(_.getDerivedStateFromError(e)),l=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),l=n.__d),l)return n.__E=n}catch(t){e=t}throw e}},n=0,d.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof e&&(e=e(s({},n),this.props)),e&&s(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),m(this))},d.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},d.prototype.render=f,_=[],l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,y.__r=0;const U={},L=(e,t)=>{const n=e<0&&t<0,_=Math.abs(e),l=Math.abs(t);let r=_>l?_:l,o=_>l?l:_;const u=`${r},${o}`;if(u in U)return U[u];let i=1;for(;0!==i;)i=r%o,0!==i&&(r=o,o=i);return n&&(o*=-1),U[u]=o,o},O=e=>{let t=e[0];if(void 0===t)return"";for(let n=1;n<e.length;++n)t=L(t,e[n]);return`${t}`},V=document.querySelector("#root");V&&function(n,_){var l,r,u;t.__&&t.__(n,_),r=(l=!1)?null:_.__k,u=[],T(_,n=_.__k=a(f,null,[n]),r||o,o,void 0!==_.ownerSVGElement,r?null:_.firstChild?e.call(_.childNodes):null,u,r?r.__e:_.firstChild,l),M(u,n)}(a(class extends d{state={state:0,inputValue:"",outputValue:""};inputRef={current:null};timeout=0;calcOutput=e=>{this.setState({outputValue:O(e)})};clearTimeout=()=>{clearTimeout(this.timeout)};setTimeout=e=>{this.clearTimeout(),this.timeout=setTimeout(this.calcOutput,100,e)};render=()=>{const{inputValue:e,outputValue:t,state:n}=this.state;return a("div",{class:"box"},a("input",{ref:this.inputRef,placeholder:"2, 5, 9-13",onInput:this.handleInput}),a("div",null,"Parsed input:"),2===n&&a("div",null,"One or more numbers were too large"),1===n&&a("div",null,"One or more numbers were 0"),0===n&&a("div",null,e||"Enter some numbers"),a("hr",null),a("div",null,"gcd:"),2===n&&a("div",null,"One or more numbers were too large"),1===n&&a("div",null,"One or more numbers were 0"),0===n&&a("div",null,t||"Enter some numbers"))};handleInput=()=>{const e=this.inputRef.current;if(!e)return;const t=e.value.replace(/\./g,",").replace(/[^\d,-]/g,"").split(",").filter((e=>""!==e.trim())),n=[];for(const e of t){const t=/(?<first>-?\d+)-(?<second>-?\d+)/.exec(e);if(t?.groups){const e=t.groups,_=e.first,l=e.second,r=Math.trunc(Number(_)),o=Math.trunc(Number(l)),u=Math.min(r,o),i=Math.max(r,o);for(let e=u;e<=i;++e)n.push(e)}else{const t=Math.trunc(Number(e));Number.isFinite(t)&&n.push(t)}}if(n.some((e=>!Number.isSafeInteger(e))))this.setState({state:2});else if(n.includes(0))this.setState({state:1});else{n.sort(((e,t)=>e-t));const e=[...new Set(n)];this.setState((t=>{const n=e.join(", ");return n!==t.inputValue?(this.setTimeout(e),{inputValue:n,state:0}):{}}))}}},null),V)})();
//# sourceMappingURL=script.js.map