"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[726],{5726:function(e,s,a){a.r(s),a.d(s,{default:function(){return x}});var i=a(5685),n=(a(2791),{dialogs:"Dialogs_dialogs__kispP",item:"Dialogs_item__vNmRQ",message:"Dialogs_message__SshaY",active:"Dialogs_active__k03PL"}),t=a(184),r=function(e){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:n.message,children:e.message})})},d=a(1523),l=function(e){return(0,t.jsx)("div",{className:n.item,children:(0,t.jsx)(d.OL,{to:"/dialogs/"+e.id,activeClassName:n.active,children:e.name})})},c=a(5705),o=function(e){var s=(0,c.TA)({initialValues:{Text:""},onSubmit:function(a){e.sendMessage(a.Text),s.resetForm()},validate:function(e){var s={};return e.Text||(s.Text="Required"),s}});return(0,t.jsxs)("form",{onSubmit:s.handleSubmit,children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("textarea",{placeholder:"Send messages Formik",name:"Text",onChange:s.handleChange,value:s.values.Text}),s.touched.Text&&s.errors.Text&&(0,t.jsx)("div",{style:{color:"red"},children:s.errors.Text})]}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{type:"submit",children:"Send message"})})]})},m=function(e){var s=e.dialogsPage.dialogsData.map((function(e){return(0,t.jsx)(l,{name:e.name,id:e.id},e.id)})),a=e.dialogsPage.messagesData.map((function(e){return(0,t.jsx)(r,{message:e.message,id:e.id},e.id)}));return(0,t.jsxs)("div",{className:n.dialogs,children:[(0,t.jsx)("div",{className:n.dialogs_items,children:s}),(0,t.jsxs)("div",{className:n.messages,children:[(0,t.jsxs)("div",{children:[" ",a," "]}),(0,t.jsx)(o,{sendMessage:e.sendMessage})]})]})},u=a(364),g=a(6024),x=(0,a(7781).qC)((0,u.$j)((function(e){return{dialogsPage:e.dialogsPage}}),{sendMessage:i.$}),g.e)(m)}}]);
//# sourceMappingURL=726.f2d65e71.chunk.js.map