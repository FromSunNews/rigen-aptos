import { ReactElement, Children, cloneElement } from "react";
import { Skeleton } from "@/components/shared/ui/skeleton";

type SkeletonRules = {
  text?: boolean;
  image?: boolean;
  button?: boolean;
  preserveAspectRatio?: boolean;
  className?: string;
};

export const createSkeleton = (component: ReactElement, rules?: SkeletonRules) => {
  const defaultRules: SkeletonRules = {
    text: true,
    image: true,
    button: true,
    preserveAspectRatio: true,
    ...rules,
  };

  const convertToSkeleton = (element: ReactElement): ReactElement => {
    // Get styling props
    const { className, style, children } = element.props;
    const tag = element.type as keyof JSX.IntrinsicElements;

    // Handle different elements
    switch (tag) {
      case "img":
        if (!defaultRules.image) return element;
        return (
          <Skeleton
            className={`${className} rounded-full`}
            style={{
              width: style?.width || "100%",
              height: style?.height || "100%",
              aspectRatio: defaultRules.preserveAspectRatio ? "1" : "auto",
            }}
          />
        );

      case "button":
        if (!defaultRules.button) return element;
        return (
          <Skeleton
            className={`${className} rounded`}
            style={{
              width: style?.width || "100px",
              height: style?.height || "40px",
            }}
          />
        );

      case "p":
      case "span":
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        if (!defaultRules.text) return element;
        return (
          <Skeleton
            className={className}
            style={{
              width: style?.width || "100%",
              height: style?.height || "1em",
            }}
          />
        );

      default:
        // Handle child elements
        if (children) {
          const newChildren = Children.map(children, (child) => {
            if (!child || typeof child !== "object") return child;
            return convertToSkeleton(child as ReactElement);
          });

          return cloneElement(element, { ...element.props }, newChildren);
        }
        return element;
    }
  };

  return convertToSkeleton(component);
};
