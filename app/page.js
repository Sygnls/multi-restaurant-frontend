'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const host = window.location.hostname; // demo.localhost
    fetch('/api/public/catalog', { headers: { 'x-forwarded-host': host } })
      .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setData)
      .catch(setError);
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Demo Storefront</h1>
      <p style={{ color: '#666' }}>Multi-tenant via host header (proxied to /api)</p>
      {error && <div style={{ color: 'crimson', marginTop: 8 }}>Error: {String(error)}</div>}
      {!data ? <div>Loading…</div> : (
        <div style={{ marginTop: 12 }}>
          <div>Tenant: <b>{data.tenantId}</b></div>
          <ul style={{ lineHeight: 1.8 }}>
            {data.items?.map(it => (
              <li key={it.id}>{it.name} — {(it.price/100).toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
