import Cookie from 'cookie-universal';
import simpleRestProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';

const cookies = Cookie();

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const token = cookies.get('admin_access_token');

    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

console.log('REACT_APP_BACKEND_URL', process.env.REACT_APP_BACKEND_URL);

const backendAdminUrl = `${process.env.REACT_APP_BACKEND_URL || window.location.origin}/api/admin`;
const dataProvider = simpleRestProvider(backendAdminUrl, httpClient);

export default dataProvider;
