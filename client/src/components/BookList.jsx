import React, { useEffect, useState } from 'react';
import EditBookForm from './EditBookForm';

const BookList = ({ reloadTrigger }) => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    const loadBooks = () => {
        fetch('/api/Books')
            .then(res => res.json())
            .then(data => setBooks(data));
    };

    useEffect(() => {
        loadBooks();
    }, [reloadTrigger]);

    const handleDelete = async (id) => {
        const confirm = window.confirm('Удалить эту книгу?');
        if (!confirm) return;

        const res = await fetch(`/api/Books/${id}`, { method: 'DELETE' });

        if (res.ok) {
            setBooks(books.filter(book => book.id !== id));
        } else {
            alert('❌ Ошибка при удалении');
        }
    };

    const handleSave = () => {
        setEditingBook(null);
        loadBooks(); // обновить список
    };

    return (
        <div>
            <h2>📚 Список книг:</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> — {book.author} ({book.pages} стр.)

                        <button onClick={() => setEditingBook(book)} style={{ marginLeft: '10px' }}>
                            ✏️ Редактировать
                        </button>

                        <button
                            onClick={() => handleDelete(book.id)}
                            style={{
                                marginLeft: '10px',
                                color: 'white',
                                backgroundColor: 'red',
                                border: 'none',
                                padding: '4px 8px',
                                cursor: 'pointer'
                            }}
                        >
                            Удалить
                        </button>

                        {editingBook?.id === book.id && (
                            <EditBookForm
                                book={editingBook}
                                onCancel={() => setEditingBook(null)}
                                onSave={handleSave}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
