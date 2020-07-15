import * as React from 'react';

import {
    Admin,
    Resource,
} from 'react-admin';


import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';

import UserIcon from '@material-ui/icons/People';

import { UserCreate, UserEdit, UserList } from './apps/user/User';

const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
    >
        <Resource name="user"
                  list={UserList}
                  edit={UserEdit}
                  create={UserCreate}
                  icon={UserIcon}
                  options={{label: 'Пользователи'}}
        />
    </Admin>
);

export default App;
