import React from "react";
import { Route, Switch } from "react-router-dom";

import ChatsNew from "./chats/new";
import ChatsIndex from "./chats/index";
import ChatsShow from "./chats/show";
import ChatsEdit from "./chats/edit";
import ChatsDestroy from "./chats/destroy";

import SessionRegister from "./sessions/register";
import SessionLogin from "./sessions/login";
import SessionLogout from "./sessions/logout";

function Routes() {
  return (
    <Switch>
      <Route exact path="/chats/new" component={ChatsNew} />
      <Route exact path="/chats/index" component={ChatsIndex} />
      <Route exact path="/chats/:id" component={ChatsShow} />
      <Route exact path="/chats/edit/:id" component={ChatsEdit} />
      <Route exact path="/chats/destroy/:id" component={ChatsDestroy} />
      <Route exact path="/" component={SessionLogin} />
      <Route exact path="/logout" component={SessionLogout} />
      <Route exact path="/authors/new" component={SessionRegister} />
    </Switch>
  );
}

export default Routes;
