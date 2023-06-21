import { useEffect } from "react";
import React from "react";
import { useMap } from "../../hooks";
import { XYZ } from "ol/source";
import OlTileLayer from "ol/layer/Tile";
import { TileUrl } from "../../utils/utils";

export interface TileLayerProps {
  url: string;

  /**
   * @default 0
   */
  zIndex?: number;

  /**
   * @default 42
   */
  maxZoom?: number;

  /**
   * @default 0
   */
  minZoom?: number;
  errorTileUrl?: string;
}

export const TileLayer = ({
  url,
  zIndex = 0,
  maxZoom = 42,
  minZoom = 0,
}: TileLayerProps) => {
  const map = useMap();

  useEffect(() => {
    const customTmsSource = new XYZ({
      maxZoom,
      minZoom,
      tileUrlFunction: (tileCoord) => {
        const tileUrl = new TileUrl(url);
        const z = tileCoord[0];
        const x = tileCoord[1];
        const y = Math.pow(2, z) - tileCoord[2] - 1;
        return tileUrl.getUrlFromPosition(z, x, y);
      },
    });

    const customTmsLayer = new OlTileLayer({
      source: customTmsSource,
      zIndex,
    });

    map.addLayer(customTmsLayer);
  }, [map]);
  return <></>;
};
