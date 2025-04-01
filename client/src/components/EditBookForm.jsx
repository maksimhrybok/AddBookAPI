import React, { useState, useEffect } from 'react';

const EditBookForm = ({ book, onCancel, onSave }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [pages, setPages] = useState(book.pages);
    const [fileSize, setFileSize] = useState(book.fileSize);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBook = {
            id: book.id,
            title,
            author,
            pages: parseInt(pages),
            fileSize: parseFloat(fileSize)
        };

        const response = await fetch(`/api/Books/${book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (response.ok) {
            onSave(); // триггер обновления
        } else {
            alert('Ошибка при сохранении');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <h3>Редактировать книгу</h3>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            <br />
            <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <br />
            <input value={pages} type="number" onChange={(e) => setPages(e.target.value)} required />
            <br />
            <input value={fileSize} type="number" step="0.1" onChange={(e) => setFileSize(e.target.value)} required />
            <br />
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: '1rem' }}>Отмена</button>
        </form>
    );
};

export default EditBookForm;
