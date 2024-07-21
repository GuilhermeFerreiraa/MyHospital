import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
 children: ReactNode;
};

type ButtonTextProps = TouchableOpacityProps & {
 children: ReactNode;
};

type ButtonIconProps = TouchableOpacityProps & {
 children: ReactNode;
};

function Button({ children, ...rest }: ButtonProps) {
 return (
  <TouchableOpacity
   className="h-12 bg-primary rounded-md items-center justify-center flex-row"
   {...rest}
  >
   {children}
  </TouchableOpacity>
 );
}

function ButtonText({ children }: ButtonTextProps) {
 return (
  <Text className="text-white font-heading text-center text-base mx-2">{children}</Text>
 );
}

function ButtonIcon({ children }: ButtonIconProps) {
 return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
