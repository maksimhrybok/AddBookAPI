import React, { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
    const [reloadTrigger, setReloadTrigger] = useState(false);

    const triggerReload = () => setReloadTrigger(!reloadTrigger);

    return (
        <div>
            <BookForm onBookAdded={triggerReload} />
            <BookList reloadTrigger={reloadTrigger} />
        </div>
    );
}

export default App;
