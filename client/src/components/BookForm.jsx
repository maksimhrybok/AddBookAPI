import React, { useState } from 'react';

const BookForm = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pages, setPages] = useState('');
    const [fileSize, setFileSize] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            pages: parseInt(pages),
            fileSize: parseFloat(fileSize)
        };

        const response = await fetch('/api/Books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (response.ok) {
            setTitle('');
            setAuthor('');
            setPages('');
            setFileSize('');
            onBookAdded(); // обновить список книг
        } else {
            alert('❌ Ошибка при добавлении книги');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>➕ Добавить книгу</h2>
            <input
                type="text"
                placeholder="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br />
            <input
                type="text"
                placeholder="Автор"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <br />
            <input
                type="number"
                placeholder="Количество страниц"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                required
            />
            <br />
            <input
                type="number"
                step="0.1"
                placeholder="Размер файла (МБ)"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                required
            />
            <br />
            <button type="submit">Добавить</button>
        </form>
    );
};

export default BookForm;
