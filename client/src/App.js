import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
    const [reload, setReload] = useState(0);

    const handleBookAdded = () => {
        setReload(prev => prev + 1); // триггер обновления списка
    };

    return (
        <div className="App">
            <h1>📘 Мои книги</h1>
            <BookForm onBookAdded={handleBookAdded} />
            <hr />
            <BookList reloadTrigger={reload} />
        </div>
    );
}

export default App;
