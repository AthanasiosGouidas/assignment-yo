import React from "react";
import { Movie } from "./Movie";

export interface EntityCardProps {
  movie?: Movie;
  image: string;
  altText: string;
  children: React.ReactNode;
  onClick?: () => void;
  selectedColorProp?: string;
  overview?: string;
  index: number;
  totalItems: number;
  onHover?: (hovered: boolean) => void;
  disableHover?: boolean;
}
