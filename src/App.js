import React from 'react';
import styles from './App.module.scss';
import { useState, lazy, Suspense, useTransition } from 'react';

const ComposantA = lazy(
  () =>
    new Promise((res) =>
      setTimeout(() => res(import('./pages/ComposantA/ComposantA')), 3000)
    )
);

const ComposantB = lazy(
  () =>
    new Promise((res) =>
      setTimeout(() => res(import('./pages/ComposantB/ComposantB')), 3000)
    )
);

function App() {
  const [page, setPage] = useState('a');
  const [isPending, startTransition] = useTransition('a');

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <nav className="d-flex p-20">
        <button className="btn btn-primary mr-5" onClick={() => setPage('a')}>
          Composant A
        </button>
        <button
          className="btn btn-primary mr-5"
          onClick={() => startTransition(() => setPage('b'))}
        >
          Composant B
        </button>
      </nav>
      <div className="flex-fill p-20">
        <Suspense fallback={<h3>Chargement...</h3>}>
          {page === 'a' && <ComposantA />}
          <Suspense fallback={<h3>Chargement...</h3>}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
              eveniet ea id quasi aperiam repellat aut, soluta tenetur
              voluptatibus ducimus odio tempore nostrum labore dolorem maiores
              sapiente optio ut eos.
            </p>
            {isPending && <small>Petit chargement...</small>}
            {page === 'b' && <ComposantB />}
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
