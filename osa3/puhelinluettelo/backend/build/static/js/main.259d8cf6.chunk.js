(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t(1),u=t.n(o),a=t(15),r=t.n(a),i=(t(6),t(3)),l=function(e){return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Filter entries"}),Object(c.jsx)("div",{children:Object(c.jsx)("form",{children:Object(c.jsx)("input",{value:e.value,onChange:e.onChange})})})]})},s=function(e){return Object(c.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:e.nameValue,onChange:e.onChangeName})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:e.numberValue,onChange:e.onChangeNumber})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.name,t=e.onClick;return Object(c.jsxs)("p",{children:[n.name," ",n.number," ",Object(c.jsx)("button",{onClick:t,children:"Delete"})]})},j=t(4),b=t.n(j),h="/api/persons",f=function(){return b.a.get(h).then((function(e){return e.data}))},m=function(e){return b.a.post(h,e).then((function(e){return e.data}))},O=function(e){return b.a.delete(h+"/".concat(e))},g=function(e,n){return b.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},v=(t(38),function(e){var n=e.message,t=e.className;return null===n?null:Object(c.jsx)("div",{className:t,children:n})});var x=function(){var e=Object(o.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1],a=Object(o.useState)(""),r=Object(i.a)(a,2),j=r[0],b=r[1],h=Object(o.useState)(""),x=Object(i.a)(h,2),p=x[0],C=x[1],N=Object(o.useState)(""),w=Object(i.a)(N,2),S=w[0],T=w[1],k=Object(o.useState)(null),y=Object(i.a)(k,2),F=y[0],D=y[1],I=Object(o.useState)(null),V=Object(i.a)(I,2),A=V[0],E=V[1];Object(o.useEffect)((function(){f().then((function(e){return u(e)}))}),[]);var P=new RegExp(S,"i");return console.log(j),Object(c.jsx)("div",{className:"App",children:Object(c.jsx)("header",{className:"App-header",children:Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Phonebook"}),Object(c.jsx)(v,{message:F,className:"notif"}),Object(c.jsx)(v,{message:A,className:"error"}),Object(c.jsx)(l,{value:S,onChange:function(e){console.log(e.target.value),T(e.target.value)}}),Object(c.jsx)("h2",{children:"Add new entry"}),Object(c.jsx)(s,{onSubmit:function(e){e.preventDefault();var n={name:j,number:p};if(!n.name||!n.number)return E("Name and number required"),setTimeout((function(){E(null)}),5e3),b(""),void C("");var c=t.findIndex((function(e){return e.name.match(j)}));console.log("newName:",j),console.log("Index: ",c),console.log("Nothing?"),-1===c?m(n).then((function(e){return u(t.concat(e))})).then((function(e){D("'".concat(j,"' added to the phonebook!")),setTimeout((function(){D(null)}),5e3),b(""),C("")})).catch((function(e){console.log(e.response.data),E(e.response.data),setTimeout((function(){E(null)}),5e3)})):window.confirm("".concat(j," already added to the phonebook, do you want to update the number?"))&&g(t[c].id,n).then((function(e){u(t.map((function(n){return n.id!==t[c].id?n:e})))})).then((function(e){D("".concat(j,"'s number updated!")),setTimeout((function(){D(null)}),5e3)})).catch((function(e){console.log("T\xe4nne?"),E("".concat(j," was already removed from the server")),setTimeout((function(){E(null)}),5e3),u(t.filter((function(e){return e.id!==t[c].id}))),b(""),C("")}))},nameValue:j,onChangeName:function(e){console.log(e.target.value),b(e.target.value)},numberValue:p,onChangeNumber:function(e){console.log(e.target.value),C(e.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)("div",{children:t.filter((function(e){return e.name.match(P)})).map((function(e){return Object(c.jsx)(d,{name:e,onClick:function(){return n=e.id,c=e.name,void(window.confirm("Delete ".concat(c,"?"))&&(console.log(n),O(n).then((function(e){D("".concat(c," deleted :(")),setTimeout((function(){D(null)}),5e3),b(""),C("")})),u(t.filter((function(e){return e.id!==n})))));var n,c}},e.id)}))})]})})})},p=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,40)).then((function(n){var t=n.getCLS,c=n.getFID,o=n.getFCP,u=n.getLCP,a=n.getTTFB;t(e),c(e),o(e),u(e),a(e)}))};r.a.render(Object(c.jsx)(u.a.StrictMode,{children:Object(c.jsx)(x,{})}),document.getElementById("root")),p()},6:function(e,n,t){}},[[39,1,2]]]);
//# sourceMappingURL=main.259d8cf6.chunk.js.map