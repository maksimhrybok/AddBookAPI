import React, { useState } from 'react';

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

        const res = await fetch(`/api/Books/${book.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBook)
        });

        if (res.ok) {
            onSave(); // обновить список
        } else {
            alert('❌ Ошибка при сохранении');
        }
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '30px auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            backgroundColor: '#f9f9f9',
            fontFamily: 'sans-serif'
        }}>
            <h2>✏️ Редактировать книгу</h2>

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
                    style={{ display: 'block', marginBottom: '15px', padding: '8px', width: '300px' }}
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 16px',
                            background: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Сохранить
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: '10px 16px',
                            background: '#ddd',
                            color: '#333',
                            border: '1px solid #aaa',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBookForm;
