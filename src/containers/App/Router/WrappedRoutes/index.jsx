import React from "react";
import { Route } from "react-router-dom";
import Layout from "../../../Layout/index";
import Documentation from "./Documentation";
import DefaultPages from "./DefaultPages";
import Account from "./Account";
import ECommerce from "./ECommerce";
import Maps from "./Maps";
import Charts from "./Charts";
import Tables from "./Tables";
import Forms from "./Forms";
import UI from "./UI";

import Chat from "../../../Chat/index";


import Mail from "../../../Mail/index";
import Job from "../../../Job/index";
import Form from "../../../Tables/MaterialTable/components/Form";
export default () => (
  <div>
    <Layout />
    <div className="container__wrap">
      
      {/* Do not delete from here  */}
      <Route path="/ui" component={UI} />
      <Route path="/mail" component={Mail} />
      <Route path="/job" component={Job} />
      <Route path="/form" component={Form} />
      <Route path="/chat" component={Chat} />
      <Route path="/forms" component={Forms} />
      <Route path="/tables" component={Tables} />
      <Route path="/charts" component={Charts} />
      <Route path="/maps" component={Maps} />
      <Route path="/default_pages" component={DefaultPages} />
      {/* to there */}
      {/* <Route path="/account" component={Account} /> */}
      <Route path="/e-commerce" component={ECommerce} />
      <Route path="/documentation" component={Documentation} />
    </div>
  </div>
);
