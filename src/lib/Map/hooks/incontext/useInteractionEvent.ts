import { click, pointerMove } from "ol/events/condition";
import { Geometry } from "ol/geom";
import Select, { SelectEvent } from "ol/interaction/Select";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useMemo } from "react";
import { useMap } from "./useMap";

interface useInteractionEventArgs {
  annotation: VectorLayer<VectorSource<Geometry>>;
  onClick?: (e: SelectEvent) => void;
  onHover?: (e: SelectEvent) => void;
  isDisabledSelection?: boolean;
}

export function useInteractionEvent({
  annotation,
  onClick,
  onHover,
  isDisabledSelection = false,
}: useInteractionEventArgs) {
  const map = useMap();
  const clickSelect = useMemo(
    () =>
      new Select({
        condition: click,
        style: null,
        layers: [annotation],
      }),
    [annotation]
  );

  const hoverSelect = useMemo(
    () =>
      new Select({
        condition: pointerMove,
        style: null,
        layers: [annotation],
      }),
    [annotation]
  );

  useEffect(() => {
    if (onHover && !isDisabledSelection) {
      hoverSelect.on("select", onHover);
    }
    if (onClick && !isDisabledSelection) {
      clickSelect.on("select", onClick);
    }
    map.addInteraction(clickSelect);
    map.addInteraction(hoverSelect);
    return () => {
      if (onHover && !isDisabledSelection) {
        hoverSelect.un("select", onHover);
      }
      if (onClick && !isDisabledSelection) {
        clickSelect.un("select", onClick);
      }
      map.removeInteraction(clickSelect);
      map.removeInteraction(hoverSelect);
    };
  }, [onClick, onHover, map, hoverSelect, clickSelect, isDisabledSelection]);
}
