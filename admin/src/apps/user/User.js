import * as React from 'react';
import {
    List,
    Datagrid,
    BooleanField,
    TextField,
    EditButton,

    // Edit
    Edit,
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
} from 'react-admin';

export const UserList = (props) => (
    <List title="Пользователи" {...props}>
        <Datagrid>
            <TextField source="email"/>
            <TextField source="full_name"/>
            <TextField source="phone"/>
            <BooleanField source="is_admin"/>
            <EditButton basePath="/user"/>
        </Datagrid>
    </List>
);

const EditPageTitle = ({record}) => {
    return <span>{record.full_name || record.email }</span>;
};

export const UserEdit = (props) => (
    <Edit title={<EditPageTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput required source="email"/>
            <TextInput source="full_name"/>
            <TextInput source="phone"/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput required source="email"/>
            <PasswordInput required source="password"/>
            <TextInput source="full_name"/>
            <TextInput source="phone"/>
        </SimpleForm>
    </Create>
);
