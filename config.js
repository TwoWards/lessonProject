const ENV = process.env;

const requiredEnvVariables = [
    'APP_PORT',
    'DB_URI',
];

requiredEnvVariables.forEach((variable) => {
    if (!ENV[variable]) {
        console.error(`Ошибка: Переменная среды ${variable} не установлена.`);
        process.exit(1); // Завершить выполнение с кодом ошибки 1
    }
});

const config = {
    APP_PORT: ENV.APP_PORT,
    DB_URI: ENV.DB_URI,
};

module.exports = config;