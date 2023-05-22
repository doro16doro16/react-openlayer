import { Children, ReactElement, cloneElement } from "react";

interface LayerGroupProps {
  zIndex?: number;
  children: ReactElement;
}

export default function LayerGroup({ zIndex, children }: LayerGroupProps) {
  if (!Array.isArray(children) && zIndex) {
    return cloneElement(children, { ...children.props, zIndex });
  }
  if (Array.isArray(children) && zIndex) {
    return Children.map(children, (child) => {
      return cloneElement(child, { ...child.props, zIndex });
    });
  }
  return <>{children}</>;
}
