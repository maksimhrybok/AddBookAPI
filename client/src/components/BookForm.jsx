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
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'sans-serif'
        }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                ➕ Добавить книгу
            </h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '300px' }}
                />

                <input
                    type="text"
                    placeholder="Автор"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '300px' }}
                />

                <input
                    type="number"
                    placeholder="Количество страниц"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '300px' }}
                />

                <input
                    type="number"
                    step="0.1"
                    placeholder="Размер файла (МБ)"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '300px' }}
                />

                <button type="submit" style={{
                    padding: '10px 16px',
                    background: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default BookForm;
