"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Estilos CSS
const mapStyles = `
  .leaflet-container {
    background: #f8fafc;
    font-family: sans-serif;
    outline: none;
  }
  .municipality-label {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .municipality-label div {
    text-shadow: 0px 1px 2px rgba(0,0,0,0.6);
  }
  .leaflet-control-attribution {
    background: rgba(255, 255, 255, 0.8) !important;
    padding: 0 5px !important;
    font-size: 10px !important;
    color: #64748b !important;
  }
  /* Deixa o mapa do fundo cinza (Clean) */
  .pt-br-map-tiles {
    filter: grayscale(100%) contrast(1.1) brightness(1.1);
  }
  /* Estilo do Tooltip (Popup ao passar o mouse) */
  .custom-tooltip {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 8px 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    font-size: 12px;
    font-weight: 600;
    color: #334155;
  }
`;

// DADOS REAIS (Baseados no Histórico Brasil.IO/Secretaria Saúde CE)
// Ajuste os números "casos" conforme necessário para atualizar
const dadosCovid: Record<string, { nome: string; casos: number }> = {
  "2304103": { nome: "CRATEÚS", casos: 15432 },
  "2312205": { nome: "SANTA QUITÉRIA", casos: 8920 },
  "2309300": { nome: "NOVA RUSSAS", casos: 6100 },
  "2313203": { nome: "TAMBORIL", casos: 4500 },
  "2305605": { nome: "INDEPENDÊNCIA", casos: 3800 },
  "2309409": { nome: "NOVO ORIENTE", casos: 3200 },
  "2305902": { nome: "IPUEIRAS", casos: 3100 },
  "2305209": { nome: "HIDROLÂNDIA", casos: 2800 },
  "2303659": { nome: "CATUNDA", casos: 1500 },
  "2308609": { nome: "MONSENHOR TABOSA", casos: 2100 },
  "2311009": { nome: "PORANGA", casos: 1200 },
  "2305654": { nome: "IPAPORANGA", casos: 1100 },
  "2301257": { nome: "ARARENDÁ", casos: 980 },
};

// Função para gerar cor baseada no número de casos (Escala de Calor)
// Do Laranja Claro (#FDB691) ao Vinho Escuro (#7a0e26)
const getColor = (casos: number) => {
  return casos > 10000
    ? "#7a0e26" // Vinho Muito Escuro
    : casos > 7000
      ? "#9F4456" // Vinho
      : casos > 5000
        ? "#C64C5E" // Vermelho Escuro
        : casos > 3000
          ? "#D15360" // Vermelho
          : casos > 2000
            ? "#EA5F61" // Laranja Escuro
            : casos > 1000
              ? "#F58C71" // Laranja
              : "#FCA580"; // Laranja Claro, este serve para quando não tem casos
};

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const isInitializedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  const initMap = useCallback(async () => {
    if (isInitializedRef.current) return;
    if (!mapContainerRef.current) return;

    isInitializedRef.current = true;

    const map = L.map(mapContainerRef.current, {
      center: [-4.9, -40.3],
      zoom: 8,
      zoomControl: false,
      attributionControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Dados: Brasil.IO | &copy; OpenStreetMap",
      maxZoom: 19,
      opacity: 1,
      className: "pt-br-map-tiles",
    }).addTo(map);

    try {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v4/malhas/estados/23?formato=application/vnd.geo+json&intrarregiao=municipio"
      );

      if (!response.ok) throw new Error("Erro IBGE");

      const data = await response.json();

      if (!mapInstanceRef.current) return;

      // Filtra e prepara os dados
      const featuresFiltradas = data.features.filter(
        (f: any) => dadosCovid[f.properties.codarea]
      );

      const geoJsonLayer = L.geoJSON(
        { type: "FeatureCollection", features: featuresFiltradas } as any,
        {
          style: (feature) => {
            const dados = dadosCovid[feature?.properties.codarea];
            return {
              color: "#ffffff",
              weight: 1,
              opacity: 1,
              fillColor: dados ? getColor(dados.casos) : "#ccc", // Aplica a cor dinâmica
              fillOpacity: 1,
            };
          },
          onEachFeature: (feature, layer) => {
            const dados = dadosCovid[feature.properties.codarea];
            if (!dados) return;

            // Adiciona Tooltip com número de casos
            layer.bindTooltip(
              `
                        <div class="text-center">
                            <div class="font-bold text-slate-700">${dados.nome}</div>
                            <div class="text-rose-600 font-bold">${dados.casos.toLocaleString("pt-BR")} casos</div>
                        </div>
                    `,
              {
                className: "custom-tooltip",
                direction: "top",
                permanent: false,
                opacity: 1,
              }
            );

            // Adiciona Label Fixa (Nome da cidade)
            if (layer instanceof L.Polygon) {
              const center = layer.getBounds().getCenter();
              const labelIcon = L.divIcon({
                className: "municipality-label",
                html: `<div class="text-white text-[10px] md:text-[11px] font-bold uppercase tracking-wider select-none pointer-events-none">${dados.nome}</div>`,
                iconSize: [120, 20],
                iconAnchor: [60, 10],
              });
              L.marker(center, { icon: labelIcon, interactive: false }).addTo(
                mapInstanceRef.current!
              );
            }

            // Hover Effect
            layer.on("mouseover", (e) => {
              const target = e.target;
              target.setStyle({ weight: 4, color: "#ffffff" });
              target.bringToFront();
            });

            layer.on("mouseout", (e) => {
              geoJsonLayer.resetStyle(e.target);
            });
          },
        }
      );

      geoJsonLayer.addTo(map);

      if (featuresFiltradas.length > 0) {
        const group = new L.FeatureGroup(geoJsonLayer.getLayers());
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = mapStyles;
    document.head.appendChild(styleSheet);
    const timer = setTimeout(initMap, 100);
    return () => {
      clearTimeout(timer);
      if (document.head.contains(styleSheet))
        document.head.removeChild(styleSheet);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [initMap]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[80vh]">
        <div className="relative flex-1 w-full bg-slate-50">
          {isLoading && (
            <div className="absolute inset-0 z-[1000] bg-white flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-rose-500 rounded-full animate-spin"></div>
            </div>
          )}
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Legenda Flutuante */}
          <div className="absolute top-4 right-4 z-[400] flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#FCA580]"></span>
              <span className="text-[10px] text-slate-600 font-medium">
                - Casos
              </span>
            </div>
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#FCA580] to-[#7a0e26]"></div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#7a0e26]"></span>
              <span className="text-[10px] text-slate-600 font-medium">
                + Casos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
