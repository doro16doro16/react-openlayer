import Button, { ButtonProps } from "../Button";
import { useEffect, useRef } from "react";
import { Draw } from "ol/interaction";
import { useMap } from "../../../hooks";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import { makeText } from "../../../utils/object";
import {
  DrawEvent,
  createBox,
  createRegularPolygon,
} from "ol/interaction/Draw";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import { MdPolyline } from "react-icons/md";
import Icon from "ol/style/Icon";
import { TbRectangle } from "react-icons/tb";
import { Circle, Geometry, LineString, Polygon } from "ol/geom";
import { Feature } from "ol";
import { Coordinate } from "ol/coordinate";

interface RectangleDrawButtonProps extends ButtonProps {
  onEnd: (feature: DrawEvent) => void;
  onCanvas?: boolean;
}

export default function RectangleDrawButton({
  onEnd,
  onClick,
  onCanvas = false,
  ...props
}: RectangleDrawButtonProps) {
  const map = useMap();
  const vectorSourceRef = useRef(new VectorSource());
  const vectorLayerRef = useRef(new VectorLayer());
  const drawRef = useRef(
    new Draw({
      source: vectorSourceRef.current,
      type: "Circle",
      geometryFunction: createBox(),
      style: new Style({
        stroke: new Stroke({
          color: "rgb(2, 26, 255)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(2, 26, 255, 0.3)",
        }),
        image: new Icon({
          src: "/mapicon/Rectangle.svg", // 마커 이미지 경로
          anchor: [0.5, 1], // 마커 이미지의 앵커 위치
        }),
      }),
    })
  );
  const startDrawing = () => {
    if (onClick) {
      onClick();
    }
    map.addInteraction(drawRef.current);
  };

  const drawing = (event: DrawEvent) => {
    event.feature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "rgb(2, 26, 255)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(2, 26, 255, 0.3)",
        }),
        text: makeText({
          text: "unknown",
          size: 15,
          color: "black",
          outline: true,
          isMarker: true,
        }),
      })
    );
    event.feature.setProperties({
      source: vectorSourceRef.current,
      layer: vectorLayerRef.current,
    });
    map.removeInteraction(drawRef.current);
    onEnd(event);
  };

  useEffect(() => {
    const drawingInstance = drawRef.current;

    drawingInstance.on("drawend", drawing);
    return () => {
      drawingInstance.un("drawend", drawing);
    };
  }, []);

  useEffect(() => {
    if (!props.isActive) {
      map.removeInteraction(drawRef.current);
    }
  }, [props.isActive, map]);

  useEffect(() => {
    vectorLayerRef.current.setSource(vectorSourceRef.current);
    if (onCanvas) {
      map.addLayer(vectorLayerRef.current);
    } else {
      map.removeLayer(vectorLayerRef.current);
    }
  }, [onCanvas, map]);

  return (
    <Button onClick={startDrawing} {...props}>
      <TbRectangle />
    </Button>
  );
}
