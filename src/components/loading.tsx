import { ActivityIndicator, View } from "react-native";
import colors from 'tailwindcss/colors'

export default function Loading() {
 return (
  <View className="flex-1 absolute w-full h-full opacity-75 z-50 items-center justify-center bg-primary">
   <ActivityIndicator color={colors.white} size={24}/>
  </View>
 )
}