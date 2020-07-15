require('dotenv').config();

function corsSetup(app): void {
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:8000',
            process.env.SITE_HOST,
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        exposedHeaders: ['X-Total-Count']
    });
}

export default corsSetup;
