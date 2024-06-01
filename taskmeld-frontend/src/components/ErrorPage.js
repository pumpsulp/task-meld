import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h1>404 - Страница не найдена</h1>
            <p>Страницы, которую вы ищите не существует.</p>
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
};

export default ErrorPage;