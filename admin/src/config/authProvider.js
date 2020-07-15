import Cookie from 'cookie-universal';

const cookies = Cookie();

const authProvider = {
    login: async ({username, password}) => {
        const url = `${process.env.REACT_APP_BACKEND_URL || window.location.origin}/api/auth/admin/login`;

        const data = new FormData();
        data.append('email', username);
        data.append('password', password);

        return fetch(url,
            {
                method: 'POST',
                body: data,
            })
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({access_token}) => {
                cookies.set('admin_access_token', access_token);
            });
    },

    logout: () => {
        cookies.remove('admin_access_token');

        return Promise.resolve();
    },

    checkAuth: () => {
        return cookies.get('admin_access_token')
            ? Promise.resolve()
            : Promise.reject({redirectTo: '/login'});
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            cookies.remove('admin_access_token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: params => Promise.resolve(),
};

export default authProvider;
