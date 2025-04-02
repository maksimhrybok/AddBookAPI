import React, { useEffect, useState } from 'react';
import EditBookForm from './EditBookForm';

const BookList = ({ reloadTrigger }) => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [editingBook, setEditingBook] = useState(null);

    const loadBooks = () => {
        fetch(`/api/Books?search=${encodeURIComponent(search)}`)
            .then(res => res.json())
            .then(data => setBooks(data));
    };

    useEffect(() => {
        loadBooks();
    }, [search, reloadTrigger]);

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
        loadBooks();
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                📘 Мои книги
            </h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginRight: '10px',
                        width: '60%'
                    }}
                />

                <button
                    onClick={() => setSearch('')}
                    style={{
                        padding: '8px 14px',
                        background: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Сбросить
                </button>
            </div>

            <h2>📚 Список книг:</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {books.map(book => (
                    <li key={book.id} style={{ marginBottom: '15px' }}>
                        <div>
                            <strong>{book.title}</strong> — {book.author} ({book.pages} стр., {book.filesize} МБ)
                        </div>

                        <div style={{ marginTop: '5px' }}>
                            <button
                                onClick={() => setEditingBook(book)}
                                style={{
                                    padding: '5px 10px',
                                    marginRight: '10px',
                                    background: '#eee',
                                    border: '1px solid #aaa',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                ✏️ Редактировать
                            </button>

                            <button
                                onClick={() => handleDelete(book.id)}
                                style={{
                                    padding: '5px 10px',
                                    background: '#ff4d4d',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onCancel={() => setEditingBook(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default BookList;
