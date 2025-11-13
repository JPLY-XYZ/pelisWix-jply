import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'

import { app_build, app_version } from 'lib/info'

export default function settings() {

  const { height: screenHeigth } = useWindowDimensions();

  console.log("Altura de la pantalla:", screenHeigth);  
  return (
    <View className="bg-gray-100 justify-between h-full">
      
      <View className="space-y-5 px-5 pt-5">
        <View>
          <Text className="font-normal text-lg">Aquí podras ajustar las configuraciones de la aplicación eun futuras versiones.</Text>
        </View>
      </View>

      <View className="items-center pb-5 px-5">
        <Text className="font-normal text-sm text-gray-500">
          JPLY - PelisWIX - {app_version} - {app_build}
        </Text>
      </View>

    </View>
  )
}