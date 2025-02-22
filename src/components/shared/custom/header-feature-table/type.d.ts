// Declare prebuilt components
export interface PreBuiltComponent {
  title?: {
    text: string;
    className?: string;
  };
  count?: {
    value: number;
    className?: string;
  };
  sort?: {
    options: {
      value: string;
      label: string;
    }[];
    className?: string;
    onChange: (value: string) => void;
  };
  search?: {
    placeholder: string;
    className?: string;
    onChange: (value: string) => void;
  };
  tabs?: {
    options: {
      value: string;
      label: string;
      icon?: React.ReactNode | ((props: any) => JSX.Element);
    }[];
    className?: string;
    onChange?: ((value: string) => void) | undefined;
    variant?: "default" | "animation";
  };
  custom?: NonNullable<React.ReactNode>;
}

export type SlotItem = PreBuiltComponent | React.ReactNode;

// Declare position content
export interface PositionContent {
  components?: Partial<PreBuiltComponent>;
  custom?: React.ReactNode;
}

// Declare row content
export interface RowContent {
  start?: PositionContent;
  center?: PositionContent;
  end?: PositionContent;
  full?: PositionContent;
}

// Declare slots
export interface Slots {
  desktop?: RowContent[];
  mobile?: RowContent[];
}

// Declare props
export interface HeaderFeatureTableProps {
  slots?: Slots;
  isLoading?: boolean;
  className?: string;
}
