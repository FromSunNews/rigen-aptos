declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      className?: string | undefined;
    }
  }
} 