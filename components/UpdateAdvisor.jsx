import { View, Text, Modal, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUpdateFileFromGit } from 'lib/data';
import { app_version } from 'lib/info'; 
import semver from 'semver';

const UpdateAdvisor = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [updateFile, setUpdateFile] = useState(null); 

    useEffect(() => {
        const fetchUpdateFile = async () => {
            try {
                const file = await getUpdateFileFromGit();

                if (file && file.version && app_version && semver.gt(file.version, app_version)) {
                    setUpdateFile(file);
                    setModalVisible(true);
                }
                
            } catch (error) {
                console.error("Error al obtener el archivo de actualización:", error);
            }
        };

        fetchUpdateFile();
    }, []);

    if (!modalVisible || !updateFile) {
        return null;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible} 
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
            >
                <View className="w-4/5 max-w-sm bg-white dark:bg-gray-600 rounded-xl p-6 shadow-xl">
                    <Text className="text-xl font-bold text-gray-800  dark:text-white mb-2">
                        ACTUALIZACIÓN DISPONIBLE
                    </Text>
                    <Text className="text-base text-gray-600 dark:text-white mb-6">
                        NUEVA VERSIÓN - {updateFile.version}
                    </Text>
                    
                    {updateFile.changes.map((change, index) => (
                        <Text key={index} className="text-base text-gray-600 dark:text-white mb-2">
                            • {change}
                        </Text>
                    ))}

                    <TouchableOpacity
                        className="bg-blue-500 w-full mt-5 py-3 rounded-lg"
                        onPress={async () => {
                            try {
                                await Linking.openURL(updateFile.download_url);
                            } catch (error) {
                                console.error('Error al abrir URL:', error);
                            }
                        }}
                    >
                        <Text className="text-white font-semibold text-center text-base">
                            DESCARGAR ACTUALIZACIÓN
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-full py-2 mt-2"
                        onPress={() => setModalVisible(false)}
                    >
                        <Text className="text-gray-500 dark:text-white font-semibold text-center text-base">
                            Actualizar más tarde
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default UpdateAdvisor