'use client';

import dynamic from 'next/dynamic';

// Importação dinâmica para evitar erros de SSR (Leaflet precisa do window)
const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            color: '#64748b'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: 48,
                    height: 48,
                    border: '3px solid rgba(124, 58, 237, 0.2)',
                    borderTopColor: '#7c3aed',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                }} />
                <p>Carregando mapa...</p>
            </div>
        </div>
    )
});

export default function MapPage() {
    return <MapComponent />;
}
