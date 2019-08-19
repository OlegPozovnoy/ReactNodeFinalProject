(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,a){e.exports=a(65)},65:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(32),l=a.n(c),s=a(2),o=a(3),i=a(11),m=a(1),u=a.n(m);var h=function(){var e=Object(n.useState)({}),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(!1),s=Object(o.a)(l,2),m=s[0],h=s[1];return m?r.a.createElement(i.a,{to:"/chats/index"}):r.a.createElement("div",{className:"container"},r.a.createElement("header",null,r.a.createElement("h1",null,"New Chat")),r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log(a),u.a.post("/api/chats/create",{name:a.name}).then(function(e){return h(!0)}).catch(function(e){return console.log(e)})}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Chat's name"),r.a.createElement("input",{className:"form-control",name:"name",required:"required",onChange:function(e){e.persist();var t=e.target,a=t.name,n=t.value;c(function(e){return console.log("inputs",e),e[a]=n,e})}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-dark",type:"submit"},"Submit")))))};var d=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)(function(){u.a.get("/api/chats/index").then(function(e){console.log("index result",e.data),c(e.data)}).catch(function(e){return console.error(e)})},[]),r.a.createElement("div",{className:"container"},r.a.createElement("header",null,r.a.createElement("h1",{className:"chatname"},"Chats")),r.a.createElement("div",null,r.a.createElement("table",{className:"table table-striped table-dark"},r.a.createElement("tbody",null,a.map(function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,r.a.createElement(s.b,{to:"/chats/".concat(e._id)},e.name)),r.a.createElement("td",{className:"text-right"},r.a.createElement(s.b,{to:"/chats/edit/".concat(e._id)},"edit"),"|",r.a.createElement(s.b,{to:"/chats/destroy/".concat(e._id)},"delete")))})))))},p=a(12),g=a(13),b=a(16),E=a(14),f=a(9),v=a(17),N=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(b.a)(this,Object(E.a)(t).call(this))).state={value:""},a.handleInputChange=a.handleInputChange.bind(Object(f.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(a)),a}return Object(v.a)(t,e),Object(g.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),u.a.post("/api/chats/addnewparticipant",{chat_id:this.props.chat_id,email:this.state.value}).then(this.props.toggler()).then(this.setState({value:""})).catch(function(e){return console.log(e)})}},{key:"handleInputChange",value:function(e){e.persist(),this.setState({value:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{className:"participantForm"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Add a new participant by nickname"),r.a.createElement("input",{className:"form-control",name:"email",required:"required",onChange:this.handleInputChange,value:this.state.value})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-dark",type:"submit"},"Submit"))))}}]),t}(r.a.Component),O=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(b.a)(this,Object(E.a)(t).call(this))).state={value:""},a.handleInputChange=a.handleInputChange.bind(Object(f.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(a)),a}return Object(v.a)(t,e),Object(g.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),u.a.post("/api/chats/addnewmessage",{chat_id:this.props.chat_id,message:{text:this.state.value}}).then(this.props.toggler()).then(this.setState({value:""})).catch(function(e){return console.log(e)})}},{key:"handleInputChange",value:function(e){e.persist(),this.setState({value:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{className:"participantForm"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Enter your message"),r.a.createElement("input",{className:"form-control",name:"message",required:"required",onChange:this.handleInputChange,value:this.state.value})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-dark",type:"submit"},"Send"))))}}]),t}(r.a.Component),j=a(15),S=a.n(j);var C=function(e){return r.a.createElement("div",{className:"participantForm"},r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),u.a.post("/api/chats/messageupdate",{change:{messageId:e.message_id,chatId:e.chat_id}}).then(e.toggler()).catch(function(e){return console.log(e)})}},r.a.createElement("div",{className:"form-group"},S.a.get("uid")===e.message_uid?r.a.createElement("button",{className:"btn btn-link",type:"submit"},"visible"===e.message_status?"delete":"restore"):"")))};var y=function(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),c=a[0],l=a[1];return c?r.a.createElement(i.a,{to:"/chats/index"}):r.a.createElement("div",{className:"leaveChat"},r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),console.log("props",e),u.a.post("/api/chats/leavechat",{leave:{chat_id:e.chat_id}}).then(function(e){return l(!0)}).then(e.toggler()).catch(function(e){return console.log(e)})}},r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-danger",type:"submit"},"Leave Chat"))))},w=function(e){function t(){var e;return Object(p.a)(this,t),(e=Object(b.a)(this,Object(E.a)(t).call(this))).state={toggle:!0,counter:0},e.toggling=e.toggling.bind(Object(f.a)(e)),e}return Object(v.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=this;setInterval(function(){e.setState({counter:e.state.counter+1})},1e4),u.a.get("/api/chats/".concat(this.props.match.params.id)).then(function(t){console.log("show result",t.data),e.setState({chat:t.data})}).catch(function(e){return console.error(e)})}},{key:"componentDidUpdate",value:function(e){var t=this;this.state.toggle===e.toggle&&this.state.counter===e.counter||u.a.get("/api/chats/".concat(this.props.match.params.id)).then(function(e){t.setState({chat:e.data})}).catch(function(e){return console.error(e)})}},{key:"toggling",value:function(){this.setState({toggle:!this.state.toggle})}},{key:"convertDate",value:function(e){return new Date(e).toLocaleString()}},{key:"convertColor",value:function(e){for(var t=0,a=0;a<e.length;a++)t+=e.charCodeAt(a);return t%7===0?"red":t%7===1?"cyan":t%7===2?"lightblue":t%7===3?"yellow":t%7===4?"lime":t%7===5?"magenta":t%7===6?"orange":void 0}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("header",null,r.a.createElement("h3",{className:"chatname"},"Chat: ",this.state.chat&&this.state.chat.name)),r.a.createElement(N,{chat_id:this.state.chat&&this.state.chat._id,toggler:this.toggling}),r.a.createElement("div",{className:"authorslist"},r.a.createElement("h6",{className:"participantlist"},"Participants:"),r.a.createElement("ul",null,Array.isArray(this.state.chat&&this.state.chat.authors)&&this.state.chat.authors.map(function(t){return r.a.createElement("li",{key:t._id,style:{color:e.convertColor(t.email)}}," ",t.email)}))),r.a.createElement("div",{className:"my-custom-scrollbar table-wrapper-scroll-y"},r.a.createElement("table",{className:"table table-striped  table-dark"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null," Who?"),r.a.createElement("th",null," Said what?"),r.a.createElement("th",null," When?"),r.a.createElement("th",null," "))),r.a.createElement("tbody",null,Array.isArray(this.state.chat&&this.state.chat.messages)&&this.state.chat.messages.map(function(t){return r.a.createElement("tr",{key:t._id,style:{color:e.convertColor(t.author.email)}},r.a.createElement("td",null,t.author.email),r.a.createElement("td",null,"visible"===t.status&&t.content),r.a.createElement("td",null,e.convertDate(t.createdAt)),r.a.createElement("td",{className:"text-right"},r.a.createElement(C,{chat_id:e.state.chat._id,message_id:t._id,message_status:t.status,toggler:e.toggling,message_uid:t.author._id})))})))),r.a.createElement(O,{chat_id:this.state.chat&&this.state.chat._id,toggler:this.toggling}),r.a.createElement(y,{chat_id:this.state.chat&&this.state.chat._id,toggler:this.toggling}))}}]),t}(r.a.Component);var k=function(e){var t=Object(n.useState)({}),a=Object(o.a)(t,2),c=a[0],l=a[1],s=Object(n.useState)(!1),m=Object(o.a)(s,2),h=m[0],d=m[1];return Object(n.useEffect)(function(){u.a.get("/api/chats/".concat(e.match.params.id)).then(function(e){l(e.data)}).catch(function(e){return console.error(e)})},[e]),h?r.a.createElement(i.a,{to:"/chats/index"}):r.a.createElement("div",{className:"container"},r.a.createElement("header",null,r.a.createElement("h1",null,"Edit Chat")),r.a.createElement("div",null,r.a.createElement("form",{action:"/chats",method:"POST",onSubmit:function(t){t.preventDefault(),u.a.post("/api/chats/create",{chat_id:e.match.params.id,name:c.name}).then(function(e){return d(!0)}).catch(function(e){return console.error(e)})}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Chat's name"),r.a.createElement("input",{className:"form-control",name:"name",required:"required",onChange:function(e){e.persist();var t=e.target,a=t.name,n=t.value;l(function(e){return console.log("inputs",e),e[a]=n,e})},defaultValue:c.name})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-dark",type:"submit"},"Submit")))))};var _=function(e){return Object(n.useEffect)(function(){u.a.post("/api/chats/destroy",{id:e.match.params.id})},[e]),r.a.createElement(i.a,{to:"/chats/index"})},x=a(10),q=Object(n.createContext)(),D=q.Provider,I=(q.Consumer,q);var A=function(){var e=Object(n.useState)({}),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(!1),s=Object(o.a)(l,2),m=s[0],h=s[1],d=Object(n.useContext)(I).setNotification;function p(e){e.persist();var t=e.target,n=t.name,r=t.value;c(function(e){return e[n]=r,e}),a.email&&a.email.length>0&&u.a.post("/api/authors/checkusername",{author:a}).then(function(e){d(function(t){return Object(x.a)({},t,{status:e.data.status,message:e.data.message+" ("+a.email+")"})})}).catch(function(e){return console.error(e)})}return m?r.a.createElement(i.a,{to:"/"}):r.a.createElement("div",{className:"container"},r.a.createElement("header",null,r.a.createElement("h1",null,"New User")),r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),u.a.post("/api/authors",{author:a}).then(function(e){d(function(t){return Object(x.a)({},t,{status:e.data.status,message:e.data.message})}),h(!0)}).catch(function(e){d(function(e){return Object(x.a)({},e,{status:"danger",message:"Registration failed"})})})}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"First Name"),r.a.createElement("input",{className:"form-control",name:"firstName",required:"required",onChange:p})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Last Name"),r.a.createElement("input",{className:"form-control",name:"lastName",required:"required",onChange:p})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Nickname"),r.a.createElement("input",{className:"form-control",name:"email",required:"required",onChange:p})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("input",{className:"form-control",name:"password",type:"password",required:"required",onChange:p})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password Confirmation"),r.a.createElement("input",{className:"form-control",name:"passwordConfirmation",required:"required",onChange:p,type:"password"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-dark",type:"submit"},"Submit")))))};var L=function(){var e=Object(n.useState)({}),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(!1),s=Object(o.a)(l,2),m=s[0],h=s[1],d=Object(n.useContext)(I).setNotification;function p(e){e.persist();var t=e.target,a=t.name,n=t.value;c(function(e){return e[a]=n,e})}return m?r.a.createElement(i.a,{to:"/chats/index"}):r.a.createElement("div",{className:"container"},r.a.createElement("header",null,r.a.createElement("h1",null,"Login")),r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),u.a.post("/api/authenticate",a).then(function(e){d(function(e){return Object(x.a)({},e,{status:"success",message:"You were logged in"})}),S.a.set("uid",e.data.uid),h(!0)}).catch(function(e){d(function(e){return Object(x.a)({},e,{status:"danger",message:"Error while logging in"})})})}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Nickname"),r.a.createElement("input",{className:"form-control",name:"email",required:"required",onChange:p})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("input",{className:"form-control",name:"password",type:"password",required:"required",onChange:p})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-dark",type:"submit"},"Submit")))))};var P=function(){var e=Object(n.useContext)(I).setNotification;return Object(n.useEffect)(function(){u.a.post("/api/logout").then(function(){S.a.remove("uid"),e(function(e){return Object(x.a)({},e,{status:"danger",message:"You were logged out"})})})},[]),r.a.createElement(i.a,{to:"/"})};var F=function(){return r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/chats/new",component:h}),r.a.createElement(i.b,{exact:!0,path:"/chats/index",component:d}),r.a.createElement(i.b,{exact:!0,path:"/chats/:id",component:w}),r.a.createElement(i.b,{exact:!0,path:"/chats/edit/:id",component:k}),r.a.createElement(i.b,{exact:!0,path:"/chats/destroy/:id",component:_}),r.a.createElement(i.b,{exact:!0,path:"/",component:L}),r.a.createElement(i.b,{exact:!0,path:"/logout",component:P}),r.a.createElement(i.b,{exact:!0,path:"/authors/new",component:A}))};var T=function(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},r.a.createElement("a",{className:"navbar-brand",href:"/"},"The Secret chat"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(s.b,{className:"nav-link",to:"/"},"Login")),r.a.createElement("li",{className:"nav-item dropdown"},r.a.createElement("a",{className:"nav-link dropdown-toggle",href:"#","data-toggle":"dropdown",role:"button","aria-haspopup":"true","aria-expanded":"false"},"Menu"),r.a.createElement("div",{className:"dropdown-menu"},r.a.createElement(s.b,{className:"dropdown-item",to:"/chats/new"},"Create Chat"),r.a.createElement(s.b,{className:"dropdown-item",to:"/chats/index"},"Chat List"))),r.a.createElement("li",{className:"nav-item"},r.a.createElement(s.b,{className:"nav-link",to:"/logout"},"Logout")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(s.b,{className:"nav-link",to:"/authors/new"},"Register")))))};var J=function(){var e=Object(n.useContext)(I).notification;return e.status?r.a.createElement("div",{className:"alert alert-"+e.status,style:{marginTop:"1em "}},e.message):null};l.a.render(r.a.createElement(s.a,null,r.a.createElement(function(){var e=Object(n.useState)({status:null,message:null}),t=Object(o.a)(e,2),a=t[0],c=t[1];return r.a.createElement(D,{value:{notification:a,setNotification:c}},r.a.createElement(T,null),r.a.createElement(J,null),r.a.createElement(F,null))},null)),document.querySelector("#root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.0575230d.chunk.js.map