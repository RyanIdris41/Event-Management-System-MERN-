import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import {getUser} from "../helpers/utils.js";

const user = getUser()
const App = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
    <div>
      <Link to="/"><Button type="primary">Back Home</Button></Link>
      {user && <Link className="pl-2"  to="/dashboard"><Button type="primary">Dashboard</Button></Link>}
    </div>
  }
  />
);
export default App;