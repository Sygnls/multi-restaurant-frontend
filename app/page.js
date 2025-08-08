'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const host = window.location.host;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/public/catalog`, {
      headers: { 'x-forwarded-host': host }
    })
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(setData)
      .catch(setError);
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Demo Storefront</h1>
      <p style={{ color: '#666', marginBottom: 16 }}>Multi-tenant, fetching catalog by host header</p>

      {error && <div style={{ color: 'crimson' }}>Error: {String(error)}</div>}
      {!data ? <div>Loading…</div> : (
        <div>
          <div style={{ marginBottom: 12 }}>Tenant: <b>{data.tenantId}</b></div>
          <h2 style={{ fontSize: 20, marginTop: 16 }}>Items</h2>
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
